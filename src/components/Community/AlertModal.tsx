import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {deleteComment} from '../../api/comments';
import {deletePost} from '../../api/post';
import {Post} from '../../api/types';
import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';

export interface AlertProps {
  visible: boolean;
  onClose(): void;
  text: string;
  postId: number;
  button: string;
  isPost: boolean;
  commentId: number;
}

function AlertModal({
  visible,
  onClose,
  text,
  postId,
  button,
  isPost,
  commentId,
}: AlertProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();

  const {mutate: removePost} = useMutation(deletePost, {
    onSuccess: e => {
      queryClient.invalidateQueries('postAll');
      navigation.goBack();
    },
    onError: e => {
      console.log(e, '글 삭제 에러');
    },
  });
  const {mutate: removeComment} = useMutation(deleteComment, {
    onSuccess: e => {
      console.log(e);
      queryClient.invalidateQueries('postDetail');
      queryClient.invalidateQueries('postAll');
    },
    onError: e => {
      console.log(e, '댓글 삭제 에러');
    },
  });

  const onPressRemove = () => {
    if (button === '나가기') {
      navigation.goBack();
    } else if (button === '네' && isPost) {
      removePost(postId);
    } else if (button === '네' && !isPost) {
      removeComment({
        postId: postId,
        commentId: commentId,
      });
    } else if (button === '확인') {
      //신고
    }
  };
  const onCancle = () => {
    onClose();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.block}>
        <View style={styles.whiteBox}>
          <Text style={styles.text}> {text}</Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn1}
            onPress={onPressRemove}>
            <Text style={styles.btnText}>{button}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn2}
            onPress={onCancle}>
            <Text style={styles.btnText}>아니요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: colors.on_primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 276,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    paddingHorizontal: 65,
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.408,
    color: '#000000',
    paddingVertical: 37,
    textAlign: 'center',
  },
  btns: {
    flexDirection: 'row',
    display: 'flex',
    height: 44,
    width: 276,
  },
  btn1: {
    paddingTop: 11,
    paddingBottom: 12,
    backgroundColor: colors.text5,
    width: 276 / 2,
    borderBottomLeftRadius: 3,
  },
  btn2: {
    paddingTop: 11,
    paddingBottom: 12,
    backgroundColor: colors.primary,
    width: 276 / 2,
    borderBottomRightRadius: 3,
  },
  btnText: {
    fontWeight: '700',
    color: colors.on_primary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AlertModal;

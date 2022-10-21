import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {Modal, StyleSheet, View, Text, Pressable} from 'react-native';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
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
}

function AlertModal({visible, onClose, text, postId, button}: AlertProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();

  const {mutate} = useMutation(deletePost, {
    onSuccess: e => {
      queryClient.invalidateQueries('postAll');
      navigation.goBack();
    },
    onError: e => {
      console.log(e, '글 삭제 에러');
    },
  });

  const onPressRemove = () => {
    if (button === '나가기') {
      navigation.goBack();
    } else if (button === '삭제') {
      mutate(postId);
    } else {
      navigation.navigate('Modify', {
        postId,
      });
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
          <Pressable style={styles.btn1} onPress={onPressRemove}>
            <Text style={styles.btnText}>{button}</Text>
          </Pressable>
          <Pressable style={styles.btn2} onPress={onCancle}>
            <Text style={styles.btnText}>아니요</Text>
          </Pressable>
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
    paddingHorizontal: 55,
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.408,
    color: '#000000',
    paddingVertical: 37,
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
    backgroundColor: colors.text3,
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

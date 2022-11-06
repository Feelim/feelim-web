import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';
import AlertModal from './AlertModal';
import Close2 from '../../assets/images/Community/Close2.svg';
import Write from '../../assets/images/Community/Write.svg';
import PostCommentInput from './PostCommentInput';
import {useSetRecoilState} from 'recoil';
import {patchCommentState} from '../../atoms/patchComment';

export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: any;
  postId: number;
  isPost: boolean;
  commentId: number;
}

const BottomSheet = ({
  modalVisible,
  setModalVisible,
  postId,
  commentId,
  isPost,
}: BottomSheetProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [btnText, setBtnText] = useState('');
  const setPatchComment = useSetRecoilState(patchCommentState);
  const onPressModify = () => {
    if (isPost) {
      navigation.navigate('Modify', {postId});
      setModalVisible(false);
    } else {
      //댓글 수정
      setPatchComment(commentId);
      setModalVisible(false);
    }
  };
  const onPressDelete = () => {
    setVisible(true);
    setText('정말 삭제하시겠어요?');
    setModalVisible(false);
    setBtnText('네');
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType={'fade'}
        transparent
        statusBarTranslucent>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              ...styles.bottomSheetContainer,
              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressModify}
              style={styles.itemFirst}>
              <Write style={{width: 19, height: 19}} />
              <Text style={styles.text}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressDelete}
              style={styles.itemLast}>
              <Close2 style={{width: 19, height: 19}} />
              <Text style={styles.text}>삭제</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <AlertModal
        visible={visible}
        onClose={onClose}
        text={text}
        postId={postId}
        button={btnText}
        isPost={isPost}
        commentId={commentId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 128,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemFirst: {
    paddingTop: 23.5,
    paddingBottom: 15,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLast: {
    paddingTop: 15,
    paddingBottom: 29,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 16.5,
    color: '#000000',
    fontWeight: '400',
  },
});

export default BottomSheet;

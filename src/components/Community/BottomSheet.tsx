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
} from 'react-native';
import AlertModal from './AlertModal';

export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: any;
  postId: number;
}

const BottomSheet = ({
  modalVisible,
  setModalVisible,
  postId,
}: BottomSheetProps) => {
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
  const onPressModify = () => {
    setModalVisible(false);
    setVisible(true);
    setText('수정하시겠습니까?');
    setBtnText('수정');
  };
  const onPressDelete = () => {
    setVisible(true);
    setText('삭제하시겠습니까?');
    setModalVisible(false);
    setBtnText('삭제');
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
              activeOpacity={0.8}
              onPress={onPressModify}
              style={styles.item}>
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressDelete}
              style={styles.item}>
              <Text>삭제</Text>
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
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default BottomSheet;

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
import {useRecoilState, useSetRecoilState} from 'recoil';
import {patchCommentState} from '../../atoms/patchComment';
import ReportModal from './ReportModal';
import {selectImgState} from '../../atoms/selectImg';
export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: any;
}

const CameraBottomSheet = ({
  modalVisible,
  setModalVisible,
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

  const [selectImg, setSelectImg] = useRecoilState(selectImgState);

  const onPressCamera = () => {
    setModalVisible(false);
    setSelectImg('CAMERA');
  };

  const onPressImage = () => {
    setModalVisible(false);
    setSelectImg('GALLERY');
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
              onPress={onPressCamera}
              style={styles.itemFirst}>
              <Text style={styles.text}>카메라로 사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressImage}
              style={styles.itemLast}>
              <Text style={styles.text}>앨범에서 사진 선택</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
    height: 120,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemFirst: {
    paddingTop: 18,
    paddingBottom: 15,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLast: {
    paddingTop: 15,
    paddingBottom: 22,
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

export default CameraBottomSheet;

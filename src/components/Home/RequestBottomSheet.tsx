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
  Platform,
} from 'react-native';
import {RootStackNavigationProp} from '../../screens/types';
import {
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilState, useSetRecoilState} from 'recoil';
import colors from '../../assets/color';
import {
  androidCountState,
  permissionCameraState,
  permissionImageState,
} from '../../atoms/permission';
import Vector from '../../assets/images/Home/Vector.svg';
import Img from '../../assets/images/Home/Img.svg';

import Photo from '../../assets/images/Home/Photo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: any;
}

const RequestBottomSheet = ({
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

  const setPermissionImage = useSetRecoilState(permissionImageState);
  const [androidCount, setAndroidCount] = useRecoilState(androidCountState);
  const setPermissionCamera = useSetRecoilState(permissionCameraState);
  const requestMultiplePermissions = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setAndroidCount(androidCount + 1);
      setPermissionImage(
        Platform.OS === 'ios'
          ? response['ios.permission.PHOTO_LIBRARY']
          : response['android.permission.WRITE_EXTERNAL_STORAGE'],
      );
      setPermissionCamera(
        Platform.OS === 'ios'
          ? response['ios.permission.CAMERA']
          : response['android.permission.CAMERA'],
      );
      closeModal();
    });
  };
  const checkMultiplePermissions = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
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
            <Text style={styles.title}>?????? ?????? ??????</Text>
            <Text style={styles.alert}>
              Chalkak ????????? ?????? ????????? ?????? ?????? ????????? ???????????????. ??????
              ????????? ?????? ???????????? ???????????? ??? ????????? ???????????????.
            </Text>
            <View style={styles.item}>
              <Vector />
              <View style={styles.itemText}>
                <Text style={styles.name}>??????(??????)</Text>
                <Text style={styles.content}>
                  ???????????? ????????? ????????? ????????????, ?????? ????????? ????????? ????????????
                  ?????? ???????????? ?????? ????????? ???????????????.
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Photo />
              <View style={styles.itemText}>
                <Text style={styles.name}>?????????(??????)</Text>
                <Text style={styles.content}>
                  ???????????? ????????? ?????? ??? ?????? ???????????? ?????? ???????????? ????????????
                  ?????? ???????????? ??????????????? ?????????.
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Img />
              <View style={styles.itemText}>
                <Text style={styles.name}>??????(??????)</Text>
                <Text style={styles.content}>
                  ???????????? ????????? ?????? ??? ????????? ?????? ???????????? ?????? ????????????
                  ???????????? ?????? ????????? ??????????????? ?????????.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                requestMultiplePermissions();
                AsyncStorage.setItem('request', 'true');
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>????????????</Text>
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
    height: 418,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: colors.bold,
    color: colors.primary,
    marginBottom: 10,
    lineHeight: 24,
  },
  item: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  itemText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: colors.bold,
    lineHeight: 21,
  },
  content: {
    fontSize: 11,
    color: '#626161',
    fontWeight: '400',
    lineHeight: 16.5,
    letterSpacing: -0.408,
    marginRight: 24,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 13,
    color: colors.on_primary,
    fontWeight: '600',
  },
  alert: {
    color: '#626161',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16.5,
    letterSpacing: -0.408,
    marginBottom: 14,
  },
});

export default RequestBottomSheet;

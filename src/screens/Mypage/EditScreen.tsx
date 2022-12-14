import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  Animated,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import KakaoEmail from '../../assets/images/Mypage/KakaoEmail.svg';
import Camera from '../../assets/images/Mypage/Camera.svg';

import {useQuery, useQueryClient} from 'react-query';
import {getMyProfile} from '../../api/mypage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {axiosInstance} from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {patchProfileState} from '../../atoms/patchProfile';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import SetNicknameToast from '../../components/Login/SetNicknameToast';
import {
  androidCountState,
  permissionCameraState,
  permissionImageState,
} from '../../atoms/permission';
import PermissionModal from '../../components/Community/PermissionModal';
import {selectImgState} from '../../atoms/selectImg';
import CameraBottomSheet from '../../components/Community/CameraBottomSheet';

export interface Img {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
}

function EditScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const profileQuery = useQuery('myProfile', getMyProfile);
  const [token, setToken] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [hidden1, setHidden1] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [imageUrl, setImageUrl] = useState(profileQuery.data.result.image);
  const [nickname, setNickname] = useState(profileQuery.data.result.nickname);
  const [patch, setPatch] = useRecoilState(patchProfileState);
  const queryClient = useQueryClient();

  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setToken(result);
    }
  });

  //????????????
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const [permissionImage, setPermissionImage] =
    useRecoilState(permissionImageState);
  const [androidCount, setAndroidCount] = useRecoilState(androidCountState);

  const requestMultiplePermissions = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
            // PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            // PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setAndroidCount(androidCount + 1);

      setPermissionImage(
        Platform.OS === 'ios'
          ? response['ios.permission.PHOTO_LIBRARY_ADD_ONLY']
          : response['android.permission.WRITE_EXTERNAL_STORAGE'],
      );
    });
  };
  const checkMultiplePermissions = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [
            // PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            // PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
  };

  const [permissionCamera, setPermissionCamera] = useRecoilState(
    permissionCameraState,
  );
  const requestMultiplePermissionsCamera = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.CAMERA],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setAndroidCount(androidCount + 1);
      setPermissionCamera(
        Platform.OS === 'ios'
          ? response['ios.permission.CAMERA']
          : response['android.permission.CAMERA'],
      );
    });
  };
  const checkMultiplePermissionsCamera = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.CAMERA],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
  };

  const [selectImg, setSelectImg] = useRecoilState(selectImgState);
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    if (selectImg === 'GALLERY') {
      onSelectImage();
    } else if (selectImg === 'CAMERA') {
      onSelectCamera();
    }
  }, [selectImg]);

  const image: Img = {
    uri: '',
    type: '',
    name: '',
  };
  const onSelectImage = async () => {
    setSelectImg('');
    requestMultiplePermissions();
    if (permissionImage !== 'granted') {
      if (Platform.OS === 'android') {
        if (androidCount >= 2) {
          setVisible(true);
        } else {
          requestMultiplePermissions();
        }
      } else {
        setVisible(true);
      }
    } else {
      await launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        res => {
          if (res.didCancel) {
            return;
          } else if (res.assets) {
            image.name = res.assets[0].fileName;
            image.type = res.assets[0].type;
            image.uri =
              Platform.OS === 'android'
                ? res.assets[0].uri
                : res.assets[0].uri.replace('file://', '');
            setImageName(image.name);
            setImageType(image.type);
            setImageUrl(image.uri);
          }
        },
      );
    }
  };

  const onSelectCamera = async () => {
    setSelectImg('');
    requestMultiplePermissionsCamera();
    if (permissionCamera !== 'granted') {
      if (Platform.OS === 'android') {
        if (androidCount >= 2) {
          setVisible(true);
        } else {
          requestMultiplePermissionsCamera();
        }
      } else {
        setVisible(true);
      }
    } else {
      await launchCamera(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        res => {
          if (res.didCancel) {
            return;
          } else if (res.assets) {
            image.name = res.assets[0].fileName;
            image.type = res.assets[0].type;
            image.uri =
              Platform.OS === 'android'
                ? res.assets[0].uri
                : res.assets[0].uri.replace('file://', '');
            setImageName(image.name);
            setImageType(image.type);
            setImageUrl(image.uri);
          }
        },
      );
    }
  };

  const formdata = new FormData();
  useEffect(() => {
    formdata.append('nickname', nickname);
    formdata.append('image', {
      uri: imageUrl,
      type: imageType,
      name: imageName,
    });
  }, [nickname, imageUrl, patch]);

  const patchProfile = () => {
    axiosInstance
      .patch('home/my-page', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data, '???????????????');
        if (response.data.isSuccess) {
          setPatch(false);
          queryClient.invalidateQueries('myProfile');
          queryClient.invalidateQueries('postAll');
          queryClient.invalidateQueries('postDetail');
          queryClient.invalidateQueries('postCategory');
          navigation.navigate('Mypage');
        } else {
          setPatch(false);
        }
      })
      .catch(e => {
        console.log(e, '??????????????? ??????');
        setPatch(false);
      });
  };

  useEffect(() => {
    if (patch) {
      openToast();
    }
  }, [patch]);

  const special_pattern = /[`~!|=+-@#$%^&*|\\\'\";:\/?]/gi;
  const check_kor = /[???-???|???-???|???-???]/;
  const check_eng = /[a-zA-Z]/;

  //toast animation
  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation1, {
      toValue: hidden1 ? 0 : 1,
      useNativeDriver: true,
    }).start();
    try {
      setTimeout(() => {
        setHidden1(true);
      }, 2000);
    } catch (e) {}

    Animated.timing(animation2, {
      toValue: hidden2 ? 0 : 1,
      useNativeDriver: true,
    }).start();
    try {
      setTimeout(() => {
        setHidden2(true);
      }, 2000);
    } catch (e) {}
  }, [hidden1, hidden2]);

  const openToast = () => {
    if (nickname.length > 6) {
      setHidden1(false);
      setPatch(false);
      if (special_pattern.test(nickname)) {
        setHidden2(false);
        setPatch(false);
      }
    } else if (special_pattern.test(nickname)) {
      setHidden2(false);
      setPatch(false);
      if (nickname.length > 6) {
        setHidden1(false);
        setPatch(false);
      }
    }

    if (
      nickname.length <= 6 &&
      !special_pattern.test(nickname) &&
      (check_kor.test(nickname) || check_eng.test(nickname))
    ) {
      //?????????
      patchProfile();
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="????????? ??????" edit={false} complete={true} />
      <View style={styles.block}>
        <View style={styles.profileImage}>
          <Image style={styles.image} source={{uri: imageUrl}} />
          <Pressable
            style={styles.camera}
            hitSlop={8}
            onPress={() => setImgVisible(true)}>
            <Camera />
          </Pressable>
        </View>
        <TextInput
          style={styles.inputText}
          placeholder={profileQuery.data.result.nickname}
          placeholderTextColor={colors.text4}
          value={nickname}
          onChangeText={setNickname}
        />
        <View style={styles.email}>
          {profileQuery.data?.result?.email.includes('@apple') ? (
            <Image
              source={require('../../assets/images/Mypage/AppleEmail.png')}
            />
          ) : (
            <Image
              source={require('../../assets/images/Mypage/KakaoEmail.png')}
            />
          )}
          <Text style={styles.emailText}>{profileQuery.data.result.email}</Text>
        </View>
      </View>

      <View style={styles.toastView}>
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: animation1,
            },
          ]}>
          <SetNicknameToast text="???? ?????? ?????? 6???, ?????? ?????? 6??? ?????? ????????????. " />
        </Animated.View>
        <Animated.View
          style={[
            // styles.toast,
            {
              opacity: animation2,
            },
          ]}>
          <SetNicknameToast text="???? ?????? ???????????? ????????? ???????????? ?????????." />
        </Animated.View>
      </View>
      <PermissionModal visible={visible} onClose={onClose} />
      <CameraBottomSheet
        modalVisible={imgVisible}
        setModalVisible={setImgVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  block: {
    alignItems: 'center',
    paddingTop: 51,
    flex: 1,
  },
  profileImage: {
    position: 'relative',
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
  },
  camera: {
    backgroundColor: '#777777',
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 68,
    top: 68,
  },
  inputText: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 38,
    width: 234,
    height: 35,
    marginTop: 32,
    marginBottom: 8,
    paddingLeft: 19,
    lineHeight: 18,
    fontSize: 12,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    color: colors.text3,
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: -0.408,
    marginLeft: 4,
  },
  toastView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  toast: {
    marginBottom: 14,
  },
});

export default EditScreen;

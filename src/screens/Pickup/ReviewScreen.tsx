import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Image,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import GetImage from '../../assets/images/Community/GetImage.svg';
import {useRecoilState, useSetRecoilState} from 'recoil';
import colors from '../../assets/color';
import {writeToastState} from '../../atoms/writeToast';
import {writeToastTextState} from '../../atoms/writeToastText';
import WriteErrorToast from '../../components/Community/WriteErrorToast';
import Star from '../../components/Pickup/Star';
import {RootStackNavigationProp, RootStackParamList} from '../types';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {androidCountState, permissionImageState} from '../../atoms/permission';
import PermissionModal from '../../components/Community/PermissionModal';
import {launchImageLibrary} from 'react-native-image-picker';
import {nameState, typeState, uriState} from '../../atoms/writePost';
import Delete from '../../assets/images/Community/Delete.svg';
import StarRating from '../../components/Pickup/StarRating';
import {useMutation} from 'react-query';
import {writeReview} from '../../api/review';
import {reviewStarState} from '../../atoms/reviewStar';
import {axiosInstance} from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../../api/client';

type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;
export interface Img {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
}

function ReviewScreen() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useRoute<ReviewScreenRouteProp>();
  const {name, id} = params;

  const [content, setBody] = useState('');
  const [toastVisible, setToastVisible] = useRecoilState(writeToastState);
  const [toastText, setToastText] = useRecoilState(writeToastTextState);
  const [permissionImage, setPermissionImage] =
    useRecoilState(permissionImageState);
  const [androidCount, setAndroidCount] = useRecoilState(androidCountState);
  const [recoilName, setRecoilName] = useRecoilState(nameState);
  const [recoilType, setRecoilType] = useRecoilState(typeState);
  const [recoilUri, setRecoilUri] = useRecoilState(uriState);
  const [response, setResponse] = useState(null);
  const [starNum, setStarNum] = useRecoilState(reviewStarState);
  const [token, setToken] = useState('');

  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setToken(result);
    }
  });

  const formdata = new FormData();

  formdata.append('star', starNum);
  formdata.append('content', content);
  formdata.append('laboratoryId', id);
  if (response) {
    formdata.append('images', {
      uri: recoilUri,
      type: recoilType,
      name: recoilName,
    });
  }

  const writeNewReview = () => {
    handlePress(true);
    axiosInstance
      .post(`/laboratory/${id}/new`, formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.data.isSuccess) {
          setToastText('💡 후기가 등록됐어요!');
          setToastVisible(true);
          setRecoilName('');
          setRecoilType('');
          setRecoilUri('');
          setTimeout(() => {
            setToastVisible(false);
            navigation.navigate('Home');
          }, 1000);
        }
      })
      .catch(e => {
        console.log(e, '글 작성 에러');
      });
  };
  // test

  const [isPressable, handlePress] = useState(false);

  useEffect(() => {
    setStarNum(0);
    handlePress(false);
  }, []);

  const onPressSubmit = () => {
    if (!content) {
      setToastText('💡 후기 내용이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else if (starNum == 0) {
      setToastText('💡 별점이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else {
      writeNewReview();
    }
  };

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

  const image: Img = {
    uri: '',
    type: '',
    name: '',
  };

  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const deleteImage = () => {
    setResponse(null);
  };

  const onSelectImage = async () => {
    requestMultiplePermissions();
    if (permissionImage !== 'granted') {
      if (Platform.OS === 'android') {
        if (androidCount >= 2) {
          setVisible(true);
        } else {
          requestMultiplePermissions();
        }
      } else if (Platform.OS === 'ios') {
        setVisible(true);
      }
    } else if (response) {
      setToastText('💡 후기 사진은 최대 한 장까지만 업로드 가능해요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
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
            setResponse(res);
            setRecoilName(image.name);
            setRecoilType(image.type);
            setRecoilUri(image.uri);
          }
        },
      );
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={[styles.pickupTop, {width: width}]}>
        <Pressable onPress={() => navigation.pop()} hitSlop={8}>
          <Image source={require('../../assets/images/Pickup/back.png')} />
        </Pressable>
        <Text style={styles.title}>후기 작성</Text>
        <Pressable onPress={onPressSubmit} disabled={isPressable}>
          <Text style={styles.submitText}>완료</Text>
        </Pressable>
      </View>
      <View style={{width: width - 32, flex: 1}}>
        <Text style={styles.nameText}>{name}</Text>
        <View
          style={{
            width: width,
            height: 1,
            marginLeft: -16,
            backgroundColor: colors.devider1,
          }}
        />
        <Text style={styles.questionText}>현상/스캔에 만족하셨나요?</Text>
        <View>
          <StarRating />
        </View>
        <View
          style={{
            marginTop: 20,
            width: width,
            height: 1,
            marginLeft: -16,
            backgroundColor: colors.devider1,
          }}
        />
        <TextInput
          placeholder="리뷰 내용을 입력해주세요"
          placeholderTextColor={colors.text5}
          style={styles.bodyInput}
          onChangeText={setBody}
          value={content}
          multiline
          textAlignVertical="top"
          scrollEnabled={false}
        />
        {response ? (
          <View style={styles.photoContainer}>
            <Image
              source={{uri: response?.assets[0]?.uri}}
              style={styles.photo}
            />
            <Pressable style={styles.deleteButton} onPress={deleteImage}>
              <Delete />
            </Pressable>
          </View>
        ) : (
          <></>
        )}
        <Pressable style={styles.selectPhoto} onPress={onSelectImage}>
          <GetImage />
        </Pressable>
      </View>
      <WriteErrorToast />
      <PermissionModal visible={visible} onClose={onClose} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
    alignItems: 'center',
  },
  pickupTop: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.primary,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 27,
  },
  nameText: {
    marginTop: 13,
    marginBottom: 13,
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  questionText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    alignSelf: 'center',
  },
  bodyInput: {
    paddingTop: 16,
    flex: 1,
  },
  submitText: {
    color: '#3F97BD',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  selectPhoto: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 31,
  },
  photoContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 82,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 3,
  },
  deleteButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 55,
    bottom: 31,
  },
});

export default ReviewScreen;

import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import KakaoEmail from '../../assets/images/Mypage/KakaoEmail.svg';
import Camera from '../../assets/images/Mypage/Camera.svg';

import {useQuery, useQueryClient} from 'react-query';
import {getMyProfile} from '../../api/mypage';
import {launchImageLibrary} from 'react-native-image-picker';
import {axiosInstance} from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {patchProfileState} from '../../atoms/patchProfile';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';

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
  const [imageUrl, setImageUrl] = useState(profileQuery.data.result.image);
  const [nickname, setNickname] = useState(profileQuery.data.result.nickname);
  const [patch, setPatch] = useRecoilState(patchProfileState);
  const queryClient = useQueryClient();

  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setToken(result);
    }
  });
  const image: Img = {
    uri: '',
    type: '',
    name: '',
  };
  const onSelectImage = async () => {
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
    console.log(nickname, imageName, '패치');
    axiosInstance
      .patch('home/my-page', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data, '프로필수정');
        if (response.data.isSuccess) {
          setPatch(false);
          queryClient.invalidateQueries('myProfile');
          queryClient.invalidateQueries('postAll');
          queryClient.invalidateQueries('postDetail');
          navigation.navigate('Mypage');
        } else {
          setPatch(false);
        }
      })
      .catch(e => {
        console.log(e, '프로필수정 에러');
        setPatch(false);
      });
  };

  useEffect(() => {
    if (patch) patchProfile();
  }, [patch]);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="프로필 편집" edit={false} complete={true} />
      <View style={styles.block}>
        <View style={styles.profileImage}>
          <Image style={styles.image} source={{uri: imageUrl}} />
          <Pressable style={styles.camera} hitSlop={8} onPress={onSelectImage}>
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
          <KakaoEmail />
          <Text style={styles.emailText}>kikikikikikiki@naver.com</Text>
        </View>
      </View>
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
});

export default EditScreen;

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../../assets/color';
import Logo from '../../assets/images/Login/Logo.svg';
import LogoText from '../../assets/images/Login/LogoText.svg';
import Kakao from '../../assets/images/Login/Kakao.svg';
import {useNavigation} from '@react-navigation/core';
import {MainTabNavigationProp, MainTabParamList} from '../types';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {useRecoilValue} from 'recoil';
import {usernameState} from '../../atoms/username';
import {emailState} from '../../atoms/email';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../queries';

function LoginScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [userId, setUserId] = useState<number>(0);
  const [jwt, setJwt] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await loginWithKakaoAccount();
      setJwt(token.accessToken);
      AsyncStorage.setItem('accessToken', token.accessToken);
      getProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      setUserId(profile.id);
      AsyncStorage.setItem('username', profile.nickname);
      AsyncStorage.setItem('email', profile.email);
    } catch (err) {
      console.error('getProfile error', err);
    }
  };

  const completeLogin = () => {
    axiosInstance
      .get(`/auth?id=${userId}&jwt=${jwt}`)
      .then(response => {
        console.log(response.data);
        if (response.data.isSuccess) {
          navigation.navigate('SetNickname');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (userId > 0) {
      completeLogin();
    }
  }, [userId]);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.logo}>
        <View style={styles.logoText}>
          <Text style={styles.text}>필름카메라의 모든것,</Text>
          <LogoText />
        </View>
        <Logo />
      </View>
      <View style={styles.bottom}>
        <Pressable
          onPress={() => {
            signInWithKakao();
          }}>
          <Kakao />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('MainTab');
          }}>
          <Text style={styles.noLogin}>로그인 없이 둘러보기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.primary,
    // justifyContent: "center",
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 255,
  },
  logoText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
    marginBottom: 43.16,
  },
  text: {
    fontFamily: 'NotoSansKR-Bold',
    color: colors.on_primary,
    fontSize: 18,
    marginRight: 10,
    lineHeight: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 44,
    alignItems: 'center',
  },
  noLogin: {
    color: colors.on_primary,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 22,
    textDecorationLine: 'underline',
    fontFamily: 'NotoSansKR-Thin',
  },
});

export default LoginScreen;

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import colors from '../../assets/color';
import Logo from '../../assets/images/Login/Logo.svg';
import LogoText from '../../assets/images/Login/LogoText.svg';
import Kakao from '../../assets/images/Login/Kakao.svg';
import {useNavigation} from '@react-navigation/core';
import {
  MainTabNavigationProp,
  MainTabParamList,
  RootStackNavigationProp,
} from '../types';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import client, {applyToken} from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {useQuery} from 'react-query';
import {getAppleLogin} from '../../api/appleAuth';

/**
 * You'd technically persist this somewhere for later use.
 */
let user: any = null;

interface tokenType {
  aud: string;
  auth_time: number;
  c_hash: string;
  email: string;
  email_verified: string;
  exp: number;
  iat: number;
  is_private_email: string;
  iss: string;
  nonce: string;
  nonce_supported: boolean;
  sub: string;
}

function LoginScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const navigation2 = useNavigation<RootStackNavigationProp>();

  const signInWithKakao = async (): Promise<void> => {
    navigation2.navigate('WebView');
  };

  const {data: url} = useQuery('appleLogin', getAppleLogin);
  console.log(url);

  const signInWithApple = async (): Promise<void> => {
    navigation2.navigate('AppleWebView', {
      url,
    });
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <View style={styles.logo}>
        <View style={styles.logoText}>
          <Text style={styles.text}>필름카메라의 모든것,</Text>
          <LogoText style={{marginTop: 2}} />
        </View>
        <Logo />
      </View>
      <View style={styles.bottom}>
        <Pressable
          onPress={() => {
            signInWithKakao();
          }}>
          <Image source={{uri: 'https://ibb.co/BKWxwmc'}} />
          <Kakao />
        </Pressable>

        {Platform.OS === 'ios' ? (
          // <AppleButton
          //   style={styles.appleButton}
          //   cornerRadius={5}
          //   buttonStyle={AppleButton.Style.WHITE}
          //   buttonType={AppleButton.Type.CONTINUE}
          //   onPress={() => signInWithApple()}
          // />
          <Pressable onPress={() => signInWithApple()}>
            <Image
              source={require('../../assets/images/Login/appleid_button.png')}
              style={styles.appleButton}
            />
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => {
            navigation2.navigate('Agree');
          }}>
          <Text style={styles.noLogin}>로그인 없이 둘러보기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

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
    top: '30%',
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
  appleButton: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

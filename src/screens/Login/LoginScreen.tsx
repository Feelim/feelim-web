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

/**
 * You'd technically persist this somewhere for later use.
 */
let user: any = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(
  updateCredentialStateForUser: any,
) {
  if (user === null) {
    updateCredentialStateForUser('N/A');
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser('AUTHORIZED');
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}

// /**
//  * Starts the Sign In flow.
//  */
async function onAppleButtonPress(updateCredentialStateForUser: any) {
  console.warn('Beginning Apple Authentication');

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    const {
      user: newUser,
      email,
      nonce,
      identityToken,
      realUserStatus /* etc */,
    } = appleAuthRequestResponse;

    user = newUser;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );

    if (identityToken) {
      // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      console.log(nonce, identityToken);
    } else {
      // no token - failed sign-in?
    }

    if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      console.log("I'm a real person!");
    }

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
}

function LoginScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const navigation2 = useNavigation<RootStackNavigationProp>();

  const signInWithKakao = async (): Promise<void> => {
    navigation2.navigate('WebView');
  };

  const [credentialStateForUser, updateCredentialStateForUser] =
    useState<any>(-1);
  if (Platform.OS === 'ios') {
    useEffect(() => {
      if (!appleAuth.isSupported) return;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    }, []);

    useEffect(() => {
      if (!appleAuth.isSupported) return;

      return appleAuth.onCredentialRevoked(async () => {
        console.warn('Credential Revoked');
        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
          error => updateCredentialStateForUser(`Error: ${error.code}`),
        );
      });
    }, []);

    if (!appleAuth.isSupported) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text>Apple Authentication is not supported on this device.</Text>
        </View>
      );
    }
  }

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
          <Kakao />
        </Pressable>

        {Platform.OS === 'ios' ? (
          <AppleButton
            style={styles.appleButton}
            cornerRadius={5}
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.CONTINUE}
            onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
          />
        ) : null}

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
    width: 300,
    height: 45,
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

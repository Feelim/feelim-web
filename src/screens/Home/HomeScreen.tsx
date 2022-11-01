import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../../assets/color';
import Chalkak from '../../assets/images/Login/Chalkak.svg';
import Star from '../../assets/images/Login/Star.svg';
import Bell from '../../assets/images/Home/Bell.svg';
import MyPage from '../../assets/images/Home/Mypage.svg';
import TopBanner from '../../components/Home/TopBanner';
import TopButtons from '../../components/Home/TopButtons';
import VideoSection from '../../components/Home/VideoSection';
import RecommendSection from '../../components/Home/RecommendSection';
import {usernameState} from '../../atoms/username';
import {nickNameState} from '../../atoms/nickname';
import {emailState} from '../../atoms/email';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import IsLoginModal from '../../components/Login/IsLoginModal';

function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [authUsername, setAuthUsername] = useRecoilState(usernameState);
  const [authNickname, setAuthNickname] = useRecoilState(nickNameState);
  const [authEmail, setAuthEmail] = useRecoilState(emailState);
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setIsLogin(true);
    }
  });

  useEffect(() => {
    //자동로그인시 리코일에 회원정보 저장
    const load = async () => {
      try {
        await AsyncStorage.getItem('username', (err, result: any) => {
          setAuthUsername(result);
        });
        await AsyncStorage.getItem('nickname', (err, result: any) => {
          setAuthNickname(result);
        });
        await AsyncStorage.getItem('email', (err, result: any) => {
          setAuthEmail(result);
        });
      } catch (e) {
        console.log(e);
      }
    };
    load();
  });

  const onPressMypage = () => {
    if (isLogin) {
      navigation.navigate('Mypage');
    } else {
      setVisible(true);
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <ScrollView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.homeTop}>
          <View style={styles.logo}>
            <Chalkak />
            <Star />
          </View>
          <View style={styles.homeTopRight}>
            <Pressable style={styles.rightIcon}>
              <Bell />
            </Pressable>
            <Pressable
              style={styles.rightIcon}
              hitSlop={8}
              onPress={onPressMypage}>
              <MyPage />
            </Pressable>
          </View>
        </View>
        <TopBanner />
        <TopButtons />
        <View style={styles.underline} />
        <VideoSection />
        <View style={styles.underline} />
        <RecommendSection />
      </SafeAreaView>
      <IsLoginModal visible={visible} onClose={onClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
  },
  homeTop: {
    height: 41,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16,
  },
  homeTopRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightIcon: {
    marginRight: 15,
  },
  underline: {
    backgroundColor: colors.devider1,
    height: 4,
    width: '100%',
  },
});

export default HomeScreen;

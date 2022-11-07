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
import Chalkak from '../../assets/images/Home/Chalkak.svg';
import Bell from '../../assets/images/Home/Bell.svg';
import MyPage from '../../assets/images/Home/Mypage.svg';
import TopBanner from '../../components/Home/TopBanner';
import TopButtons from '../../components/Home/TopButtons';
import VideoSection from '../../components/Home/VideoSection';
import RecommendSection from '../../components/Home/RecommendSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import IsLoginModal from '../../components/Login/IsLoginModal';
import RequestBottomSheet from '../../components/Home/RequestBottomSheet';

function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [isRequest, setIsRequest] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setIsLogin(true);
    }
  });
  //RequestBottomSheet 맨 처음에만
  AsyncStorage.getItem('request', (err, result) => {
    if (result) {
      setIsRequest('true');
    } else {
      setIsRequest('false');
    }
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

  useEffect(() => {
    if (isRequest === 'false') {
      setModalVisible(true);
    } else if (isRequest === 'true') {
      setModalVisible(false);
    }
  }, [isRequest]);

  return (
    <ScrollView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.homeTop}>
          <View style={styles.logo}>
            <Chalkak />
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
        <RecommendSection />
        <View style={styles.underline} />
        <VideoSection />
      </SafeAreaView>
      <IsLoginModal visible={visible} onClose={onClose} />
      <RequestBottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
    backgroundColor: colors.primary,
    paddingTop: 9,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 5,
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

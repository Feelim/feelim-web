import React from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import {applyToken} from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewScreen = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  let url =
    'http://chalkak-env-1.eba-rbm59tk3.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization/kakao';

  const urlChange = (url: string) => {
    if (url.includes('jwt')) {
      const start = url.indexOf('jwt=');
      const end = url.indexOf('&id');
      const token = url.slice(start + 4, end);
      const id = url.slice(end + 4);
      navigation.navigate('SetNickname');
      applyToken(token);
      AsyncStorage.setItem('accessToken', token);
      AsyncStorage.setItem('userId', id);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        onNavigationStateChange={e => urlChange(e.url)}
      />
    </View>
  );
};

export default WebViewScreen;

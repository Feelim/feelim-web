import React from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import {applyToken} from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewScreen = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  let url = 'https://chalkak.shop/oauth2/authorization/kakao';

  const urlChange = (url: string) => {
    if (url.includes('accessToken')) {
      const startToken = url.indexOf('accessToken=');
      const endToken = url.indexOf('&refreshToken');
      const token = url.slice(startToken + 12, endToken);
      const startId = url.indexOf('userId=');
      const endId = url.indexOf('&grantType');
      const id = url.slice(startId + 7, endId);
      const startRefresh = url.indexOf('refreshToken=');
      const endRefresh = url.indexOf('&accessTokenExpiresIn');
      const refreshToken = url.slice(startRefresh + 13, endRefresh);

      navigation.navigate('Agree');
      applyToken(token);
      AsyncStorage.setItem('accessToken', token);
      AsyncStorage.setItem('refreshToken', refreshToken);
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

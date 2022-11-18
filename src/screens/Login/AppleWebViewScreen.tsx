import React, {useRef, useState} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {Linking, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {RootStackNavigationProp, RootStackParamList} from '../types';
import client, {applyToken} from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getAppleLogin, getAppleLoginInfo} from '../../api/appleAuth';
import axios from 'axios';

type AppleWebViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'AppleWebView'
>;

const AppleWebViewScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {params} = useRoute<AppleWebViewScreenRouteProp>();
  const {url} = params;

  const [html, setHTML] = useState({});

  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    const requestCode = target.substring(condition + exp.length);
    console.log(requestCode);
  };

  const urlChange = (url: string) => {
    console.log(url);

    // console.log('body', html);
    // getData(url);
  };

  const runFirst = `
      const hello = document.body.innerHTML;
      document.body.style.color = 'white';
      setTimeout(function() { window.ReactNativeWebView.postMessage(hello); }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  async function getData(e: WebViewMessageEvent) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('완료!'), 5000);
    });

    await promise;

    const data = e.nativeEvent.data;
    console.log(data);
    const startToken = data.indexOf('"accessToken":"');
    const endToken = data.indexOf('","refreshToken');
    const token = data.slice(startToken + 15, endToken);
    const startRefresh = data.indexOf('"refreshToken":"');
    const endRefresh = data.indexOf('","accessTokenExpiresIn');
    const refreshToken = data.slice(startRefresh + 16, endRefresh);
    const startId = data.indexOf('"userId":');
    const endId = data.indexOf(',"accessToken');
    const id = data.slice(startId + 9, endId);
    applyToken(token);
    console.log(id, '아이디 제대로 찍히나용');
    AsyncStorage.setItem('accessToken', token);
    AsyncStorage.setItem('refreshToken', refreshToken);
    AsyncStorage.setItem('userId', id);
    navigation.navigate('Agree');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        onNavigationStateChange={e => urlChange(e.url)}
        onLoad={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log('onload', nativeEvent);
        }}
        onMessage={e => {
          const data = e.nativeEvent.data;
          console.log(data);
          const startToken = data.indexOf('"accessToken":"');
          const endToken = data.indexOf('","refreshToken"');
          const token = data.slice(startToken + 15, endToken);
          const startRefresh = data.indexOf('"refreshToken":"');
          const endRefresh = data.indexOf('","accessTokenExpiresIn');
          const refreshToken = data.slice(startRefresh + 16, endRefresh);
          const startId = data.indexOf('"userId":');
          const endId = data.indexOf(',"accessToken');
          const id = data.slice(startId + 9, endId);
          applyToken(token);
          console.log(id, '아이디 제대로 찍히나용');
          console.log('token', token, 'refresh', refreshToken);
          AsyncStorage.setItem('accessToken', token);
          AsyncStorage.setItem('refreshToken', refreshToken);
          AsyncStorage.setItem('userId', id);
          navigation.navigate('Agree');
        }}
        injectedJavaScript={runFirst}
      />
    </SafeAreaView>
  );
};

export default AppleWebViewScreen;

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screens/RootStack';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.warn('스플래시 에러발생');
      console.warn(e);
    }
  });

  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

export default App;

import React, {useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native';
import RootStack from "./src/screens/RootStack";
import { SafeAreaView } from "react-native";
import {RecoilRoot} from 'recoil';
import SplashScreen from "react-native-splash-screen";

function App() {

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); 
      }, 2000); /** 스플래시 시간 조절 (2초) **/
    } catch(e) {
      console.warn('스플래시 에러발생');
      console.warn(e);
    }
  });

  return(
    <RecoilRoot>
      <NavigationContainer>
          <RootStack/>
      </NavigationContainer>
    </RecoilRoot>
    
  )
}

export default App;
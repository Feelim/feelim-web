import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import RootStack from "./src/screens/RootStack";
import { SafeAreaView } from "react-native";
import {RecoilRoot} from 'recoil';

function App() {
  return(
    <RecoilRoot>
      <NavigationContainer>
          <RootStack/>
      </NavigationContainer>
    </RecoilRoot>
    
  )
}

export default App;
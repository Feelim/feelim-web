import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screens/RootStack';
import {SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import SplashScreen from 'react-native-splash-screen';

import {QueryClientProvider, QueryClient} from 'react-query';


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


  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
  );
}

export default App;

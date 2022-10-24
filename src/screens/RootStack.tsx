import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Login/LoginScreen';
import {RootStackParamList} from './types';
import MainTab from './MainTab';
import HomeScreen from './Home/HomeScreen';
import SetNicknameScreen from './Login/SetNicknameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PickupScreen from './Pickup/PickupScreen';
import PickupInfoScreen from './Pickup/PickupInfoScreen';
import PickupRegister from './Pickup/PickupRegisterScreen';
import PickupRegisterScreen from './Pickup/PickupRegisterScreen';
import PickupDetailScreen from './Pickup/PickupDetailScreen';
import WriteScreen from './Community/WriteScreen';
import PostScreen from './Community/PostScreen';
import {TouchableOpacity} from 'react-native';
import CommunitySearchScreen from './Community/CommunitySearchScreen';
import {applyToken} from '../api/client';
import ModifyScreen from './Community/ModifyScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //로그인시 바로 HomeScreen으로 가도록 구현
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem('accessToken', (err, result) => {
      if (result) {
        applyToken(result);
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pickup"
            component={PickupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupInfo"
            component={PickupInfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupRegister"
            component={PickupRegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupDetail"
            component={PickupDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Write"
            component={WriteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Post"
            component={PostScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CommunitySearch"
            component={CommunitySearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Modify"
            component={ModifyScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SetNickname"
            component={SetNicknameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pickup"
            component={PickupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupInfo"
            component={PickupInfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupRegister"
            component={PickupRegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupDetail"
            component={PickupDetailScreen}
            name="Post"
            component={PostScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CommunitySearch"
            component={CommunitySearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Write"
            component={WriteScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;

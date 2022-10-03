import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login/LoginScreen';
import { RootStackParamList } from './types';
import MainTab from './MainTab';
import HomeScreen from './Home/HomeScreen';
import SetNicknameScreen from './Login/SetNicknameScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack () {
    //로그인시 바로 HomeScreen으로 가도록 구현
    AsyncStorage.getItem('accessToken', (err, result) => { 
        console.log(result);
    });
    

    return(
        <Stack.Navigator
            initialRouteName='Login'
        >
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='SetNickname'
                component={SetNicknameScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='MainTab'
                component={MainTab}
                options={{headerShown: false}}
            />
            {/* <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{headerShown: false}}
            /> */}
        </Stack.Navigator>
    )
}

export default RootStack;
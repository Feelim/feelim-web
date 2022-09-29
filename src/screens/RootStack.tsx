import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login/LoginScreen';
import { RootStackParamList } from './types';
import MainTab from './MainTab';
import HomeScreen from './Home/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack () {
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
                name='MainTab'
                component={MainTab}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default RootStack;
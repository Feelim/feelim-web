import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home/HomeScreen';
import CommunityScreen from './Community/CommunityScreen';
import {MainTabParamList} from './types';
import Home from '../assets/images/TabBarIcons/Home.svg';
import Community from '../assets/images/TabBarIcons/Community.svg';
import HomeNotActive from '../assets/images/TabBarIcons/HomeNotActive.svg';
import CommunityNotActive from '../assets/images/TabBarIcons/CommunityNotActive.svg';

import colors from '../assets/color';
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({focused}) => (focused ? <Home /> : <HomeNotActive />),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#bfbfbf',
          headerTintColor: colors.primary,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: '커뮤니티',
          tabBarIcon: ({focused}) =>
            focused ? <Community /> : <CommunityNotActive />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#bfbfbf',
          headerTintColor: colors.primary,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// MainTab
export type MainTabParamList = {
  Home: undefined;
  Community: undefined;
 
  //
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

// RootStack
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Login: undefined;
  Home: undefined;
  SetNickname: undefined;
  Pickup: undefined;
  PickupInfo: undefined;
  PickupRegister: undefined;
  Write: undefined;
  Post: {
    id: number;
  };
  CommunitySearch: undefined;
  Modify: {
    postId: number;

  };
  WebView: undefined;
  
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;



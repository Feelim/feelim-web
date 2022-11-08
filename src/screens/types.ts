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
  Map: undefined;
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
  PickupRegister: {
    id: number;
  };
  Search: undefined;
  Write: undefined;
  Map: undefined;
  Post: {
    id: number;
  };
  CommunitySearch: undefined;
  PickupDetail: {
    id: number;
  };

  Modify: {
    postId: number;
  };
  WebView: undefined;
  Mypage: undefined;
  Notice: undefined;
  Event: undefined;
  Setting: undefined;
  Service: undefined;
  Edit: undefined;
  MyPost: undefined;
  MyComment: undefined;
  HomeEvent: {
    idx: number;
  };
  Question: undefined;
  QuestionContent: {
    id: number;
  };
  Terms: undefined;
  Agree: undefined;
  Youtube: {
    id: number;
  };
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

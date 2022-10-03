import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/HomeScreen";
import { MainTabParamList } from "./types";
import Home from '../assets/images/TabBarIcons/Home.svg'
import colors from "../assets/color";

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
    return(
        <Tab.Navigator
        initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "홈",
                    tabBarIcon: ({focused}) =>
                      focused ? (
                        <Home/>
                      ) : (
                        <Home fill="#dddddd"/>
                      ),
                      tabBarActiveTintColor: colors.primary,
                      tabBarInactiveTintColor: "#bfbfbf",
                      headerTintColor: colors.primary,
                      headerShown:false,
                }}
            />
            
        </Tab.Navigator>
    )
}

export default MainTab;
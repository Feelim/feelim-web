import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/HomeScreen";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
    return(
        <Tab.Navigator
        initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "home"
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab;
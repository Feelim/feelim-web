import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import colors from "../../assets/color";
import Logo from "../../assets/images/Login/Logo.svg";
import LogoText from "../../assets/images/Login/LogoText.svg";
import Kakao from "../../assets/images/Login/Kakao.svg";
import {useNavigation} from '@react-navigation/core';
import {MainTabNavigationProp, MainTabParamList} from '../types'

function LoginScreen() {
    const navigation = useNavigation<MainTabNavigationProp>();

    return (
        <View style={styles.fullScreen}>
            <View style={styles.logo}>
                <View style={styles.logoText}>
                    <Text style={styles.text}>필름카메라의 모든것,</Text>
                    <LogoText />
                </View >
                <Logo />
            </View>
            <View style={styles.bottom}>
                <Pressable>
                    <Kakao/>
                </Pressable>
                <Pressable onPress={()=>{
                    navigation.navigate('Home');
                }}>
                    <Text style={styles.noLogin}>로그인 없이 둘러보기</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: colors.primary,
        // justifyContent: "center",
        alignItems: 'center',
       
    },
    logo: {
        justifyContent: "center",
        alignItems: 'center',
        position: "absolute",
        top: 255,
    },
    logoText: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        height: 27,
        marginBottom: 43.16,
    },
    text: {
        fontFamily: 'NotoSansKR-Bold',
        color: colors.on_primary,
        fontSize: 18,
        fontWeight: '700',
        marginRight: 10,
    },
    bottom: {
        position: "absolute",
        bottom: 44,
        alignItems: 'center',

    },
    noLogin: {
        color: colors.on_primary,
        fontSize: 12,
        fontWeight: '400',
        marginTop: 22,
        textDecorationLine: 'underline',
        fontFamily: 'NotoSansKR-Thin',
    },
});

export default LoginScreen;
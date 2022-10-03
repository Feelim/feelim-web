import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Pressable, Image, SafeAreaView } from "react-native";
import colors from "../../assets/color";
import Logo from "../../assets/images/Login/Logo.svg";
import LogoText from "../../assets/images/Login/LogoText.svg";
import Kakao from "../../assets/images/Login/Kakao.svg";
import {useNavigation} from '@react-navigation/core';
import {MainTabNavigationProp, MainTabParamList,} from '../types'
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    loginWithKakaoAccount,
    
  } from '@react-native-seoul/kakao-login';
import {useRecoilState} from 'recoil';
import {usernameState} from '../../atoms/username';
import AsyncStorage from '@react-native-async-storage/async-storage'

function LoginScreen() {
    const navigation = useNavigation<MainTabNavigationProp>();
    const [result, setResult] = useState<string>('');
    const [authUserName, setAuthUserName] = useRecoilState(usernameState);

    const signInWithKakao = async (): Promise<void> => {
        try {
            const token = await loginWithKakaoAccount();
            setResult(JSON.stringify(token));

            AsyncStorage.setItem('accessToken', token.accessToken);
            getProfile();
        } catch (err) {
            console.error(err);
        }     

    };
        

    const getProfile = async (): Promise<void> => {
        
        try {
            const profile = await getKakaoProfile();

            //카카오로그인 회원이름
            setAuthUserName(profile.nickname);
            } catch (err) {
                console.error('signOut error', err);
            }      
    };
        

        useEffect(()=>{
            if(result){
                navigation.navigate('SetNickname');
            }
        },[result]);

    return (
        <SafeAreaView style={styles.fullScreen}>
            {/* <KakaoLogin result={result} /> */}
            <View style={styles.logo}>
                <View style={styles.logoText}>
                    <Text style={styles.text}>필름카메라의 모든것,</Text>
                    <LogoText />
                </View >
                <Logo />
            </View>
            <View style={styles.bottom}>
                <Pressable onPress={() => {signInWithKakao()}}>
                    <Kakao/>
                </Pressable>

                <Pressable onPress={()=>{
                    navigation.navigate('MainTab');
                }}>
                    <Text style={styles.noLogin}>로그인 없이 둘러보기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
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
        marginRight: 10,
        lineHeight: 20,
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
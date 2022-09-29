import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import colors from "../../assets/color";
import LogoText from "../../assets/images/Login/LogoText.svg";


function SetNickname(){
    return(
        <View style={styles.fullScreen}>
            <View style={styles.top}>
                <Text style={styles.topText}>안녕하세요, 회원님!</Text>
                <View>
                    <LogoText/>
                <Text style={styles.topText}>에 오신것을 환영해요.</Text>
                </View>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    fullScreen:{
        flex: 1,
    },
    top:{

    },
    topText:{
        color: colors.primary,
        fontSize: 18,
        fontWeight: '700',

    },

});

export default SetNickname;
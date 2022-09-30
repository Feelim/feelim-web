import React, { useState, useCallback, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Image, TextInput, Button } from "react-native";
import colors from "../../assets/color";

export interface ToastText {
    text: string;
}

function SetNicknameToast({text}: ToastText) {
    return(
        <View style={styles.block}>
            <Text style={styles.text}>{text}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    block:{
        height: 32,
        backgroundColor: 'rgba(0, 0, 0, 0.47)',
        borderRadius: 52,
        paddingVertical: 7,
        width: 289,
        alignItems: 'center',
    },
    text:{
        color: colors.on_primary,
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: -0.41,

    }
})

export default SetNicknameToast;
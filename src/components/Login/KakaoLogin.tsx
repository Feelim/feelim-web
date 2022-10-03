import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

type Props = {
    result: string;
  };

function KakaoLogin({ result }: Props): React.ReactElement{
    return(
        <View style={styles.block}>
            <Text style={styles.text}>{result}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 18,
        color: 'white',
        backgroundColor: 'pink',
    },
     block:{
        backgroundColor: 'yellow',
        width: 300,
        height: 300,
     }

})

export default KakaoLogin;
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Button,
  Animated,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../assets/color';
import Chalkak from '../../assets/images/Login/Chalkak.svg';
import Star from '../../assets/images/Login/Star.svg';
import Send from '../../assets/images/Login/Send.svg';
import SendActive from '../../assets/images/Login/SendActive.svg';
import SetNicknameToast from '../../components/Login/SetNicknameToast';
import {useRecoilState} from 'recoil';
import {nickNameState} from '../../atoms/nickname';
import {useNavigation} from '@react-navigation/core';
import {MainTabNavigationProp, RootStackNavigationProp} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../queries';

function SetNicknameScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [inputFocus, setInputFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const [hidden1, setHidden1] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [authNickName, setAuthNickName] = useRecoilState(nickNameState);
  const [token, setToken] = useState('');

  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setToken(result);
    }
  });

  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const check_eng = /[a-zA-Z]/;

  //toast animation
  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation1, {
      toValue: hidden1 ? 0 : 1,
      useNativeDriver: true,
    }).start();
    try {
      setTimeout(() => {
        setHidden1(true);
      }, 2000);
    } catch (e) {}

    Animated.timing(animation2, {
      toValue: hidden2 ? 0 : 1,
      useNativeDriver: true,
    }).start();
    try {
      setTimeout(() => {
        setHidden2(true);
      }, 2000);
    } catch (e) {}
  }, [hidden1, hidden2]);

  const onPress = () => {
    if (inputText.length > 6) {
      setHidden1(false);
      if (special_pattern.test(inputText)) {
        setHidden2(false);
      }
    } else if (special_pattern.test(inputText)) {
      setHidden2(false);
      if (inputText.length > 6) {
        setHidden1(false);
      }
    }

    if (
      inputText.length <= 6 &&
      !special_pattern.test(inputText) &&
      (check_kor.test(inputText) || check_eng.test(inputText))
    ) {
      setAuthNickName(inputText); //닉네임 설정
      AsyncStorage.setItem('nickname', inputText);
      setNickname();
    }
  };

  const formdata = new FormData();
  useEffect(() => {
    formdata.append('nickname', inputText);
    formdata.append('image', {
      uri: 'https://i.postimg.cc/K8B6F2CK/1.jpg',
      type: 'image/jpg',
      name: '1.jpg',
    });
  }, [inputText]);

  const setNickname = () => {
    axiosInstance
      .patch('home/my-page', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e, '닉네임설정 에러');
      });
  };

  useEffect(() => {
    if (authNickName) {
      // navigation.navigate('MainTab');
      navigation.navigate('Request');
      // navigation.navigate('Agree');
    }
  }, [authNickName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={{backgroundColor: '#ffffff', flex: 1}}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />
      <View style={styles.fullScreen}>
        <View style={styles.top}>
          <Text style={styles.topText}>안녕하세요, 회원님!</Text>
          <View style={styles.topSecondText}>
            <Chalkak />
            <Star />
            <Text style={styles.topText}> 에 오신것을 환영해요.</Text>
          </View>
        </View>
        <View style={styles.setNickname}>
          <Text style={styles.setNicknameText}>닉네임을 설정해주세요</Text>
          {!inputFocus ? (
            <View>
              <TextInput
                style={styles.setNicknameInput}
                placeholder="당신의 닉네임이 무엇인가요?"
                placeholderTextColor={colors.text4}
                onFocus={() => setInputFocus(true)}
              />
              <Pressable style={styles.setNicknameButton}>
                <Send />
              </Pressable>
            </View>
          ) : (
            //인풋창 포커스시 색상 변경
            <View>
              <TextInput
                style={[styles.setNicknameInput, styles.focus]}
                value={inputText}
                onChangeText={setInputText}
              />
              <Pressable style={styles.setNicknameButton} onPress={onPress}>
                <SendActive />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      {/* Validation Toast */}
      <View style={styles.toastView}>
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: animation1,
            },
          ]}>
          <SetNicknameToast text="💡 한글 최대 6자, 영문 최대 6자 까지 가능해요. " />
        </Animated.View>
        <Animated.View
          style={[
            // styles.toast,
            {
              opacity: animation2,
            },
          ]}>
          <SetNicknameToast text="💡 입력 불가능한 문자가 포함되어 있어요." />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  top: {
    marginTop: 73,
    paddingHorizontal: 26,
  },
  topSecondText: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 14,
  },
  topText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NotoSansKR-Bold',
    letterSpacing: -0.408,
    height: 27,
  },
  setNickname: {
    marginTop: 43,
  },
  setNicknameText: {
    fontSize: 24,
    fontWeight: '700',
    height: 36,
    marginBottom: 28,
    color: colors.primary,
    paddingHorizontal: 26,
  },
  setNicknameInput: {
    borderColor: colors.text4,
    borderRadius: 52,
    borderWidth: 2,
    marginHorizontal: 16,
    fontSize: 12,
    paddingHorizontal: 23,
    height: 46,
  },
  setNicknameButton: {
    position: 'absolute',
    right: 28,
    top: 8,
  },
  focus: {
    borderColor: colors.primary,
  },
  toastView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 14,
  },
  toast: {
    marginBottom: 14,
  },
});

export default SetNicknameScreen;

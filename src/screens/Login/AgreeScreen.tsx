import {
  Animated,
  Button,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import Chalkak from '../../assets/images/Login/Chalkak.svg';
import Star from '../../assets/images/Login/Star.svg';
import More from '../../assets/images/Mypage/More.svg';

import Unchecked from '../../assets/images/Login/Unchecked.svg';
import Checked from '../../assets/images/Login/Checked.svg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';
import SetNicknameToast from '../../components/Login/SetNicknameToast';

function AgreeScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {width} = useWindowDimensions();
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [hidden1, setHidden1] = useState(true);

  const animation1 = useRef(new Animated.Value(0)).current;
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
  }, [hidden1]);

  const onPressCheckAll = () => {
    setCheckAll(!checkAll);
    if (checkAll) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
    } else {
      setCheck1(true);
      setCheck2(true);
      setCheck3(true);
      setCheck4(true);
      setCheck5(true);
    }
  };

  const onPressNext = () => {
    if (check1 && check2 && check3) {
      navigation.navigate('SetNickname');
    } else {
      setHidden1(false);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />
      <View style={styles.top}>
        <Text style={styles.topText}>안녕하세요, 회원님!</Text>
        <View style={styles.topSecondText}>
          <Chalkak />
          <Star />
          <Text style={styles.topText}> 에 오신것을 환영해요.</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>서비스 이용 동의</Text>
        <View style={styles.item}>
          <Pressable onPress={onPressCheckAll} hitSlop={8}>
            {checkAll ? <Checked /> : <Unchecked />}
          </Pressable>

          <Text style={styles.allText}>약관 전체 동의</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: colors.devider1,
            marginVertical: 4,
          }}
        />
        <View style={styles.item}>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setCheck1(!check1);
            }}>
            {check1 ? <Checked /> : <Unchecked />}
          </Pressable>
          <Text style={styles.text}>만 14세 이상입니다. (필수)</Text>
        </View>
        <View style={styles.item}>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setCheck2(!check2);
            }}>
            {check2 ? <Checked /> : <Unchecked />}
          </Pressable>
          <Text style={styles.text}>이용 약관 동의 (필수)</Text>
          <Pressable
            style={styles.next}
            hitSlop={8}
            onPress={() => {
              Linking.openURL(
                'https://gifted-gasosaurus-d61.notion.site/8cc0c638e82a4a97bd4c599b599583e3',
              );
            }}>
            <More />
          </Pressable>
        </View>
        <View style={styles.item}>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setCheck3(!check3);
            }}>
            {check3 ? <Checked /> : <Unchecked />}
          </Pressable>
          <Text style={styles.text}>개인정보 수집/이용 동의 (필수)</Text>
          <Pressable
            style={styles.next}
            hitSlop={8}
            onPress={() => {
              Linking.openURL(
                'https://gifted-gasosaurus-d61.notion.site/caefc62c984246d2a04b91e444df00e7',
              );
            }}>
            <More />
          </Pressable>
        </View>
        <View style={styles.item}>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setCheck4(!check4);
            }}>
            {check4 ? <Checked /> : <Unchecked />}
          </Pressable>
          <Text style={styles.text}>위치 정보 제공 동의 (선택)</Text>
          <Pressable style={styles.next} hitSlop={8}>
            <More />
          </Pressable>
        </View>
        <View style={styles.item}>
          <Pressable
            hitSlop={8}
            onPress={() => {
              setCheck5(!check5);
            }}>
            {check5 ? <Checked /> : <Unchecked />}
          </Pressable>
          <Text style={styles.text}>마케팅 수신 동의 (선택)</Text>
          <Pressable style={styles.next} hitSlop={8}>
            <More />
          </Pressable>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, {width: width - 48}]}
        onPress={onPressNext}>
        <Text style={styles.btnText}>다음</Text>
      </TouchableOpacity>

      {/* Validation Toast */}
      <View style={styles.toastView}>
        <Animated.View
          style={[
            {
              opacity: animation1,
            },
          ]}>
          <SetNicknameToast text="💡이용 동의해 주세요." />
        </Animated.View>
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 24,
    fontFamily: colors.bold,
    height: 36,
    marginBottom: 28,
    color: colors.primary,
    paddingHorizontal: 26,
    marginTop: 43,
    lineHeight: 36,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 26,
    alignItems: 'center',
    marginVertical: 7,
  },
  allText: {
    fontFamily: colors.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    color: colors.text1,
    marginLeft: 21,
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.408,
    color: colors.text1,
    marginLeft: 21,
    position: 'relative',
  },
  next: {
    position: 'absolute',
    right: 24,
  },
  button: {
    marginHorizontal: 24,
    height: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 18,
  },
  btnText: {
    color: colors.on_primary,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 22,
  },
  toastView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 90,
  },
});

export default AgreeScreen;

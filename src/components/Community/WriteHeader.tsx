import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import {
  RootStackNavigationProp,
  MainTabNavigationProp,
} from '../../screens/types';
import {useNavigation} from '@react-navigation/core';
import {useRecoilValue} from 'recoil';
import {titleState} from '../../atoms/title';
import {bodyState} from '../../atoms/body';
import {useRecoilState} from 'recoil';
import {writeToastState} from '../../atoms/writeToast';
import {writeToastTextState} from '../../atoms/writeToastText';

function WriteHeader() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const title = useRecoilValue(titleState);
  const body = useRecoilValue(bodyState);
  const [toastVisible, setToastVisible] = useRecoilState(writeToastState);
  const [toastText, setToastText] = useRecoilState(writeToastTextState);

  const onPressBack = () => {
    if (title || body) {
      // 작성된 글이 있어요
      console.log(title);
      console.log(body);
    } else {
      navigation.pop();
    }
  };

  const onPressSubmit = async () => {
    if (!title) {
      setToastText('💡 제목이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else if (!body) {
      console.log('내용');
      setToastText('💡 내용이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else {
      navigation.navigate('Community');
    }
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onPressBack}>
        <Back />
      </Pressable>
      <Text style={styles.headerText}>게시글 작성</Text>
      <Pressable style={styles.submit} onPress={onPressSubmit}>
        <Text style={styles.submitText}>완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.primary,
    marginTop: -2,
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitText: {
    color: '#3F97BD',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default WriteHeader;

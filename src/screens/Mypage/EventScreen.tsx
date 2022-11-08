import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import {RootStackNavigationProp} from '../types';

function EventScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="이벤트" edit={false} complete={false} />
      <ScrollView style={styles.block}>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate('HomeEvent', {idx: 1});
          }}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Home/main1.png')}
          />
          <Text style={styles.title}>
            필카의 A to Z! 찰칵과 함께 시작해 보세요.
          </Text>
          <Text style={styles.date}>2022. 10. 01 ~ 2022. 10. 31</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate('HomeEvent', {idx: 2});
          }}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Home/main2.png')}
          />
          <Text style={styles.title}>우리가 알아야 할 [찰칵] 이야기 </Text>
          <Text style={styles.date}>2022. 10. 01 ~ 2022. 10. 31</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  block: {
    flex: 1,
  },
  item: {
    paddingTop: 21,
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 4,
  },
  image: {
    width: '100%',
    height: 179,
    marginBottom: 12,
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    marginBottom: 4,
    color: colors.text1,
  },
  date: {
    color: colors.text3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.408,
  },
});

export default EventScreen;

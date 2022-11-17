import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import Rec1 from '../../assets/images/Home/Rec1.svg';
import Rec2 from '../../assets/images/Home/Rec2.svg';
import {RootStackNavigationProp} from '../../screens/types';

function RecommendSection() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <Text style={styles.title}>Chalkak* 운영진이 추천하는 글 </Text>
      </View>
      <View style={[styles.container, {marginBottom: 12}]}>
        <Pressable
          style={[styles.item, {marginRight: 12}]}
          onPress={() => {
            navigation.navigate('Post', {id: 3});
          }}>
          <Image
            source={require('../../assets/images/Home/Recommend.png')}
            style={styles.img}
          />
          <Text style={styles.text}>입문 카메라 추천</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate('Post', {id: 1});
          }}>
          <Image
            source={require('../../assets/images/Home/Recommend2.png')}
            style={styles.img}
          />
          <Text style={styles.text}>필름 촬영시 주의사항</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate('Post', {id: 2});
          }}>
          <Image
            source={require('../../assets/images/Home/Recommend3.png')}
            style={styles.img}
          />
          <Text style={styles.text}>필름 최저가 구매 팁!</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate('Post', {id: 4});
          }}>
          <Image
            source={require('../../assets/images/Home/Recommend4.png')}
            style={styles.img}
          />
          <Text style={styles.text}>카메라 전문 언어 정리</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.text1,
    fontSize: 16,
    letterSpacing: -0.408,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 24,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 166,
  },
  item: {
    width: '48%',
    height: '100%',
    marginBottom: 16,
    borderRadius: 4,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    fontFamily: colors.bold,
    color: colors.on_primary,
    fontSize: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(36, 36, 36, 0.54)',
    borderRadius: 4,
  },
});

export default RecommendSection;

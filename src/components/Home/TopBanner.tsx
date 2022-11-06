import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import colors from '../../assets/color';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../../screens/types';

const BannerWidth = Dimensions.get('window').width;
const item = [
  {
    idx: 1,
    img: require('../../assets/images/Home/main1.png'),
    text: `필카의 A to Z! 
찰칵과 함께 시작해 보세요.`,
  },
  {
    idx: 2,
    img: require('../../assets/images/Home/main2.png'),
    text: `우리가 알아야 할
[찰칵] 이야기`,
  },
];
function TopBanner() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPressEvent = (idx: number) => {
    navigation.navigate('HomeEvent', {idx});
  };
  return (
    <>
      <View style={styles.block}>
        <View style={styles.leftBlock}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
        <View>
          <Swiper
            autoplay
            showsPagination={true}
            style={styles.swiper}
            paginationStyle={styles.pagination}
            dotColor="#767676"
            activeDotColor="#ffffff"
            dotStyle={{width: 6, height: 6}}
            activeDotStyle={{width: 14, height: 6}}>
            {item.map(item => {
              return (
                <Pressable
                  style={styles.item}
                  key={item.idx}
                  onPress={() => onPressEvent(item.idx)}>
                  <Image style={styles.image} source={item.img} />
                  <Text style={styles.text}>{item.text}</Text>
                </Pressable>
              );
            })}
          </Swiper>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    height: 248,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 25,
    paddingTop: 11,
    position: 'relative',
  },
  leftBlock: {
    height: 196,
    justifyContent: 'space-between',
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.79)',
    borderRadius: 1,
  },
  image: {
    width: 305,
    height: 174,
    borderRadius: 13,
  },
  swiper: {
    // width: 605,
    height: 174,
    marginTop: 24,
    borderRadius: 13,
    marginLeft: 23,
  },
  pagination: {
    position: 'absolute',
    left: 240,
    bottom: -10,
  },
  item: {
    position: 'relative',
    width: 305,
    height: 174,
  },
  text: {
    position: 'absolute',
    fontFamily: colors.bold,
    left: 22,
    bottom: 22,
    color: colors.on_primary,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: -0.408,
  },
});

export default TopBanner;

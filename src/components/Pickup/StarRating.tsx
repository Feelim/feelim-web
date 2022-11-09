import React, {useMemo, useState, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
  Pressable,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {reviewStarState} from '../../atoms/reviewStar';

function StarRating() {
  // Recoil로 바꾸기
  const [starNum, setStarNum] = useRecoilState(reviewStarState);

  return (
    <View style={styles.starWrap}>
      <Pressable
        onPress={() => {
          setStarNum(1);
        }}>
        <Image
          style={starNum >= 1 ? [{opacity: 1}] : [{opacity: 0.2}]}
          source={require('../../assets/images/Pickup/ReviewStar.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStarNum(2);
        }}>
        <Image
          style={starNum >= 2 ? [{opacity: 1}] : [{opacity: 0.2}]}
          source={require('../../assets/images/Pickup/ReviewStar.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStarNum(3);
        }}>
        <Image
          style={starNum >= 3 ? [{opacity: 1}] : [{opacity: 0.2}]}
          source={require('../../assets/images/Pickup/ReviewStar.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStarNum(4);
        }}>
        <Image
          style={starNum >= 4 ? [{opacity: 1}] : [{opacity: 0.2}]}
          source={require('../../assets/images/Pickup/ReviewStar.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStarNum(5);
        }}>
        <Image
          style={starNum >= 5 ? [{opacity: 1}] : [{opacity: 0.2}]}
          source={require('../../assets/images/Pickup/ReviewStar.png')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  starWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 42,
    alignItems: 'center',
  },
});

export default StarRating;

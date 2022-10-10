import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import colors from '../../assets/color';

function PlaceInfo() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>픽업 장소</Text>
        <Text style={styles.modify}>변경하기</Text>
      </View>
      <View>
        <Text style={styles.text}>서울특별시 강남구 강남대로 123-45</Text>
        <Text style={styles.text}>123동 1234호</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 100,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  titleWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  modify: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 12,
  },
});

export default PlaceInfo;

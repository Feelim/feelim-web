import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useWindowDimensions, Image} from 'react-native';
import colors from '../../assets/color';

function FilmRegisterInfo() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <View>
        <Text style={styles.title}>필름 현상 신청 정보</Text>
      </View>
      <View>
        <Text style={[{color: colors.primary}]}>홍길동</Text>
        <Text style={[{color: colors.primary}]}>010-1234-5678</Text>
        <Text style={[{color: colors.primary}]}>kildongiii@naver.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 180,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  alertTextBold: {
    fontSize: 11,
    color: '#FF7979',
    fontWeight: '400',
  },
  alertText: {
    fontSize: 11,
    fontWeight: '400',
  },
  titleWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  alertImage: {
    marginRight: 3,
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
});

export default FilmRegisterInfo;

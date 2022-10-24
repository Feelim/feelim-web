import React from 'react';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import {Laboratory} from '../../api/types';
import colors from '../../assets/color';

type DetailPriceType = {
  data: Laboratory | undefined;
};

function DetailPrice({data}: DetailPriceType) {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width - 32}}>
      <Text style={styles.title}>가격표</Text>
      <View style={{height: 96, marginBottom: 24}}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 12,
  },
});
export default DetailPrice;

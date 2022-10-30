import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/color';

function Divider() {
  return <View style={styles.underline} />;
}

const styles = StyleSheet.create({
  underline: {
    backgroundColor: colors.devider1,
    height: 4,
    width: '100%',
  },
});

export default Divider;

import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';

type StarPropsType = {
  starNum: number;
};

function Star({starNum}: StarPropsType) {
  return (
    <View style={styles.starWrap}>
      <Image
        style={starNum >= 1 ? [{opacity: 1}] : [{opacity: 0.2}]}
        source={require('../../assets/images/Pickup/star.png')}
      />
      <Image
        style={starNum >= 2 ? [{opacity: 1}] : [{opacity: 0.2}]}
        source={require('../../assets/images/Pickup/star.png')}
      />
      <Image
        style={starNum >= 3 ? [{opacity: 1}] : [{opacity: 0.2}]}
        source={require('../../assets/images/Pickup/star.png')}
      />
      <Image
        style={starNum >= 4 ? [{opacity: 1}] : [{opacity: 0.2}]}
        source={require('../../assets/images/Pickup/star.png')}
      />
      <Image
        style={starNum >= 5 ? [{opacity: 1}] : [{opacity: 0.2}]}
        source={require('../../assets/images/Pickup/star.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  starWrap: {
    flexDirection: 'row',
    height: 21,
    alignItems: 'center',
  },
});
export default Star;

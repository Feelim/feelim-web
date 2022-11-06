import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../assets/color';
import Youtube from '../../assets/images/Home/Youtube.svg';

function VideoItem() {
  return (
    <View style={styles.item}>
      <Youtube />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 166,
    backgroundColor: '#d9d9d9',
    marginBottom: 12,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 7.82,
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: -0.408,
    lineHeight: 15,
    width: 154,
    height: 34,
  },
});

export default VideoItem;

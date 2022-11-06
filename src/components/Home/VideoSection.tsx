import React from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import colors from '../../assets/color';
import VideoItem from './VideoItem';
import More from '../../assets/images/Home/More.svg';

const idx = [1, 2, 3];

function VideoSection() {
  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <Text style={styles.title}>동영상으로 배우는 필카 📸</Text>
        <Pressable>
          <More />
        </Pressable>
      </View>
      <ScrollView>
        {idx.map(idx => {
          return <VideoItem key={idx} />;
        })}
      </ScrollView>
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
  more: {
    color: colors.text3,
    fontSize: 11,
    fontWeight: '400',
  },
});

export default VideoSection;

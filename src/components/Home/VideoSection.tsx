import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import colors from '../../assets/color';
import VideoItem from './VideoItem';
import More from '../../assets/images/Home/More.svg';
import Youtube from '../../assets/images/Home/Youtube.svg';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../../screens/types';

function VideoSection() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <Text style={styles.title}>동영상으로 배우는 필카</Text>
      </View>
      <ScrollView>
        <Pressable
          onPress={() => {
            navigation.navigate('Youtube', {id: 0});
          }}>
          <Image
            style={styles.item}
            source={{
              uri: 'https://i.ytimg.com/vi/oYmggCa5cdg/maxresdefault.jpg',
            }}
          />
          <Youtube
            style={{
              position: 'absolute',
              top: 45,
              left: (width - 100) / 2,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Youtube', {id: 1});
          }}>
          <Image
            style={styles.item}
            source={{
              uri: 'https://i.ytimg.com/vi/fad7Q3taGeg/maxresdefault.jpg',
            }}
          />
          <Youtube
            style={{
              position: 'absolute',
              top: 45,
              left: (width - 100) / 2,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Youtube', {id: 2});
          }}>
          <Image
            style={styles.item}
            source={{
              uri: 'https://i.ytimg.com/vi/SvVFaReb5VE/maxresdefault.jpg',
            }}
          />
          <Youtube
            style={{
              position: 'absolute',
              top: 45,
              left: (width - 100) / 2,
            }}
          />
        </Pressable>
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
  item: {
    width: '100%',
    height: 166,
    marginBottom: 12,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // opacity: 0.7,
  },
});

export default VideoSection;

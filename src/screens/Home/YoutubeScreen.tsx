import {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {RootStackNavigationProp, RootStackParamList} from '../../screens/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import MypageHeader from '../../components/Mypage/MypageHeader';
import {
  Image,
  Linking,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../assets/color';
import Link from '../../assets/images/Home/Link.svg';

const data = [
  {
    videoId: 'oYmggCa5cdg',
    title: '📸필카 입문하는 필린이들을 위한 꿀팁! (필름 카메라 추천)',
    youtuber: '뉴썬',
    url: 'https://youtu.be/oYmggCa5cdg',
    profile:
      'https://yt3.ggpht.com/jxS0LK3bTZvJGOxlykaM8Z7JyYXZOMMqBbP-SY0nDSJsHAVAjiyuou_i8bcxhCl2HwTejn60SfA=s88-c-k-c0x00ffffff-no-rj',
  },
  {
    videoId: 'fad7Q3taGeg',
    title: '필름카메라 추천 Top10 !!',
    youtuber: '요즘카메라',
    url: 'https://youtu.be/fad7Q3taGeg',
    profile:
      'https://yt3.ggpht.com/ytc/AMLnZu-EKZIVB6Hfi3J4dnNP1dyWXDsMUpc_ootG3qLd=s88-c-k-c0x00ffffff-no-rj',
  },
  {
    videoId: 'SvVFaReb5VE',
    title:
      '필름카메라 현상부터 스캔, 인화까지 총정리 A to Z | 이제 폴라로이드 카메라랑 그만 헷갈리세요! #필름카메라 #사진인화',
    youtuber: `Cherry's Mu 체리뮤`,
    url: 'https://youtu.be/SvVFaReb5VE',
    profile:
      'https://yt3.ggpht.com/e6_XsHBX3GZI8v04Opn1FaNT1y3PNVNrHOVxGEDLQ8DZctR3aZodu8QfsmuUAjY5a8iYm0qP=s88-c-k-c0x00ffffff-no-rj',
  },
];

type YoutubeScreenRouteProp = RouteProp<RootStackParamList, 'Youtube'>;
function YoutubeScreen() {
  const playerRef = useRef<YoutubeIframeRef>(null);
  const {params} = useRoute<YoutubeScreenRouteProp>();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const id = params.id;

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />

      <View style={[styles.header]}>
        <Pressable onPress={() => navigation.pop()} hitSlop={8}>
          <Image source={require('../../assets/images/Pickup/back.png')} />
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL(data[id].url);
          }}>
          <Link />
        </Pressable>
      </View>
      <YoutubePlayer
        ref={playerRef}
        videoId={data[id].videoId}
        width={width}
        height={width * 0.5625}
        play={false}
      />
      <Text style={styles.title}>{data[id].title}</Text>
      <View style={styles.info}>
        <Image source={{uri: data[id].profile}} style={styles.img} />
        <Text style={styles.name}>{data[id].youtuber}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.on_primary,
  },
  header: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 14,
    fontFamily: colors.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    paddingHorizontal: 24,
    color: colors.text1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 14,
  },
  img: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  name: {
    color: colors.text1,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default YoutubeScreen;

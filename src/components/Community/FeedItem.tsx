import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../assets/color';
import Comment from '../../assets/images/Community/Comment.svg';
import Scrap from '../../assets/images/Community/Scrap.svg';
import {RootStackNavigationProp} from '../../screens/types';
import {useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';
import {getPostDetail} from '../../api/post';

export interface Item {
  title: string;
  id: number;
  commentNum: number;
  time: string;
  nickname: string;
}

function FeedItem({title, id, commentNum, time, nickname}: Item) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const formattedDate = new Date(time).toLocaleDateString();
  const [image, setImage] = useState('');

  const postDetailQuery = useQuery(['postDetail', id], () => getPostDetail(id));
  const images = postDetailQuery.data?.result?.images;
  useEffect(() => {
    if (images?.length >= 1) {
      setImage(images[images.length - 1].url);
    } else {
      setImage('');
    }
  }, [images, image]);

  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate('Post', {
          id,
        });
      }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.name}>{nickname}</Text>
        </View>
        <View style={styles.reaction}>
          <View style={styles.reactionItem}>
            <Comment />
            <Text style={styles.reactionText}>{commentNum}</Text>
          </View>
          {image ? (
            <>
              <Image source={{uri: image}} style={styles.imageBox} />
            </>
          ) : (
            <></>
          )}
          {/* <View style={styles.reactionItem}>
            <Scrap />
            <Text style={styles.reactionText}>0</Text>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingLeft: 24,
    paddingRight: 16,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    letterSpacing: -0.408,
    color: colors.text1,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 21,
    height: 21,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 18,
    marginTop: 5,
  },
  infoLeft: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.408,
    color: colors.text3,
  },
  name: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.408,
    color: colors.text3,
  },
  divider: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.408,
    color: colors.text3,
    marginLeft: 8,
    marginRight: 10,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // width: 61.5,
    // justifyContent: 'space-between',
  },
  reactionText: {
    color: colors.text3,
    fontSize: 11,
    fontWeight: '400',
    marginLeft: 2,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBox: {
    width: 45,
    height: 45,
    borderRadius: 3,
    marginLeft: 6,
  },
});

export default FeedItem;

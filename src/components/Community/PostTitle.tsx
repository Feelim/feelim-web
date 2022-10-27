import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../assets/color';
import Comment from '../../assets/images/Community/Comment.svg';
import Scrap from '../../assets/images/Community/Scrap.svg';

export interface Item {
  title?: string;
  category?: string;
  createdAt?: string;
  nickname?: string;
  content?: string;
  commentNum: number;
}

function PostTitle({title, category, createdAt, nickname, commentNum}: Item) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const hour = new Date(createdAt).getHours().toString().padStart(2, '0');
  const minute = new Date(createdAt).getMinutes().toString().padStart(2, '0');
  if (category === 'FILM') {
    category = '필름';
  } else if (category === 'CAMERA') {
    category = '카메라';
  } else if (category === 'QUESTION') {
    category = 'QnA';
  }

  return (
    <View style={styles.item}>
      <Text style={styles.filter}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.time}>
            {hour}:{minute}
          </Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.name}>{nickname}</Text>
        </View>
        <View style={styles.reaction}>
          <View style={styles.reactionItem}>
            <Comment />
            <Text style={styles.reactionText}>{commentNum}</Text>
          </View>
          <View style={styles.reactionItem}>
            <Scrap />
            <Text style={styles.reactionText}>12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 2,
    paddingBottom: 15,
    paddingLeft: 24,
    paddingRight: 17.5,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
  },
  filter: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: colors.text1,
    height: 21,
    lineHeight: 21,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.408,
    color: colors.text1,
    lineHeight: 24,
    fontWeight: '400',
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
  time: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.408,
    color: colors.text3,
    marginLeft: 12,
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
    width: 61.5,
    justifyContent: 'space-between',
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
});

export default PostTitle;

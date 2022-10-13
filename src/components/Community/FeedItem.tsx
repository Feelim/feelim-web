import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../assets/color';
import Comment from '../../assets/images/Community/Comment.svg';
import Scrap from '../../assets/images/Community/Scrap.svg';

export interface Item {
  title: string;
}

function FeedItem({title}: Item) {
  return (
    // 이미지 없을때 기준
    <Pressable style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={styles.date}>22.10.11</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.name}>까치</Text>
        </View>
        <View style={styles.reaction}>
          <View style={styles.reactionItem}>
            <Comment />
            <Text style={styles.reactionText}>12</Text>
          </View>
          <View style={styles.reactionItem}>
            <Scrap />
            <Text style={styles.reactionText}>12</Text>
          </View>
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
    lineHeight: 15,
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

export default FeedItem;

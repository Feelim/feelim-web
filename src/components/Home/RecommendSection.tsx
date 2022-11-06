import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import Rec1 from '../../assets/images/Home/Rec1.svg';
import Rec2 from '../../assets/images/Home/Rec2.svg';

function RecommendSection() {
  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <Text style={styles.title}>Chalkak* 운영진이 추천하는 글 ✏️</Text>
      </View>
      <View style={[styles.container, {marginBottom: 12}]}>
        <Pressable style={styles.item}>
          <Rec1 />
          <Text style={styles.text}>필름 최저가 구매 팁</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Rec2 />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.item}>
          <Rec1 />
          <Text style={styles.text}>필름 최저가 구매 팁</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Rec2 />
        </Pressable>
      </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: 165.4,
    height: 156.4,
    marginBottom: 16,
    borderRadius: 4,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    fontFamily: colors.bold,
    color: colors.on_primary,
    fontSize: 12,
  },
});

export default RecommendSection;

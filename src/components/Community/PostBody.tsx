import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import colors from '../../assets/color';

export interface Item {
  content?: string;
  images?: string[];
}

function PostBody({content, images}: Item) {
  const uri = images?.pop();

  return (
    <View style={styles.block}>
      <ScrollView>
        {images ? (
          <>
            <Image style={styles.image} source={{uri: uri}} />
          </>
        ) : (
          <></>
        )}

        <Text style={styles.text}>{content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    height: 272,
  },
  image: {
    width: 83,
    height: 83,
    borderRadius: 3,
    marginBottom: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
  },
});

export default PostBody;

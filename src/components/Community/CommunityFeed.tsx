import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import colors from '../../assets/color';
import FeedItem from './FeedItem';

const num = [1, 2, 3, 4];

function CommunityFeed() {
  return (
    <ScrollView style={styles.feed}>
      <View>
        {num.map(item => {
          return <FeedItem key={item} title="초보자 필름카메라 골라주세요!" />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  feed: {
    // flex: 1,
    width: '100%',
  },
});

export default CommunityFeed;

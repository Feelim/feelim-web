import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/color';
import FeedItem from './FeedItem';
import {useQuery} from 'react-query';
import {getPostAll} from '../../api/post';
import InfoItem from '../Pickup/InfoItem';
import {RouteProp, useRoute} from '@react-navigation/core';
import {RootStackParamList} from '../../screens/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>;

function CommunityFeed() {
  const postQuery = useQuery('postAll', getPostAll);
  const {bottom} = useSafeAreaInsets();

  if (!postQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }
  return (
    <View style={styles.feed}>
      <FlatList
        data={postQuery.data.result}
        contentContainerStyle={{paddingBottom: bottom}}
        renderItem={({item}) => (
          <FeedItem
            id={item.id}
            title={item.title}
            nickname={item.nickname}
            commentNum={item.commentNum}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    width: '100%',
    // marginTop: -300,
  },
  spinner: {
    flex: 1,
  },
});

export default CommunityFeed;

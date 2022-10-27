import React, {useEffect, useState} from 'react';
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
import {getPostAll, getPostCategory} from '../../api/post';
import InfoItem from '../Pickup/InfoItem';
import {RouteProp, useRoute} from '@react-navigation/core';
import {RootStackParamList} from '../../screens/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {categoryFilterState} from '../../atoms/category';
import {Post, PostAll, ResultPostAll} from '../../api/types';

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>;

function CommunityFeed() {
  const postQuery = useQuery('postAll', getPostAll);
  const categoryRecoil = useRecoilValue(categoryFilterState);

  const [category, setCategory] = useState('FILM');

  const [data, setData] = useState<any>({});
  const postCategory = useQuery(['postCategory', category], () =>
    getPostCategory(category),
  );

  useEffect(() => {
    if (categoryRecoil === 0) {
    } else if (categoryRecoil === 1) {
      setCategory('CAMERA');
      setData(postCategory.data?.result);
    } else if (categoryRecoil === 2) {
      setCategory('FILM');
      setData(postCategory.data?.result);
    } else if (categoryRecoil === 3) {
      setCategory('QUESTION');
      setData(postCategory.data?.result);
    }
  }, [categoryRecoil, category]);

  const {bottom} = useSafeAreaInsets();

  if (!postQuery.data || !data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }
  return (
    <View style={styles.feed}>
      {categoryRecoil > 0 ? (
        <>
          <FlatList
            data={data}
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
        </>
      ) : (
        <>
          <FlatList
            data={postQuery.data?.result}
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    width: '100%',
  },
  spinner: {
    flex: 1,
  },
});

export default CommunityFeed;

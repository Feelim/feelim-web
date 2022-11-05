import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import colors from '../../assets/color';
import FeedItem from './FeedItem';
import {useInfiniteQuery, useQuery} from 'react-query';
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
  const {data, isFetchingNextPage, fetchNextPage, refetch, isFetching} =
    useInfiniteQuery(
      'postAll',
      ({pageParam}) => getPostAll({cursor: pageParam}),
      {
        getNextPageParam: lastPage =>
          lastPage.length === 10 ? lastPage[lastPage.length - 1].id : undefined,
      },
    );
  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as ResultPostAll[]).concat(...data.pages);
  }, [data]);
  // const postQuery = useQuery('postAll', getPostAll);

  const onLoadMore = () => {
    fetchNextPage();
  };

  const categoryRecoil = useRecoilValue(categoryFilterState);
  const [category, setCategory] = useState('FILM');
  const [categoryData, setCategoryData] = useState<any>({});
  const postCategory = useQuery(['postCategory', category], () =>
    getPostCategory(category),
  );

  useEffect(() => {
    if (categoryRecoil === 0) {
    } else if (categoryRecoil === 1) {
      setCategory('CAMERA');
      setCategoryData(postCategory.data?.result);
    } else if (categoryRecoil === 2) {
      setCategory('FILM');
      setCategoryData(postCategory.data?.result);
    } else if (categoryRecoil === 3) {
      setCategory('QUESTION');
      setCategoryData(postCategory.data?.result);
    }
  }, [categoryRecoil, category]);

  const {bottom} = useSafeAreaInsets();

  if (!data || !categoryData) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }
  return (
    <View style={styles.feed}>
      {categoryRecoil > 0 ? (
        <>
          <FlatList
            data={categoryData}
            contentContainerStyle={{paddingBottom: bottom}}
            renderItem={({item}) => (
              <FeedItem
                id={item.id}
                title={item.title}
                commentNum={item.commentNum}
                time={item.time}
                nickname={item.writer.nickname}
              />
            )}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={isFetching && !isFetchingNextPage}
              />
            }
          />
        </>
      ) : (
        <>
          <FlatList
            data={items}
            contentContainerStyle={{paddingBottom: bottom}}
            renderItem={({item}) => (
              <FeedItem
                id={item.id}
                title={item.title}
                commentNum={item.commentNum}
                time={item.time}
                nickname={item.writer.nickname}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => (
              <>
                {isFetchingNextPage && (
                  <ActivityIndicator
                    size="small"
                    color="black"
                    style={styles.spinner}
                  />
                )}
              </>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMore}
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={isFetching && !isFetchingNextPage}
              />
            }
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

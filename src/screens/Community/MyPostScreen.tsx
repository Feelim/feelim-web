import {useNavigation} from '@react-navigation/core';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getMyPost} from '../../api/post';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import FeedItem from '../../components/Community/FeedItem';
import {RootStackNavigationProp} from '../types';

function MyPostScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {bottom} = useSafeAreaInsets();
  const myPostData = useQuery('myPost', getMyPost);

  if (!myPostData) {
    return <ActivityIndicator size="large" style={{flex: 1}} color="black" />;
  }
  console.log(myPostData);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}>
          <Back />
        </Pressable>
        <Text style={styles.headerTitle}>작성한 게시글</Text>
      </View>
      <View style={styles.feed}>
        <FlatList
          data={myPostData.data?.result}
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
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.primary,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 27,
    position: 'absolute',
    left: '40%',
  },
  feed: {
    flex: 1,
  },
});

export default MyPostScreen;

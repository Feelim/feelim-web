import {useNavigation} from '@react-navigation/core';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getMyComment, getMyPost} from '../../api/post';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import FeedItem from '../../components/Community/FeedItem';
import {RootStackNavigationProp} from '../types';

function MyCommentScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {bottom} = useSafeAreaInsets();
  const myCommentData = useQuery('myComment', getMyComment);
  const {width} = useWindowDimensions();

  if (!myCommentData) {
    return <ActivityIndicator size="large" style={{flex: 1}} color="black" />;
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={[styles.header, {width: width - 32}]}>
        <Pressable
          hitSlop={8}
          onPress={() => {
            navigation.pop();
          }}>
          <Back />
        </Pressable>
      </View>
      <Text style={styles.headerTitle}>내가 댓글 단 게시글</Text>
      <View style={styles.feed}>
        <FlatList
          data={myCommentData.data?.result}
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
    top: 8,
  },
  feed: {
    flex: 1,
  },
});

export default MyCommentScreen;

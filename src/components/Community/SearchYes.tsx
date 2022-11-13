import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import CommunityFeed from './CommunityFeed';
import FeedItem from './FeedItem';

export interface SearchProps {
  data: any;
}

function SearchYes({data}: SearchProps) {
  const {bottom} = useSafeAreaInsets();
  console.log('gere');
  return (
    <View style={styles.block}>
      <View style={styles.top}>
        <Text style={styles.number}>{data.length}개</Text>
        <Text style={styles.text}>의 검색 결과가 있어요.</Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: bottom}}
        renderItem={({item}) => (
          <FeedItem
            id={item.id}
            title={item.title}
            nickname={item.writer.nickname}
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
  block: {flex: 1},
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.devider1,
    borderBottomWidth: 4,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 14,
  },
  number: {
    fontSize: 11,
    color: colors.text1,
    fontWeight: '700',
  },
  text: {
    fontSize: 11,
    color: colors.text2,
    fontWeight: '400',
    letterSpacing: -0.408,
  },
});

export default SearchYes;

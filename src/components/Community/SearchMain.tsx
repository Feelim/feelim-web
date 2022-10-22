import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import colors from '../../assets/color';
import RecentSearchItem from './RecentSearchItem';

function SearchMain() {
  return (
    <View style={styles.block}>
      <View style={styles.top}>
        <Text style={styles.title}>최근검색어</Text>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.delete}>전체삭제</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.content}
        showsHorizontalScrollIndicator={false}>
        <RecentSearchItem />
        <RecentSearchItem />
        <RecentSearchItem />
        <RecentSearchItem />
        <RecentSearchItem />
        <RecentSearchItem />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 16,
    color: colors.text1,
    letterSpacing: -0.408,
    lineHeight: 24,
  },
  deleteButton: {
    height: 24,
    justifyContent: 'center',
  },
  delete: {
    fontSize: 11,
    letterSpacing: -0.408,
    textDecorationLine: 'underline',
    color: colors.text3,
  },
  content: {
    height: 37,
    paddingVertical: 6,
    marginTop: 10,
  },
});

export default SearchMain;

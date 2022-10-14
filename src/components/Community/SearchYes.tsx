import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import colors from '../../assets/color';
import CommunityFeed from './CommunityFeed';

function SearchYes() {
  return (
    <View style={styles.block}>
      <View style={styles.top}>
        <Text style={styles.number}>12개</Text>
        <Text style={styles.text}>의 검색 결과가 있어요.</Text>
      </View>
      <CommunityFeed />
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

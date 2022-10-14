import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import SearchNoImg from '../../assets/images/Community/SearchNoImg.svg';

function SearchNo() {
  return (
    <View style={styles.block}>
      <SearchNoImg />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    flex: 1,
    marginTop: 160,
  },
});

export default SearchNo;

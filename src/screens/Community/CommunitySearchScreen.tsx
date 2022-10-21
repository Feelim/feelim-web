import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import SearchMain from '../../components/Community/SearchMain';
import SearchNo from '../../components/Community/SearchNo';
import SearchYes from '../../components/Community/SearchYes';

// 바로 검색키보드 포커스 되도록

function CommunitySearchScreen() {
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.searchInput}>
        <Pressable style={styles.backButton}>
          <Back />
        </Pressable>
        <TextInput
          placeholder="검색어를 입력해주세요"
          placeholderTextColor={colors.text3}
          style={styles.input}
        />
      </View>
      <SearchMain />
      {/* <SearchNo /> */}
      {/* <SearchYes /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.on_primary,
  },
  searchInput: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 9,
  },
  input: {
    backgroundColor: '#f2f2f2',
    height: 32,
    borderRadius: 35,
    fontSize: 12,
    paddingLeft: 19,
    marginRight: 24,
    flex: 1,
    paddingVertical: 0,
  },
});

export default CommunitySearchScreen;

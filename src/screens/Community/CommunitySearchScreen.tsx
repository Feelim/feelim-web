import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {getPostSearchTitle} from '../../api/post';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import SearchMain from '../../components/Community/SearchMain';
import SearchNo from '../../components/Community/SearchNo';
import SearchYes from '../../components/Community/SearchYes';
import {RootStackNavigationProp} from '../types';

function CommunitySearchScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [keyword, setKeyword] = useState('');
  const searchTitleQuery = useQuery(['searchTitle', keyword], () =>
    getPostSearchTitle(keyword),
  );
  useEffect(() => {
    searchTitleQuery;
  }, [keyword]);
  const [enter, setEnter] = useState(false);

  // 최근검색어
  const [getKeyword, setGetKeyword] = useState('');
  AsyncStorage.getItem('keywords', (err, result) => {
    if (result) {
      setGetKeyword(result);
    }
  });
  const [keywords, setKeywords] = useState(JSON.parse(getKeyword || '[]'));
  const setRecentItem = (text: string) => {
    const newKeyword = {
      id: Date.now(),
      text: text,
    };
    setKeywords([newKeyword, ...keywords]);
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.searchInput}>
        <Pressable
          style={styles.backButton}
          hitSlop={8}
          onPress={() => navigation.goBack()}>
          <Back />
        </Pressable>
        <TextInput
          placeholder="검색어를 입력해주세요"
          placeholderTextColor={colors.text3}
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          autoFocus
          returnKeyType="search"
          onSubmitEditing={() => {
            setEnter(true);
            setRecentItem(keyword);
          }}
        />
      </View>

      {keyword.length < 2 && (
        <SearchMain
          enter={enter}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      )}
      {/* {searchTitleQuery.data?.result?.length >= 1 && keyword.length >= 2 && (
        <SearchYes data={searchTitleQuery.data?.result} />
      )} */}
      {searchTitleQuery.data?.result?.length < 1 && keyword.length >= 2 && (
        <SearchNo />
      )}
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

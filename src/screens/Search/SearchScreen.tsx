import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../assets/color';
import {searchLaboratory} from '../../constants/SearchLaboratory';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';
import {useQuery} from 'react-query';
import {getSearchLaboratory} from '../../api/search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchMain from '../../components/Community/SearchMain';
import SearchNo from '../../components/Community/SearchNo';
import ModalItem from '../../components/Map/ModalItem';
import Divider from '../../components/Pickup/Divider';

function SearchScreen() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [keyword, setKeyword] = useState('');
  const searchLaboratoryQuery = useQuery(['searchLaboratory', keyword], () =>
    getSearchLaboratory(keyword),
  );

  useEffect(() => {
    searchLaboratoryQuery;
  }, [keyword]);
  const [enter, setEnter] = useState(false);

  return (
    <View style={[styles.block, {width: width}]}>
      <View style={[styles.searchTop, {width: width - 32}]}>
        <Pressable onPress={() => navigation.pop()}>
          <Image source={require('../../assets/images/Pickup/back.png')} />
        </Pressable>
        <Text style={styles.title}>매장 검색</Text>
        <View></View>
      </View>
      <View style={[styles.searchWrap, {width: width - 32}]}>
        <TextInput
          style={styles.input}
          placeholder="매장명 또는 주소를 입력하세요."
          placeholderTextColor={colors.text3}
          value={keyword}
          onChangeText={setKeyword}
          autoFocus
          returnKeyType="search"
          onSubmitEditing={() => {
            setEnter(true);
          }}
        />
        <Pressable
          onPress={() => {
            setEnter(true);
          }}>
          <Image source={require('../../assets/images/Pickup/search.png')} />
        </Pressable>
      </View>
      {searchLaboratoryQuery.data?.result?.length < 1 &&
        keyword.length >= 2 && <SearchNo />}
      {searchLaboratoryQuery.data?.result?.length >= 1 &&
        keyword.length >= 2 && (
          <FlatList
            data={searchLaboratoryQuery.data?.result}
            renderItem={({item}) => (
              <ModalItem
                address={item.address}
                images={item.images}
                distance={item.distance}
                reviewNum={item.reviewNum}
                star={item.star}
                name={item.name}
                id={item.id}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 36,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text2,
    marginRight: 5,
  },
  searchTop: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.primary,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 27,
  },
});

export default SearchScreen;

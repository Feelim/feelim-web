import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import {searchLaboratory} from '../../constants/SearchLaboratory';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

function SearchStore() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {width} = useWindowDimensions();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Search');
      }}>
      <View style={[styles.block, {width: width - 32}]}>
        <TextInput
          style={styles.input}
          placeholder="매장명 또는 주소를 입력하세요."
          onChangeText={text => {}}
          editable={false}
          autoFocus
        />
        <Image source={require('../../assets/images/Pickup/search.png')} />
      </View>
    </Pressable>
  );
}

// {<View style={[styles.searchWrap, {width: width - 32}]}>
// <TextInput
//   style={styles.input}
//   placeholder="매장명 또는 주소를 입력하세요."
//   placeholderTextColor={colors.text3}
//   value={keyword}
//   onChangeText={setKeyword}
//   autoFocus
//   returnKeyType="search"
//   onSubmitEditing={() => {
//     setEnter(true);
//   }}
// />
// <Pressable
//   onPress={() => {
//     setEnter(true);
//   }}>
//   <Image source={require('../../assets/images/Pickup/search.png')} />
// </Pressable>
// </View>}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
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
});

export default SearchStore;

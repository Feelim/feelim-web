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

function SearchStore() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <TextInput
        style={styles.input}
        placeholder="매장명 또는 주소를 입력하세요."
        onChangeText={text => {
          searchLaboratory(text);
        }}
        autoFocus
      />
      <Pressable>
        <Image source={require('../../assets/images/Pickup/search.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
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
});

export default SearchStore;

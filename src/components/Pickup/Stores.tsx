import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Laboratory} from '../../api/types';
import StoreItem from './StoreItem';
import colors from '../../assets/color';

export interface StoresProps {
  stores: Laboratory | undefined;
}

function Stores({stores}: StoresProps) {
  return (
    <FlatList
      data={stores?.result}
      renderItem={({item}) => (
        <StoreItem
          address={item.address}
          images={item.images}
          distance={item.distance}
          reviewNum={item.reviewNum}
          star={item.star}
          name={item.name}
        />
      )}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.underline} />}
    />
  );
}

const styles = StyleSheet.create({
  underline: {
    backgroundColor: colors.devider1,
    height: 4,
    width: '100%',
  },
});

export default Stores;

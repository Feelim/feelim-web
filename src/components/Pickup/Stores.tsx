import React from 'react';
import {FlatList} from 'react-native';
import {Laboratories} from '../../api/types';
import StoreItem from './StoreItem';

import Divider from './Divider';

export interface StoresProps {
  stores: Laboratories | undefined;
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
          id={item.id}
        />
      )}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}

export default Stores;

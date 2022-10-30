import React from 'react';
import {View, Text, Pressable, Image, Linking} from 'react-native';
import {Laboratory} from '../../api/types';

function Introduction({data}: {data: Laboratory | undefined}) {
  return (
    <View style={{marginTop: 30}}>
      <Pressable
        onPress={() => {
          Linking.openURL(data?.result.url ? data?.result.url : '/');
        }}>
        <Image source={require('../../assets/images/Pickup/instargram.png')} />
      </Pressable>
      <Text style={{marginTop: 30}}>
        {data?.result.introduction
          ? data?.result.introduction
          : '소개글이 없습니다.'}
      </Text>
    </View>
  );
}
export default Introduction;

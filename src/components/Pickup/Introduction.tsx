import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Linking,
  useWindowDimensions,
} from 'react-native';
import {Laboratory} from '../../api/types';

function Introduction({data}: {data: Laboratory | undefined}) {
  const {width} = useWindowDimensions();
  return (
    <View style={{marginTop: 30, width: width, alignItems: 'center'}}>
      <View style={{width: width - 32}}>
        <View style={{flexDirection: 'row'}}>
          {data?.result.instagram && (
            <Pressable
              onPress={() => {
                Linking.openURL(
                  data?.result.instagram && data?.result.instagram,
                );
              }}>
              <Image
                style={{marginRight: 10}}
                source={require('../../assets/images/Pickup/instargram.png')}
              />
            </Pressable>
          )}
          {data?.result.blog && (
            <Pressable
              onPress={() => {
                Linking.openURL(data?.result.blog && data?.result.blog);
              }}>
              <Image
                style={{marginRight: 10}}
                source={require('../../assets/images/Pickup/blog.png')}
              />
            </Pressable>
          )}
          {data?.result.homepage && (
            <Pressable
              onPress={() => {
                Linking.openURL(data?.result.homepage && data?.result.homepage);
              }}>
              <Image
                source={require('../../assets/images/Pickup/homepage.png')}
              />
            </Pressable>
          )}
        </View>

        <Text style={{marginTop: 30}}>
          {data?.result.introduction
            ? data?.result.introduction
            : '소개글이 없습니다.'}
        </Text>
      </View>
    </View>
  );
}
export default Introduction;

import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {getLaboratory} from '../../api/laboratories';
import {useQuery} from 'react-query';
import {useRoute, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';
import colors from '../../assets/color';
import DetailTopInfo from '../../components/Pickup/DetailTopInfo';
import Divider from '../../components/Pickup/Divider';
import DetailPrice from '../../components/Pickup/DetailPrice';
import DetailBottomInfo from '../../components/Pickup/DetailBottomInfo';

type PickupDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'PickupDetail'
>;
function PickupDetailScreen() {
  const {params} = useRoute<PickupDetailScreenRouteProp>();
  const {id} = params;

  const {data, isLoading} = useQuery(['laboratory', id], () =>
    getLaboratory(id),
  );
  console.log(data);
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView style={styles.fullScreen}>
      {/* 헤더 (수정하기) */}
      <View style={{width: width, alignItems: 'center'}}>
        <View style={[styles.pickupTop, {width: width - 32}]}>
          <Pressable onPress={() => navigation.pop()}>
            <Image source={require('../../assets/images/Pickup/back.png')} />
          </Pressable>
        </View>
        <DetailTopInfo data={data} />
        <Divider />
        <DetailPrice data={data} />
        <Divider />
        <DetailBottomInfo data={data} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
  },
  pickupTop: {
    height: 41,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBanner: {
    height: 182,
    backgroundColor: colors.primary,
  },
  detailTopWrap: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: -30,
  },
  profile: {
    width: 73,
    height: 73,
    borderColor: colors.text2,
    borderRadius: 73,
    backgroundColor: colors.text2,
  },
  starText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 9.5,
  },
  name: {
    height: 36.5,
    fontSize: 16,
    color: colors.on_primary,
    fontWeight: '700',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTextWrap: {
    marginLeft: 19,
  },
  topBtnWrap: {
    flexDirection: 'row',
    width: 54,
    justifyContent: 'space-between',
    marginLeft: 110,
  },
});

export default PickupDetailScreen;

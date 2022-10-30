import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import colors from '../../assets/color';
import PickupTop from '../../components/Pickup/PickupTop';
import InfoItem from '../../components/Pickup/InfoItem';
import PlaceInfo from '../../components/Pickup/PlaceInfo';
import UserInfo from '../../components/Pickup/UserInfo';
import FilmRegisterInfo from '../../components/Pickup/FilmRegisterInfo';
import PickupFee from '../../components/Pickup/PickupFee';
import StoreButton from '../../components/Pickup/StoreButtonRight';
import {getLaboratory} from '../../api/laboratories';
import {useQuery} from 'react-query';
import {useRoute, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';
import SubmitButton from '../../components/Pickup/SubmitButton';

type PickupRegisterScreenRouteProp = RouteProp<
  RootStackParamList,
  'PickupDetail'
>;
function PickupRegisterScreen() {
  const {width} = useWindowDimensions();
  const {params} = useRoute<PickupRegisterScreenRouteProp>();
  const {id} = params;

  const {data, isLoading} = useQuery(['laboratory', id], () =>
    getLaboratory(id),
  );
  return (
    <ScrollView style={styles.fullScreen}>
      <SafeAreaView>
        <PickupTop name="신청서 작성" info={false} />
        <View style={[styles.block, {width: width}]}>
          <PlaceInfo />
          <View style={styles.underline} />
          <UserInfo />
          <View style={styles.underline} />
          <FilmRegisterInfo data={data} />
          <View style={styles.underline} />
          <PickupFee />
          <SubmitButton text="신청하기" width={width - 32} id={id} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    backgroundColor: colors.devider1,
    height: 4,
    width: '100%',
  },
});

export default PickupRegisterScreen;

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
import StoreButton from '../../components/Pickup/StoreButton';

function PickupRegisterScreen() {
  const {width} = useWindowDimensions();
  return (
    <ScrollView style={styles.fullScreen}>
      <SafeAreaView>
        <PickupTop name="신청서 작성" info={false} />
        <View style={[styles.block, {width: width}]}>
          <PlaceInfo />
          <View style={styles.underline} />
          <UserInfo />
          <View style={styles.underline} />
          <FilmRegisterInfo />
          <View style={styles.underline} />
          <PickupFee />
          <StoreButton text="신청하기" width={width - 32} src="/" />
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

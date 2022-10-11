import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import Chalkak from '../../assets/images/Login/Chalkak.svg';
import Star from '../../assets/images/Login/Star.svg';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchStore from '../../components/Pickup/SearchStore';
import StoreItem from '../../components/Pickup/StoreItem';
import PickupTop from '../../components/Pickup/PickupTop';

function PickupScreen() {
  return (
    <ScrollView style={styles.fullScreen}>
      <SafeAreaView>
        <PickupTop name="매장 선택" info={true}></PickupTop>
        <View style={styles.block}>
          <SearchStore />
          <ScrollView style={styles.fullScreen}>
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
            <StoreItem></StoreItem>
            <View style={styles.underline} />
          </ScrollView>
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
  pickupTop: {
    height: 41,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '700',
    color: colors.primary,
  },
  infoLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  storeItemWrap: {
    flex: 1,
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

export default PickupScreen;

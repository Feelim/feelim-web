import React, {useEffect, useState} from 'react';
import {KakaoMapView} from '@jiggag/react-native-kakao-maps';
import {useWindowDimensions, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';
import {View, Pressable, StyleSheet, Image, Text} from 'react-native';
import colors from '../../assets/color';
import SearchStore from '../../components/Pickup/SearchStore';
import {useQuery} from 'react-query';
import {getNearbyLaboratories} from '../../api/nearby';
import BottomModal from '../../components/Map/BottomModal';
import {mapModalState} from '../../atoms/mapModal';
import {useRecoilState} from 'recoil';
import {mapModalHeightState} from '../../atoms/mapModalHeight';
import BottomSheet from '../../components/Community/BottomSheet';
import MapBottomSheet from '../../components/Map/BottomSheet';

interface ILocation {
  latitude: number;
  longitude: number;
}

function MapScreen() {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [visible, setVisible] = useRecoilState(mapModalState);

  console.log(visible);

  // 현재 위치 버튼 클릭하면 실행되도록 바꾸기
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        console.log('granted');
      }
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
      }
    }
  }

  useEffect(() => {
    requestPermissions();

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // location && setX(location.longitude);
  // location && setY(location.latitude);

  const x = location ? location.longitude : 0;
  const y = location ? location.latitude : 0;

  console.log(x, y);

  // const data = getNearbyLaboratories(x, y);
  // console.log(data);

  // react-query error남 왜 그럼? -> 고치기..
  const {data, isLoading} = useQuery(['nearby', x, y], () =>
    getNearbyLaboratories(x, y),
  );
  console.log('hi', data);

  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.fullScreen}>
      <View style={{width: width, alignItems: 'center'}}>
        <View style={[styles.pickupTop, {width: width - 32}]}>
          <Pressable onPress={() => navigation.pop()}>
            <Image source={require('../../assets/images/Pickup/back.png')} />
          </Pressable>
          <Text style={styles.title}>내 주변 현상소</Text>
          <View></View>
        </View>
      </View>
      {/* <SearchStore /> */}
      <KakaoMapView
        markerImageUrl="https://imgur.com/a/MObdHBD" // 옵션2
        markerList={[
          {
            lat: 37.59523,
            lng: 127.086,
            markerName: 'marker',
          },
          {
            lat: 37.59523,
            lng: 127.08705,
            markerName: 'marker2',
          },
        ]}
        width={width}
        height={height - 100}
        centerPoint={{
          lat: 37.59523,
          lng: 127.086,
        }}
      />
      <Pressable
        onPress={() => {
          setVisible(true);
        }}>
        <View
          style={{
            backgroundColor: colors.on_primary,
            height: 100,
          }}
        />
      </Pressable>
      <MapBottomSheet data={data} />
      {/* <BottomModal data={data} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
  },
  pickupTop: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.primary,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 27,
  },
  infoLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
    letterSpacing: -0.408,
  },
});

export default MapScreen;

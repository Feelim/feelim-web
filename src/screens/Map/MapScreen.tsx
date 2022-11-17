import React, {useEffect, useState} from 'react';
import {
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import MapBottomSheet from '../../components/Map/MapBottomSheet';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

interface ILocation {
  latitude: number;
  longitude: number;
}

type makerObj = {
  coordinate: coordinateObj;
  id: number;
};

type coordinateObj = {
  longitude: number;
  latitude: number;
};

function MapScreen() {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [visible, setVisible] = useRecoilState(mapModalState);
  const [markerData, setMarkerData] = useState([
    {
      coordinate: {longitude: 0, latitude: 0},
      id: 0,
    },
  ]);

  console.log(visible);

  useEffect(() => {
    setVisible(false);

    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
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

  const lon = location ? location.longitude : 0;
  const lat = location ? location.latitude : 0;

  console.log(lon, lat);

  const {data, isLoading} = useQuery(['nearby', lon, lat], () =>
    getNearbyLaboratories(lat, lon),
  );
  console.log('hi', data);
  const isFocused = useIsFocused();

  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />

      <View style={{width: width, alignItems: 'center'}}>
        <View style={[styles.pickupTop, {width: width - 32}]}>
          <Pressable onPress={() => navigation.navigate('Home')} hitSlop={8}>
            <Image source={require('../../assets/images/Pickup/back.png')} />
          </Pressable>
          <Text style={styles.title}>내 주변 현상소</Text>
          <View style={{width: 24}}></View>
        </View>
      </View>
      <View style={[styles.searchWrap, {width: width}]}>
        <SearchStore />
      </View>
      <NaverMapView
        style={{width: '100%', height: height - 300, zIndex: 0}}
        showsMyLocationButton={true}
        center={{...{latitude: lat, longitude: lon}, zoom: 16}}
        onTouch={undefined}
        onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
        {isFocused &&
          data?.result.map(item => {
            return (
              <Marker
                coordinate={{latitude: item.x, longitude: item.y}}
                image={require('../../assets/images/Map/marker.png')}
                key={item.id.toString()}
                onClick={() => {
                  const id: number = item.id;
                  navigation.navigate('PickupDetail', {
                    id,
                  });
                }}
              />
            );
          })}
      </NaverMapView>
      <Pressable
        onPress={() => {
          setVisible(true);
        }}
        style={{
          alignItems: 'center',
        }}>
        <View style={styles.line}></View>
        <View
          style={{
            backgroundColor: colors.on_primary,
            height: 200,
          }}
        />
      </Pressable>
      <MapBottomSheet data={data} />
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
  searchWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    height: 4,
    width: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

export default MapScreen;

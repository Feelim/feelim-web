import React, {Children, useEffect, useState} from 'react';
import {
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  FlatList,
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
    setVisible(false);

    // const MarkerData = data?.result.map(item => {
    //   let MarkerObj: makerObj = {
    //     coordinate: {longitude: 0, latitude: 0},
    //     id: 0,
    //   };
    //   MarkerObj = {
    //     coordinate: {longitude: item.x, latitude: item.y},
    //     id: item.id,
    //   };
    //   console.log('obj', MarkerObj);
    //   return MarkerObj;
    // });

    // setMarkerData(MarkerData);

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

  const lon = location ? location.longitude : 0;
  const lat = location ? location.latitude : 0;

  const {data, isLoading} = useQuery(['nearby', lon, lat], () =>
    getNearbyLaboratories(lon, lat),
  );
  console.log('hi', data);
  const isFocused = useIsFocused();

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={{width: width, alignItems: 'center'}}>
        <View style={[styles.pickupTop, {width: width - 32}]}>
          <Pressable onPress={() => navigation.pop()}>
            <Image source={require('../../assets/images/Pickup/back.png')} />
          </Pressable>
          <Text style={styles.title}>내 주변 현상소</Text>
          <View></View>
        </View>
      </View>
      <View style={[styles.searchWrap, {width: width}]}>
        <SearchStore />
      </View>
      <NaverMapView
        style={{width: '100%', height: height - 200}}
        showsMyLocationButton={true}
        center={{...{latitude: 37.566014, longitude: 126.98993}, zoom: 16}}
        onTouch={undefined}
        onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
        {/* {markerData.map(marker => {
          return (
            <Marker
              coordinate={marker.coordinate}
              image={require('../../assets/images/Map/marker.png')}
            />
          );
        })} */}
        <FlatList
          data={data?.result}
          renderItem={({item}) => (
            <Marker
              coordinate={{latitude: item.x, longitude: item.y}}
              image={require('../../assets/images/Map/marker.png')}
            />
          )}
          keyExtractor={item => item.id.toString()}
          // ItemSeparatorComponent={() => <Divider />}
        />
        <Marker
          coordinate={P0}
          onClick={() => console.warn('onClick! p0')}
          image={require('../../assets/images/Map/marker.png')}
        />
        <Marker
          coordinate={P1}
          onClick={() => console.warn('onClick! p1')}
          image={require('../../assets/images/Map/marker.png')}
        />
        <Marker
          coordinate={P2}
          onClick={() => {
            navigation.navigate('Pickup');
          }}
          image={require('../../assets/images/Map/marker.png')}
        />
      </NaverMapView>
      <Pressable
        onPress={() => {
          setVisible(true);
        }}>
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
});

export default MapScreen;

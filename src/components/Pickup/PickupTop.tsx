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
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

type PickupType = {
  name: string;
  info: boolean;
};

function PickupTop({name, info}: PickupType) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={{width: width, alignItems: 'center'}}>
      <View style={[styles.pickupTop, {width: width - 32}]}>
        <Pressable onPress={() => navigation.pop()}>
          <Image source={require('../../assets/images/Pickup/back.png')} />
        </Pressable>
        <Text style={styles.title}>{name}</Text>
        {info ? (
          <Pressable onPress={() => navigation.navigate('PickupInfo')}>
            <Text style={styles.infoLink}>이용안내</Text>
          </Pressable>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default PickupTop;

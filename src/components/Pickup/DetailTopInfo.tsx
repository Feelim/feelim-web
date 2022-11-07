import {useNavigation} from '@react-navigation/core';
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
  Linking,
} from 'react-native';
import {Laboratory} from '../../api/types';
import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';
import Star from './Star';

type DetailTopInfoType = {
  data: Laboratory | undefined;
};

function DetailTopInfo({data}: DetailTopInfoType) {
  const {width} = useWindowDimensions();
  const [starNum, setStarNum] = useState(0);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (data?.result.star) {
      setStarNum(data?.result.star);
    }
  }, [data?.result.star]);
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={{width: width}}>
      <View style={styles.topBanner}>
        <Pressable
          onPress={() => navigation.pop()}
          style={{marginTop: 7, marginLeft: 10, height: 30, width: 30}}>
          <Image source={require('../../assets/images/Pickup/backwhite.png')} />
        </Pressable>
      </View>
      <View style={[{width: width - 32, alignSelf: 'center'}]}>
        <View style={[styles.detailTopWrap, {width: width - 32}]}>
          <View
            style={{
              width: width - 32,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <Text style={styles.name}>{data?.result.name}</Text> */}
            <Text style={styles.name}>망우삼림</Text>
            <View style={styles.starWrap}>
              <Star starNum={data?.result.star} />
              <Text style={styles.starText}>
                {/* {data?.result.star.toFixed(1)} */}
                4.8
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
            flexDirection: 'row',
            width: width - 32,
            justifyContent: 'space-between',
          }}>
          <View style={{marginBottom: 12}}>
            <Text style={styles.infoText}>{`${
              data?.result.address.city && data?.result.address.city
            }${
              data?.result.address.province
                ? ' ' + data?.result.address.province
                : ' '
            }${
              data?.result.address.street && data?.result.address.street
            }`}</Text>
            <Text style={styles.infoText}>{`Tel) ${data?.result.phone}`}</Text>
          </View>
          <Pressable
            onPress={() => {
              Linking.openURL(`tel:${data?.result.phone}`);
            }}>
            <Image
              style={[{width: 21}, {height: 21}]}
              source={require('../../assets/images/Pickup/call-icon.png')}
            />
            <Text style={styles.telText}>전화</Text>
          </Pressable>
        </View>
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
  topBanner: {
    height: 182,
    backgroundColor: colors.primary,
  },
  detailTopWrap: {
    flexDirection: 'row',
    marginTop: 12,
  },
  profile: {
    width: 73,
    height: 73,
    borderColor: colors.text2,
    borderRadius: 73,
    backgroundColor: colors.text2,
  },
  starText: {
    height: 21,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 9.5,
  },
  name: {
    height: 36.5,
    fontSize: 24,
    color: colors.primary,
    fontWeight: '700',
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBtnWrap: {
    flexDirection: 'row',
    width: 54,
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text1,
  },
  telText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 7,
  },
});
export default DetailTopInfo;

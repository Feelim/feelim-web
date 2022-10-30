import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
} from 'react-native';
import colors from '../../assets/color';
import PickupInput from './PickupInput';
import {Laboratory} from '../../api/types';

function FilmRegisterInfo({data}: {data: Laboratory}) {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <View>
        <Text style={styles.title}>필름 현상 신청 정보</Text>
      </View>
      <View style={styles.storeInfo}>
        <View style={styles.storeTextInfo}>
          <Text style={styles.subtitle}>전달 매장</Text>
          <Text style={[{fontSize: 12}]}>{data?.result.name}</Text>
          <Text style={[{fontSize: 12}]}>
            {`${data?.result.address.city && data?.result.address.city}${
              data?.result.address.province
                ? ' ' + data?.result.address.province
                : ' '
            }${data?.result.address.street && data?.result.address.street}`}
          </Text>
        </View>
        <Image
          source={require('../../assets/images/Pickup/image.png')}
          resizeMode="contain"
        />
      </View>
      <View style={[{width: width - 32}]}>
        <Text style={styles.subtitle}>신청 옵션</Text>
        <PickupInput placeholder="신청 옵션을 자세하게 기입해주세요." />
      </View>
      <View style={[{width: width - 32}]}>
        <Text style={styles.subtitle}>요구사항(특이사항)</Text>
        <PickupInput placeholder="사장님께 전달할 내용을 기입해주세요." />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 430,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
  },
  storeInfo: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeTextInfo: {
    justifyContent: 'space-between',
  },
});

export default FilmRegisterInfo;

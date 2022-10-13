import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import StoreButton from './StoreButton';

export interface StoreItemProps {
  address: {
    city: 'string';
    province: 'string';
    street: 'string';
  };
  distance: number;
  name: string;
  images: string[];
  reviewNum: number;
  star: number;
}

function StoreItem({
  address,
  images,
  distance,
  reviewNum,
  star,
  name,
}: StoreItemProps) {
  const {width} = useWindowDimensions();
  // console.log(images);
  return (
    <View style={[styles.block, {width: width}]}>
      <View style={[{height: 130}]}>
        <View style={[styles.infoWrap, {width: width - 32}]}>
          <View style={styles.textInfo}>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{name}</Text>
              <Text>·</Text>
              <Text style={styles.distance}>{distance}</Text>
              <Image source={require('../../assets/images/Pickup/frame.png')} />
            </View>
            <Text style={styles.address}>
              {`${address.city} ${address.province} ${address.street}`}
            </Text>
            <View style={styles.starWrap}>
              <Image source={require('../../assets/images/Pickup/star.png')} />
              <Text>{`${star}(${reviewNum})`}</Text>
            </View>
          </View>
          <Image source={require('../../assets/images/Pickup/image.png')} />
        </View>
        <View style={[styles.buttonWrap, {width: width - 32}]}>
          <StoreButton text="가게 정보" width={169} src="/"></StoreButton>
          <StoreButton
            text="선택"
            width={169}
            src="PickupRegister"></StoreButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    height: 160,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  distance: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.primary,
  },
  infoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInfo: {
    width: '70%',
    height: 80,
    justifyContent: 'space-between',
  },
  textWrap: {
    width: 200,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  address: {
    fontSize: 14,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  input: {
    flex: 1,
    height: 32,
    backgroundColor: '#F2F2F2',
    borderRadius: 32,
    padding: 10,
    color: colors.text2,
    marginRight: 5,
  },
});

export default StoreItem;

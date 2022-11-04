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
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

export interface ModalItemProps {
  address: {
    city: string;
    province: string;
    street: string;
  };
  distance: number;
  name: string;
  images: string[];
  reviewNum: number;
  star: number;
  id: number;
}

function ModalItem({
  address,
  images,
  distance,
  reviewNum,
  star,
  name,
  id,
}: ModalItemProps) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PickupDetail', {
          id,
        });
      }}>
      <View style={[styles.block, {width: width}]}>
        <View style={[{height: 90}]}>
          <View style={[styles.infoWrap, {width: width - 32}]}>
            <View style={styles.textInfo}>
              <View style={styles.textWrap}>
                <Text style={styles.title}>{name}</Text>
                <Text>·</Text>
                <Text style={styles.distance}>
                  {(distance / 1000).toFixed(1)}
                </Text>
                <Image
                  source={require('../../assets/images/Pickup/frame.png')}
                />
              </View>
              <Text style={styles.address}>
                {`${address.city && address.city}${
                  address.province ? ' ' + address.province : ' '
                }${address.street && address.street}`}
              </Text>
              <View style={styles.starWrap}>
                <Image
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Text>{`${star.toFixed(1)}(${reviewNum})`}</Text>
              </View>
            </View>
            <Image source={require('../../assets/images/Pickup/image.png')} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    height: 120,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.on_primary,
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
});

export default ModalItem;

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
import {useRecoilState} from 'recoil';
import {mapModalState} from '../../atoms/mapModal';

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
  const [visible, setVisible] = useRecoilState(mapModalState);
  const navigation = useNavigation<RootStackNavigationProp>();

  console.log(images[0], images.length);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PickupDetail', {
          id,
        });
        setVisible(false);
      }}>
      <View style={[styles.block, {width: width}]}>
        <View style={[{height: 90}]}>
          <View style={[styles.infoWrap, {width: width - 32}]}>
            <View style={styles.textInfo}>
              <View style={styles.textWrap}>
                <Text style={styles.title}>{name}</Text>
                <Text>·</Text>
                <Text style={styles.distance}>
                  {distance < 1000
                    ? `${distance.toFixed(1)}m`
                    : `${(distance / 1000).toFixed(1)}km`}
                </Text>
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
            <Image
              style={{width: 72, height: 72, borderRadius: 3}}
              source={
                images.length >= 1
                  ? {uri: `${images[0]}`}
                  : require('../../assets/images/Pickup/image.png')
              }
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
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
    width: 160,
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

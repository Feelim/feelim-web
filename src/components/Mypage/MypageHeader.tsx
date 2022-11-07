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
import {QueryClient, useQueryClient} from 'react-query';
import {useRecoilState} from 'recoil';
import {patchProfileState} from '../../atoms/patchProfile';

type HeaderType = {
  name: string;
  edit: boolean;

  complete: boolean;
};

function MypageHeader({name, edit, complete}: HeaderType) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [patch, setPatch] = useRecoilState(patchProfileState);
  return (
    <View style={{width: width, alignItems: 'center'}}>
      <View style={[styles.pickupTop, {width: width - 32}]}>
        <Pressable onPress={() => navigation.pop()} hitSlop={8}>
          <Image source={require('../../assets/images/Pickup/back.png')} />
        </Pressable>

        {edit && (
          <Pressable hitSlop={8} onPress={() => navigation.navigate('Edit')}>
            <Text style={styles.infoLink}>편집</Text>
          </Pressable>
        )}
        {complete && (
          <Pressable
            hitSlop={8}
            onPress={() => {
              setPatch(true);
            }}>
            <Text style={styles.complete}>완료</Text>
          </Pressable>
        )}
      </View>
      <Text style={[styles.title, {}]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pickupTop: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.primary,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 27,
    position: 'absolute',
    top: 8,
  },
  infoLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
    letterSpacing: -0.408,
    color: colors.text1,
  },
  complete: {
    fontSize: 12,
    textDecorationLine: 'underline',
    letterSpacing: -0.408,
    color: '#3F97BD',
  },
});

export default MypageHeader;

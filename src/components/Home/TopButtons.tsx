import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import colors from '../../assets/color';
import Star from '../../assets/images/Home/Star.svg';
import Photographer from '../../assets/images/Home/Photographer.svg';
import TopButtonsItem from './TopButtonsItem';
import Use from '../../assets/images/Home/Use.svg';
import Camera from '../../assets/images/Home/Camera.svg';
import Film from '../../assets/images/Home/Film.svg';
import Market from '../../assets/images/Home/Market.svg';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

function TopButtons() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {width} = useWindowDimensions();
  const itemWidth = width - 48;

  return (
    <View style={styles.block}>
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.whiteBtn, {width: itemWidth}]}
          onPress={() => navigation.navigate('Map')}>
          <View style={styles.textSection}>
            <Text style={styles.sub}>
              내 주변에 있는 {'\n'}현상소가 궁금하다면?
            </Text>
            <Text style={styles.text}>내 주변 현상소</Text>
          </View>
          <Photographer />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
  },
  topBtns: {
    display: 'flex',
  },
  whiteBtn: {
    backgroundColor: colors.secondary,
    height: 128,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 48,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    borderWidth: 3,
    borderRightWidth: 0,
    paddingLeft: 28,
    paddingRight: 9,
    paddingVertical: 10,
  },
  textSection: {},
  sub: {
    color: colors.text3,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.408,
    fontWeight: '400',
    marginBottom: 20,
  },

  text: {
    color: '#000000',
    fontSize: 18,
    fontFamily: colors.bold,
    letterSpacing: -0.408,
    lineHeight: 27,
  },
});

export default TopButtons;

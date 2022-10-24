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

  return (
    <View style={{width: width}}>
      <View style={styles.topBanner} />
      <View style={[{width: width - 32, alignSelf: 'center'}]}>
        <View style={[styles.detailTopWrap, {width: width - 32}]}>
          <View style={styles.profile}></View>
          <View style={[styles.topTextWrap, {width: width - 124}]}>
            <Text style={styles.name}>{data?.result.name}</Text>
            <View style={[styles.topInfo]}>
              <View style={styles.starWrap}>
                <Image
                  style={starNum >= 1 ? [{opacity: 1}] : [{opacity: 0.2}]}
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Image
                  style={starNum >= 2 ? [{opacity: 1}] : [{opacity: 0.2}]}
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Image
                  style={starNum >= 3 ? [{opacity: 1}] : [{opacity: 0.2}]}
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Image
                  style={starNum >= 4 ? [{opacity: 1}] : [{opacity: 0.2}]}
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Image
                  style={starNum >= 5 ? [{opacity: 1}] : [{opacity: 0.2}]}
                  source={require('../../assets/images/Pickup/star.png')}
                />
                <Text style={styles.starText}>{data?.result.star}</Text>
              </View>
              <View style={styles.topBtnWrap}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${data?.result.phone}`);
                  }}>
                  <Image
                    style={[{width: 21}, {height: 21}]}
                    source={require('../../assets/images/Pickup/call-icon.png')}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setLike(!like);
                  }}>
                  {like ? (
                    <Image
                      style={[{width: 21}, {height: 21}]}
                      source={require('../../assets/images/Pickup/like-clicked.png')}
                    />
                  ) : (
                    <Image
                      style={[{width: 21}, {height: 21}]}
                      source={require('../../assets/images/Pickup/like.png')}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            width: width - 32,
            justifyContent: 'space-between',
          }}>
          <View style={{marginBottom: 12}}>
            <Text style={styles.infoText}>서울 중구 을지로 108 3층</Text>
            <Text style={styles.infoText}>{`Tel) ${data?.result.phone}`}</Text>
          </View>
          <Image source={require('../../assets/images/Pickup/frame.png')} />
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
    marginTop: -30,
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
    fontSize: 16,
    color: colors.on_primary,
    fontWeight: '700',
  },
  starWrap: {
    flexDirection: 'row',
    height: 21,
    alignItems: 'center',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topTextWrap: {
    marginLeft: 19,
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
});
export default DetailTopInfo;

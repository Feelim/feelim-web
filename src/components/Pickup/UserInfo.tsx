import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useWindowDimensions, Image} from 'react-native';
import colors from '../../assets/color';

function UserInfo() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>신청자 정보</Text>
          <Text style={styles.modify}>변경하기</Text>
        </View>
        <View style={styles.alertWrap}>
          <Image
            style={styles.alertImage}
            source={require('../../assets/images/Pickup/alert.png')}
          />
          <View>
            <Text style={styles.alertTextBold}>꼭 확인해주세요!</Text>
            <Text style={styles.alertText}>
              이곳에 적힌 전화번호와 이메일로 알림, 링크를 보내드립니다.
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[{color: colors.primary, fontSize: 12}]}>홍길동</Text>
        <Text style={[{color: colors.primary, fontSize: 12}]}>
          010-1234-5678
        </Text>
        <Text style={[{color: colors.primary, fontSize: 12}]}>
          kildongiii@naver.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 180,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  alertTextBold: {
    fontSize: 11,
    color: '#FF7979',
    fontWeight: '400',
  },
  alertText: {
    fontSize: 11,
    fontWeight: '400',
  },
  titleWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  alertImage: {
    marginRight: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  modify: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default UserInfo;

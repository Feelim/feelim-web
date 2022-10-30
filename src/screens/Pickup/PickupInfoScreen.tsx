import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import colors from '../../assets/color';
import PickupTop from '../../components/Pickup/PickupTop';
import InfoItem from '../../components/Pickup/InfoItem';

function PickupInfoScreen() {
  return (
    <ScrollView style={styles.fullScreen}>
      <SafeAreaView>
        <PickupTop name="이용안내" info={false}></PickupTop>
        <View style={styles.block}>
          <InfoItem
            title="1. 신청하기"
            source={require('../../assets/images/Pickup/info1.png')}
            explanation="원하는 매장을 선택하신 후, 신청 정보를 정확히 입력해 주세요."
          />
          <InfoItem
            title="2. 필름 문 앞에 두기"
            source={require('../../assets/images/Pickup/info2.png')}
            explanation="최소 3개 이상의 필름들을 에코백, 종이 가방 등 편한 곳에 담아주세요."
          />
          <InfoItem
            title="3. 실시간 알림 확인하기"
            source={require('../../assets/images/Pickup/info3.png')}
            explanation="푸시 알림으로 필름 현상 진행 사항을 알려드려요."
          />
          <InfoItem
            title="4. 현상 완료"
            source={require('../../assets/images/Pickup/info4.png')}
            explanation="신청할 때 작성한 이메일이나 웹하드, 문자 내역을 꼭 확인해주세요. 현상 완료된 필름은 폐기하거나, 다시 수거 요청 하실 수 있어요."
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
    overflow: 'scroll',
  },
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
  storeItemWrap: {
    flex: 1,
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    backgroundColor: colors.devider1,
    height: 4,
    width: '100%',
  },
});

export default PickupInfoScreen;

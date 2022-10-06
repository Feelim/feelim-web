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

function PickupFee() {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <View style={styles.textWrap}>
        <Text style={styles.subtitle}>픽업비용</Text>
        <Text style={styles.subtitle}>+ 5,000원</Text>
      </View>
      <Text style={styles.text}>
        현상소에서 픽업비용을 합한 주문 확인서를 보내드립니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 80,
    justifyContent: 'center',
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  text: {
    fontSize: 11,
    marginTop: 5,
  },
});

export default PickupFee;

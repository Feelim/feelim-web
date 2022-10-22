import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';
import colors from '../../assets/color';
import PickupFee from './PickupFee';
import Introduction from './Introduction';
import {Laboratory} from '../../api/types';
import Review from './Review';

type DetailBottomInfoType = {
  data: Laboratory | undefined;
};

function DetailBottomInfo({data}: DetailBottomInfoType) {
  const {width} = useWindowDimensions();
  const [tabSelected, setTabSelected] = useState(true);

  return (
    <View style={{width: width, alignItems: 'center'}}>
      <View style={[{width: width - 32}, styles.tabButtons]}>
        <Pressable
          style={{width: '50%'}}
          onPress={() => {
            setTabSelected(true);
          }}>
          <View style={styles.tabButton}>
            <Text
              style={
                tabSelected
                  ? styles.tabButtonSelectedText
                  : styles.tabButtonText
              }>
              상세정보
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{width: '50%'}}
          onPress={() => {
            setTabSelected(false);
          }}>
          <View style={styles.tabButton}>
            <Text
              style={
                tabSelected
                  ? styles.tabButtonText
                  : styles.tabButtonSelectedText
              }>{`후기(${data?.result.reviewNum})`}</Text>
          </View>
        </Pressable>
      </View>
      <View style={[styles.divider, {width: width}]} />
      <View
        style={[
          styles.dividerSelected,
          {width: width / 2, marginTop: -1},
          tabSelected ? {alignSelf: 'flex-start'} : {alignSelf: 'flex-end'},
        ]}
      />
      <View style={{width: width - 32}}>
        {tabSelected ? <Introduction data={data} /> : <Review />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButtons: {
    flexDirection: 'row',
    height: 55,
  },
  tabButton: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.text5,
  },
  dividerSelected: {
    height: 2,
    backgroundColor: colors.primary,
  },
  tabButtonSelectedText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text1,
    marginTop: 12,
    marginBottom: 15,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text5,
    marginTop: 12,
    marginBottom: 12,
  },
});

export default DetailBottomInfo;

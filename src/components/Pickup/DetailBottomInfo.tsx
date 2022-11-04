import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  FlatList,
} from 'react-native';
import colors from '../../assets/color';
import PickupFee from './PickupFee';
import Introduction from './Introduction';
import {Laboratory} from '../../api/types';
import Review from './ReviewComponent';
import MaterialTabs from 'react-native-material-tabs';
import Divider from './Divider';
import ReviewComponent from './ReviewComponent';

type DetailBottomInfoType = {
  data: Laboratory | undefined;
};

function DetailBottomInfo({data}: DetailBottomInfoType) {
  const {width} = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(data?.result.reviews);

  return (
    <View style={{width: width, alignItems: 'center'}}>
      <View style={[{width: width}, styles.tabButtons]}>
        <View style={{width: width}}>
          <MaterialTabs
            items={['상세 정보', `후기(${data?.result.reviewNum}건)`]}
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            barColor="#ffffff"
            indicatorColor={colors.primary}
            activeTextColor={colors.primary}
            inactiveTextColor={colors.text3}
            textStyle={{fontSize: 14, fontFamily: 'NotoSansKR-Regular'}}
            activeTextStyle={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 24,
              letterSpacing: -0.408,
            }}
            uppercase={false}
            barHeight={41}
          />
        </View>
      </View>
      <View style={{width: width, alignItems: 'center'}}>
        {selectedTab === 0 ? (
          <Introduction data={data} />
        ) : (
          <FlatList
            data={data?.result.reviews}
            renderItem={({item}) => <ReviewComponent data={item} />}
            keyExtractor={item => item.reviewId.toString()}
            // ItemSeparatorComponent={() => <Divider />}
          />
          // <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block2: {
    width: 300,
    paddingLeft: 24,
  },
  // --
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

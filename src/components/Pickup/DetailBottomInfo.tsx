import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../../assets/color';
import PickupFee from './PickupFee';
import Introduction from './Introduction';
import {Laboratory} from '../../api/types';
import Review from './ReviewComponent';
import MaterialTabs from 'react-native-material-tabs';
import Divider from './Divider';
import ReviewComponent from './ReviewComponent';
import Star from './Star';

type DetailBottomInfoType = {
  data: Laboratory | undefined;
};

function DetailBottomInfo({data}: DetailBottomInfoType) {
  const {width} = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(data?.result.reviews);

  return (
    <View style={{width: width, alignItems: 'center', flex: 1}}>
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
      <ScrollView style={{width: width, flex: 1}}>
        {selectedTab === 0 ? (
          <Introduction data={data} />
        ) : (
          <View style={{width: width, alignItems: 'center', paddingBottom: 20}}>
            <View style={{width: width - 32}}>
              <View style={styles.reviewTopWrap}>
                <View>
                  <View style={styles.reviewStarWrap}>
                    <Star starNum={5} />
                    <Text style={styles.starText}>
                      {data?.result.star.toFixed(1)}
                    </Text>
                  </View>
                  <Text
                    style={
                      styles.reviewNumText
                    }>{`${data?.result.reviewNum}건의 후기가 있어요.`}</Text>
                </View>
                <Pressable>
                  <View style={styles.writeButton}>
                    <Text style={{color: colors.on_primary, fontSize: 12}}>
                      후기 작성
                    </Text>
                  </View>
                </Pressable>
              </View>
              <FlatList
                data={data?.result.reviews}
                renderItem={({item}) => <ReviewComponent data={item} />}
                keyExtractor={item => item.reviewId.toString()}
                // ItemSeparatorComponent={() => <Divider />}
              />
              <FlatList
                data={data?.result.reviews}
                renderItem={({item}) => <ReviewComponent data={item} />}
                keyExtractor={item => item.reviewId.toString()}
                // ItemSeparatorComponent={() => <Divider />}
              />
            </View>
          </View>

          // <View></View>
        )}
      </ScrollView>
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
  reviewTopWrap: {
    padding: 16,
    borderWidth: 0,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 0.1,
  },
  starText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 12,
  },
  reviewStarWrap: {
    flexDirection: 'row',
  },
  reviewNumText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
  writeButton: {
    width: 80,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.on_primary,
  },
});

export default DetailBottomInfo;

import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import colors from '../../assets/color';
import MaterialTabs from 'react-native-material-tabs';
import {useSetRecoilState} from 'recoil';
import {categoryFilterState} from '../../atoms/category';

function PageFilter() {
  const [selectedTab, setSelectedTab] = useState(0);
  const setCategoryFilter = useSetRecoilState(categoryFilterState);

  useEffect(() => {
    setCategoryFilter(selectedTab);
  }, [selectedTab]);

  return (
    <>
      <View style={styles.block}>
        <MaterialTabs
          items={['전체', '카메라', '필름', 'QnA']}
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
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    width: 300,
    paddingLeft: 24,
  },
});

export default PageFilter;

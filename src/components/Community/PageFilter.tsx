import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import colors from '../../assets/color';
import MaterialTabs from 'react-native-material-tabs';

function PageFilter() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
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
        activeTextStyle={{fontSize: 16, fontFamily: 'NotoSansKR-Bold'}}
        uppercase={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingLeft: 24,
    width: 300,
    // backgroundColor: 'blue',
    paddingBottom: 0,
    marginBottom: -140,
  },
  filter: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  text: {
    fontSize: 14,
    color: colors.text3,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.primary,
  },
});

export default PageFilter;

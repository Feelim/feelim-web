import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import colors from '../../assets/color';
import MaterialTabs from 'react-native-material-tabs';
import {Tab} from '@rneui/themed';

function PageFilter() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);

  const onPress1 = () => {
    setSelect1(true);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
  };
  const onPress2 = () => {
    setSelect1(false);
    setSelect2(true);
    setSelect3(false);
    setSelect4(false);
  };
  const onPress3 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(true);
    setSelect4(false);
  };
  const onPress4 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(true);
  };

  return (
    <>
      {/* <View style={styles.block2}>
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
      </View> */}
      <View style={styles.block}>
        <Pressable
          style={[styles.filter, select1 && styles.selectedFilter]}
          onPress={onPress1}>
          <Text style={[styles.text, select1 && styles.selectedText]}>
            전체
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filter, select2 && styles.selectedFilter]}
          onPress={onPress2}>
          <Text style={[styles.text, select2 && styles.selectedText]}>
            카메라
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filter, select3 && styles.selectedFilter]}
          onPress={onPress3}>
          <Text style={[styles.text, select3 && styles.selectedText]}>
            필름
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filter, select4 && styles.selectedFilter]}
          onPress={onPress4}>
          <Text style={[styles.text, select4 && styles.selectedText]}>QnA</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingLeft: 24,
    paddingBottom: 0,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  block2: {
    width: 300,
    paddingLeft: 24,
  },
  filter: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    paddingBottom: 7,
  },
  text: {
    fontSize: 14,
    color: colors.text3,
    lineHeight: 24,
  },
  selectedFilter: {
    borderBottomColor: colors.text1,
    borderBottomWidth: 2,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.primary,
  },
});

export default PageFilter;

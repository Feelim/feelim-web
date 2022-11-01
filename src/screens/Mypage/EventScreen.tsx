import {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';

function EventScreen() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="이벤트" edit={false} complete={false} />
      <ScrollView style={styles.block}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Home/banner.png')}
          />
          <Text style={styles.title}>필름사면 하나더</Text>
          <Text style={styles.date}>2022. 10. 01 ~ 2022. 10. 31</Text>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Home/banner.png')}
          />
          <Text style={styles.title}>필름사면 하나더</Text>
          <Text style={styles.date}>2022. 10. 01 ~ 2022. 10. 31</Text>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Home/banner.png')}
          />
          <Text style={styles.title}>필름사면 하나더</Text>
          <Text style={styles.date}>2022. 10. 01 ~ 2022. 10. 31</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  block: {
    flex: 1,
  },
  item: {
    paddingTop: 21,
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 4,
  },
  image: {
    width: '100%',
    height: 179,
    marginBottom: 12,
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    marginBottom: 4,
  },
  date: {
    color: colors.text3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.408,
  },
});

export default EventScreen;

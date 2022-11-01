import {ScrollView, StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/color';

function NoticeContent() {
  return (
    <View style={styles.block}>
      <View style={styles.top}>
        <Text style={styles.title}>찰칵 서비스 이용약관 개정안내</Text>
        <Text style={styles.date}>2022.10.01</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 13,
  },
  top: {
    height: 67,
    paddingLeft: 24,
    paddingRight: 22,
    paddingTop: 8,
    paddingBottom: 13,
    justifyContent: 'center',
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
  },
  title: {
    color: colors.text1,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    fontWeight: '400',
    marginBottom: 4,
  },
  date: {
    color: colors.text3,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.408,
  },
  content: {
    paddingTop: 13.5,
    paddingLeft: 24,
    paddingRight: 30,
  },
  text: {
    color: colors.text1,
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: -0.408,
    fontWeight: '400',
  },
});

export default NoticeContent;

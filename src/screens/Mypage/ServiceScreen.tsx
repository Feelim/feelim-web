import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';

function ServiceScreen() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="고객센터" edit={false} complete={false} />
      <View style={styles.block}>
        <Text style={styles.title}>이메일 문의</Text>
        <Text style={styles.content}>
          운영진이 24시간 내에 문의하신 메일로 답변을 드립니다!
        </Text>
        <Text style={styles.email}>sdjfashkdjlfhsadkf@naver.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  block: {
    paddingTop: 28,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: colors.bold,
    lineHeight: 24,
    letterSpacing: -0.408,
    color: colors.text1,
    marginBottom: 8,
  },
  content: {
    color: colors.text3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.408,
    marginBottom: 32,
  },
  email: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.408,
    color: '#3886b1',
    textDecorationLine: 'underline',
  },
});

export default ServiceScreen;

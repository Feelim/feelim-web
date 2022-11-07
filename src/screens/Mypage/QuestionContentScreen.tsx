import {RouteProp, useRoute} from '@react-navigation/core';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import dummy from '../../assets/dummy.json';
import MypageHeader from '../../components/Mypage/MypageHeader';
import {RootStackParamList} from '../types';

type QuestionContentScreenRouteProp = RouteProp<
  RootStackParamList,
  'QuestionContent'
>;

function QuestionContentScreen() {
  const {params} = useRoute<QuestionContentScreenRouteProp>();
  const item = dummy.question[params.id];

  return (
    <SafeAreaView style={styles.block}>
      <MypageHeader name="자주 묻는 질문" edit={false} complete={false} />
      <View style={styles.top}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.filter}</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>{item.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  top: {
    height: 80,
    paddingLeft: 24,
    paddingRight: 24,
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
    flex: 1,
  },
});

export default QuestionContentScreen;

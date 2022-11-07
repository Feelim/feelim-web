import {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import NoticeContent from '../../components/Mypage/NoticeContent';
import NoticeFeed from '../../components/Mypage/NoticeFeed';
import More from '../../assets/images/Mypage/More.svg';

import dummy from '../../assets/dummy.json';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../types';

function QuestionScreen() {
  const [press, setPress] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPressItem = (id: number) => {
    navigation.navigate('QuestionContent', {id});
  };
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="자주 묻는 질문" edit={false} complete={false} />
      <View style={styles.block}>
        <FlatList
          data={dummy.question}
          renderItem={({item}) => {
            return (
              <Pressable
                style={styles.item}
                onPress={() => onPressItem(item.id)}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>{item.filter}</Text>
                </View>
                <More />
              </Pressable>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
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
    flex: 1,
    paddingVertical: 13,
  },
  item: {
    height: 88,
    paddingLeft: 24,
    paddingRight: 22,
    paddingTop: 8,
    paddingBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 300,
  },
  date: {
    color: colors.text3,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.408,
  },
});

export default QuestionScreen;

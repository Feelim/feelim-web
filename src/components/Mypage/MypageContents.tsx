import {Pressable, StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/color';
import Film from '../../assets/images/Mypage/items/Film.svg';
import Heart from '../../assets/images/Mypage/items/Heart.svg';
import Notice from '../../assets/images/Mypage/items/Notice.svg';
import Event from '../../assets/images/Mypage/items/Event.svg';
import Set from '../../assets/images/Mypage/items/Set.svg';
import Terms from '../../assets/images/Mypage/items/Terms.svg';
import Question from '../../assets/images/Mypage/items/Question.svg';
import Service from '../../assets/images/Mypage/items/Service.svg';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../../screens/types';

function MypageContents() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressNotice = () => {
    navigation.navigate('Notice');
  };
  const onPressEvent = () => {
    navigation.navigate('Event');
  };
  const onPressSetting = () => {
    navigation.navigate('Setting');
  };
  const onPressService = () => {
    navigation.navigate('Service');
  };
  const onPressQuestion = () => {
    navigation.navigate('Question');
  };
  const onPressTerms = () => {
    navigation.navigate('Terms');
  };
  return (
    <View style={styles.block}>
      {/* <Pressable style={styles.item}>
        <Film />
        <Text style={styles.text}>비대면 현상 신청내역</Text>
      </Pressable>
      <Pressable style={styles.item}>
        <Heart />
        <Text style={styles.text}>찜한 현상소</Text>
      </Pressable> */}
      <Pressable style={styles.item} onPress={onPressNotice}>
        <Notice />
        <Text style={styles.text}>공지사항</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onPressEvent}>
        <Event />
        <Text style={styles.text}>이벤트</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onPressSetting}>
        <Set />
        <Text style={styles.text}>환경설정</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onPressTerms}>
        <Terms />
        <Text style={styles.text}>운영정책 및 약관</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onPressQuestion}>
        <Question />
        <Text style={styles.text}>자주 묻는 질문</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onPressService}>
        <Service />
        <Text style={styles.text}>고객센터</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  item: {
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
  },
  text: {
    color: colors.text1,
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '400',
    marginLeft: 12,
  },
});

export default MypageContents;

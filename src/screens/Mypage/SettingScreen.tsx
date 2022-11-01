import {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import LangBtn from '../../assets/images/Mypage/LangBtn.svg';
function SettingScreen() {
  const [isAlarm, setIsAlarm] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const toggleAlarm = () => setIsAlarm(previousState => !previousState);
  const toggleEvent = () => setIsEvent(previousState => !previousState);
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="환경설정" edit={false} complete={false} />
      <View style={styles.alarm}>
        <Text style={styles.title}>알림</Text>
        <View
          style={[
            styles.alarmItem,
            {
              marginTop: 3,
              borderBottomColor: colors.devider1,
              borderBottomWidth: 1,
            },
          ]}>
          <Text style={styles.alarmText}>서비스 알림받기</Text>
          <Switch onValueChange={toggleAlarm} value={isAlarm} />
        </View>
        <View style={styles.alarmItem}>
          <Text style={styles.alarmText}>이벤트 알림받기</Text>
          <Switch onValueChange={toggleEvent} value={isEvent} />
        </View>
      </View>
      <View style={styles.language}>
        <Text style={styles.title}>언어</Text>
        <Pressable style={styles.langButton}>
          <Text style={styles.langText}>한국어</Text>
          <LangBtn />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  alarm: {
    paddingTop: 16,
  },
  alarmItem: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  alarmText: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: -0.408,
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 14,
    lineHeight: 21,
    color: '#000000',
    paddingHorizontal: 24,
  },
  language: {
    height: 61,
    borderTopColor: colors.devider1,
    borderTopWidth: 4,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginRight: 8,
  },
});

export default SettingScreen;

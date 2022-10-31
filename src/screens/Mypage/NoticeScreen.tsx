import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import NoticeContent from '../../components/Mypage/NoticeContent';
import NoticeFeed from '../../components/Mypage/NoticeFeed';

function NoticeScreen() {
  const [press, setPress] = useState(false);
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="공지사항" edit={false} complete={false} />
      {!press && <NoticeFeed setPress={setPress} />}
      {press && <NoticeContent />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
});

export default NoticeScreen;

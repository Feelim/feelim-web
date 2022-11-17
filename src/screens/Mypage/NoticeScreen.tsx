import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import NoticeContent from '../../components/Mypage/NoticeContent';
import NoticeFeed from '../../components/Mypage/NoticeFeed';

const item = [
  {
    title: '찰칵 서비스 이용약관 개정안내',
    date: '2022.10.11',
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `,
  },
];

function NoticeScreen() {
  const [press, setPress] = useState(false);
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="공지사항" edit={false} complete={false} />
      {/* {!press && <NoticeFeed setPress={setPress} />}
      {press && (
        <NoticeContent
          title={item[0].title}
          date={item[0].date}
          content={item[0].content}
        />
      )} */}
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

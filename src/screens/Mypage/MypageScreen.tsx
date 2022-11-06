import {
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import LogoutSection from '../../components/Mypage/LogoutSection';
import MypageContents from '../../components/Mypage/MypageContents';
import MypageHeader from '../../components/Mypage/MypageHeader';
import ProfileInfo from '../../components/Mypage/ProfileInfo';

function MypageScreen() {
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar backgroundColor={colors.on_primary} barStyle="dark-content" />
      <MypageHeader name="마이페이지" edit={true} complete={false} />
      <ProfileInfo />
      <View style={styles.banner}>
        <View style={[styles.bannerBox, {width: width - 32}]} />
      </View>
      <ScrollView style={{overflow: 'scroll', flex: 1}}>
        <MypageContents />
        <LogoutSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  banner: {
    height: 64,
    borderTopColor: colors.devider1,
    borderTopWidth: 4,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 4,
  },
  bannerBox: {
    backgroundColor: '#d9d9d9',
    borderRadius: 3,
    marginHorizontal: 16,
    marginVertical: 4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MypageScreen;

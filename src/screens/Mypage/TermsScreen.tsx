import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import More from '../../assets/images/Mypage/More.svg';
function TermsScreen() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <MypageHeader name="운영정책 및 약관" edit={false} complete={false} />
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => {
            Linking.openURL(
              'https://gifted-gasosaurus-d61.notion.site/8cc0c638e82a4a97bd4c599b599583e3',
            );
          }}>
          <Text style={styles.text}>이용 약관</Text>
          <More />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => {
            Linking.openURL(
              'https://gifted-gasosaurus-d61.notion.site/e8077cee9b9749358384cadfeb527c9c',
            );
          }}>
          <Text style={styles.text}>위치 기반 서비스 이용약관</Text>
          <More />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => {
            Linking.openURL(
              'https://gifted-gasosaurus-d61.notion.site/caefc62c984246d2a04b91e444df00e7',
            );
          }}>
          <Text style={styles.text}>개인정보 처리 방침</Text>
          <More />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => {
            Linking.openURL(
              'https://gifted-gasosaurus-d61.notion.site/950751ae104246589ac5aa89919f7566',
            );
          }}>
          <Text style={styles.text}>마켓팅 정보 수집 및 수신 동의</Text>
          <More />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: colors.on_primary,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 12,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    height: 40,
  },
  text: {
    color: colors.text1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.408,
  },
});

export default TermsScreen;

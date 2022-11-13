import {Image, StyleSheet, View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {getMyProfile} from '../../api/mypage';
import colors from '../../assets/color';
import KakaoEmail from '../../assets/images/Mypage/KakaoEmail.svg';

function ProfileInfo() {
  const profileQuery = useQuery('myProfile', getMyProfile);
  console.log(profileQuery.data);
  return (
    <View style={styles.block}>
      <Image
        style={styles.image}
        source={{uri: profileQuery.data?.result?.image}}
      />
      <View style={styles.info}>
        <Text style={styles.nickname}>
          {profileQuery.data?.result?.nickname}
        </Text>
        <View style={styles.email}>
          {/* <KakaoEmail /> */}
          {profileQuery.data?.result?.email.includes('@apple') ? (
            <Image
              source={require('../../assets/images/Mypage/AppleEmail.png')}
            />
          ) : (
            <Image
              source={require('../../assets/images/Mypage/KakaoEmail.png')}
            />
          )}
          <Text style={styles.emailText}>
            {profileQuery.data?.result?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 95,
    paddingLeft: 24,
    paddingTop: 13,
    paddingBottom: 24,
    flexDirection: 'row',
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    marginRight: 13,
  },
  info: {
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 16,
    fontFamily: colors.bold,
    color: colors.text1,
    letterSpacing: -0.408,
    lineHeight: 24,
    marginBottom: 4,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    color: colors.text3,
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: -0.408,
    marginLeft: 4,
  },
});

export default ProfileInfo;

import {Pressable, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';

function LogoutSection() {
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.items}>
        <Pressable hitSlop={8}>
          <Text style={styles.text}>회원탈퇴</Text>
        </Pressable>
        <View style={styles.bar} />
        <Pressable hitSlop={8}>
          <Text style={styles.text}>로그아웃</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 114,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 13.5,
    marginRight: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: colors.text3,
    textDecorationLine: 'underline',
  },
  bar: {
    width: 1,
    height: 13,
    backgroundColor: colors.text3,
    marginHorizontal: 18.5,
  },
});

export default LogoutSection;

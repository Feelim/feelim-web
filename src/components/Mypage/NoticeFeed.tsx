import {Pressable, ScrollView, StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/color';
import Back from '../../assets/images/Mypage/Back.svg';

function NoticeFeed({setPress}: any) {
  const onPressItem = () => {
    setPress(true);
  };
  return (
    <ScrollView style={styles.block}>
      <Pressable style={styles.item} onPress={onPressItem}>
        <View>
          <Text style={styles.title}>찰칵 서비스 이용약관 개정안내</Text>
          <Text style={styles.date}>2022.10.01</Text>
        </View>
        <Back />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 13,
  },
  item: {
    height: 67,
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
  },
  date: {
    color: colors.text3,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.408,
  },
});

export default NoticeFeed;

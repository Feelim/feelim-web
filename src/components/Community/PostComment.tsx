import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import CommentMore from '../../assets/images/Community/CommentMore.svg';
import colors from '../../assets/color';

function PostComment() {
  return (
    <View style={styles.block}>
      <View style={styles.info}>
        <View style={styles.userInfo}>
          <Image style={styles.userImage} />
          <Text style={styles.userName}>블루</Text>
          <Text style={styles.date}>2022.10.11.</Text>
          <Text style={styles.time}>09:13</Text>
        </View>
        <Pressable>
          <CommentMore />
        </Pressable>
      </View>
      <Text style={styles.content}>
        렌즈에 이상이 없다면 대부분 사진에는 영향이 없습니다. 그정도 먼지는 늘
        있습니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 12,
    borderTopColor: colors.devider1,
    borderTopWidth: 1,
    height: 93,
    marginBottom: 16,
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 9,
    backgroundColor: 'black',
  },
  userName: {
    fontSize: 14,
    fontFamily: colors.bold,
    marginRight: 12,
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    color: '#adadad',
    letterSpacing: -0.408,
    marginRight: 5,
  },
  time: {
    fontSize: 11,
    fontWeight: '400',
    color: '#adadad',
    letterSpacing: -0.408,
  },
  content: {
    marginLeft: 62,
    fontSize: 13,
    color: colors.text1,
  },
});

export default PostComment;

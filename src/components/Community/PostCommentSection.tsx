import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import colors from '../../assets/color';
import PostComment from './PostComment';

function PostCommentSection() {
  return (
    <View style={[styles.block]}>
      <View style={styles.commentInput}>
        <Image style={styles.inputProfile} />
        <TextInput
          style={styles.input}
          placeholder="댓글을 입력해주세요."
          placeholderTextColor={colors.text3}
        />
      </View>
      <View style={styles.commentSection}>
        {/* Flatlist로 변경 */}
        <PostComment />
        <PostComment />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderTopColor: colors.devider1,
    borderTopWidth: 4,
    height: 342,
  },
  commentInput: {
    paddingTop: 11,
    paddingBottom: 14,
    paddingLeft: 24,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 53,
  },
  inputProfile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 9,
    backgroundColor: 'black',
  },
  input: {
    backgroundColor: '#f2f2f2',
    height: 32,
    borderRadius: 35,
    fontSize: 12,
    paddingLeft: 19,
    marginRight: 16,
    flex: 1,
    paddingVertical: 0,
  },
  commentSection: {},
});

export default PostCommentSection;

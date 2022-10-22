import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../assets/color';
import PostBody from '../../components/Community/PostBody';
import PostCommentSection from '../../components/Community/PostCommentSection';
import PostHeader from '../../components/Community/PostHeader';
import PostTitle from '../../components/Community/PostTitle';

function PostScreen() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <PostHeader />
        <PostTitle title="먼지 이슈" />
        <PostBody />
        <PostCommentSection />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default PostScreen;

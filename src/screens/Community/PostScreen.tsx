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
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/color';
import PostBody from '../../components/Community/PostBody';
import PostCommentSection from '../../components/Community/PostCommentSection';
import PostHeader from '../../components/Community/PostHeader';
import PostTitle from '../../components/Community/PostTitle';
import {RouteProp, useRoute} from '@react-navigation/core';
import {RootStackParamList} from '../types';
import {useQuery} from 'react-query';
import {getPostDetail} from '../../api/post';

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>;

function PostScreen() {
  const {params} = useRoute<PostScreenRouteProp>();
  const {id} = params;

  const postDetailQuery = useQuery(['postDetail', id], () => getPostDetail(id));

  if (!postDetailQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <PostHeader
          postId={id}
          userId={postDetailQuery.data?.result?.writer.id}
        />
        <PostTitle
          title={postDetailQuery.data?.result?.title}
          category={postDetailQuery.data?.result?.category}
          createdAt={postDetailQuery.data?.result?.createdAt}
          nickname={postDetailQuery.data?.result?.writer.nickname}
          content={postDetailQuery.data?.result?.content}
          commentNum={postDetailQuery.data.result.comment.length}
        />
        <PostBody
          content={postDetailQuery.data?.result?.content}
          images={postDetailQuery.data?.result?.images}
        />
        <PostCommentSection
          postId={id}
          commentData={postDetailQuery.data?.result?.comment}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  spinner: {
    flex: 1,
  },
});

export default PostScreen;

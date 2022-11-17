import React, {useEffect, useRef, useState} from 'react';
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
  FlatList,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import colors from '../../assets/color';
import PostComment from './PostComment';
import Send from '../../assets/images/Community/Send.svg';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {writeComment, patchComment} from '../../api/comments';
import {Comment} from '../../api/types';
import PostCommentInput from './PostCommentInput';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  patchCommentContentState,
  patchCommentState,
} from '../../atoms/patchComment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IsLoginModal from '../Login/IsLoginModal';
import {getMyProfile} from '../../api/mypage';

export interface CommentInputProps {
  postId: number;
  commentData: Comment[];
}

function PostCommentSection({postId, commentData}: CommentInputProps) {
  const {height} = useWindowDimensions();
  const [writingComment, setWritingComment] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const [patchCommentRecoil, setPatchCommentRecoil] =
    useRecoilState(patchCommentState);
  const patchContent = useRecoilValue(patchCommentContentState);
  const queryClient = useQueryClient();
  const profileQuery = useQuery('myProfile', getMyProfile);

  const [visibleLogin, setVisibleLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setIsLogin(true);
    }
  });

  const {mutate: write} = useMutation(writeComment, {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries('postDetail');
    },
    onError: error => {
      console.log(error, '댓글작성에러');
    },
  });
  const {mutate: patch} = useMutation(patchComment, {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries('postDetail');
      setPatchCommentRecoil(0);
    },
    onError: error => {
      console.log(error, '댓글수정에러');
    },
  });

  const onCloseLogin = () => {
    setVisibleLogin(false);
  };

  const onPress = () => {
    if (isLogin) {
      inputRef.current?.focus();
      setWritingComment(true);
    } else {
      setVisibleLogin(true);
    }
  };

  const onClose = () => {
    setWritingComment(false);
    setPatchCommentRecoil(0);
  };

  const onSubmit = (content: string) => {
    setWritingComment(false);
    if (patchCommentRecoil > 0) {
      patch({
        content: content,
        postId: postId,
        commentId: patchCommentRecoil,
      });
    } else {
      if (content.length >= 1) {
        write({
          content,
          postId,
        });
      }
    }
  };

  // 댓글 수정버튼 눌렀을 때
  useEffect(() => {
    if (patchCommentRecoil) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setWritingComment(true);
        }
      }, 50);
    }
  }, [patchCommentRecoil]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      console.log('open');
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      console.log('hide');
      // setPatchCommentRecoil(0);
    });

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  const img = profileQuery.data?.result?.image;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.block, {height: height - 476}]}>
        {writingComment ? (
          <>
            <TextInput
              autoFocus
              ref={inputRef}
              style={{
                height: 0,
                width: 1,
              }}
            />
          </>
        ) : (
          <>
            <View style={styles.commentInput}>
              <Image
                style={styles.inputProfile}
                source={
                  img
                    ? {
                        uri: img,
                      }
                    : require('../../assets/images/Community/default.png')
                }
              />
              <Pressable style={styles.input} onPress={onPress}>
                <Text style={styles.inputText}>댓글을 입력해주세요.</Text>
                <TextInput
                  ref={inputRef}
                  style={{
                    height: 0,
                    width: 0,
                  }}
                />
                <Pressable style={styles.send}>
                  <Send />
                </Pressable>
              </Pressable>
            </View>
            <SafeAreaView style={styles.commentSection}>
              <FlatList
                data={commentData}
                renderItem={({item}) => (
                  <PostComment
                    postId={postId}
                    commentId={item.id}
                    content={item.content}
                    createdAt={item.createdAt}
                    nickname={item.nickname}
                    picture={item.picture}
                    userId={item.userId}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </SafeAreaView>
          </>
        )}
      </View>

      <PostCommentInput
        onClose={onClose}
        visible={writingComment}
        onSubmit={onSubmit}
        uri={img}
        patchValue={patchContent}
      />

      <IsLoginModal visible={visibleLogin} onClose={onCloseLogin} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    // height: 342, //다른폰으로 확인!!!
  },
  commentInput: {
    paddingTop: 11,
    paddingBottom: 14,
    paddingLeft: 24,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    borderTopColor: colors.devider1,
    borderTopWidth: 4,
    flexDirection: 'row',
    height: 53,
    alignItems: 'center',
  },
  inputProfile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 9,
    backgroundColor: '#D6D6D6',
    borderColor: '#D6D6D6',
  },
  input: {
    backgroundColor: '#f2f2f2',
    height: 32,
    borderRadius: 35,
    flexDirection: 'row',
    paddingLeft: 19,
    marginRight: 16,
    flex: 1,
    paddingVertical: 0,
    position: 'relative',
  },
  inputText: {
    fontSize: 12,
    color: colors.text3,
    marginTop: 8,
    zIndex: 1,
  },
  send: {
    position: 'absolute',
    width: 32,
    height: 32,
    right: -4,
    top: 4,
  },
  commentSection: {
    paddingBottom: 30,
  },
});

export default PostCommentSection;

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
} from 'react-native';
import colors from '../../assets/color';
import PostComment from './PostComment';
import Send from '../../assets/images/Community/Send.svg';
import {useMutation, useQueryClient} from 'react-query';
import {writeComment} from '../../api/comments';
import {Comment} from '../../api/types';
import PostCommentInput from './PostCommentInput';

export interface CommentInputProps {
  postId: number;
  commentData: any;
}

function PostCommentSection({postId, commentData}: CommentInputProps) {
  const [writingComment, setWritingComment] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const queryClient = useQueryClient();
  const {mutate} = useMutation(writeComment, {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries('postDetail');
    },
    onError: error => {
      console.log(error, '댓글작성에러');
    },
  });

  const onPress = () => {
    setWritingComment(true);
    inputRef.current?.focus();
  };
  const onClose = () => {
    setWritingComment(false);
  };

  const onSubmit = (content: string) => {
    setWritingComment(false);
    if (content.length >= 1) {
      mutate({
        content,
        postId,
      });
    }
  };

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      console.log('open'),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setWritingComment(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  const img = false;
  const imgUri = '';

  return (
    <View style={[styles.block]}>
      <View style={styles.commentInput}>
        <Image
          style={styles.inputProfile}
          source={
            img
              ? {
                  uri: imgUri,
                }
              : require('../../assets/images/Community/default.png')
          }
        />
        <Pressable style={styles.input} onPress={onPress}>
          <Text style={styles.inputText}>댓글을 입력해주세요.</Text>
          <TextInput ref={inputRef} style={{height: 0}} />
          <Pressable style={styles.send}>
            <Send />
          </Pressable>
        </Pressable>
        <PostCommentInput
          onClose={onClose}
          visible={writingComment}
          onSubmit={onSubmit}
          uri={imgUri}
        />
      </View>
      <View style={styles.commentSection}>
        {/* Flatlist로 변경 */}
        <FlatList
          data={commentData}
          renderItem={({item}) => (
            <PostComment
              id={item.id}
              content={item.content}
              createdAt={item.createdAt}
              nickname={item.nickname}
              picture={item.picture}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
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
  },
  send: {
    position: 'absolute',
    width: 32,
    height: 32,
    right: -4,
    top: 4,
  },
  commentSection: {},
});

export default PostCommentSection;

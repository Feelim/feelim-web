import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import Send from '../../assets/images/Community/Send.svg';
import colors from '../../assets/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useEffect, useRef, useState} from 'react';

export interface CommentFormProps {
  visible: boolean;
  onClose(): void;
  onSubmit(content: string): void;
  initialMessage?: string;
  uri?: string;
}

function PostCommentInput({
  visible,
  onClose,
  onSubmit,
  initialMessage,
  uri,
}: CommentFormProps) {
  const {bottom} = useSafeAreaInsets();
  const [content, setContent] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  useEffect(() => {
    setContent(initialMessage ?? '');
  }, [initialMessage]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={Platform.select({ios: -bottom})}>
        <View style={styles.commentInput}>
          <Image
            style={styles.inputProfile}
            source={
              uri
                ? {
                    uri: uri,
                  }
                : require('../../assets/images/Community/default.png')
            }
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="댓글을 입력해주세요."
            placeholderTextColor={colors.text3}
            value={content}
            onChangeText={setContent}
            onSubmitEditing={() => {
              onSubmit(content);
              setContent('');
            }}
          />
          <Pressable
            style={styles.send}
            onPress={() => {
              onSubmit(content);
              setContent('');
            }}>
            <Send />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    paddingTop: 11,
    paddingBottom: 14,
    paddingLeft: 24,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 53,
    position: 'absolute',
    bottom: 0.5,
    width: '100%',
    borderTopColor: colors.devider1,
    borderTopWidth: 4,
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
    fontSize: 12,
    paddingLeft: 19,
    marginRight: 16,
    flex: 1,
    paddingVertical: 0,
    position: 'relative',
  },
  send: {
    position: 'absolute',
    width: 32,
    height: 32,
    right: 12,
    top: 10,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default PostCommentInput;

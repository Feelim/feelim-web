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
  NativeModules,
} from 'react-native';
import Send from '../../assets/images/Community/Send.svg';
import colors from '../../assets/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SetStateAction, useEffect, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {patchCommentState} from '../../atoms/patchComment';

export interface CommentFormProps {
  visible: boolean;
  onClose(): void;
  onSubmit(content: string): void;
  uri?: string;
  patchValue?: string;
}

const {StatusBarManager} = NativeModules;

function PostCommentInput({
  visible,
  onClose,
  onSubmit,
  uri,
  patchValue,
}: CommentFormProps) {
  const {bottom} = useSafeAreaInsets();
  const [content, setContent] = useState('');
  const inputRef = useRef<TextInput>(null);
  const patchCommentRecoil = useRecoilValue(patchCommentState);

  // 수정시에만 기본값 바뀌도록
  useEffect(() => {
    console.log(patchCommentRecoil);
    if (patchCommentRecoil > 0) {
      setContent(patchValue);
    } else {
      setContent('');
    }
  }, [patchCommentRecoil]);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(
          (statusBarFrameData: {height: SetStateAction<number>}) => {
            setStatusBarHeight(statusBarFrameData.height);
          },
        )
      : null;
  }, []);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}
        keyboardVerticalOffset={statusBarHeight - 44}>
        <View style={styles.block}>
          <Pressable style={styles.dismissArea} onTouchStart={onClose} />
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
              autoFocus
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    flex: 1,
  },
  dismissArea: {
    flex: 1,
  },
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
    backgroundColor: colors.on_primary,
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

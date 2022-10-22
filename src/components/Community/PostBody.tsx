import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
  Animated,
  useWindowDimensions,
  Keyboard,
  KeyboardEvent,
} from 'react-native';
import colors from '../../assets/color';
import {useKeyboard} from '@react-native-community/hooks';

function PostBody() {
  const keyboard = useKeyboard();
  const keyboardHeight = keyboard.keyboardHeight;
  const {width, height} = useWindowDimensions();
  const animation = useRef(new Animated.Value(height)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const didShow = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 614 - keyboardHeight - 149 : 272, //핸드폰마다 키보드 높이 확인
      useNativeDriver: false,
      duration: 0,
      delay: 0,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  return (
    <Animated.View style={[styles.block, {height: animation}]}>
      <ScrollView>
        <Image
          style={styles.image}
          source={require('../../assets/images/Home/banner.png')}
        />
        <Text style={styles.text}>
          안녕하세요. 이번에 입문하게 된 카메라 초보입니다. 아버지가 옛날에
          사놓고 안 쓰시던 카메라를 수리할 부분 수리하고 받았습니다. 수리 후에도
          먼지가 껴 있는데 어떻게 어떻게 해야 하는지 잘 몰라 글 올리게
          되었습니다. 이 상태로 찍으면 먼지도 사진에 같이 나오게 되나요?
          안녕하세요. 이번에 입문하게 된 카메라 초보입니다. 아버지가 옛날에
          사놓고 안 쓰시던 카메라를 수리할 부분 수리하고 받았습니다. 수리 후에도
          먼지가 껴 있는데 어떻게 어떻게 해야 하는지 잘 몰라 글 올리게
          되었습니다. 이 상태로 찍으면 먼지도 사진에 같이 나오게 되나요?
        </Text>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  image: {
    width: 83,
    height: 83,
    borderRadius: 3,
    marginBottom: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
  },
});

export default PostBody;

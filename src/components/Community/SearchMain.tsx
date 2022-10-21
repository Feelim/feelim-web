import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import colors from '../../assets/color';
import RecentSearchItem from './RecentSearchItem';
import SetNicknameToast from '../../components/Login/SetNicknameToast';

export interface LengthProps {
  enter: boolean;
}

function SearchMain({enter}: LengthProps) {
  const animation1 = useRef(new Animated.Value(0)).current;
  const [hidden1, setHidden1] = useState(true);
  useEffect(() => {
    Animated.timing(animation1, {
      toValue: hidden1 ? 0 : 1,
      useNativeDriver: true,
    }).start();
    try {
      setTimeout(() => {
        setHidden1(true);
      }, 2000);
    } catch (e) {}
  }, [hidden1]);

  useEffect(() => {
    if (enter) {
      setHidden1(false);
    } else {
      setHidden1(true);
    }
  }, [enter]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={{flex: 1}}>
      <View style={styles.block}>
        <View style={styles.top}>
          <Text style={styles.title}>최근검색어</Text>
          <Pressable style={styles.deleteButton}>
            <Text style={styles.delete}>전체삭제</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.content}
          showsHorizontalScrollIndicator={false}>
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
        </ScrollView>
      </View>
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: animation1,
          },
        ]}>
        <SetNicknameToast text="💡 2자 이상 입력해주세요." />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 24,
    paddingTop: 22,
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 16,
    color: colors.text1,
    letterSpacing: -0.408,
    lineHeight: 24,
  },
  deleteButton: {
    height: 24,
    justifyContent: 'center',
  },
  delete: {
    fontSize: 11,
    letterSpacing: -0.408,
    textDecorationLine: 'underline',
    color: colors.text3,
  },
  content: {
    height: 37,
    paddingVertical: 6,
    marginTop: 10,
  },
  toast: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
});

export default SearchMain;

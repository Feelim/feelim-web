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
import WriteEditor from '../../components/Community/WriteEditor';
import WriteErrorToast from '../../components/Community/WriteErrorToast';
import WriteHeader from '../../components/Community/WriteHeader';

function WriteScreen() {
  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader />
        <WriteEditor />
        <WriteErrorToast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.on_primary,
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;

import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';

export interface AlertProps {
  visible: boolean;
  onClose(): void;
}

function IsLoginModal({visible, onClose}: AlertProps) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressLogin = () => {
    navigation.navigate('Login');
  };
  const onCancle = () => {
    onClose();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.block}>
        <View style={styles.whiteBox}>
          <Text style={styles.text}>
            로그인이 필요한 {'\n'}서비스 입니다. {'\n'}로그인 하시겠습니까?
          </Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn1}
            onPress={onPressLogin}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn2}
            onPress={onCancle}>
            <Text style={styles.btnText}>아니요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: colors.on_primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 276,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    paddingHorizontal: 55,
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.408,
    color: '#000000',
    paddingVertical: 37,
    textAlign: 'center',
  },
  btns: {
    flexDirection: 'row',
    display: 'flex',
    height: 44,
    width: 276,
  },
  btn1: {
    paddingTop: 11,
    paddingBottom: 12,
    backgroundColor: colors.text5,
    width: 276 / 2,
    borderBottomLeftRadius: 3,
  },
  btn2: {
    paddingTop: 11,
    paddingBottom: 12,
    backgroundColor: colors.primary,
    width: 276 / 2,
    borderBottomRightRadius: 3,
  },
  btnText: {
    fontWeight: '700',
    color: colors.on_primary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default IsLoginModal;

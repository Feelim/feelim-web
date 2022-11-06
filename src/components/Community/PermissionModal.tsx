import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from 'react-query';
import {useRecoilState} from 'recoil';
import {reportPost} from '../../api/post';

import colors from '../../assets/color';
import {permissionImageState} from '../../atoms/permission';
import {RootStackNavigationProp} from '../../screens/types';

export interface AlertProps {
  visible: boolean;
  onClose(): void;
}

function PermissionModal({visible, onClose}: AlertProps) {
  const [permissionImage, setPermissionImage] =
    useRecoilState(permissionImageState);
  const onPressSetting = () => {
    Linking.openSettings();
    setPermissionImage('granted');
    onClose();
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
            사진을 업로드하려면 {'\n'} '설정 {'>'} chalkak'에서 사진을{'\n'}{' '}
            사용할 수 있도록 허용하세요.
          </Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn1}
            onPress={onCancle}>
            <Text style={styles.btnText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn2}
            onPress={onPressSetting}>
            <Text style={styles.btnText}>설정</Text>
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
    paddingHorizontal: 35,
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

export default PermissionModal;

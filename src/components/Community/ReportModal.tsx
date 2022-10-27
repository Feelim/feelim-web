import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {Modal, StyleSheet, View, Text, Pressable} from 'react-native';
import {useMutation} from 'react-query';
import {reportPost} from '../../api/post';

import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';

export interface AlertProps {
  visible: boolean;
  onClose(): void;
  postId: number;
  reason: string;
}

function ReportModal({visible, onClose, postId, reason}: AlertProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {mutate} = useMutation(reportPost, {
    onSuccess: e => {
      console.log(e);
      onClose();
    },
    onError: e => {
      console.log(e, '신고 에러');
    },
  });

  const onPressReport = () => {
    mutate({
      etc: 'etc',
      reason: reason,
      postId: postId,
    });
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
            확인을 누르면 신고가{'\n'} 정상적으로 접수됩니다.
          </Text>
        </View>
        <View style={styles.btns}>
          <Pressable style={styles.btn1} onPress={onCancle}>
            <Text style={styles.btnText}>나가기</Text>
          </Pressable>
          <Pressable style={styles.btn2} onPress={onPressReport}>
            <Text style={styles.btnText}>확인</Text>
          </Pressable>
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

export default ReportModal;

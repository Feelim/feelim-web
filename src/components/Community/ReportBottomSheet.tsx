import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';
import AlertModal from './AlertModal';
import Close2 from '../../assets/images/Community/Close2.svg';
import Write from '../../assets/images/Community/Write.svg';
import PostCommentInput from './PostCommentInput';
import {useSetRecoilState} from 'recoil';
import {patchCommentState} from '../../atoms/patchComment';
import ReportModal from './ReportModal';

export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: any;
  postId: number;
}

const ReportBottomSheet = ({
  modalVisible,
  setModalVisible,
  postId,
}: BottomSheetProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const setPatchComment = useSetRecoilState(patchCommentState);
  const onPressReport = (content: string) => {
    setReason(content);
    setVisible(true);
    setModalVisible(false);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType={'fade'}
        transparent
        statusBarTranslucent>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              ...styles.bottomSheetContainer,
              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReport('INSULT')}
              style={styles.itemFirst}>
              <Text style={styles.text}>욕설/비하</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReport('FISHING')}
              style={styles.item}>
              <Text style={styles.text}>낚시/놀람/도배</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReport('INAPPROPRIATE')}
              style={styles.item}>
              <Text style={styles.text}>게시판 성격에 부적절함</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReport('PORN')}
              style={styles.item}>
              <Text style={styles.text}>음란물</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReport('COMMERCE')}
              style={styles.itemLast}>
              <Text style={styles.text}>상업적 광고 및 판매</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <ReportModal
        visible={visible}
        onClose={onClose}
        postId={postId}
        reason={reason}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 272,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemFirst: {
    paddingTop: 18,
    paddingBottom: 15,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLast: {
    paddingTop: 15,
    paddingBottom: 22,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 16.5,
    color: '#000000',
    fontWeight: '400',
  },
});

export default ReportBottomSheet;

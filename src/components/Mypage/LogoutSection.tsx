import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {Pressable, StyleSheet, View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import {RootStackNavigationProp} from '../../screens/types';

function LogoutSection() {
  const [visible, setVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const onPressWithdrawal = () => {
    console.log('탈퇴');
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.items}>
        <Pressable
          hitSlop={8}
          onPress={() => {
            setIsLogout(false);
            setVisible(true);
          }}>
          <Text style={styles.text}>회원탈퇴</Text>
        </Pressable>
        <View style={styles.bar} />
        <Pressable
          hitSlop={8}
          onPress={() => {
            setIsLogout(true);
            setVisible(true);
          }}>
          <Text style={styles.text}>로그아웃</Text>
        </Pressable>
      </View>

      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}>
        <View style={styles.modalBlock}>
          <View style={styles.whiteBox}>
            <Text style={styles.modalText}>
              {isLogout ? '정말 로그아웃하시겠어요?' : '정말 탈퇴하시겠어요?'}
            </Text>
          </View>
          <View style={styles.btns}>
            {isLogout ? (
              <>
                <Pressable style={styles.btn1} onPress={onPressLogout}>
                  <Text style={styles.btnText}>네</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.btn1} onPress={onPressWithdrawal}>
                  <Text style={styles.btnText}>네</Text>
                </Pressable>
              </>
            )}

            <Pressable style={styles.btn2} onPress={onClose}>
              <Text style={styles.btnText}>아니요</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 114,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 13.5,
    marginRight: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: colors.text3,
    textDecorationLine: 'underline',
  },
  bar: {
    width: 1,
    height: 13,
    backgroundColor: colors.text3,
    marginHorizontal: 18.5,
  },

  modalBlock: {
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
  modalText: {
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

export default LogoutSection;

import {Text, View, StyleSheet, SafeAreaView, Modal} from 'react-native';
import colors from '../../assets/color';
import {useRecoilState} from 'recoil';
import {writeToastState} from '../../atoms/writeToast';
import {writeToastTextState} from '../../atoms/writeToastText';

function WriteErrorToast() {
  const [visible, setVisible] = useRecoilState(writeToastState);
  const [text, setText] = useRecoilState(writeToastTextState);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.background}>
        <View style={styles.toast}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  toast: {
    width: 289,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 9,
  },
  text: {
    color: colors.text1,
    fontSize: 12,
  },
});

export default WriteErrorToast;

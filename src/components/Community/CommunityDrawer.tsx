import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../assets/color';
import Close from '../../assets/images/Community/Close.svg';
import Write from '../../assets/images/Community/Write.svg';
import ScrapPage from '../../assets/images/Community/ScrapPage.svg';
import CommentPage from '../../assets/images/Community/CommentPage.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../../screens/types';
import IsLoginModal from '../Login/IsLoginModal';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Drawer {
  open: boolean;
  setOpen: any;
}

function CommunityDrawer({open, setOpen}: Drawer) {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setIsLogin(true);
    }
  });

  const onPressMyPost = () => {
    if (isLogin) {
      navigation.navigate('MyPost');
      setOpen(false);
    } else {
      setVisible(true);
    }
  };
  const onPressMyComment = () => {
    if (isLogin) {
      navigation.navigate('MyComment');
      setOpen(false);
    } else {
      setVisible(true);
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <View>
      <Modal
        isVisible={open}
        animationIn="slideInLeft"
        animationOut="slideOutLeft">
        <SafeAreaView style={[styles.container, {height: height}]}>
          <Pressable
            style={styles.close}
            onPress={() => {
              setOpen(false);
            }}>
            <Close />
          </Pressable>
          <Text style={styles.title}>게시글 관리</Text>
          <View style={styles.pages}>
            <Pressable style={styles.page} hitSlop={8} onPress={onPressMyPost}>
              <Write />
              <Text style={styles.pageText}>작성한{'\n'}게시글</Text>
            </Pressable>
            {/* <Pressable style={styles.page}>
              <ScrapPage />
              <Text style={styles.pageText}>스크랩{'\n'}게시글</Text>
            </Pressable> */}
            <Pressable
              style={styles.page}
              hitSlop={8}
              onPress={onPressMyComment}>
              <CommentPage />
              <Text style={styles.pageText}>작성한{'\n'}댓글</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <IsLoginModal visible={visible} onClose={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 0,
    width: 283,
    left: -20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  close: {
    marginTop: 56,
    marginLeft: 21,
    marginBottom: 28,
  },
  title: {
    fontFamily: colors.bold,
    fontSize: 16,
    marginLeft: 21,
    lineHeight: 24,
    marginBottom: 13,
    letterSpacing: -0.408,
    color: colors.text1,
  },
  pages: {
    paddingTop: 22,
    borderTopColor: colors.devider1,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingLeft: 70,
    paddingRight: 70,
    justifyContent: 'space-between',
  },
  page: {
    // width: 40,
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.text1,
    lineHeight: 16,
    letterSpacing: -0.408,
    textAlign: 'center',
  },
});

export default CommunityDrawer;

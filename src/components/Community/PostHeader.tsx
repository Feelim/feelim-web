import {useNavigation} from '@react-navigation/core';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import colors from '../../assets/color';
import ScrapHeader from '../../assets/images/Community/ScrapHeader.svg';
import MoreHeader from '../../assets/images/Community/MoreHeader.svg';
import Back from '../../assets/images/Community/Back.svg';
import {RootStackNavigationProp} from '../../screens/types';
import AlertModal from './AlertModal';
import {useState} from 'react';
import BottomSheet from './BottomSheet';

export interface HeaderProps {
  postId: number;
  userId?: number;
}

function PostHeader({postId, userId}: HeaderProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [showMore, setShowMore] = useState(false);

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const onClose = () => {
    setVisible(false);
  };

  const onPressMore = () => {
    //회원가입 후에 id 저장해서 비교하기
    if (userId) {
      if (Platform.OS === 'android') {
        setShowMore(true);
      } else {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['수정', '삭제', '취소'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 2,
          },
          buttonindex => {
            if (buttonindex === 0) {
              setVisible(true);
              setText('수정하시겠습니까?');
            } else if (buttonindex === 1) {
              setVisible(true);
              setText('삭제하시겠습니까?');
            }
          },
        );
      }
    }
  };

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          navigation.pop();
        }}>
        <Back />
      </Pressable>
      <View style={styles.headerIcons}>
        <Pressable style={styles.scrap} hitSlop={8}>
          <ScrapHeader />
        </Pressable>
        <Pressable onPress={onPressMore} hitSlop={8}>
          <MoreHeader />
        </Pressable>
      </View>
      <BottomSheet
        postId={postId}
        modalVisible={showMore}
        setModalVisible={setShowMore}
      />
      {/* IOS */}
      <AlertModal
        visible={visible}
        onClose={onClose}
        text={text}
        postId={postId}
        button="삭제"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 13,
  },

  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrap: {
    marginRight: 13,
  },
});

export default PostHeader;

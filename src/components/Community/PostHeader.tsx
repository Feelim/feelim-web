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
import Siren from '../../assets/images/Community/Siren.svg';

import {RootStackNavigationProp} from '../../screens/types';
import {useState} from 'react';
import BottomSheet from './BottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReportBottomSheet from './ReportBottomSheet';

export interface HeaderProps {
  postId: number;
  userId?: number;
}

function PostHeader({postId, userId}: HeaderProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [showMore, setShowMore] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [reportVisible, setReportVisible] = useState(false);

  AsyncStorage.getItem('userId', (err, result) => {
    if (result) {
      setCurrentId(result);
    }
  });

  const onPressMore = () => {
    //회원가입 후에 id 저장해서 비교하기
    if (userId === Number(currentId)) {
      setShowMore(true);
    } else {
      setReportVisible(true);
    }
  };

  return (
    <View style={styles.header}>
      <Pressable
        hitSlop={8}
        onPress={() => {
          navigation.pop();
        }}>
        <Back />
      </Pressable>
      <View style={styles.headerIcons}>
        {/* <Pressable style={styles.scrap} hitSlop={8}>
          <ScrapHeader />
        </Pressable> */}
        <Pressable onPress={onPressMore} hitSlop={8}>
          {userId === Number(currentId) ? (
            <>
              <MoreHeader />
            </>
          ) : (
            <>
              <Siren />
            </>
          )}
        </Pressable>
      </View>
      <BottomSheet
        postId={postId}
        modalVisible={showMore}
        setModalVisible={setShowMore}
        isPost={true}
        commentId={0}
      />
      <ReportBottomSheet
        postId={postId}
        modalVisible={reportVisible}
        setModalVisible={setReportVisible}
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

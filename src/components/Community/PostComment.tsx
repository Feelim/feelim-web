import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import CommentMore from '../../assets/images/Community/CommentMore.svg';
import colors from '../../assets/color';
import {useState} from 'react';
import BottomSheet from './BottomSheet';
import {useRecoilState} from 'recoil';
import {patchCommentContentState} from '../../atoms/patchComment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReportBottomSheet from './ReportBottomSheet';

export interface CommentProps {
  postId: number;
  commentId: number;
  createdAt: string;
  nickname: string;
  content: string;
  picture: string;
  userId: number;
}

function PostComment({
  postId,
  commentId,
  content,
  createdAt,
  nickname,
  picture,
  userId,
}: CommentProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const hour = new Date(createdAt).getHours().toString().padStart(2, '0');
  const minute = new Date(createdAt).getMinutes().toString().padStart(2, '0');

  const [showMore, setShowMore] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [contentRecoil, setContentRecoil] = useRecoilState(
    patchCommentContentState,
  );

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
    setContentRecoil(content);
  };
  return (
    <View style={styles.block}>
      <View style={styles.info}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userImage}
            source={
              picture
                ? {
                    uri: picture,
                  }
                : require('../../assets/images/Community/default.png')
            }
          />
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.time}>
            {hour}:{minute}
          </Text>
        </View>
        <Pressable onPress={onPressMore} hitSlop={8}>
          <CommentMore />
        </Pressable>
      </View>
      <Text style={styles.content}>{content}</Text>
      <BottomSheet
        postId={postId}
        commentId={commentId}
        modalVisible={showMore}
        setModalVisible={setShowMore}
        isPost={false}
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
  block: {
    paddingTop: 12,
    borderTopColor: colors.devider1,
    borderTopWidth: 1,
    marginBottom: 16,
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 9,
    backgroundColor: '#D6D6D6',
  },
  userName: {
    fontSize: 14,
    fontFamily: colors.bold,
    marginRight: 12,
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    color: '#adadad',
    letterSpacing: -0.408,
    marginRight: 5,
  },
  time: {
    fontSize: 11,
    fontWeight: '400',
    color: '#adadad',
    letterSpacing: -0.408,
  },
  content: {
    marginLeft: 62,
    fontSize: 13,
    color: colors.text1,
  },
});

export default PostComment;

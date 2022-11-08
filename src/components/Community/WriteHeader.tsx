import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import colors from '../../assets/color';
import Back from '../../assets/images/Community/Back.svg';
import {
  RootStackNavigationProp,
  MainTabNavigationProp,
} from '../../screens/types';
import {useNavigation} from '@react-navigation/core';
import {useRecoilValue} from 'recoil';
import {
  bodyState,
  categoryState,
  titleState,
  nameState,
  typeState,
  uriState,
} from '../../atoms/writePost';
import {useRecoilState} from 'recoil';
import {writeToastState} from '../../atoms/writeToast';
import {writeToastTextState} from '../../atoms/writeToastText';
import {axiosInstance} from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import postNewHooks from '../../hooks/postNewHooks';
import {postIDState} from '../../atoms/postID';
import AlertModal from './AlertModal';

function WriteHeader() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const title = useRecoilValue(titleState);
  const content = useRecoilValue(bodyState);
  const name = useRecoilValue(nameState);
  const type = useRecoilValue(typeState);
  const uri = useRecoilValue(uriState);
  const category = useRecoilValue(categoryState);
  const [toastVisible, setToastVisible] = useRecoilState(writeToastState);
  const [toastText, setToastText] = useRecoilState(writeToastTextState);
  const [token, setToken] = useState('');

  const [postID, setPostId] = useRecoilState(postIDState);
  const queryClient = useQueryClient();

  // const {mutate: post} = useMutation(postNew, {
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  //   onError: error => {
  //     console.log(error);
  //   },
  // });

  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setToken(result);
    }
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const onPressBack = () => {
    if (title || content) {
      // 작성된 글이 있어요
      setAlertVisible(true);
    } else {
      navigation.pop();
    }
  };

  const onClose = () => {
    setAlertVisible(false);
  };

  const onPressSubmit = async () => {
    if (!title) {
      setToastText('💡 제목이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else if (!content) {
      console.log('내용');
      setToastText('💡 내용이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else {
      writeNewPost();
    }
  };

  const formdata = new FormData();
  formdata.append('title', title);
  formdata.append('content', content);
  formdata.append('category', category);
  formdata.append('images', {
    uri: uri,
    type: type,
    name: name,
  });

  const writeNewPost = () => {
    axiosInstance
      .post(`/post/new`, formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.data.isSuccess) {
          setPostId(response.data.result);
          navigation.navigate('Community');
          queryClient.invalidateQueries('postAll');
          queryClient.invalidateQueries('postCategory');
        }
      })
      .catch(e => {
        console.log(e, '글 작성 에러');
      });
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onPressBack} hitSlop={8}>
        <Back />
      </Pressable>
      <Text style={styles.headerText}>게시글 작성</Text>
      <Pressable onPress={onPressSubmit} hitSlop={8}>
        <Text style={styles.submitText}>완료</Text>
      </Pressable>
      <AlertModal
        visible={alertVisible}
        onClose={onClose}
        text="작성된 글이 있어요. 정말 나가시겠어요?"
        postId={0}
        button="나가기"
        commentId={0}
        isPost={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.primary,
    marginTop: -2,
  },

  submitText: {
    color: '#3F97BD',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WriteHeader;

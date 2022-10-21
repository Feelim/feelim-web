import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/color';
import GetImage from '../../assets/images/Community/GetImage.svg';
import Delete from '../../assets/images/Community/Delete.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {writeToastState} from '../../atoms/writeToast';
import {writeToastTextState} from '../../atoms/writeToastText';
import {axiosInstance} from '../../queries';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import AlertModal from '../../components/Community/AlertModal';
import Back from '../../assets/images/Community/Back.svg';
import {
  RootStackNavigationProp,
  MainTabNavigationProp,
  RootStackParamList,
} from '../../screens/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import WriteErrorToast from '../../components/Community/WriteErrorToast';
import {PostDetail} from '../../api/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {nameState, typeState, uriState} from '../../atoms/writePost';

export interface Img {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
}

type ModifyScreenRouteProp = RouteProp<RootStackParamList, 'Modify'>;

function ModifyScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const {params} = useRoute<ModifyScreenRouteProp>();
  const queryClient = useQueryClient();
  const cachedPost = useMemo(
    () =>
      params.postId
        ? queryClient.getQueryData<PostDetail>(['postDetail', params.postId])
        : null,
    [queryClient, params.postId],
  );

  const {top} = useSafeAreaInsets();
  const [titles, setTitles] = useState(cachedPost?.result?.title ?? '');
  const [bodys, setBodys] = useState(cachedPost?.result?.content ?? '');
  const [filters, setFilters] = useState(cachedPost?.result?.category ?? '');
  const [images, setImages] = useState(cachedPost?.result?.images?.pop() ?? '');

  const [toastVisible, setToastVisible] = useRecoilState(writeToastState);
  const [toastText, setToastText] = useRecoilState(writeToastTextState);
  const [alertVisible, setAlertVisible] = useState(false);

  const onPressBack = () => {
    if (titles || bodys) {
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
    if (!titles) {
      setToastText('💡 제목이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else if (!bodys) {
      setToastText('💡 내용이 입력되지 않았어요.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    } else {
      patchPost();
    }
  };

  const [recoilName, setRecoilName] = useRecoilState(nameState);
  const [recoilType, setRecoilType] = useRecoilState(typeState);
  const [recoilUri, setRecoilUri] = useRecoilState(uriState);

  const image: Img = {
    uri: '',
    type: '',
    name: '',
  };
  const onSelectImage = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      res => {
        if (res.didCancel) {
          return;
        } else if (res.assets) {
          image.name = res.assets[0].fileName;
          image.type = res.assets[0].type;
          image.uri =
            Platform.OS === 'android'
              ? res.assets[0].uri
              : res.assets[0].uri.replace('file://', '');
          setImages(res.assets[0].uri);
          setRecoilName(image.name);
          setRecoilType(image.type);
          setRecoilUri(image.uri);
        }
      },
    );
  };

  const deleteImage = () => {
    setImages(null);
  };

  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);

  useEffect(() => {
    if (filters === 'FILM') {
      onPress1();
    } else if (filters === 'CAMERA') {
      onPress2();
    } else {
      onPress3();
    }
  }, [cachedPost]);

  const onPress1 = () => {
    setSelect2(false);
    setSelect1(true);
    setSelect3(false);
    setFilters('FILM');
  };
  const onPress2 = () => {
    setSelect2(true);
    setSelect1(false);
    setSelect3(false);
    setFilters('CAMERA');
  };
  const onPress3 = () => {
    setSelect2(false);
    setSelect1(false);
    setSelect3(true);
    setFilters('QUESTION');
  };

  const formdata = new FormData();
  formdata.append('title', titles);
  formdata.append('content', bodys);
  formdata.append('category', filters);
  formdata.append('images', {
    uri: images,
    type: recoilType,
    name: recoilName,
  });

  const patchPost = () => {
    axiosInstance
      .patch(`/post/${params.postId}`, formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwa25vamxoMjdAZGF1bS5uZXQiLCJyb2xlIjoidXNlciIsIm15TmFtZSI6InBrbm9qbGgyN0BkYXVtLm5ldCIsImV4cCI6MTY2NjM3MzE2MiwiaWF0IjoxNjY2MzU1MTYyfQ.p0-jW6fnfpQWZXbCsW2xK7CvL4GV4IdHIHQBscN8tmo',
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.data.isSuccess) {
          navigation.navigate('Community');
          queryClient.invalidateQueries('postAll');
        }
      })
      .catch(e => {
        console.log(e, '수정 에러');
      });
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable onPress={onPressBack} hitSlop={8}>
          <Back />
        </Pressable>
        <Text style={styles.headerText}>게시글 수정</Text>
        <Pressable onPress={onPressSubmit} hitSlop={8}>
          <Text style={styles.submitText}>완료</Text>
        </Pressable>
        <AlertModal
          visible={alertVisible}
          onClose={onClose}
          text="작성된 글이 있어요. 
        정말 나가시겠어요?"
          postId={0}
          button="나가기"
        />
      </View>

      <View style={styles.block}>
        <TextInput
          placeholder="제목"
          placeholderTextColor={colors.text5}
          style={styles.titleInput}
          returnKeyType="next"
          onChangeText={setTitles}
          value={titles}
        />
        <View style={styles.filters}>
          <Text style={styles.filterName}>분류</Text>
          <Pressable
            style={[!select1 && styles.filterItem, select1 && styles.selected]}
            onPress={onPress1}>
            <Text
              style={[
                !select1 && styles.filterText,
                select1 && styles.selectedText,
              ]}>
              필름
            </Text>
          </Pressable>
          <Pressable
            style={[!select2 && styles.filterItem, select2 && styles.selected]}
            onPress={onPress2}>
            <Text
              style={[
                !select2 && styles.filterText,
                select2 && styles.selectedText,
              ]}>
              카메라
            </Text>
          </Pressable>
          <Pressable
            style={[!select3 && styles.filterItem, select3 && styles.selected]}
            onPress={onPress3}>
            <Text
              style={[
                !select3 && styles.filterText,
                select3 && styles.selectedText,
              ]}>
              QnA
            </Text>
          </Pressable>
        </View>
        <TextInput
          placeholder="내용을 입력해주세요"
          placeholderTextColor={colors.text5}
          style={styles.bodyInput}
          onChangeText={setBodys}
          value={bodys}
          multiline
          textAlignVertical="top"
        />

        {images ? (
          <View style={styles.photoContainer}>
            <Image source={{uri: images}} style={styles.photo} />
            <Pressable style={styles.deleteButton} onPress={deleteImage}>
              <Delete />
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        <Pressable style={styles.selectPhoto} onPress={onSelectImage}>
          <GetImage />
        </Pressable>
      </View>
      <WriteErrorToast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.on_primary,
  },
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
  block: {
    flex: 1,
  },
  titleInput: {
    fontSize: 14,
    height: 50,
    borderBottomColor: colors.devider1,
    borderBottomWidth: 1,
    paddingLeft: 24,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingTop: 16,
    paddingBottom: 9,
  },
  filterName: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 19,
  },
  bodyInput: {
    paddingLeft: 24,
    paddingTop: 16,
    borderTopColor: colors.devider1,
    borderTopWidth: 1,
  },
  filterItem: {
    borderRadius: 39,
    borderColor: colors.text1,
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    height: 28,
    lineHeight: 28,
    color: colors.text1,
    fontSize: 14,
  },
  selected: {
    backgroundColor: colors.text1,
    borderRadius: 39,
    borderColor: colors.text1,
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderWidth: 1,
    marginRight: 8,
  },
  selectedText: {
    color: colors.on_primary,
    height: 28,
    lineHeight: 28,
    fontSize: 14,
  },
  selectPhoto: {
    position: 'absolute',
    bottom: 21,
    left: 21,
  },

  photoContainer: {
    position: 'absolute',
    bottom: 82,
    left: 21,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 3,
  },
  deleteButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 55,
    bottom: 31,
  },
});

export default ModifyScreen;

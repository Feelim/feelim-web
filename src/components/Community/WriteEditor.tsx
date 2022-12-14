import React, {useEffect, useState} from 'react';
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
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import colors from '../../assets/color';
import GetImage from '../../assets/images/Community/GetImage.svg';
import Delete from '../../assets/images/Community/Delete.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {
  bodyState,
  titleState,
  categoryState,
  nameState,
  typeState,
  uriState,
} from '../../atoms/writePost';
import {
  androidCountState,
  permissionCameraState,
  permissionImageState,
} from '../../atoms/permission';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../../screens/types';
import PermissionModal from './PermissionModal';
import {selectImgState} from '../../atoms/selectImg';
import CameraBottomSheet from './CameraBottomSheet';

export interface Img {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
}

function WriteEditor() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const setRecoilTitle = useSetRecoilState(titleState);
  const setRecoilBody = useSetRecoilState(bodyState);
  const setRecoilCategory = useSetRecoilState(categoryState);
  const setRecoilName = useSetRecoilState(nameState);
  const setRecoilType = useSetRecoilState(typeState);
  const setRecoilUri = useSetRecoilState(uriState);

  //접근권한

  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const [permissionImage, setPermissionImage] =
    useRecoilState(permissionImageState);
  const [androidCount, setAndroidCount] = useRecoilState(androidCountState);

  const requestMultiplePermissions = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
            // PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            // PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setAndroidCount(androidCount + 1);
      setPermissionImage(
        Platform.OS === 'ios'
          ? response['ios.permission.PHOTO_LIBRARY']
          : response['android.permission.WRITE_EXTERNAL_STORAGE'],
      );
    });
  };
  const checkMultiplePermissions = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [
            // PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            // PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
  };

  const [permissionCamera, setPermissionCamera] = useRecoilState(
    permissionCameraState,
  );
  const requestMultiplePermissionsCamera = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.CAMERA],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setAndroidCount(androidCount + 1);
      setPermissionCamera(
        Platform.OS === 'ios'
          ? response['ios.permission.CAMERA']
          : response['android.permission.CAMERA'],
      );
    });
  };
  const checkMultiplePermissionsCamera = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.CAMERA],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
  };

  const [selectImg, setSelectImg] = useRecoilState(selectImgState);
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    if (selectImg === 'GALLERY') {
      onSelectImage();
    } else if (selectImg === 'CAMERA') {
      onSelectCamera();
    }
  }, [selectImg]);

  const image: Img = {
    uri: '',
    type: '',
    name: '',
  };
  const onSelectImage = async () => {
    setSelectImg('');
    requestMultiplePermissions();
    if (permissionImage !== 'granted') {
      if (Platform.OS === 'android') {
        if (androidCount >= 2) {
          setVisible(true);
        } else {
          requestMultiplePermissions();
        }
      } else if (Platform.OS === 'ios') {
        setVisible(true);
      }
    } else {
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
            setResponse(res);
            setRecoilName(image.name);
            setRecoilType(image.type);
            setRecoilUri(image.uri);
          }
        },
      );
    }
  };

  const onSelectCamera = async () => {
    setSelectImg('');
    requestMultiplePermissionsCamera();
    if (permissionCamera !== 'granted') {
      if (Platform.OS === 'android') {
        if (androidCount >= 2) {
          setVisible(true);
        } else {
          requestMultiplePermissionsCamera();
        }
      } else {
        setVisible(true);
      }
    } else {
      await launchCamera(
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
            setResponse(res);
            setRecoilName(image.name);
            setRecoilType(image.type);
            setRecoilUri(image.uri);
          }
        },
      );
    }
  };

  const deleteImage = () => {
    setResponse(null);
  };

  useEffect(() => {
    setRecoilTitle(title);
  }, [title]);

  useEffect(() => {
    setRecoilBody(body);
  }, [body]);

  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);

  const onPress1 = () => {
    setSelect2(false);
    setSelect1(true);
    setSelect3(false);
    setRecoilCategory('FILM');
  };
  const onPress2 = () => {
    setSelect2(true);
    setSelect1(false);
    setSelect3(false);
    setRecoilCategory('CAMERA');
  };
  const onPress3 = () => {
    setSelect2(false);
    setSelect1(false);
    setSelect3(true);
    setRecoilCategory('QUESTION');
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.select({ios: 'padding'})}
    style={{flex: 1}}>
      <TextInput
        placeholder="제목"
        placeholderTextColor={colors.text5}
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={setTitle}
        value={title}
        autoFocus
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
        onChangeText={setBody}
        value={body}
        multiline
        textAlignVertical="top"
        scrollEnabled={false}
      />

      {response ? (
        <View style={styles.photoContainer}>
          <Image
            source={{uri: response?.assets[0]?.uri}}
            style={styles.photo}
          />
          <Pressable style={styles.deleteButton} onPress={deleteImage}>
            <Delete />
          </Pressable>
        </View>
      ) : (
        <></>
      )}

      <Pressable style={styles.selectPhoto} onPress={() => setImgVisible(true)}>
        <GetImage />
      </Pressable>
      <PermissionModal visible={visible} onClose={onClose} />
      <CameraBottomSheet
        modalVisible={imgVisible}
        setModalVisible={setImgVisible}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 12.5,
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
    flex: 1,
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
    right: 21,
  },

  photoContainer: {
    position: 'absolute',
    bottom: 82,
    right: 21,
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

export default WriteEditor;

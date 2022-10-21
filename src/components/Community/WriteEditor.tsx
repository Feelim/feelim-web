import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import GetImage from '../../assets/images/Community/GetImage.svg';
import Delete from '../../assets/images/Community/Delete.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSetRecoilState} from 'recoil';
import {titleState} from '../../atoms/title';
import {bodyState} from '../../atoms/body';

function WriteEditor() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const setRecoilTitle = useSetRecoilState(titleState);
  const setRecoilBody = useSetRecoilState(bodyState);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
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

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목"
        placeholderTextColor={colors.text5}
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={setTitle}
        value={title}
      />
      <View style={styles.filters}>
        <Text style={styles.filterName}>분류</Text>
        <Pressable style={[styles.filterItem && styles.selected]}>
          <Text style={[styles.filterText && styles.selectedText]}>필름</Text>
        </Pressable>
        <Pressable style={styles.filterItem}>
          <Text style={styles.filterText}>카메라</Text>
        </Pressable>
        <Pressable style={styles.filterItem}>
          <Text style={styles.filterText}>QnA</Text>
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

      <Pressable style={styles.selectPhoto} onPress={onSelectImage}>
        <GetImage />
      </Pressable>
    </View>
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

export default WriteEditor;

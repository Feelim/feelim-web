import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import colors from '../../assets/color';
import {useSetRecoilState} from 'recoil';
import {
  patchImgNameState,
  patchImgTypeState,
  patchImgUrlState,
} from '../../atoms/patchImg';
import ImageModal from 'react-native-image-modal';

export interface Item {
  content?: string;
  images?: Images[];
}
export interface Images {
  fileName: string;
  fileType: string;
  url: string;
}

function PostBody({content, images}: Item) {
  const image = images?.pop();
  const [url, setUrl] = useState('http://');
  const setImgName = useSetRecoilState(patchImgNameState);
  const setImgUrl = useSetRecoilState(patchImgUrlState);
  const setImgType = useSetRecoilState(patchImgTypeState);

  useEffect(() => {
    if (image) {
      setUrl(image.url);
      setImgName(image.fileName);
      setImgType(image.fileType);
      setImgUrl(image.url);
    }
  }, [image]);

  return (
    <View style={styles.block}>
      <ScrollView>
        {images ? (
          <>
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={{uri: url}}
            />
          </>
        ) : (
          <></>
        )}

        <Text style={styles.text}>{content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    height: 290,
  },
  image: {
    width: 83,
    height: 83,
    borderRadius: 3,
    marginBottom: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
  },
});

export default PostBody;

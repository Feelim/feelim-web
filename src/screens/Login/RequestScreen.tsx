import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {Alert, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSetRecoilState} from 'recoil';
import colors from '../../assets/color';
import {permissionImageState} from '../../atoms/permission';
import {RootStackNavigationProp} from '../types';

function RequestScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const setPermissionImage = useSetRecoilState(permissionImageState);

  const requestMultiplePermissions = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE : ', response);
      setPermissionImage(
        Platform.OS === 'ios'
          ? response['ios.permission.PHOTO_LIBRARY_ADD_ONLY']
          : response['android.permission.WRITE_EXTERNAL_STORAGE'],
      );
      navigation.navigate('MainTab');
    });
  };
  const checkMultiplePermissions = () => {
    checkMultiple(
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ],
    ).then(response => {
      console.log('MULTIPLE CHECK RESPONSE : ', response);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 24,
      }}>
      <Text style={styles.title}>
        Chalkak 서비스 사용을 위해 다음 권한의 허용이 필요합니다.
      </Text>
      <View style={styles.item}>
        <Text style={styles.name}>(선택) 위치</Text>
        <Text style={styles.content}>
          사용자의 위치가 지도에 표시되며, 주변 현상소 정보를 제공하기 위해
          사용자의 위치 정보를 요청합니다.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>(선택) 카메라</Text>
        <Text style={styles.content}>
          커뮤니티 게시물 작성 시 사진 업로드를 위해 사용자와 연결되어 있는
          사진에 접근하도록 합니다.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>(선택) 사진</Text>
        <Text style={styles.content}>
          커뮤니티 게시물 작성 및 프로필 사진 업로드를 위해 사용자와 연결되어
          있는 카메라에 접근하도록 합니다.
        </Text>
      </View>
      <Text style={styles.alert}>
        - 허용하지 않으셔도 앱 이용은 가능하나, 일부 서비스 이용에 제한이 있을
        수 있습니다.
      </Text>
      <Text style={styles.alert}>
        - 설정 &gt; chalkak 에서 각 권한 별 변경이 가능합니다
      </Text>
      <Pressable
        onPress={() => requestMultiplePermissions()}
        hitSlop={8}
        style={styles.button}>
        <Text style={styles.buttonText}>확인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: colors.bold,
    color: colors.primary,
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    color: colors.text1,
    fontWeight: '700',
  },
  content: {
    fontSize: 12,
    color: colors.text2,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: colors.bold,
    color: colors.on_primary,
  },
  alert: {
    color: colors.text3,
    fontSize: 12,
    marginBottom: 2,
  },
});

export default RequestScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {Text, View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import colors from '../../assets/color';
import Drawer from '../../assets/images/Community/Drawer.svg';
import Search from '../../assets/images/Community/Search.svg';
import WriteSvg from '../../assets/images/Community/Write.svg';
import {RootStackNavigationProp} from '../../screens/types';
import IsLoginModal from '../Login/IsLoginModal';
import CommunityDrawer from './CommunityDrawer';

function CommunityHeader() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  AsyncStorage.getItem('accessToken', (err, result) => {
    if (result) {
      setIsLogin(true);
    }
  });

  const onPressWrite = () => {
    if (isLogin) {
      navigation.navigate('Write');
    } else {
      setVisible(true);
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            setDrawerOpen(true);
          }}
          hitSlop={8}>
          <Drawer />
        </Pressable>
        <Text style={styles.headerText}>커뮤니티</Text>
        <View style={styles.headerIcons}>
          <Pressable
            style={styles.search}
            onPress={() => {
              navigation.navigate('CommunitySearch');
            }}
            hitSlop={8}>
            <Search />
          </Pressable>
          <Pressable onPress={onPressWrite} hitSlop={8}>
            <WriteSvg />
          </Pressable>
        </View>
      </View>
      <CommunityDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <IsLoginModal visible={visible} onClose={onClose} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 49,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 23,
    paddingRight: 16,
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.primary,
    marginLeft: 30,
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    marginRight: 19,
  },
});

export default CommunityHeader;

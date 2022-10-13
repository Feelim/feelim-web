import {useNavigation} from '@react-navigation/core';
import {Text, View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import colors from '../../assets/color';
import Drawer from '../../assets/images/Community/Drawer.svg';
import Search from '../../assets/images/Community/Search.svg';
import Write from '../../assets/images/Community/Write.svg';
import {
  RootStackNavigationProp,
  LeftDrawerNavigationProp,
} from '../../screens/types';

function CommunityHeader() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const drawerNavigation = useNavigation<LeftDrawerNavigationProp>();
  return (
    <View style={styles.header}>
      <Pressable>
        <Drawer />
      </Pressable>
      <Text style={styles.headerText}>커뮤니티</Text>
      <View style={styles.headerIcons}>
        <Pressable style={styles.search}>
          <Search />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Write');
          }}>
          <Write />
        </Pressable>
      </View>
    </View>
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
    marginLeft: 20,
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

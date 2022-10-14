import {useNavigation} from '@react-navigation/core';
import {Text, View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import colors from '../../assets/color';
import ScrapHeader from '../../assets/images/Community/ScrapHeader.svg';
import MoreHeader from '../../assets/images/Community/MoreHeader.svg';
import Back from '../../assets/images/Community/Back.svg';
import {RootStackNavigationProp} from '../../screens/types';

function PostHeader() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          navigation.pop();
        }}>
        <Back />
      </Pressable>
      <View style={styles.headerIcons}>
        <Pressable style={styles.scrap}>
          <ScrapHeader />
        </Pressable>
        <Pressable>
          <MoreHeader />
        </Pressable>
      </View>
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

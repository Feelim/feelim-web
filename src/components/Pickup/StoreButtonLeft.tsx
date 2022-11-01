import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
  Button,
} from 'react-native';
import colors from '../../assets/color';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

type StoreButtonType = {
  id: number;
  text: string;
  width: number | string;
  src: string;
};

function StoreButtonLeft({id, text, width, src}: StoreButtonType) {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('PickupDetail', {
          id,
        })
      }>
      <View style={[styles.button, {width: width}]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    borderWidth: 1,
    borderColor: colors.text1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {color: colors.text1},
});

export default StoreButtonLeft;

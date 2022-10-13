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
  text: string;
  width: number | string;
  src: string;
};

function StoreButton({text, width, src}: StoreButtonType) {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <Pressable onPress={() => navigation.navigate('PickupRegister')}>
      <View style={[styles.button, {width: width}]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {color: colors.on_primary},
});

export default StoreButton;

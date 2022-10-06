import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
} from 'react-native';
import colors from '../../assets/color';

type PickupInputType = {
  placeholder: string;
};

function PickupInput({placeholder}: PickupInputType) {
  return <TextInput placeholder={placeholder} style={styles.input}></TextInput>;
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: colors.text3,
    borderRadius: 4,
    fontSize: 11,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default PickupInput;

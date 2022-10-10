import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';
import colors from '../../assets/color';

type PickupType = {
  title: string;
  source: ImageSourcePropType;
  explanation: string;
};

function InfoItem({title, source, explanation}: PickupType) {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.InfoItem, {width: width - 32}]}>
      <Text style={styles.title}>{title}</Text>
      <Image
        style={{width: '100%', height: 180}}
        source={source}
        resizeMode="contain"
      />
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  InfoItem: {
    marginVertical: 5,
    height: 280,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  explanation: {
    color: colors.primary,
    fontWeight: '400',
    fontSize: 12,
  },
});

export default InfoItem;

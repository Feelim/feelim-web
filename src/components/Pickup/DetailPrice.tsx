import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Image,
} from 'react-native';
import {Laboratory} from '../../api/types';
import colors from '../../assets/color';
import ImageModal from 'react-native-image-modal';

type DetailPriceType = {
  data: Laboratory | undefined;
};

function DetailPrice({data}: DetailPriceType) {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width - 32}}>
      <Text style={styles.title}>가격표</Text>
      <View style={{height: 96, width: 96, marginBottom: 24}}>
        {data &&
          data.result.bills.map((url, index) => {
            return (
              <ImageModal
                resizeMode="contain"
                style={{height: 96, width: 96, marginTop: 10, borderRadius: 4}}
                source={{uri: `${url}`}}
                key={index}
                modalImageStyle={{minWidth: width}}
              />
            );
          })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 12,
  },
});
export default DetailPrice;

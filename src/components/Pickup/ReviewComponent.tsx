import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Review} from '../../api/types';
import colors from '../../assets/color';

type ReviewPropsType = {
  data: Review | undefined;
};

function ReviewComponent({data}: ReviewPropsType) {
  const {width} = useWindowDimensions();
  const [starNum, setStarNum] = useState(0);

  useEffect(() => {
    if (data?.star) {
      setStarNum(data?.star);
    }
  }, [data?.star]);

  return (
    <View style={{marginTop: 30, width: width - 32}}>
      <View style={styles.profileWrap}>
        <Text style={styles.name}>{data?.nickname}</Text>
        <View style={styles.starWrap}>
          <Image
            style={starNum >= 1 ? [{opacity: 1}] : [{opacity: 0.2}]}
            source={require('../../assets/images/Pickup/star.png')}
          />
          <Image
            style={starNum >= 2 ? [{opacity: 1}] : [{opacity: 0.2}]}
            source={require('../../assets/images/Pickup/star.png')}
          />
          <Image
            style={starNum >= 3 ? [{opacity: 1}] : [{opacity: 0.2}]}
            source={require('../../assets/images/Pickup/star.png')}
          />
          <Image
            style={starNum >= 4 ? [{opacity: 1}] : [{opacity: 0.2}]}
            source={require('../../assets/images/Pickup/star.png')}
          />
          <Image
            style={starNum >= 5 ? [{opacity: 1}] : [{opacity: 0.2}]}
            source={require('../../assets/images/Pickup/star.png')}
          />
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.content}>{data?.content}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pickupTop: {
    height: 41,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starText: {
    height: 21,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 9.5,
  },
  name: {
    height: 21,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '400',
  },
  starWrap: {
    flexDirection: 'row',
    height: 21,
    alignItems: 'center',
    marginLeft: 10,
  },
  profileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewComponent;
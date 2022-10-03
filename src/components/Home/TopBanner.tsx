import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import colors from "../../assets/color";
import Swiper from "react-native-swiper"

const BannerWidth = Dimensions.get('window').width;
const idx = [
    1,
    2,
    3,
    4
];
function TopBanner () {
    return(
        <View style={styles.block}>
                <Swiper
                    autoplay
                    width={BannerWidth}
                    height={207}
                    showsPagination={false}
                >
                    {idx.map((idx)=>{
                        return(
                            <View key={idx} >
                                <Image style={styles.image} source={require('../../assets/images/Home/banner.png')}/>
                                <Text>{idx}</Text>
                            </View>
                        )
                    })}

                </Swiper>
        </View>

    )
}

const styles = StyleSheet.create({
    block:{
        width: '100%',
        height: 207,
    },
    image:{
        width: BannerWidth,
        height: 207,
    }

})

export default TopBanner;
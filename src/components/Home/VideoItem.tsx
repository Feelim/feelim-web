import React from "react";
import { Text, View, StyleSheet, Pressable, Image} from "react-native";
import colors from "../../assets/color";

function VideoItem(){
    return(
        <View style={styles.item}>
            <Image source={require('../../assets/images/Home/video.png')} />
            <Text style={styles.text}>[Youtube] 입문용 필름카메라 추천  top 10</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        width: 164.29,
        marginRight: 6.57,
    },
    text:{
        marginTop: 7.82,
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: -0.408,
        lineHeight: 15,
        width: 154,
        height: 34,
    }
})

export default VideoItem;
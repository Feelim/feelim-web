import React from "react";
import { Text, View, StyleSheet, Pressable, Image} from "react-native";
import colors from "../../assets/color";

export interface Item{
    title: string;
}

function RecommendItem({title}: Item){
    return(
        <View style={styles.item}>
            <Image source={require('../../assets/images/Home/Recommend.png')} />
            <Text style={styles.text}>{title}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        width: 104,
        marginRight: 15,
        marginBottom: 16,
    },
    text:{
        marginTop: 9,
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: -0.408,
        lineHeight: 15,
        width: 91,
        height: 18,
    }
})

export default RecommendItem;
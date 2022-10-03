import React from "react";
import { Text, View, StyleSheet, Pressable} from "react-native";
import colors from "../../assets/color"
import Use from "../../assets/images/Home/Use.svg"

export interface Item {
    name: string;
    icon: any;
}

function TopButtonsItem({name, icon} : Item){
    return(
        <Pressable style={styles.item}>
            <View style={styles.icon}>
                {icon}
            </View>
            <Text style={styles.text}>{name}</Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    item:{
        width: 56,
        height: 71,
        justifyContent: "center",
        alignItems: "center",
    }, 
    icon:{
        width: 43,
        height: 43,
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize: 12,
        fontWeight: '400',
        color: colors.primary,
        marginTop: 10,
        letterSpacing: -0.408,
    }

});

export default TopButtonsItem;
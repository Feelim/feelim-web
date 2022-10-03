import React from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, FlatList} from "react-native";
import colors from "../../assets/color";
import RecommendItem from "./RecommendItem";

const idx = [
    1,
    2,
    3,
    4,
    5,
    6
];

function RecommendSection(){
    return(
        <View style={styles.block}>
            <View style={styles.header}>
                <Text style={styles.title}>Chalkak* 운영진이 추천하는 글 ✏️</Text>
                <Pressable><Text style={styles.more}>더보기 {`>`}</Text></Pressable>
            </View>
            {/* <FlatList
            data={idx}
            renderItem={({item})=><RecommendItem title="필름 최저가 구매팁"/>}
            numColumns={3}
            keyExtractor={(item, index) => 'key'+index}
            /> */}
            <View style={styles.container}>
                {idx.map((idx)=>{
                    return(
                        <RecommendItem key={idx} title="필름 최저가 구매팁"/>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block:{
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title:{
        color: colors.text1,
        fontSize: 16,
        letterSpacing: -0.408,
        fontFamily: 'NotoSansKR-Bold',
        lineHeight:24,
    },
    more:{
        color: colors.text3,
        fontSize: 11,
        fontWeight: '400',
    },
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: 360,
    }
    
});

export default RecommendSection;
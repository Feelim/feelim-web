import React from "react";
import { Text, View, StyleSheet, Pressable, ScrollView} from "react-native";
import colors from "../../assets/color"
import Chalkak from "../../assets/images/Login/Chalkak.svg";
import Star from "../../assets/images/Login/Star.svg";
import Bell from "../../assets/images/Home/Bell.svg"
import MyPage from "../../assets/images/Home/Mypage.svg"
import TopBanner from "../../components/Home/TopBanner";
import TopButtons from "../../components/Home/TopButtons";
import VideoSection from "../../components/Home/VideoSection";
import RecommendSection from "../../components/Home/RecommendSection";

function HomeScreen() {
    return(
        <ScrollView style={styles.fullScreen}>
            <View style={styles.homeTop}>
                <View style={styles.logo}>
                    <Chalkak/>
                    <Star/>
                </View>
                <View style={styles.homeTopRight}>
                    <Pressable style={styles.rightIcon}>
                        <Bell/>
                    </Pressable>
                    <Pressable style={styles.rightIcon}>
                        <MyPage/>
                    </Pressable>
                </View>
            </View>
            <TopBanner/>
            <TopButtons/>
            <View style={styles.underline}/>
            <VideoSection/>
            <View style={styles.underline}/>
            <RecommendSection/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fullScreen:{
        backgroundColor: colors.on_primary,
        flex: 1,
        overflow: "scroll",
    },
    homeTop:{
        height: 41,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    logo:{
        display: "flex",
        flexDirection: 'row',
        marginLeft: 16,
    },
    homeTopRight:{
        display: "flex",
        flexDirection: 'row',
    },
    rightIcon:{
        marginRight: 15,
    },
    underline:{
        backgroundColor: colors.devider1,
        height: 4,
        width: '100%',
    }
})

export default HomeScreen;
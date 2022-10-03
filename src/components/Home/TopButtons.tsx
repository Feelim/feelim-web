import React from "react";
import { Text, View, StyleSheet, Pressable} from "react-native";
import colors from "../../assets/color"
import Star from '../../assets/images/Home/Star.svg';
import Location from '../../assets/images/Home/Location.svg';
import TopButtonsItem from "./TopButtonsItem";
import Use from "../../assets/images/Home/Use.svg"
import Camera from "../../assets/images/Home/Camera.svg"
import Film from "../../assets/images/Home/Film.svg"
import Market from "../../assets/images/Home/Market.svg"


function TopButtons(){
    return(
        <View style={styles.block}>
            <View style={styles.topBtns}>
                <Pressable style={[styles.blackBtn, styles.marginRight]}>
                    <Star/>
                    <Text style={styles.text}>인화픽업{"\n"}
                        서비스 신청</Text>
                </Pressable>
                <Pressable style={styles.blackBtn}>
                    <Location/>
                    <Text style={styles.text}>내 주변{"\n"}
                        현상소 찾기</Text>
                </Pressable>
            </View>
            <View style={styles.bottomBtns}>
                <TopButtonsItem name="필카 사용법" icon={<Use/>}/>
                <TopButtonsItem name="모델 정보" icon={<Camera/>}/>
                <TopButtonsItem name="필름 사용법" icon={<Film/>}/>
                <TopButtonsItem name="필름 마켓" icon={<Market/>}/>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    block:{
        paddingHorizontal:16,
        paddingTop: 22,
        paddingBottom: 24,
        alignItems: "center",
    },
    topBtns:{
        display: "flex",
        flexDirection: 'row',
        marginBottom: 16,
    },
    blackBtn:{
        backgroundColor: colors.primary,
        width: 166,
        height: 80,
        borderRadius: 5,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    text:{
        color: colors.on_primary,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: -0.408,
        marginLeft: 20,
    },
    marginRight:{
        marginRight: 11,
    },
    bottomBtns:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        // paddingHorizontal: 24,
        width: '100%',
    }

})

export default TopButtons;
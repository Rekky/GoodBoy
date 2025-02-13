import React from "react";
import {Image, StyleSheet, View, Text, Pressable, ImageBackground} from "react-native";
import {COLORS} from "../constants/constants";
import {Ad} from "../models/Ad";
import {StarsIndicator} from "./StarsIndicator";

export const AdCard = ({ad}: {ad: Ad}) => {

    return(
        <Pressable style={styles.card} onPress={null}>
            <View style={{height: 125, justifyContent: 'center', alignItems: 'center'}}>
                {!ad.image && (
                    <Image source={require('../../assets/bgs/dog-walk-bg.png')} style={{width: '100%', height: '100%'}} />
                )}
                {ad.image && (
                    <Image source={{uri: ad.image}} style={{width: '100%', height: '100%'}} />
                )}
                {ad.user && (
                    <Image style={styles.avatar} source={{uri: ad.user.avatar}} />
                )}
                {!ad.user && (
                    <Image style={styles.avatar} source={require('../../assets/others/unnamed.png')} />
                )}
            </View>
            <View style={{height: 155, padding: 10}}>
                <Text style={styles.author}>{ad.user?.name}</Text>
                <Text style={{color: COLORS.grayDark}}>{ad.title}</Text>
                <Text style={{color: COLORS.grayDark}}>{ad.description}</Text>
                <Text style={{color: COLORS.greenDark, fontWeight: 'bold'}}>{ad.price}€</Text>
                <View style={{width: '100%', position: 'absolute', bottom: 10, right: 10, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <StarsIndicator stars={1} />
                </View>
            </View>
        </Pressable>
    )
};
export default AdCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: '100%',
        minHeight: 250,
        borderRadius: 10,
        backgroundColor: COLORS.white
    },
    author: {
        paddingTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: COLORS.darkOcean
    },
    avatar: {
        position: "absolute",
        top: 85,
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.white
    }
});
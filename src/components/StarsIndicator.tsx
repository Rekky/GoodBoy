import React from 'react';
import {COLORS} from "../constants/constants";
import {Image, StyleSheet, Text, View} from "react-native";

export const StarsIndicator = ({stars, editable = false, onChange}: {stars: number, editable?: boolean, onChange?: any}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.star} source={require('../../assets/icons/star.png')}/>
            <Image style={styles.star} source={require('../../assets/icons/star.png')}/>
            <Image style={styles.star} source={require('../../assets/icons/star.png')}/>
            <Image style={styles.star} source={require('../../assets/icons/star.png')}/>
            <Image style={styles.star} source={require('../../assets/icons/star.png')}/>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    star: {
        width: 18,
        height: 18,
        marginRight: 5,
        tintColor: COLORS.gray
    }
});
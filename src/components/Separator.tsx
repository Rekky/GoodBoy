import React from 'react';
import {COLORS} from "../constants/constants";
import {StyleSheet, Text, View} from "react-native";

export const Separator = ({text, marginVertical = 20}: any) => {

    return (
        <View style={[styles.separator, {marginVertical: marginVertical, marginTop: marginVertical + 15}]}>
            <View style={styles.container}>
                <View style={styles.separatorLine}></View>
                <Text style={styles.separatorText}>{text}</Text>
                <View style={styles.separatorLine}></View>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    separator: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    separatorLine: {
        flex:1,
        width: '100%',
        borderTopWidth: 1,
        borderColor: COLORS.gray
    },
    separatorText: {
        flex:2,
        top: -10,
        width: 'auto',
        textAlign: 'center',
        color: COLORS.grayDark,
    }
});
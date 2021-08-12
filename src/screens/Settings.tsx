import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable} from "react-native";
import {logout} from "../services/service";
import {COLORS, STYLES_BUTTON} from "../constants/constants";


export default function SettingsScreen() {

    const signOut = async () => {
        try {
            await logout()
        } catch (e ){
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <Text>settings</Text>

            <Pressable onPress={signOut} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.dark, width: 100}]}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight,
    }
});
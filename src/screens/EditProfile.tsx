import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, Text} from "react-native";

export default function EditProfileScreen({route, navigation}: any) {

    useEffect(() => {

    }, [])

    return(
        <View style={styles.container}>
            <Text>edit profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginBottom: 100
    },
    boxContainer: {
        paddingHorizontal: 15,
    },
});
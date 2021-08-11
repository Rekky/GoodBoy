import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable} from "react-native";


export default function SearchScreen() {

    return(
        <View style={styles.container}>
            <Text>search</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight,
    }
});
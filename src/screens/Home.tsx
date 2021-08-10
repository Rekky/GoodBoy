import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from "react-native";


export default function HomeScreen() {

    useEffect(() => {

    },[])

    return(
        <View style={styles.container}>
            <Text>Homeeee</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight,
    }
});

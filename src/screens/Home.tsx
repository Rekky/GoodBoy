import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from "react-native";


export default function HomeScreen({route}: any) {

    useEffect(() => {

    },[])

    return(
        <View style={styles.container}>
            <Text>uid: {route.params.user.uid}</Text>
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

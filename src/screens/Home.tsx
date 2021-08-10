import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable} from "react-native";
import {COLORS, STYLES_BUTTON} from "../constants/constants";
import {logout} from "../services/service";


export default function HomeScreen() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

    },[])


    const signOut = async () => {
        try {
            await logout()
        } catch (e ){
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <Text>Homeeee</Text>
            <Pressable onPress={signOut} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.dark}]}>
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

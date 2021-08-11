import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable} from "react-native";
import {COLORS, STYLES_BUTTON} from "../constants/constants";
import {logout} from "../services/service";
import ProfileImage from "../components/ProfileImage";


export default function ProfileScreen({route}: any) {

    useEffect(() => {
        console.log('ecoooo: ', route.params.user);
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
            <Text>Profileeee</Text>
            <View style={styles.profileImageContainer}>
                <View style={{width: 100, height: 100}}>
                    <ProfileImage editable={true}/>
                </View>
            </View>
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
    },
    profileImageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

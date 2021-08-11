import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable} from "react-native";
import {COLORS, STYLES_BUTTON} from "../constants/constants";
import {logout} from "../services/service";
import ProfileImage from "../components/ProfileImage";
import firebase from "firebase";


export default function ProfileScreen({route}: any) {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const userId = route.params.user.uid;
        const subscriber = firebase.firestore().collection('users').doc(userId).onSnapshot((user: any) => {
            setProfile(user.data());
            console.log(profile);
        });
        return () => subscriber();
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
            <View style={styles.profileImageContainer}>
                <View style={{width: 100, height: 100}}>
                    <ProfileImage editable={true}/>
                </View>
                {/*<Text style={styles.profileText}>{profile.name}</Text>*/}
                <Text style={styles.profileText}>sarah smith</Text>
            </View>
            <View style={styles.profileInfoContainer}>
                <Pressable onPress={signOut} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.dark}]}>
                    <Text>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight,
    },
    profileImageContainer: {
        flex: 0.5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfoContainer: {
        flex:1
    },
    profileText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.darkOcean,
        marginTop: 10,
        textTransform: 'capitalize'
    }
});

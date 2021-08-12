import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable, SafeAreaView, ScrollView, Image} from "react-native";
import {COLORS, STYLES_AUX, STYLES_BUTTON} from "../constants/constants";
import {logout} from "../services/service";
import ProfileImage from "../components/ProfileImage";
import firebase from "firebase";
import {StarsIndicator} from "../components/StarsIndicator";


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

    return(
        <View style={styles.container}>
            <View style={[styles.profileImageContainer, styles.boxContainer]}>
                <View style={{flex:0.5, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 5}}>
                    <View style={{width: 100, height: 100}}>
                        <ProfileImage editable={true}/>
                    </View>
                </View>
                <View style={[STYLES_AUX.ml_2,{flex:1,width: '100%', height: '100%', justifyContent: 'flex-start'}]}>
                    <Text style={[styles.profileText, STYLES_AUX.mb_1]}>{profile.name}</Text>
                    <StarsIndicator stars={0}/>
                </View>
            </View>
            <SafeAreaView style={{flex:1}}>
                <ScrollView>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>TU ANUNCIO</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <View style={{height: 150, borderWidth: 0}}></View>
                    </View>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>TUS MASCOTAS</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <View style={{height: 150, borderWidth: 0}}></View>
                    </View>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>CUENTA</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <View style={styles.listItem}>
                            <Image source={require('../../assets/icons/settings.png')} style={[STYLES_AUX.mr_2, {width: 30, height: 30, tintColor: COLORS.grayDark}]} />
                            <Text style={{fontSize: 18, color: COLORS.grayDark}}>Configuración</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight,
        marginBottom: 100
    },
    boxContainer: {
        paddingHorizontal: 20,
    },
    profileImageContainer: {
        height: 130,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
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
    },
    listItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

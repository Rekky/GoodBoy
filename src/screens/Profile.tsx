import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Pressable,
    SafeAreaView,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import {COLORS, STYLES_AUX, STYLES_BUTTON} from "../constants/constants";
import ProfileImage from "../components/ProfileImage";
import firebase from "firebase";
import {StarsIndicator} from "../components/StarsIndicator";
import AdCard from "../components/AdCard";
import {Ad} from "../models/Ad";
import {User} from "../models/User";


export default function ProfileScreen({route, navigation}: any) {

    const [profile, setProfile]: User | any = useState({});
    const [myAds, setMyAds]: any = useState({});

    useEffect(() => {
        const userId = route.params.user.uid;
        const subscriber = firebase.firestore().collection('users').doc(userId).onSnapshot((user: any) => {
            const userAds = firebase.firestore().collection('ads').where('author', '==', user.data().id).onSnapshot((ads: any) => {
                const myAdsFound =  ads.docs.map((ad: any) => {
                    let uad = new Ad();
                    uad = {... ad.data()}
                    uad.author = user.data().name;
                    return uad
                });
                setMyAds(myAdsFound);
            });
            setProfile(user.data());
        });
        return () => subscriber();
    },[])

    return(
        <View style={styles.container}>
            <View style={[styles.profileImageContainer, styles.boxContainer]}>
                <View style={{flex:0.5, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{width: 95, height: 95}}>
                        <ProfileImage editable={false}/>
                    </View>
                </View>
                <View style={[STYLES_AUX.ml_2,{flex:1,width: '100%', height: '100%', justifyContent: 'flex-start'}]}>
                    <Text style={[styles.profileText, STYLES_AUX.mb_1]}>{profile.name}</Text>
                    <View style={{paddingTop:15, width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <StarsIndicator stars={0}/>
                    </View>
                </View>
            </View>
            <SafeAreaView style={{flex:1}}>
                <ScrollView>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>TU ANUNCIO</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <View style={{minHeight: 150, borderWidth: 0}}>
                            {myAds && myAds.length <= 0 && (
                                <View>
                                    <Text>No tienes anuncio</Text>
                                    <Pressable onPress={() => navigation.navigate('AdEdit')} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.dark, width: 100}]}>
                                    <Text style={{color: COLORS.white}}>Anunciate</Text>
                                    </Pressable>
                                </View>
                            )}
                            <SafeAreaView>
                                <FlatList
                                    data={myAds}
                                    renderItem={({item}) =>
                                        <View>
                                            <Pressable style={{width: '100%', height: '100%', position: 'absolute', zIndex: 1}} onPress={() => navigation.navigate('AdEdit')}></Pressable>
                                            <AdCard ad={item} />
                                        </View>
                                    }
                                    />
                            </SafeAreaView>
                        </View>
                    </View>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>TUS MASCOTAS</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <View style={{height: 150, borderWidth: 0}}></View>
                    </View>
                    <Text style={[styles.boxContainer, STYLES_AUX.pt_3, STYLES_AUX.label]}>CUENTA</Text>
                    <View style={[STYLES_AUX.mt_2, styles.boxContainer, {backgroundColor: COLORS.white}]}>
                        <Pressable style={styles.listItem} onPress={() => navigation.navigate('Settings')}>
                            <Image source={require('../../assets/icons/settings.png')} style={[STYLES_AUX.mr_2, {width: 25, height: 25, tintColor: COLORS.darkOcean}]} />
                            <Text style={{fontSize: 18, color: COLORS.darkOcean}}>Configuración</Text>
                            <Image source={require('../../assets/icons/next.png')} style={[STYLES_AUX.mr_2, {position:'absolute', right: 0, width: 12, height: 12, tintColor: COLORS.gray}]} />
                        </Pressable>
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
        paddingHorizontal: 15,
    },
    profileImageContainer: {
        paddingTop: 30,
        height: 130,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileInfoContainer: {
        flex:1
    },
    profileText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.darkOcean,
        marginTop: 10,
        textTransform: 'capitalize'
    },
    listItem: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

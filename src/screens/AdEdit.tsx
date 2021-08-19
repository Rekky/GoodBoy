import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Pressable,
    TextInput,
    Image,
    Alert,
    SafeAreaView,
    ScrollView, ToastAndroid, ActivityIndicator
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import {Ad} from "../models/Ad";
import {createAd, saveAdImageToDB} from "../services/service";
import firebase from "firebase";


export default function AdEditScreen({navigation, route}: any) {

    // Ad
    const [ad, setAd]: Ad | any = useState({});
    const [kind, setKind]: any = useState('lodging');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage]: string | any = useState(null);
    const [scheduler, setScheduler] = useState('');

    // dropdowm
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([
        {label: 'Alojamiento', value: 'lodging'},
        {label: 'Paseos', value: 'walking'}
    ]);

    // others
    const [uploading, setUploading] = useState(false);
    const [uploadingTransfer, setUploadingTransfer] = useState(0);

    useEffect(() => {
        async function getAd() {
            const res = await firebase.firestore().collection('ads').where('author', '==', firebase.auth().currentUser?.uid).get();
            res.docs.map((item) => {
                if(item.data().kind == 'lodging') {
                    setAd(item.data());
                    setKind(item.data().kind);
                    setTitle(item.data().title);
                    setDescription(item.data().description);
                    setImage(item.data().image);
                    setPrice(item.data().price);
                }
            });
        }
        getAd();
    }, [])

    const save = async () => {
        const ad: Ad = new Ad();
        ad.kind = kind;
        ad.title = title;
        ad.author = firebase.auth().currentUser?.uid ? firebase.auth().currentUser?.uid : route.params.user.uid;
        ad.description = description;
        ad.price = price;
        ad.image = image;

        try {
            if(ad.author)
            await createAd(ad.author, ad.toJSON());
            Alert.alert('Cuidador', 'Tu anuncio ha sido creado y publicado con exito!');
            navigation.goBack();
        } catch (e) {
            Alert.alert('', e);
        }
    }

    const remove = async () => {
        try {
            await firebase.firestore().collection('ads').doc(ad.id).delete();
            navigation.goBack();
        } catch (e) {
            Alert.alert('', e);
        }
    }

    const pickImage = async (mode?: string) => {
        let result = null;

        if(mode === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!(result.cancelled)) {
            try {
                setUploading(true);
                const userId = firebase.auth().currentUser?.uid;
                const response = await fetch(result.uri);
                const blob = await response.blob();
                const reference = firebase.storage().ref(`/images/${userId}/ad-lodging.${result.uri.split('.').pop()}`);

                const task = reference.put(blob);
                task.on('state_changed', taskSnapshot => {
                    setUploadingTransfer(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100));
                }, error => {
                    setUploading(false);
                }, async () => {
                    const refUrl = await task.snapshot.ref.getDownloadURL();
                    setImage(refUrl);
                    await saveAdImageToDB(ad.id, refUrl);
                    setUploading(false);
                });
                ToastAndroid.show('Image uploaded!', ToastAndroid.SHORT);
            } catch (e) {
                ToastAndroid.show('Image uploaded Error!', ToastAndroid.SHORT);
            }
        }
    };

    return(
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{paddingTop: 80}}>
                        <Pressable onPress={() => navigation.goBack()} style={[STYLES_BUTTON.backButton, {left: 10}]}>
                            <Image source={require('../../assets/icons/arrowLeft.png')} resizeMode={'contain'} style={{width: 40, height: 40}}/>
                        </Pressable>
                    </View>
                    <View style={styles.photoContainer}>
                        {uploading && (
                            <View style={{position: 'absolute', backgroundColor: COLORS.gray, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1, flexDirection: 'column'}}>
                                <Text style={{color: COLORS.white}}>Subiendo imagen</Text>
                                <ActivityIndicator size="large" color={COLORS.light} />
                                <Text style={{color: COLORS.white, fontWeight: 'bold'}}>{uploadingTransfer}%</Text>
                            </View>
                        )}
                        {!image && !uploading && (
                            <Pressable style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => pickImage()}>
                                <Image source={require('../../assets/icons/camera.png')} resizeMode={'contain'} style={{width: 30, height: 30, tintColor: COLORS.grayDark}}/>
                                <Text style={{color: COLORS.grayDark, fontSize: 10}}>Añade una foto</Text>
                                <Text>image: {ad.image}</Text>
                            </Pressable>
                        )}
                        {image && !uploading && (
                            <Pressable style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => pickImage()}>
                                <Image source={{uri: image}} resizeMode={'cover'} style={{width: '100%', height: '100%'}}/>
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.boxContainer}>
                        <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Ofresco</Text>
                        <DropDownPicker
                            open={dropdownOpen}
                            value={kind}
                            items={dropdownItems}
                            setOpen={setDropdownOpen}
                            setValue={setKind}
                            setItems={setDropdownItems}
                        />
                    </View>
                    <View style={styles.boxContainer}>
                        <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Titulo</Text>
                        <TextInput style={STYLES_INPUTS.inputText} placeholder={'Título'} onChangeText={(text: string) => setTitle(text)} maxLength={100} value={title}/>
                        <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Descripción</Text>
                        <TextInput style={[STYLES_INPUTS.inputText, {height: 135}]} placeholder={'Descripcion de tu servicio'} onChangeText={(text: string) => setDescription(text)} value={description} textAlign={'left'} textAlignVertical={'top'} multiline={true} maxLength={250} numberOfLines={5}/>
                        <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Precio</Text>
                        <TextInput style={STYLES_INPUTS.inputText} placeholder={'Precio'} onChangeText={(text: string) => setPrice(parseInt(text))} keyboardType={"decimal-pad"} value={isNaN(price) ? '0' : price.toString()}/>
                    </View>
                    <View style={[styles.boxContainer, {justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 30}]}>
                        <Pressable onPress={save} style={[STYLES_BUTTON.buttonBasic, STYLES_AUX.mt_3, {flex: 1, backgroundColor: COLORS.dark}]}>
                            <Text style={[STYLES_AUX.label, {color: COLORS.white}]}>Guardar</Text>
                        </Pressable>
                        <Pressable onPress={remove} style={[STYLES_BUTTON.buttonBasic, STYLES_AUX.mt_3, {marginLeft: 10, flex: 0.2, backgroundColor: COLORS.red}]}>
                            <Image source={require('../../assets/icons/trash.png')} style={[STYLES_AUX.mr_2, {width: 25, height: 25, tintColor: COLORS.white, position: 'absolute'}]} />
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
    },
    boxContainer: {
        paddingHorizontal: 15,
    },
    photoContainer: {
        height: 180,
        backgroundColor: COLORS.gray
    }
});
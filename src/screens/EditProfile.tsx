import React, {useEffect, useState} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    SafeAreaView,
    ScrollView, ToastAndroid
} from "react-native";
import {COLORS, STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";
import ProfileImage from "../components/ProfileImage";
import firebase from "firebase";
import {saveUserProfile} from "../services/service";
import {User} from "../models/User";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen({route, navigation}: any) {

    const [user, setUser]: any = useState(null);

    const [avatar, setAvatar]: any = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [cp, setCp] = useState('');

    const [uploading, setUploading] = useState(false);
    const [uploadingTransfer, setUploadingTransfer] = useState(0);



    useEffect(() => {
        const subscription = firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).onSnapshot((user: any) => {
            let resUser = new User();
            resUser = {...user.data()};
            setUser(resUser);

            setName(user.data().name);
            setPhone(user.data().phone);
            setCity(user.data().city);
            setAddress(user.data().address);
            setCp(user.data().cp);
            setAvatar(user.data().avatar);
        });
        return subscription;
    }, [])

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
                const reference = firebase.storage().ref(`/images/${userId}/avatar.${result.uri.split('.').pop()}`);

                const task = reference.put(blob);
                task.on('state_changed', taskSnapshot => {
                    setUploadingTransfer(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100));
                }, error => {
                    setUploading(false);
                }, async () => {
                    const refUrl = await task.snapshot.ref.getDownloadURL();
                    setAvatar(refUrl);
                    setUploading(false);
                });
                ToastAndroid.show('Image uploaded!', ToastAndroid.SHORT);
            } catch (e) {
                ToastAndroid.show('Image uploaded Error!', ToastAndroid.SHORT);
            }
        }
    };

    const save = async () => {
        try {
            const userId = firebase.auth().currentUser?.uid;
            if(userId) {
                let editUser = new User();
                editUser = {...user};

                editUser.name = name;
                editUser.phone = phone;
                editUser.city = city;
                editUser.address = address;
                editUser.cp = cp;
                editUser.avatar = avatar;
                await saveUserProfile(userId, editUser);
                ToastAndroid.show('Datos actualizados!', ToastAndroid.SHORT);
                navigation.goBack();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{width: 100, height: 100}}>
                                <ProfileImage editable={true} uri={avatar} onChange={pickImage}/>
                            </View>
                        </View>

                        <Text style={[STYLES_AUX.pt_2, STYLES_AUX.label]}>Nombre</Text>
                        <Text>{avatar}</Text>
                        <TextInput value={name} onChangeText={e => setName(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Nombre"/>

                        <Text style={[STYLES_AUX.pt_2, STYLES_AUX.label]}>Teléfono</Text>
                        <TextInput value={phone} onChangeText={e => setPhone(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Telefono" keyboardType={"phone-pad"}/>

                        <Text style={[STYLES_AUX.pt_2, STYLES_AUX.label]}>Ciudad</Text>
                        <TextInput value={city} onChangeText={e => setCity(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Ciudad"/>

                        <Text style={[STYLES_AUX.pt_2, STYLES_AUX.label]}>Dirección</Text>
                        <TextInput value={address} onChangeText={e => setAddress(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Dirección"/>

                        <Text style={[STYLES_AUX.pt_2, STYLES_AUX.label]}>Codigo Postal</Text>
                        <TextInput value={cp} onChangeText={e => setCp(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Codigo postal" keyboardType={"number-pad"}/>

                        <Pressable onPress={save} style={[STYLES_BUTTON.buttonBasic, STYLES_AUX.mt_3, {backgroundColor: COLORS.dark}]}>
                            <Text style={[STYLES_BUTTON.buttonBasicText, {color: COLORS.light}]}>Guardar</Text>
                        </Pressable>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    boxContainer: {
        paddingHorizontal: 15,
    },
});
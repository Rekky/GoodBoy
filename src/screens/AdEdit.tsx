import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable, TextInput, Image} from "react-native";
import {COLORS, STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";


export default function AdEditScreen({navigation}: any) {

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [scheduler, setScheduler] = useState('');

    useEffect(() => {

    }, [])

    const save = () => {
        const ad = {}
    }

    const remove = () => {

    }

    return(
        <View style={styles.container}>
            <View style={{paddingTop: 100}}>
                <Pressable onPress={() => navigation.goBack()} style={[STYLES_BUTTON.backButton, {left: 10}]}>
                    <Image source={require('../../assets/icons/arrowLeft.png')} resizeMode={'contain'} style={{width: 30, height: 30}}/>
                </Pressable>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 20}}>
                <Pressable onPress={null} style={{marginRight: 30, borderWidth: 2, borderColor: COLORS.gray}}>
                    <Text style={{fontSize: 20}}>Cuidados</Text>
                </Pressable>
                <Pressable onPress={null}>
                    <Text style={{fontSize: 20}}>Paseos</Text>
                </Pressable>
            </View>
            <View style={styles.boxContainer}>
                <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Titulo</Text>
                <TextInput style={STYLES_INPUTS.inputText} placeholder={'Título'} onChangeText={(text: string) => setTitle(text)} maxLength={100}/>
                <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Descripción</Text>
                <TextInput style={[STYLES_INPUTS.inputText, {height: 135}]} placeholder={'Descripcion de tu servicio'} onChangeText={(text: string) => setDescription(text)} textAlign={'left'} textAlignVertical={'top'} multiline={true} maxLength={250} numberOfLines={5}/>
                <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Precio</Text>
                <TextInput style={STYLES_INPUTS.inputText} placeholder={'Precio'} onChangeText={(text: string) => setPrice(text)}/>
            </View>
            <View style={[styles.boxContainer, {justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}]}>
                <Pressable onPress={save} style={[STYLES_BUTTON.buttonBasic, STYLES_AUX.mt_3, {flex: 1, backgroundColor: COLORS.dark}]}>
                    <Text style={[STYLES_AUX.label, {color: COLORS.white}]}>Guardar</Text>
                </Pressable>
                <Pressable onPress={remove} style={[STYLES_BUTTON.buttonBasic, STYLES_AUX.mt_3, {marginLeft: 10, flex: 0.2, backgroundColor: COLORS.red}]}>
                    <Image source={require('../../assets/icons/trash.png')} style={[STYLES_AUX.mr_2, {width: 25, height: 25, tintColor: COLORS.white, position: 'absolute'}]} />
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
    boxContainer: {
        paddingHorizontal: 15,
    },
});
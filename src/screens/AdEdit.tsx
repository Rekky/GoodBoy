import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, Pressable, TextInput, Image} from "react-native";
import {STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";


export default function AdEditScreen({navigation}: any) {

    const [description, setDescription] = useState('');

    return(
        <View style={styles.container}>
            <View style={{paddingTop: 100}}>
                <Pressable onPress={() => navigation.goBack()} style={[STYLES_BUTTON.backButton, {top: StatusBar.currentHeight, left: 10}]}>
                    <Image source={require('../../assets/icons/arrowLeft.png')} resizeMode={'contain'} style={{width: 30, height: 30}}/>
                </Pressable>
            </View>
            <View style={[styles.boxContainer, {paddingTop: 30}]}>
                <Text style={STYLES_AUX.label}>Descripción</Text>
                <TextInput style={STYLES_INPUTS.inputText} placeholder={'Descripcion de tu servicio'} onChangeText={(text: string) => setDescription(text)}/>
            </View>
            <View>
                <Pressable onPress={} style={[STYLES_BUTTON.backButton]}>
                    <Text style={STYLES_AUX.label}>Guardar</Text>
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
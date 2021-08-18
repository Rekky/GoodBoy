import React, {createContext} from 'react';
import {StyleSheet, Text, TextInput, View, Pressable, Alert, Image, StatusBar, ActivityIndicator} from "react-native";
import "firebase/auth";
import {useState} from "react";
import {COLORS, STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";
import {register} from "../services/service";

export const UserContext = createContext(null);
const SignUpScreen = ({onCreateAccount, onBack}: any) => {

    // register
    const [registerName, setRegisterName] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");

    const [loading, setLoading] = useState(false);


    const signUp = async function() {
        try {
            setLoading(true);
            await register(registerName, registerEmail, registerPass);
            setLoading(false);
            setRegisterPass('');
        } catch (e) {
            setLoading(false);
            Alert.alert('', e.toString());
        }
    };


    return (
        <View style={styles.container}>
            <Pressable onPress={() => onBack(true)} style={[STYLES_BUTTON.backButton, {top: StatusBar.currentHeight, left: 20}]}>
                <Image source={require('../../assets/icons/arrowLeft.png')} resizeMode={'contain'} style={{width: 30, height: 30}}/>
            </Pressable>
            <View style={styles.firstStepContainer}>
                <View style={[{flex: 0.8,width: '100%', alignItems: 'flex-start', overflow: 'hidden', justifyContent: 'center'}]}>
                    <Text style={styles.title}>Crear</Text>
                    <Text style={styles.title}>Nuevo Usuario</Text>
                </View>
                <View style={[styles.boxContainer, {flex: 1, justifyContent: 'flex-start'}]}>
                    <TextInput value={registerName} onChangeText={e => setRegisterName(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_3]} placeholder="Nombre"/>
                    <TextInput value={registerEmail} onChangeText={e => setRegisterEmail(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Correo"/>
                    <TextInput value={registerPass} onChangeText={e => setRegisterPass(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Contraseña" secureTextEntry={true}/>
                    <Pressable onPress={signUp} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.dark}]}>
                        {loading && (<ActivityIndicator size="large" color={COLORS.light} />)}
                        {!loading && (<Text style={[STYLES_BUTTON.buttonBasicText, {color: COLORS.light}]}>Crear</Text>)}
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.grayLight,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    firstStepContainer: {
        flex:1,
        paddingHorizontal: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        fontSize: 35,
        color: COLORS.dark
    }
});


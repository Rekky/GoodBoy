import React, {createContext} from 'react';
import {StyleSheet, Text, TextInput, View, Pressable, Alert, Image, ActivityIndicator} from "react-native";
import {useState} from "react";
import {COLORS, STYLES_AUX, STYLES_BUTTON, STYLES_INPUTS} from "../constants/constants";
import {Separator} from "../components/Separator";
import {login} from "../services/service";
import SignUpScreen from "./SignUp";

export const UserContext = createContext(null);
const SignInScreen = () => {

    // login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");

    // aux
    const [loading, setLoading] = useState(false);
    const [showSignInForm, setShowSignInForm] = useState(true);

    const signIn = async function() {
        try {
            setLoading(true);
            await login(loginEmail, loginPass);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            Alert.alert('', e.toString());
        }
    };

    const SignUpGoogle = async () => {
        // await GoogleSignIn.askForPlayServicesAsync();
        // const { type, user } = await GoogleSignIn.signInAsync();
        // console.log('SignUpGoogle', user);
    }

    return (
        showSignInForm? (
        <View style={styles.container}>
            <View style={{flex: 1, paddingTop: 150, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>GoodBoy</Text>
            </View>
            <View style={{flex: 3, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.firstStepContainer}>
                    <View style={styles.boxContainer}>
                        <TextInput value={loginEmail} onChangeText={e => setLoginEmail(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Correo"/>
                        <TextInput value={loginPass} onChangeText={e => setLoginPass(e)} style={[STYLES_INPUTS.inputText, STYLES_AUX.mb_2]} placeholder="Contraseña" secureTextEntry={true}/>
                        <Pressable onPress={signIn} style={[STYLES_BUTTON.buttonBasic,{backgroundColor: COLORS.dark}]}>
                            {loading && (<ActivityIndicator size="large" color={COLORS.light} />)}
                            {!loading && (<Text style={[STYLES_BUTTON.buttonBasicText, {color: COLORS.light}]}>Acceder</Text>)}
                        </Pressable>
                    </View>
                    <Separator marginVertical={40} text={'Acceder con'}/>
                    <View style={styles.boxContainer}>
                        <Pressable onPress={SignUpGoogle} style={[STYLES_BUTTON.buttonBasic, {backgroundColor: COLORS.white}]}>
                            <Image source={require('../../assets/icons/google-logo.png')} resizeMode={'contain'} style={{width: 30, height: 30, marginRight: 15}}/>
                            <Text style={[STYLES_BUTTON.buttonBasicText, {color: COLORS.grayDark}]}>Google</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.boxContainer, {flexDirection: 'row', marginTop: 60}]}>
                        <Text>No estas registrado?</Text>
                        <Pressable onPress={() => setShowSignInForm(false)} style={{marginLeft: 10}}>
                            <Text style={{color: COLORS.primary}}>Crear una cuenta</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        ) : (
          <SignUpScreen onBack={(e: any) => setShowSignInForm(e)}/>
        )
    );
}
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.grayLight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstStepContainer: {
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
        fontSize: 40,
    }
});

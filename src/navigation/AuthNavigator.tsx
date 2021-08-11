import React, { useState, useEffect, createContext } from 'react'
import firebase from 'firebase';
import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


export const AuthContext = createContext(null);


const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(true);

    function onAuthStateChanged(result: any) {
        setUser(result);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return authSubscriber
    }, [])

    if (initializing) {
        return null
    }

    return user ? (
        <AuthContext.Provider value={user}>
             <SignInStack/>
        </AuthContext.Provider>
    ) : (
        <SignOutStack />
    )
}
export default AuthNavigator;

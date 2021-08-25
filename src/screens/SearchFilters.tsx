import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Pressable,
    TextInput,
    SafeAreaView,
    ScrollView,
    Image,
    FlatList
} from "react-native";
import {COLORS, STYLES_AUX, STYLES_INPUTS} from "../constants/constants";
import firebase from "firebase";
import AdCard from "../components/AdCard";


export default function SearchFilterScreen() {

    const [results, setResults]: any = useState({});

    useEffect(() => {

    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Filtros</Text>
            </View>
            <View style={[styles.boxContainer]}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom: 100
    },
    boxContainer: {
        paddingHorizontal: 15,
    }
});
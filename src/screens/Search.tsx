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


export default function SearchScreen() {

    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('ads').where('title', '!=', '0').limit(30).onSnapshot((item: any) => {
            setResults(item.docs.map((res: any) => res.data()));
        });
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <View style={{position: 'relative', justifyContent: 'center', marginTop: 20}}>
                    <TextInput style={STYLES_INPUTS.inputText} placeholder={'Buscar alojamiento o paseos'} onChangeText={(text: string) => setSearchText(text)} maxLength={100} value={searchText}/>
                    <Pressable style={{position: 'absolute', right: 0, backgroundColor: COLORS.primary, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}} onPress={null}>
                        <Image source={require('../../assets/icons/search.png')} style={{width: 20, height: 20, tintColor: COLORS.white}}/>
                    </Pressable>
                </View>
                <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Buscar</Text>
            </View>
            <View style={[styles.boxContainer, {flex: 1, paddingTop: 20}]}>
                <SafeAreaView>
                    <FlatList
                        data={results}
                        renderItem={({item}) => <AdCard ad={item} onPress={null}/>}
                    />
                </SafeAreaView>
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
    }
});
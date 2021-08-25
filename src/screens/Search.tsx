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
import {Ad} from "../models/Ad";
import SearchFilterScreen from "./SearchFilters";


export default function SearchScreen() {

    const [searchText, setSearchText]: any = useState('');
    const [results, setResults]: any = useState({});
    const [showSearchFilter, setShowSearchFilter]: any = useState(true);

    useEffect(() => {
        firebase.firestore().collection('ads').where('title', '!=', '0').limit(30).onSnapshot(async (item: any) => {
            const resultQuery = await Promise.all(item.docs.map(async (res: any) => {
                const user = await firebase.firestore().collection('users').doc(res.data().author).get();
                let ad = new Ad();
                ad = {... res.data()};
                ad.author = user.data()?.name;
                return ad;
            }));
            setResults(resultQuery);
        });
    }, [])

    return(
        <View style={styles.container}>
            {showSearchFilter && (
                <SearchFilterScreen />
            )}
            {!showSearchFilter && (
                <View>
                    <View style={styles.boxContainer}>
                        {/*<View style={{position: 'relative', justifyContent: 'center', marginTop: 20}}>*/}
                        {/*    <TextInput style={STYLES_INPUTS.inputText} placeholder={'Buscar alojamiento o paseos'} onChangeText={(text: string) => setSearchText(text)} maxLength={100} value={searchText}/>*/}
                        {/*    <Pressable style={{position: 'absolute', right: 0, backgroundColor: COLORS.primary, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}} onPress={null}>*/}
                        {/*        <Image source={require('../../assets/icons/search.png')} style={{width: 20, height: 20, tintColor: COLORS.white}}/>*/}
                        {/*    </Pressable>*/}
                        {/*</View>*/}
                        <Text style={[STYLES_AUX.label, STYLES_AUX.mt_2]}>Buscar</Text>
                    </View>
                    <View style={[styles.boxContainer, {flex: 1, paddingTop: 20}]}>
                        <SafeAreaView>
                            <FlatList
                                data={results}
                                scrollEnabled={true}
                                renderItem={({item}) =>
                                    <View style={{marginBottom: 20}}>
                                        <AdCard ad={item}/>
                                    </View>
                                }
                            />
                        </SafeAreaView>
                    </View>
                </View>
            )}
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
    }
});
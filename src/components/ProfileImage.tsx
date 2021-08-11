import React from "react";
import {Image, Pressable, StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {COLORS} from "../constants/constants";

export const ProfileImage = ({uri, loading, onChange, editable}: any) => {

    const onUpload = () => {
        onChange(true);
    }

    return(
        <View style={styles.profileImage}>
            {loading && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
                    <ActivityIndicator size="large" color={COLORS.dark} />
                </View>
            )}
            {uri && (
                <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={{uri: uri}}/>
            )}
            {!uri && (
                <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../assets/others/unnamed.png')}/>
            )}
            {editable && (
                <Pressable style={styles.editButton} onPress={() => onChange(true)}>
                    <Image style={{width: '100%', height: '100%', tintColor: COLORS.white}} source={require('../../assets/icons/camera-fill.png')}/>
                </Pressable>
            )}
        </View>
    )
};
export default ProfileImage;

const styles = StyleSheet.create({
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: COLORS.white,
        padding: 4,
        elevation: 10
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: COLORS.pink,
    }
});
import React from 'react';
import {COLORS} from "../constants/constants";
import {Image, StyleSheet, Text, View} from "react-native";

export const StarsIndicator = ({stars, editable = false, onChange}: {stars: number, editable?: boolean, onChange?: any}) => {

    const starArray = [0,1,2,3,4];

    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', width: 'auto', bottom: 0, right: 0, flexDirection: 'row'}}>
                {starArray.map((item) =>
                    (<Image key={item} style={[styles.star]} source={require('../../assets/icons/star.png')}/>)
                )}
            </View>
            <View style={{position: 'absolute', width: 'auto', bottom: 0, right: 0, flexDirection: 'row'}}>
                {starArray.map((item) =>
                    item < stars && (
                        <Image key={item} style={[styles.star, {tintColor: COLORS.yellow}]} source={require('../../assets/icons/star.png')}/>
                    )
                )}
            </View>
        </View>
    );
}
export const styles = StyleSheet.create({
    container: {
        width: 'auto',
        flexDirection: 'row',
    },
    star: {
        width: 18,
        height: 18,
        marginRight: 5,
        tintColor: COLORS.gray
    }
});
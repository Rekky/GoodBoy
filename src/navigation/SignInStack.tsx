import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {COLORS} from "../constants/constants";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

const SignInStack = () => {

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: COLORS.grayLight
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={Tabs}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default SignInStack;

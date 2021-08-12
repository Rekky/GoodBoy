import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {COLORS} from "../constants/constants";
import Tabs from "./Tabs";
import SettingsScreen from "../screens/Settings";

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
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default SignInStack;

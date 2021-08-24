import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {COLORS} from "../constants/constants";
import Tabs from "./Tabs";
import SettingsScreen from "../screens/Settings";
import AdEditScreen from "../screens/AdEdit";
import EditProfileScreen from "../screens/EditProfile";
import {Text} from "react-native";

const Stack = createStackNavigator();

const SignInStack = ({user}: any) => {

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: COLORS.grayLight
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Tabs" component={Tabs}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{
                    headerShown: true,
                    headerTitle: () => <Text style={{fontSize: 20}}>Ajustes</Text>
                }}/>
                <Stack.Screen name="AdEdit" component={AdEditScreen} initialParams={user} options={{
                    headerShown: true,
                    headerTitle: () => <Text style={{fontSize: 20}}>Mis Servicios</Text>
                }}/>
                <Stack.Screen name="EditProfile" component={EditProfileScreen} initialParams={user} options={{
                    headerShown: true,
                    headerTitle: () => <Text style={{fontSize: 20}}>Mi Perfil</Text>
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default SignInStack;

import * as React from 'react'
import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from "../screens/SignIn";
import {COLORS} from "../constants/constants";

const Stack = createStackNavigator()

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.white
    },
};
const SignOutStack = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default SignOutStack;

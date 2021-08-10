import React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import {COLORS} from "../constants/constants";

const Tab = createBottomTabNavigator();


const Tabs = () => {

    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'relative',
                    borderTopWidth: 0,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    elevation: 0,
                    width: '100%',
                }
            }}
        >
            <Tab.Screen
                name={'Home'}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/heart.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.secondary}}/>)
                }}/>
            <Tab.Screen
                name={'Chats'}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/heart.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.secondary}}/>)
                }}/>
            <Tab.Screen
                name={'Profile'}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/heart.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.secondary}}/>)
                }}/>
        </Tab.Navigator>
    );
}
export default Tabs;
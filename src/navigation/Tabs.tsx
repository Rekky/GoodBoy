import React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import {COLORS} from "../constants/constants";
import ProfileScreen from "../screens/Profile";
import SearchScreen from "../screens/Search";
import ChatsScreen from "../screens/Chats";
import {AuthContext} from "./AuthNavigator";

const Tab = createBottomTabNavigator();


const Tabs = () => {

    return(
        <AuthContext.Consumer>
            {(user) => (
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            position: 'absolute',
                            height: 80,
                            borderRadius: 30,
                            borderTopWidth: 0,
                            marginBottom: 20,
                            marginHorizontal: 20,
                            elevation: 60
                        }
                    }}>
                    <Tab.Screen
                        name={'Home'}
                        component={HomeScreen}
                        initialParams={{user: user}}
                        options={{
                            tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/home.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.grayDark}}/>)
                        }}/>
                    <Tab.Screen
                        name={'Search'}
                        component={SearchScreen}
                        initialParams={{user: user}}
                        options={{
                            tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/search.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.grayDark}}/>)
                        }}/>
                    <Tab.Screen
                        name={'Chats'}
                        component={ChatsScreen}
                        initialParams={{user: user}}
                        options={{
                            tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/chat.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.grayDark}}/>)
                        }}/>
                    <Tab.Screen
                        name={'Profile'}
                        component={ProfileScreen}
                        initialParams={{user: user}}
                        options={{
                            tabBarIcon: ({focused}) => (<Image source={require('../../assets/icons/user.png')} resizeMode={'contain'} style={{width:25, height:25, tintColor: focused ? COLORS.primary : COLORS.grayDark}}/>)
                        }}/>
                </Tab.Navigator>
            )}
        </AuthContext.Consumer>
    );
}
export default Tabs;
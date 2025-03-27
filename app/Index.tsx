import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoradingScreen from './OnBoradingScreen/Index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabsLayout from './(tabs)/_layout';
import Home from './(tabs)/index';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()



const App = () => {

    return (

        <>
            <Stack.Navigator initialRouteName='onBoardingScreen'>
                <Stack.Screen name='onBoardingScreen' options={{ headerShown: false }}
                    component={OnBoradingScreen} />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </>

    )
}

export default App

const styles = StyleSheet.create({})
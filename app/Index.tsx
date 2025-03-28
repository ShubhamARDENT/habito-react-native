import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoradingScreen from './OnBoradingScreen/Index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabsLayout from './(Tabs)/_layout';
import Home from './(Tabs)';
import { AuthProvider } from '@/components/auth';


const Stack = createNativeStackNavigator()




const App = () => {

    return (

        <>
            <AuthProvider>
                <Stack.Navigator initialRouteName='onBoardingScreen'>
                    <Stack.Screen name='onBoardingScreen' options={{ headerShown: false }}
                        component={OnBoradingScreen} />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </AuthProvider>
        </>

    )
}

export default App

const styles = StyleSheet.create({})
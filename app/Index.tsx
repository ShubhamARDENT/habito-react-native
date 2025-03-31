import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import '../global.css'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoradingScreen from './OnBoradingScreen/Index';
import Home from './(tabs)';
import { AuthProvider } from '@/components/auth';
import { authEventEmitter, AUTH_EVENTS } from '@/utils/events';

const Stack = createNativeStackNavigator()

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkToken();
        
        // Add listener for token changes
        const handleTokenChange = () => {
            checkToken();
        };

        authEventEmitter.on(AUTH_EVENTS.TOKEN_CHANGE, handleTokenChange);

        return () => {
            authEventEmitter.off(AUTH_EVENTS.TOKEN_CHANGE, handleTokenChange);
        };
    }, []);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Error checking token:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return null; // or a loading spinner
    }

    return (
        <AuthProvider>
            <Stack.Navigator initialRouteName="onBoardingScreen">
                <Stack.Screen 
                    name='onBoardingScreen' 
                    options={{ headerShown: false }}
                    component={OnBoradingScreen} 
                />
                {isAuthenticated ? (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                ) : null}
            </Stack.Navigator>
        </AuthProvider>
    )
}

export default App

const styles = StyleSheet.create({})
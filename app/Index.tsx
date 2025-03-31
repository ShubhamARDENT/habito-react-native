import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import '../global.css';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken, RootState, AppDispatch } from '@/components/auth';
import OnBoradingScreen from './OnBoradingScreen/Index';
import Home from './(tabs)';

const Stack = createNativeStackNavigator();

const AppContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(loadToken());
    }, [dispatch]);

    if (loading) {
        return null; // Show a loading spinner or placeholder if needed
    }

    return (
        <Stack.Navigator initialRouteName={"onBoardingScreen"}>
            <Stack.Screen
                name="onBoardingScreen"
                options={{ headerShown: false }}
                component={OnBoradingScreen}
            />
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Home}
            />
        </Stack.Navigator>
    );
};

const App = () => {
    return <AppContent />;
};

export default App;

const styles = StyleSheet.create({});
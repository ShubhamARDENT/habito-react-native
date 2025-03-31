import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, login, setLoading, RootState } from '@/components/auth';

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8000', // Android emulator
    ios: 'http://localhost:8000',     // iOS simulator
    default: 'http://127.0.0.1:8000', // Local development
});

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.auth.loading);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required!");
            return;
        }

        dispatch(setLoading(true));

        try {
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response?.ok) {
                throw new Error(data.detail || "Login failed");
            }

            dispatch(login(data?.access_token));
        } catch (error) {
            Alert.alert("Login Failed", error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <SafeAreaView className='h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View style={styles.container}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Continue with E-mail</Text>

                    {/* Email Input */}
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input */}
                    <Text style={styles.label}>PASSWORD</Text>
                    <TextInput
                        style={styles.password}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.nextContainer}>
                    {/* Next Button */}
                    <TouchableOpacity
                        style={[styles.nextButton, loading && { opacity: 0.5 }]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.nextButtonText}>{loading ? "Logging in..." : "Next"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                        {/* Create Account Link */}
                        <Text style={styles.createAccount}>
                            Don’t have an account? <Text style={styles.createText}>Let’s create!</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    nextContainer: { marginBottom: 20 },
    password: {
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    container: {
        flex: 1,
        backgroundColor: '#f6f9ff',
        padding: 20,
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20,
    },
    forgotPassword: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#2B2BEF',
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createAccount: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    createText: {
        color: '#2B2BEF',
        fontWeight: 'bold',
    },
});

export default SignIn;

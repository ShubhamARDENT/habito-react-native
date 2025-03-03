import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const signIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView className='h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View style={styles.container}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} >
                        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.push('/Index')} />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Continue with E-mail</Text>

                    {/* Email Input */}
                    <Text style={styles.label}>E-MAIL</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

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

                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>I forgot my password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.nextContainer}>
                    {/* Next Button */}
                    <TouchableOpacity style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Next</Text>
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
    nextContainer: {
        marginBottom: 20
    },
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
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

export default signIn;
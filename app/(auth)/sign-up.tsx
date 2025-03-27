import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = () => {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        full_name: string;
        birthday: string | null;
    }>({
        email: '',
        password: '',
        full_name: '',
        birthday: null,
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const dateConstraints = useMemo(() => {
        const today = new Date();
        const maxDate = new Date();
        const minDate = new Date();
        
        // Set maximum date to today
        maxDate.setHours(23, 59, 59, 999);
        
        // Set minimum date to 120 years ago (reasonable maximum age)
        minDate.setFullYear(today.getFullYear() - 120);
        
        // Calculate date for 13 years ago
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
        
        return {
            maxDate: thirteenYearsAgo,
            minDate: minDate
        };
    }, []);

    const handleSignUp = async () => {
        try {
            const payload = {
                birthday: formData.birthday,        // Changed from date_of_birth to birthday
                email: formData.email,
                password: formData.password,
                name: formData.full_name,    // Changed from habits array to selected_habits
            };

            console.log('Sending payload:', payload); // Debug log

            const apiUrl = Platform.select({
                ios: 'http://localhost:8000',
                android: 'http://10.0.2.2:8000',
            });

            const response = await fetch(`${apiUrl}/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response?.ok) {
                await AsyncStorage.setItem('token', JSON.stringify(data?.access_token));
                router.push('/(auth)/HabitScreen');
            } else {
                // Better error handling
                const errorMessage = data.detail?.[0]?.msg || 'Signup failed';
                const fieldName = data.detail?.[0]?.loc?.[1] || 'unknown field';
                throw new Error(`${errorMessage} (${fieldName})`);
            }
        } catch (error) {
            console.error('Error saving signup data:', error);
            // Add error handling/user feedback here
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, birthday: formattedDate }));
        }
    };

    return (
        <SafeAreaView className='h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View style={styles.container}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} >
                        <Ionicons name="arrow-back" size={24} color="black"
                            onPress={() => router.push('/OnBoradingScreen/Index')} />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Create Account</Text>

                    {/* Full Name Input */}
                    <Text style={styles.label}>FULL NAME</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            placeholderTextColor="#999"
                            value={formData.full_name}
                            onChangeText={(text) => setFormData(prev => ({...prev, full_name: text}))}
                        />
                    </View>

                    {/* Email Input */}
                    <Text style={styles.label}>EMAIL</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter your email'
                            placeholderTextColor="#999"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Input */}
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter your password'
                            placeholderTextColor="#999"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
                            secureTextEntry
                        />
                    </View>

                    {/* Birthdate Input */}
                    <Text style={styles.label}>BIRTHDATE</Text>
                    <TouchableOpacity 
                        style={styles.inputContainer}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={[styles.input, !formData.birthday && { color: '#999' }]}>
                            {formData.birthday || 'Select your birthdate'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={formData.birthday ? new Date(formData.birthday) : dateConstraints.maxDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onDateChange}
                            maximumDate={dateConstraints.maxDate}
                            minimumDate={dateConstraints.minDate}
                        />
                    )}

                    <View style={styles.nextContainer}>
                        {/* Next Button */}
                        <TouchableOpacity 
                            style={styles.nextButton} 
                            onPress={handleSignUp}
                        >
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp

const styles = StyleSheet.create({
    nextContainer: {
        marginBottom: 20,
        marginTop: 50,
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
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    doneButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    doneButtonText: {
        color: '#2B2BEF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

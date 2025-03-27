import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';



const SignUp = () => {

    const [name, SetName] = useState('')
    const [surnmame, SetSurName] = useState('')

    const [birthdate, setBirthdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
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

                    {/* Email Input */}
                    <Text style={styles.label}>NAME</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your your name"
                            placeholderTextColor="#999"
                            // onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder='Enter your Surname'
                            placeholderTextColor="#999"
                        />
                    </View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder='Enter your Surname'
                            placeholderTextColor="#999"
                        />
                    </View>
                    <Text style={styles.label}>BIRTHDATE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder='mm/dd/yyyy'
                            placeholderTextColor="#999"
                        />
                    </View>
                    <View style={styles.nextContainer}>
                        {/* Next Button */}
                        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/(auth)/HabitScreen')}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
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
});

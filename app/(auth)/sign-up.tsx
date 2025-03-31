
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8000/api/v1/auth/signup', // Android emulator
    ios: 'http://localhost:8000/api/v1/auth/signup',     // iOS simulator
    default: 'http://127.0.0.1:8000/api/v1/auth/signup', // Local development
});

const SignUp = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignUp = async () => {
        if (!name || !surname || !email || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        const userData = {
            name: `${name}`, 
            surname: `${surname}`,
            email: email,
            password: password,
        };

        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
        
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Signup failed");
            }
            
            await AsyncStorage.setItem("token", data?.access_token);
            Alert.alert("Success", "Account created successfully!");
            router.push("/(auth)/HabitScreen");
        } catch (error) {
            Alert.alert("Signup Failed", error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.container}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="black"
                            onPress={() => router.push("/OnBoradingScreen/Index")}
                        />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Create Account</Text>

                    {/* Name Input */}
                    <Text style={styles.label}>NAME</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Surname Input */}
                    <Text style={styles.label}>SURNAME</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your surname"
                            placeholderTextColor="#999"
                            value={surname}
                            onChangeText={setSurname}
                        />
                    </View>

                    {/* Email Input */}
                    <Text style={styles.label}>EMAIL</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password Input */}
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>



                    <View style={styles.nextContainer}>
                        {/* Signup Button */}
                        <TouchableOpacity style={styles.nextButton} onPress={handleSignUp}>
                            <Text style={styles.nextButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    nextContainer: {
        marginBottom: 20,
        marginTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: "#f6f9ff",
        padding: 20,
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 20,
        paddingBottom: 5,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: "#2B2BEF",
        paddingVertical: 15,
        alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 30,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

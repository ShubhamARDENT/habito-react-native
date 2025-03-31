import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { authEventEmitter, AUTH_EVENTS } from '@/utils/events';
import { router } from 'expo-router';

interface DecodedToken {
  name: string;
  exp: number;
}

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        checkAuthAndNavigate();
    }, []);

    const checkAuthAndNavigate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                router.replace('/');
                return;
            }

            const decoded = jwtDecode<DecodedToken>(token);
            if (decoded.exp * 1000 < Date.now()) {
                // Token has expired
                await handleLogout();
                return;
            }

            setUserName(decoded.name || 'User');
        } catch (error) {
            console.error('Error checking authentication:', error);
            await handleLogout();
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // Clear all storage instead of just token
            setDropdownVisible(false);
            authEventEmitter.emit(AUTH_EVENTS.TOKEN_CHANGE);
            router.replace('/'); // Using replace instead of push to prevent going back
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.header_main}>
            {/* Empty Header Bar for Icons (You can add bell & calendar here) */}
            <View style={styles.headerBar} />

            {/* Profile Section */}
            <View style={styles.profile_info}>
                <View>
                    <Text style={styles.profile_header_text}>Hello, {userName}!</Text>
                    <Text style={styles.profile_info_small_text}>Let's make habits together!</Text>
                </View>

                {/* Profile Icon with Dropdown */}
                <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.iconButton}>
                    <MaterialIcons name="account-circle" size={32} color="black" />
                </TouchableOpacity>
            </View>

            {/* Small Profile Dropdown */}
            {dropdownVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                        <Text style={styles.dropdownText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header_main: {
        paddingHorizontal: 24,
        paddingVertical: 30,
        backgroundColor:'#fff'
    },
    headerBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    profile_info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profile_header_text: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.4,
    },
    profile_info_small_text: {
        color: "#888",
        fontSize: 16,
        letterSpacing: 0.4,
    },
    iconButton: {
        padding: 5,
    },
    dropdown: {
        position: "absolute",
        right: 24,
        top: 85,    // Added top position to place it below the icon
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,  // Added for Android shadow
        paddingVertical: 8,
        width: 100,
        alignItems: "center",
        zIndex: 1000, // Added to ensure dropdown appears above other elements
    },
    dropdownItem: {
        paddingVertical: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: "black",
    },
    habitTypeContainer: {
        marginTop: 12,
        backgroundColor: "#e3e4e6",
        borderRadius: 30,
        flexDirection: "row",
        padding: 3,
    },
    habitTypeButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    activeButton: {
        backgroundColor: "#007AFF",
        borderRadius: 30,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
    },
    activeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
const HabitSelectionScreen = () => {
    const [habits, setHabits] = useState<{ id: number; emoji: string; title: string }[]>([]);
    const [selectedHabits, setSelectedHabits] = useState<number>(0);

    useEffect(() => {
        fetchHabits()
    }, [])

    const toggleHabit = (id: number) => {
        setSelectedHabits(id);
    };

    const fetchHabits = async () => {
        const signupDataString = await AsyncStorage.getItem('token');
        if (!signupDataString) {
            Alert.alert('Error', 'No signup data found');
            return;
        }
        
        const apiUrl = Platform.select({
            ios: 'http://localhost:8000',
            android: 'http://10.0.2.2:8000',
        });

        const response = await fetch(`${apiUrl}/api/v1/habits`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${signupDataString}`,
            },
        });
        
        const data = await response.json();
        setHabits(data)
    }

    const handleNext = async () => {
        try {            
            router.push('../(tabs)');
        } catch (error) {
            console.error('Error during signup:', error);
            Alert.alert('Error', error?.message || 'Failed to sign up. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black"
                />
            </TouchableOpacity> */}
            <Text style={styles.title}>Choose your first habit</Text>
            <Text style={styles.subtitle}>You may add more habits later</Text>

            <View style={styles.grid}>
                {habits?.length > 0 && habits?.map((habit) => (
                    <TouchableOpacity
                        key={habit?.id}
                        style={[styles.card, selectedHabits === habit?.id && styles.selectedCard]}
                        onPress={() => toggleHabit(habit?.id)}
                    >
                        <Text style={styles.emoji}>{habit?.emoji}</Text>
                        <Text style={styles.cardText}>{habit?.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FC',
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    card: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
    },
    selectedCard: {
        borderColor: '#2B2BEF',
        borderWidth: 2,
    },
    emoji: {
        fontSize: 30,
    },
    cardText: {
        fontSize: 14,
        marginTop: 5,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#2B2BEF',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 25,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HabitSelectionScreen;
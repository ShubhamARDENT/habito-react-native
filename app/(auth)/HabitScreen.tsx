import { AppDispatch, RootState } from '../../store/store';
import { setHabitList, setHabitLoading } from '../../store/habitSlice';
import { router } from 'expo-router';

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8000', // Android emulator
    ios: 'http://localhost:8000',     // iOS simulator
    default: 'http://127.0.0.1:8000', // Local development
});

const HabitSelectionScreen = () => {
    const [selectedHabits, setSelectedHabits] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const { userId, token } = useSelector((state: RootState) => state.auth);
    const { habitList } = useSelector((state: RootState) => state.habit);

    useEffect(() => {
        fetchHabits();
    }, [])

    const fetchHabits = async () => {
        dispatch(setHabitLoading(true));
        try {
            const response = await fetch(`${API_URL}/api/v1/habits/${userId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            const data = await response.json();

            if (!response?.ok) {
                throw new Error(data.detail || "Login failed");
            }
            
            dispatch(setHabitList(data.data));
        } catch (error) {
            Alert.alert("Login Failed", error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            dispatch(setHabitLoading(false));
        }
    }

    const toggleHabit = (id: number) => {
        setSelectedHabits((prev) =>
            prev.includes(id) ? prev.filter((habitId) => habitId !== id) : [...prev, id]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your first habits</Text>
            <Text style={styles.subtitle}>You may add more habits later</Text>

            <View style={styles.grid}>
                {habitList?.length > 0 && habitList?.map((habit) => (
                    <TouchableOpacity
                        key={habit.id}
                        style={[styles.card, selectedHabits.includes(parseInt(habit.id)) &&
                            styles.selectedCard]}
                        onPress={() => toggleHabit(parseInt(habit.id))}
                    >
                        <Text style={styles.emoji}>{habit.selectedIcon}</Text>
                        <Text style={styles.cardText}>{habit.habitName}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/(tabs)")}>
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
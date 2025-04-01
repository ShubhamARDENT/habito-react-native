import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setHabitList, setSelectedHabitList } from '@/store/habitSlice';
import { router } from 'expo-router';
import { fetchHabitData, fetchUserHabits } from '@/services/api';
interface Habit {
    _id?: string;
    id?: string;
    habitName: string;
    habitType: "Build" | "Break";
    selectedIcon: string;
    goalCount: string;
    goalFrequency: string;
    goalDays: string;
    selectedDays: string[];
    reminderEnabled: boolean;
    reminderTime: string;
    is_active: boolean;
}

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8000', // Android emulator
    ios: 'http://localhost:8000',     // iOS simulator
    default: 'http://127.0.0.1:8000', // Local development
});

const PopularHabits = () => {
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
    const [message, setMessage] = useState(""); // ✅ State for Success Message
    const dispatch = useDispatch<AppDispatch>();

    const { habitList } = useSelector((state: RootState) => state.habit);
    const { userId } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetchHabitData(userId);
        dispatch(setHabitList(data?.data));
    }

    const addHabitToBackend = async (habit: Habit): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/api/v1/habits/${userId}/selected/${habit._id}`, {
                method: "POST",
            });

            if (response.ok) {
                setSelectedHabit(habit.selectedIcon);
                setMessage(`✅ "${habit.habitName}" has been added! 🎉`);
                fetchSelectedHabits();
                router.push('/(tabs)'); // ✅ Navigate to home after adding habit
            } else {
                setMessage("❌ Failed to add habit. Please try again.");
            }
        } catch (error) {
            console.error("Error posting habit:", error);
            setMessage("❌ Error: Check your connection.");
        }
    };

    const fetchSelectedHabits = async () => {
        try {
            const result = await fetchUserHabits(userId);
            if (result.success) {
                dispatch(setSelectedHabitList(result.data));
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    return (
        <View style={styles.popular_habits_main}>
            {message ? <Text style={styles.successMessage}>{message}</Text> : null}
            <Text style={styles.header}>CHOOSE A Template HABIT</Text>

            {habitList?.length > 0 && (
                <FlatList
                    data={habitList}
                    keyExtractor={(item) => item.selectedIcon}
                    numColumns={2}
                    columnWrapperStyle={styles.card_main}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.card, selectedHabit === item.selectedIcon && styles.selectedCard]}
                            onPress={() => addHabitToBackend(item)}
                        >
                            <View style={styles.emoji_container}>
                                <Text style={styles.emoji}>{item.selectedIcon}</Text>
                            </View>
                            <Text style={styles.title}>{item.habitName}</Text>
                            <Text style={styles.subtitle}>{item.goalFrequency}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default PopularHabits;

const styles = StyleSheet.create({
    popular_habits_main: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    successMessage: {
        backgroundColor: "#D4EDDA",
        color: "#155724",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 5,
        marginBottom: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    card_main: {
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#FFE5E0",
        padding: 20,
        borderRadius: 20,
        width: "45%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        marginHorizontal: 5,
        alignItems: "center",
    },
    selectedCard: {
        backgroundColor: "#FFADAD", // Highlight selected card
    },
    emoji_container: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    emoji: {
        fontSize: 28,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 5,
        letterSpacing: 0.4,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.4,
    },
});

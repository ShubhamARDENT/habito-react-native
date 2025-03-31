import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import HabitCards from './HabitCards';

const API_URI = Platform.select({
    ios: 'http://localhost:8000/api/v1/habits',
    android: 'http://10.0.2.2:8000/api/v1/habits',
    default: 'http://127.0.0.1:8000/api/v1/habits',
});

const Habits = () => {
    interface Habit {
        _id: string;
        [key: string]: any; // Add other properties as needed
    }

    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await fetch(`${API_URI}`);
                const addedHabit = await response.json();
                setHabits(addedHabit.data);
            } catch (error) {
                console.error("Error fetching habits:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHabits();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    const handleDeleteHabits = async (habits_id: string) => {
        try {
            const response = await fetch(`${API_URI}/${habits_id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Update state to remove the deleted habit
                setHabits(habits.filter((habit) => habit._id !== habits_id));
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header_view}>
                <Text style={styles.header}>Habits</Text>
                <Text style={styles.view}>VIEW ALL</Text>
            </View>

            {habits?.map((item) => (
                item?._id ? (
                    <HabitCards key={item._id.toString()} item={item} handleDeleteHabits={handleDeleteHabits} />
                ) : (
                    <Text key={`invalid`} style={{ color: "red" }}>Invalid habit data</Text>
                )
            ))}
        </View>
    );
};

export default Habits;

const styles = StyleSheet.create({
    removeText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    container: {
        flex: 1, // Makes sure the list takes full height
        paddingBottom: 20, // Prevents overlap at bottom
    },
    header_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.6,
    },
    view: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "#3843FF",
    },
});

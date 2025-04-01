import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HabitCards from './HabitCards';
import { AppDispatch, RootState } from '@/store/store';
import { setSelectedHabitList } from '@/store/habitSlice';

const API_URI = Platform.select({
    ios: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    default: 'http://127.0.0.1:8000',
});

const Habits = () => {
    interface Habit {
        _id: string;
        [key: string]: any; // Add other properties as needed
    }
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedHabitList } = useSelector((state: RootState) => state.habit);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        fetchSelectedHabits();
    }, [userId]);

    const fetchSelectedHabits = async () => {
        try {
            const response = await fetch(`${API_URI}/api/v1/habits/${userId}/selected`);
            const addedHabit = await response.json();
            const sendData = addedHabit.data.map((habit: Habit) => habit.habit_details)
            
            dispatch(setSelectedHabitList(sendData));
        } catch (error) {
            console.error("Error fetching habits:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    const handleDeleteHabits = async (habits_id: string) => {
        try {
            const response = await fetch(`${API_URI}/habits/${userId}/${habits_id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Update state to remove the deleted habit
                dispatch(setSelectedHabitList(selectedHabitList.filter((habit) => habit._id !== habits_id)));
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header_view}>
                <Text style={styles.header}>Habits</Text>
                {/* <Text style={styles.view}>VIEW ALL</Text> */}
            </View>

            {selectedHabitList?.length > 0 && selectedHabitList?.map((item) => (
                item?.id ? (
                    <HabitCards key={item.id.toString()} item={item} handleDeleteHabits={handleDeleteHabits} />
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
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: "900",
        letterSpacing: 0.6,
    },
    view: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "#3843FF",
    },
});

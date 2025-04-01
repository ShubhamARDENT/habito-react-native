import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HabitCards from './HabitCards';
import { AppDispatch, RootState } from '@/store/store';
import { SeletedHabit, setSelectedHabitList } from '@/store/habitSlice';

const API_URI = Platform.select({
    ios: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    default: 'http://127.0.0.1:8000',
});

const Habits = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedHabitList } = useSelector((state: RootState) => state.habit);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        fetchSelectedHabits();
    }, []);

    const fetchSelectedHabits = async () => {
        try {
            const response = await fetch(`${API_URI}/api/v1/habits/${userId}/selected`);
            const addedHabit = await response.json();
            
            dispatch(setSelectedHabitList(addedHabit.data));
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
        console.log("Deleting habit with ID:", habits_id);
        console.log("selectedHabitList:", selectedHabitList);

        const findId = selectedHabitList?.find((habit: SeletedHabit) => habits_id === habit?.habit_details?.id)?.id;
        console.log("Finding ID:", findId);
        
        try {
            const response = await fetch(`${API_URI}/habits/${userId}/selected/${findId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Update state to remove the deleted habit
                dispatch(setSelectedHabitList(selectedHabitList.filter((habit) => habit.id !== habits_id)));
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    const habitData = selectedHabitList?.map((habit: SeletedHabit) => habit?.habit_details ?? null)

    return (
        <View style={styles.container}>
            <View style={styles.header_view}>
                <Text style={styles.header}>Habits</Text>
                {/* <Text style={styles.view}>VIEW ALL</Text> */}
            </View>

            {habitData?.length > 0 && habitData?.map((item) => (
                item?.id ? (
                    <HabitCards key={`${item.id.toString()}-${item.habitName}`} item={item} handleDeleteHabits={handleDeleteHabits} />
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

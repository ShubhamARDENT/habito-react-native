import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HabitCards from './HabitCards';
import { AppDispatch, RootState } from '@/store/store';
import { SeletedHabit, setSelectedHabitList } from '@/store/habitSlice';
import { fetchUserHabits } from '@/services/api';

// Add this helper function at the top of the file after imports
const normalizeDayName = (day: string) => {
    const dayMap: { [key: string]: string } = {
        'Monday': 'Mon',
        'Tuesday': 'Tue',
        'Wednesday': 'Wed',
        'Thursday': 'Thu',
        'Friday': 'Fri',
        'Saturday': 'Sat',
        'Sunday': 'Sun',
    };
    return dayMap[day] || day.slice(0, 3);
};

const API_URI = Platform.select({
    ios: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    default: 'http://127.0.0.1:8000',
});

const Habits = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedHabitList, selectedDay } = useSelector((state: RootState) => state.habit);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        fetchSelectedHabits();
    }, [selectedDay]);

    const fetchSelectedHabits = async () => {
        try {
            const result = await fetchUserHabits(userId);
            if (result.success) {
                dispatch(setSelectedHabitList(result.data));
            }
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
        const findId = selectedHabitList?.find((habit: SeletedHabit) => habits_id === habit?.habit_details?.id)?.id;
        try {
            const response = await fetch(`${API_URI}/api/v1/habits/${userId}/selected/${findId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchSelectedHabits()
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    const renderHabits = () => {
        return selectedHabitList?.map(({ id, habit_details }) => {
            const normalizedSelectedDay = normalizeDayName(selectedDay);
            const normalizedHabitDays = habit_details?.selectedDays?.map(normalizeDayName);
            
            if (id && normalizedHabitDays && 
                Array.isArray(normalizedHabitDays) && 
                normalizedHabitDays.includes(normalizedSelectedDay)) {
                return (
                    <HabitCards 
                        key={`${id}-${selectedDay}`} 
                        item={habit_details}
                        handleDeleteHabits={handleDeleteHabits} 
                    />
                );
            }
            return null;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header_view}>
                <Text style={styles.header}>Habits</Text>
            </View>
            {selectedHabitList?.length > 0 && renderHabits()}
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

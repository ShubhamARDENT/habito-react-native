
import { Platform } from 'react-native';

export const API_URI = Platform.select({
    ios: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    default: 'http://127.0.0.1:8000',
});

export const fetchUserHabits = async (userId: string) => {
    try {
        const response = await fetch(`${API_URI}/api/v1/habits/${userId}/selected`);
        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error("Error fetching habits:", error);
        return { success: false, error };
    }
};

export const fetchHabitData = async (userId: string) => {
    try {
        const response = await fetch(`${API_URI}/api/v1/habits/${userId}`);
        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error("Error fetching habits:", error);
    }
};
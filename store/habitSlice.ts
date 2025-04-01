import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

interface Habit {
    id: string;
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

interface HabitState {
    habitList: Habit[];
    loading: boolean;
}

const initialState: HabitState = {
    habitList: [],
    loading: false,
};

const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        setHabits(state, action: PayloadAction<Habit[] | null>) {
            state.habitList = action.payload || [];
        },
        addHabits(state, action: PayloadAction<Habit | null>) {
            if (action.payload) state.habitList = [...state.habitList, action.payload];
        },
        removeHabits(state, action: PayloadAction<Habit | null>) {
            if (action.payload) state.habitList = state.habitList.filter((habit) => habit.habitName !== action.payload?.habitName);
        },
        setHabitLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const { setHabits, setHabitLoading, addHabits, removeHabits } = habitSlice.actions;

export const setHabitList = (habits: Habit[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setHabits(habits));
    } catch (error) {
        console.error("Error setting habits:", error);
    }
};

export const addToHabitList = (habit: Habit) => async (dispatch: AppDispatch) => {
    try {
        dispatch(addHabits(habit));
    } catch (error) {
        console.error("Error adding habit:", error);
    }
};

export const removeFromHabitList = (habit: Habit) => async (dispatch: AppDispatch) => {
    try {
        dispatch(removeHabits(habit));
    } catch (error) {
        console.error("Error removing habit:", error);
    }
};

export default habitSlice.reducer;

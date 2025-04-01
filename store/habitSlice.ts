import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import dayjs from "dayjs";

interface Habit {
    _id?: string;
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

export interface SeletedHabit {
    id: string;
    habit_id: string;
    user_id: string;
    completed_at: string;
    completion_count: number;
    notes: string;
    created_at: string;
    habit_details: {
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
    };
}

interface HabitState {
    habitList: Habit[];
    selectedHabitList: SeletedHabit[];
    loading: boolean;
    selectedDate: string;
    selectedDay: string;
}

const initialState: HabitState = {
    habitList: [],
    selectedHabitList: [],
    loading: false,
    selectedDate: dayjs().format("YYYY-MM-DD"),
    selectedDay: dayjs().format("dddd"), // Gets the current day name
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
            if (action.payload) state.habitList = state.habitList.filter((habit) => habit._id !== action.payload?._id);
        },
        setSelectedHabits(state, action: PayloadAction<SeletedHabit[] | null>) {
            state.selectedHabitList = action.payload || [];
        },
        addSelectedHabitList(state, action: PayloadAction<SeletedHabit | null>) {
            if (action.payload) state.selectedHabitList = [...state.selectedHabitList, action.payload];
        },
        removeSelectedHabitList(state, action: PayloadAction<Habit | null>) {
            if (action.payload) state.selectedHabitList = state.selectedHabitList.filter((habit) => habit.id !== action.payload?._id);
        },
        setHabitLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSelectedDate(state, action: PayloadAction<string>) {
            state.selectedDate = action.payload;
        },
        setSelectedDay(state, action: PayloadAction<string>) {
            state.selectedDay = action.payload;
        },
    },
});

export const { 
    setHabits, 
    setHabitLoading, 
    addHabits, 
    removeHabits, 
    setSelectedHabits, 
    addSelectedHabitList, 
    removeSelectedHabitList,
    setSelectedDate,
    setSelectedDay 
} = habitSlice.actions;

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

export const setSelectedHabitList = (habits: SeletedHabit[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setSelectedHabits(habits));
    } catch (error) {
        console.error("Error setting habits:", error);
    }
};

export const addToSelectedHabitList = (habit: SeletedHabit) => async (dispatch: AppDispatch) => {
    try {
        dispatch(addSelectedHabitList(habit));
    } catch (error) {
        console.error("Error adding habit:", error);
    }
};

export const removeFromSelectedHabitList = (habit: Habit) => async (dispatch: AppDispatch) => {
    try {
        dispatch(removeSelectedHabitList(habit));
    } catch (error) {
        console.error("Error removing habit:", error);
    }
};

export const updateSelectedDate = (date: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setSelectedDate(date));
        // Also update the day when date changes
        dispatch(setSelectedDay(dayjs(date).format("dddd")));
    } catch (error) {
        console.error("Error setting selected date:", error);
    }
};

export default habitSlice.reducer;

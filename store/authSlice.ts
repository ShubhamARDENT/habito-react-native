import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";
import { AppDispatch } from "./store";

interface AuthState {
    token: string | null;
    userName: string;
    userEmail: string;
    userId: string;
    loading: boolean;
}

const initialState: AuthState = {
    token: null,
    userName: '',
    userEmail: '',
    userId: '',
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setUserEmail(state, action: PayloadAction<string>) {
            state.userEmail = action.payload;
        },
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetAuth(state) {
            state.token = null;
            state.userName = '';
        },
    },
});

export const { setToken, setUserName, setUserEmail, setLoading, resetAuth, setUserId } = authSlice.actions;

export const login = (authToken: string, type: string = "login") => async (dispatch: AppDispatch) => {
    try {
        await AsyncStorage.setItem("token", authToken);
        const decoded = jwtDecode<{ name: string; email: string; sub: string }>(authToken);
        dispatch(setToken(authToken));
        dispatch(setUserName(decoded.name || "User"));
        dispatch(setUserEmail(decoded.email));
        dispatch(setUserId(decoded.sub));
        if (type === "login") router.push("/(tabs)");
        if (type === "signup") router.push("/(auth)/HabitScreen");
    } catch (error) {
        console.error("Login error:", error);
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await AsyncStorage.removeItem("token");
        dispatch(resetAuth());
        router.replace("/(auth)/sign-in");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const loadToken = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
            const decoded = jwtDecode<{ name: string; email: string; sub: string }>(storedToken);
            dispatch(setToken(storedToken));
            dispatch(setUserName(decoded.name || "User"));
            dispatch(setUserEmail(decoded.email));
            dispatch(setUserId(decoded.sub));
        }
    } catch (error) {
        console.error("Error loading token:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export default authSlice.reducer;

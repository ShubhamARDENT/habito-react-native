import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";

interface AuthState {
    token: string | null;
    userName: string;
    loading: boolean;
}

const initialState: AuthState = {
    token: null,
    userName: '',
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
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetAuth(state) {
            state.token = null;
            state.userName = '';
        },
    },
});

export const { setToken, setUserName, setLoading, resetAuth } = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export const login = (authToken: string, type: string = "login") => async (dispatch: any) => {
    try {
        await AsyncStorage.setItem("token", authToken);
        const decoded = jwtDecode<{ name: string }>(authToken);
        dispatch(setToken(authToken));
        dispatch(setUserName(decoded.name || "User"));
        if (type === "login") router.push("/(tabs)");
        if (type === "signup") router.push("/(auth)/HabitScreen");
    } catch (error) {
        console.error("Login error:", error);
    }
};

export const logout = () => async (dispatch: any) => {
    try {
        await AsyncStorage.removeItem("token");
        dispatch(resetAuth());
        router.replace("/(auth)/sign-in");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const loadToken = () => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
            const decoded = jwtDecode<{ name: string }>(storedToken);
            dispatch(setToken(storedToken));
            dispatch(setUserName(decoded.name || "User"));
        }
    } catch (error) {
        console.error("Error loading token:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

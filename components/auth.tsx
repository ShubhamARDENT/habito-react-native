import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



// Provide a default value to prevent TypeScript error
export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

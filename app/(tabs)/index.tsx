import CalendarStrip from '@/components/Calender'
import Challenges from '@/components/Challenges'
import Habits from '@/components/Habits'
import Header from '@/components/Header'
import ProgressCard from '@/components/ProgressCard'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Add error handling for your network requests
        const fetchData = async () => {
            try {
                // Your fetch logic here
            } catch (err) {
                setError('Failed to load habits. Please check your connection.');
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <Header />
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : (
                        <View style={styles.home_container}>
                            <CalendarStrip />
                            <ProgressCard />
                            <Challenges />
                            <Habits />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Home

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensures the SafeAreaView takes full height
    },
    scrollContainer: {
        flexGrow: 1, // Ensures scrolling works properly
        paddingBottom: 20, // Adds space at the bottom
    },
    home_container: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#e3e4e6",
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
})

import CalendarStrip from '@/components/Calender'
import Challenges from '@/components/Challenges'
import Habits from '@/components/Habits'
import Header from '@/components/Header'
import ProgressCard from '@/components/ProgressCard'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <Header />
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.home_container}>
                        <CalendarStrip />
                        <ProgressCard />
                        <Challenges />
                        <Habits />
                    </View>
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

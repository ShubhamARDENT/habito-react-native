import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Header from '@/components/Header'
import CalendarStrip from '@/components/Calender'
import ProgressCard from '@/components/ProgressCard'
import Challenges from '@/components/Challenges'
import Habits from '@/components/Habits'

const Home = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Header />
                <View style={styles.home_container}>
                    <CalendarStrip />
                    <ProgressCard />
                    <Challenges />
                    <Habits />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Home

const styles = StyleSheet.create({
    home_container: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#e3e4e6",
    }
})
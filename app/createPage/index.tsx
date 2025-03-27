import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomHabit from './CustomHabit'
import PopularHabits from './PopularHabits'

const CreatePage = () => {
    return (
        <View style={styles.create_page_main}>
            <CustomHabit />
            <PopularHabits />
        </View>
    )
}

export default CreatePage


const styles = StyleSheet.create({
    create_page_main: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingVertical: 12,
        paddingHorizontal: 24
    }
})
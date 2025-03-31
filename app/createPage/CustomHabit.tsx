import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const CustomHabit = () => {
    const router = useRouter()
    return (
        <>
            <Text style={styles.header}>NEW GOOD HABIT</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Create Custom Habit</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/habitForm")} style={styles.plusButton}>
                    <AntDesign name="plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default CustomHabit

const styles = StyleSheet.create({

    header: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.4
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },
    plusButton: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 25,
        padding: 6,
    },
})
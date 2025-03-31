import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

// ✅ Predefined Template Habits (Matches Custom Habit Format)
const templateHabits =
    [
        {

            "habitName": "Reading",
            "habitType": "Build",
            "selectedIcon": "📖",
            "goalCount": "10",
            "goalFrequency": "Daily",
            "goalDays": "Everyday",
            "selectedDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "reminderEnabled": true,
            "reminderTime": "20:00"
        },
        {

            "habitName": "Meditation",
            "habitType": "Build",
            "selectedIcon": "🧘",
            "goalCount": "1",
            "goalFrequency": "Daily",
            "goalDays": "Weekdays",
            "selectedDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "reminderEnabled": true,
            "reminderTime": "07:00"
        },
        {

            "habitName": "Junk Food",
            "habitType": "Quit",
            "selectedIcon": "🍔",
            "goalCount": "0",
            "goalFrequency": "Weekly",
            "goalDays": "Weekend",
            "selectedDays": ["Saturday", "Sunday"],
            "reminderEnabled": false,
            "reminderTime": "12:30"
        },
        {

            "habitName": "Running",
            "habitType": "Build",
            "selectedIcon": "🏃",
            "goalCount": "5",
            "goalFrequency": "Weekly",
            "goalDays": "Mon, Wed, Fri",
            "selectedDays": ["Monday", "Wednesday", "Friday"],
            "reminderEnabled": true,
            "reminderTime": "06:30"
        },
        {

            "habitName": "Social Media",
            "habitType": "Quit",
            "selectedIcon": "📱",
            "goalCount": "1",
            "goalFrequency": "Daily",
            "goalDays": "Everyday",
            "selectedDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "reminderEnabled": false,
            "reminderTime": "10:30"
        }
    ]




const API_URL = "http://127.0.0.1:8000/api/v1/habits"; 

const PopularHabits = () => {
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
    const [message, setMessage] = useState(""); // ✅ State for Success Message

    // ✅ Function to Add Habit to Backend
    interface Habit {
        habitName: string;
        habitType: string;
        selectedIcon: string;
        goalCount: string;
        goalFrequency: string;
        goalDays: string;
        selectedDays: string[];
        reminderEnabled: boolean;
        reminderTime: string;
    }

    const addHabitToBackend = async (habit: Habit): Promise<void> => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(habit), // ✅ Sends complete habit object
            });

            if (response.ok) {
                setSelectedHabit(habit.selectedIcon);
                setMessage(`✅ "${habit.habitName}" has been added! 🎉`);
                setTimeout(() => setMessage(""), 3000); // ✅ Remove message after 3s
            } else {
                setMessage("❌ Failed to add habit. Please try again.");
            }
        } catch (error) {
            console.error("Error posting habit:", error);
            setMessage("❌ Error: Check your connection.");
        }
    };

    return (
        <View style={styles.popular_habits_main}>
            {message ? <Text style={styles.successMessage}>{message}</Text> : null} {/* ✅ Show Message */}

            <Text style={styles.header}>CHOOSE A Template HABIT</Text>

            <FlatList
                data={templateHabits}
                keyExtractor={(item) => item.selectedIcon}
                numColumns={2}
                columnWrapperStyle={styles.card_main}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, selectedHabit === item.selectedIcon && styles.selectedCard]}
                        onPress={() => addHabitToBackend(item)}
                    >
                        <View style={styles.emoji_container}>
                            <Text style={styles.emoji}>{item.selectedIcon}</Text>
                        </View>
                        <Text style={styles.title}>{item.habitName}</Text>
                        <Text style={styles.subtitle}>{item.goalFrequency}</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default PopularHabits;

const styles = StyleSheet.create({
    popular_habits_main: {
        marginTop: 20,
    },
    successMessage: {
        backgroundColor: "#D4EDDA",
        color: "#155724",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 5,
        marginBottom: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    card_main: {
        justifyContent: "space-evenly",
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#FFE5E0",
        padding: 20,
        borderRadius: 20,
        width: "45%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        marginHorizontal: 5,
        alignItems: "center",
    },
    selectedCard: {
        backgroundColor: "#FFADAD", // Highlight selected card
    },
    emoji_container: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    emoji: {
        fontSize: 28,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 5,
        letterSpacing: 0.4,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.4,
    },
});

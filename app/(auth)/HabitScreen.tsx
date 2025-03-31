import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


// * change the habits to template
const habits = [
    { id: 1, name: 'Drink water', emoji: '💧' },
    { id: 2, name: 'Run', emoji: '🏃' },
    { id: 3, name: 'Read books', emoji: '📖' },
    { id: 4, name: 'Meditate', emoji: '🧘' },
    { id: 5, name: 'Study', emoji: '👨‍🎓' },
    { id: 6, name: 'Journal', emoji: '📕' },
    { id: 7, name: 'Plant trees', emoji: '🌿' },
    { id: 8, name: 'Sleep well', emoji: '😴' },
];

const HabitSelectionScreen = () => {
    const [selectedHabits, setSelectedHabits] = useState<number[]>([]);

    const toggleHabit = (id: number) => {
        setSelectedHabits((prev) =>
            prev.includes(id) ? prev.filter((habitId) => habitId !== id) : [...prev, id]
        );
    };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black"
                />
            </TouchableOpacity> */}
            <Text style={styles.title}>Choose your first habits</Text>
            <Text style={styles.subtitle}>You may add more habits later</Text>

            <View style={styles.grid}>
                {habits.map((habit) => (
                    <TouchableOpacity
                        key={habit.id}
                        style={[styles.card, selectedHabits.includes(habit.id) &&
                            styles.selectedCard]}
                        onPress={() => toggleHabit(habit.id)}
                    >
                        <Text style={styles.emoji}>{habit.emoji}</Text>
                        <Text style={styles.cardText}>{habit.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/(tabs)")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FC',
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    card: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
    },
    selectedCard: {
        borderColor: '#2B2BEF',
        borderWidth: 2,
    },
    emoji: {
        fontSize: 30,
    },
    cardText: {
        fontSize: 14,
        marginTop: 5,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#2B2BEF',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 25,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HabitSelectionScreen;
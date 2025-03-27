import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { popularHabitsData } from '../db/popularHabitsData'

const PopularHabits = () => {
    return (
        <View style={styles.popular_habits_main}>
            <Text style={styles.header}>NEW GOOD HABIT</Text>

            <FlatList
                data={popularHabitsData}
                keyExtractor={(item) => item.title}
                numColumns={2}
                columnWrapperStyle={styles.card_main}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.emoji_container}>
                            <Text style={styles.emoji}>{item.emaoji}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                )
                }
                showsVerticalScrollIndicator={true}
            />
        </View>
    )
}

export default PopularHabits

const styles = StyleSheet.create({
    popular_habits_main: {
        marginTop: 20
    },
    header: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.4
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
        zIndex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 5,
        letterSpacing: 0.4
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.4
    },
})

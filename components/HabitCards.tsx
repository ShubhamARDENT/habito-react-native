import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';



const HabitCards = ({ handleDeleteHabits, item }: { handleDeleteHabits: (habits_id: string) => Promise<void> }) => {
    return (
        <View style={styles.card}>
            {/* Left Section with Icon and Progress */}
            <View style={styles.leftSection}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressWrapper}>
                        <CircularProgressbar
                            value={item.progress || 0} // Use actual habit progress
                            styles={buildStyles({
                                textSize: "0px",
                                pathColor: "blue",
                                trailColor: "#e0e0e0",
                            })}
                        />
                        <View style={styles.iconContainer}>
                            <Text style={styles.emoji}>{item.selectedIcon}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>{item.habitName}</Text>
                    <Text style={styles.subtitle}>{item.goalCount}/{item.goalFrequency}</Text>
                </View>
            </View>

            {/* Right Section with Friends & Add Button */}
            <View style={styles.rightSection}>
                <View style={styles.avatarContainer}>
                    <View style={styles.moreFriends}>
                        <Text style={styles.moreText}>+3</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.removeButton} onPress={() => handleDeleteHabits(item?._id.toString())}>
                    <AntDesign name="delete" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HabitCards

const styles = StyleSheet.create({
    removeButton: {
        backgroundColor: "red",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#888",
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        flexDirection: "row",
        marginRight: 10,
    },
    moreFriends: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#4A5CF4",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -10,
    },
    moreText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    addButton: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    plus: {
        fontSize: 20,
        color: "#000",
        marginTop: -3,
    },
    iconContainer: {
        position: "absolute",
        top: "41%",
        left: "41%",
        transform: [{ translateX: -10 }, { translateY: -10 }],
    },
    card: {
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    progressWrapper: {
        position: "relative",
        width: 50,
        height: 50,
    },

})
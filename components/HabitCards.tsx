import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface HabitCardsProps {
    handleDeleteHabits: (habits_id: string) => Promise<void>;
    item: any;
}

const HabitCards = ({ handleDeleteHabits, item }: HabitCardsProps) => {
    return (
        <View style={styles.card}>
            {/* Left Section with Icon and Progress */}
            <View style={styles.leftSection}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressWrapper}>
                        <AnimatedCircularProgress
                            size={50}
                            width={3}
                            fill={item.progress || 0}
                            tintColor="#2B2BEF"
                            backgroundColor="#e0e0e0"
                        />
                        <View style={styles.iconContainer}>
                            {item.selectedIcon?.startsWith('http') ? (
                                <Image 
                                    source={{ uri: item.selectedIcon }} 
                                    style={styles.emojiImage} 
                                />
                            ) : (
                                <Text style={styles.selectedIconText}>
                                    {item.selectedIcon}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.habitName}>{item.habitName}</Text>
                </View>
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
                <View style={styles.avatarContainer}>
                    <View style={styles.moreFriends}>
                        <Text style={styles.moreText}>+3</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={() => handleDeleteHabits(item?._id.toString())}
                >
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
    selectedIcon: {
        fontSize: 20,
    },
    emojiImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    selectedIconText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    habitName: {
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
        transform: [{ translateX: -8 }, { translateY: -10 }],
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
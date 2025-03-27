import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const Habits = () => {
    const percentage = 66;
    return (
        <>
            <View style={styles.header_view}>
                <Text style={styles.header}>Habits</Text>
                <Text style={styles.view}>VIEW ALL</Text>
            </View>
            <View style={styles.card}>
                {/* Left Section with Icon and Progress */}
                <View style={styles.leftSection}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressWrapper}>
                            <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={percentage}
                                tintColor="#3843FF"
                                backgroundColor="#e0e0e0"
                            />
                            <View style={styles.iconContainer}>
                                <Text style={styles.emoji}>💧</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>Drink the water</Text>
                        <Text style={styles.subtitle}>500/2000 ML</Text>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <View style={styles.avatarContainer}>
                        {/* <Image
                            source={require("../../../assets/images")}
                            style={styles.avatar}
                        />
                        <Image
                            source={require("../../assets/images/profile.jpg")}
                            style={[styles.avatar, { marginLeft: -10 }]}
                        /> */}
                        <View style={styles.moreFriends}>
                            <Text style={styles.moreText}>+3</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.plus}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Habits

const styles = StyleSheet.create({
    header_view: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    header: {
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: 0.6
    },
    view: {
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.2,
        color: "#3843FF"
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
        marginRight: 12
    },
    progressWrapper: {
        position: "relative",
        width: 50,
        height: 50,
    },
    iconContainer: {
        position: "absolute",
        top: "41%",
        left: "41%",
        transform: [{ translateX: -10 }, { translateY: -10 }],
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
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
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
        marginTop: -3
    },
})
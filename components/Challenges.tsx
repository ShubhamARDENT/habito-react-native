import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'


const Challenges = () => {
    const progress = 50;
    return (
        <View style={styles.challenges_main}>
            <View style={styles.header_view}>
                <Text style={styles.header}>Challenges</Text>
                <Text style={styles.view}>VIEW ALL</Text>
            </View>
            <View style={styles.card}>
                {/* Left Section with Icon and Text */}
                <View style={styles.leftSection}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.clockIcon}>🕒</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Best Runners! 🏃‍♂️</Text>
                        <Text style={styles.subtitle}>5 days 13 hours left</Text>
                    </View>
                </View>

                {/* Right Section with Avatars */}
                <View style={styles.rightSection}>
                    <Text style={styles.friendsJoined}>2 friends joined</Text>
                    <View style={styles.avatarContainer}>
                        {/* <Image
                            source={require("../../assets/images/profile.jpg")}
                            style={[styles.avatar, { zIndex: 2 }]}
                        />
                        <Image
                            source={require("../../assets/images/profile.jpg")}
                            style={[styles.avatar, { marginLeft: -10, zIndex: 1 }]}
                        /> */}
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
            </View>
        </View>
    )
}

export default Challenges

const styles = StyleSheet.create({
    challenges_main: {
        marginTop: 16
    },
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
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EFEAFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    clockIcon: {
        fontSize: 16,
        marginTop: -2
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
        position: "absolute",
        right: 15,
        top: 15,
        alignItems: "flex-end",
    },
    friendsJoined: {
        fontSize: 14,
        color: "#888",
        marginBottom: 5,
    },
    avatarContainer: {
        flexDirection: "row",
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
    },
    progressBarContainer: {
        width: "100%",
        height: 5,
        backgroundColor: "#EAEAEA",
        borderRadius: 3,
        marginTop: 10,
    },
    progressBar: {
        height: 5,
        backgroundColor: "#4A5CF4",
        borderRadius: 3,
    },
})
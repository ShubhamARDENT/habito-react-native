import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// const calender = require("../../../assets/images/")
// const bell = require("../../assets/images/bell.png")


// * images not visible
const Header = () => {
    const [toggleTodayClub, settoggleTodayClub] = useState("Today");

    return (
        <View style={styles.header_main}>
            <View style={styles.headerBar}>
                {/* <Image source={calender} height={48} width={48} />
                <Image source={bell} height={48} width={48} /> */}
            </View>

            <View style={styles.profile_info}>
                <View>
                    <Text style={styles.profile_header_text}>Hello</Text>
                    <Text style={styles.profile_info_small_text}>Let's make habits together!</Text>
                </View>
                {/* <Image source={bell} height={48} width={48} /> */}
            </View>

            <View style={styles.habitTypeContainer}>
                <TouchableOpacity
                    style={[
                        styles.habitTypeButton,
                        toggleTodayClub === "Today" && styles.activeButton,
                    ]}
                    onPress={() => settoggleTodayClub("Today")}
                >
                    <Text style={toggleTodayClub === "Today" ? styles.activeText : styles.toggleText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.habitTypeButton,
                        toggleTodayClub === "Club" && styles.activeButton,
                    ]}
                    onPress={() => settoggleTodayClub("Club")}
                >
                    <Text style={toggleTodayClub === "Club" ? styles.activeText : styles.toggleText}>Club</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Header


const styles = StyleSheet.create({
    header_main: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    headerBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    profile_info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    profile_header_text: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.4
    },
    profile_info_small_text: {
        color: "#d4d4d4",
        letterSpacing: 0.4,
        fontSize: 16
    },
    habitTypeContainer: {
        marginTop: 12,
        backgroundColor: "#e3e4e6",
        borderWidth: 1,
        borderColor: "#e3e4e6",
        borderRadius: "30px",
        flexDirection: "row",
        padding: 3
    },
    habitTypeButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    activeButton: {
        backgroundColor: "#007AFF",
        borderRadius: 30
    },
    toggleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
    },
    activeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

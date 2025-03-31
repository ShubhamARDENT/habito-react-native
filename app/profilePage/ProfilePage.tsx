import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";


const ProfilePage = () => {
    const router = useRouter()
    const activities = [
        { id: 1, text: "112 points earned!", time: "Today, 12:34 PM", icon: "⬆️" },
        { id: 2, text: "62 points earned!", time: "Today, 07:12 AM", icon: "⬆️" },
        { id: 3, text: "Challenge completed!", time: "Yesterday, 14:12 PM", icon: "🏅" },
        { id: 4, text: "Weekly winning streak is broken!", time: "12 Jun, 16:14 PM", icon: "⬇️" },
        { id: 5, text: "96 points earned!", time: "11 Jun, 17:45 PM", icon: "⬆️" },
        { id: 6, text: "110 points earned!", time: "10 Jun, 18:32 PM", icon: "⬆️" },
    ];

    const renderActivityItem = ({ item }: any) => (
        <View style={styles.activityItem}>
            <Text style={styles.activityText}>{item.text}</Text>
            <Text style={styles.activityTime}>{item.time}</Text>
            <Text style={styles.activityIcon}>{item.icon}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.profile_text}>Your Profile </Text>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image source={require("../../assets/images/profile.jpg")} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>Aadesh Shinde</Text>
                    <Text style={styles.points}>🏅 1452 Points</Text>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsIcon} onPress={() => router.push("/(tabs)/homePage/settingsScreen")}>⚙️</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.activeTab}><Text style={styles.tabText}>Activity</Text></TouchableOpacity>
                <TouchableOpacity style={styles.inactiveTab}><Text style={styles.tabText}>Friends</Text></TouchableOpacity>
                <TouchableOpacity style={styles.inactiveTab}><Text style={styles.tabText}>Achievements</Text></TouchableOpacity>
            </View>

            {/* Activity List */}
            <FlatList
                data={activities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderActivityItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    profile_text: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 16
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "semibold"
    },
    points: {
        color: "#FFA500"
    },
    settingsButton: {
        marginLeft: "auto"
    },
    settingsIcon: {
        fontSize: 18
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 16
    },

    activeTab: {
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#000"
    },
    inactiveTab: {
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    tabText: {
        textAlign: "center",
        fontWeight: "bold"
    },
    activityItem: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    activityText: {
        flex: 1,
        fontSize: 14
    },
    activityTime: {
        fontSize: 12,
        color: "#666"
    },
    activityIcon: {
        fontSize: 18,
        marginLeft: 8
    }
});

export default ProfilePage;

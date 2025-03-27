import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import AntDesign from '@expo/vector-icons/AntDesign';

const SettingsScreen = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [soundsEnabled, setSoundsEnabled] = useState(true);
    const [vacationMode, setVacationMode] = useState(false);
    const router = useRouter()

    const [collapsedSections, setCollapsedSections] = useState({
        rate: true,
        share: true,
        about: true,
        support: true,
    });

    const toggleSection = (key: keyof typeof collapsedSections) => {
        setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };


    return (
        <View style={styles.container}>
            <View style={styles.back_setting}>
                <AntDesign name="arrowleft" size={24} color="grey" onPress={() => router.push("/profile")} />
                <Text style={styles.header}>Settings</Text>
            </View>

            {/* General Section */}
            <Text style={styles.sectionTitle}>GENERAL</Text>
            <View style={styles.section}>
                <TouchableOpacity style={styles.item}><Text>📁 General</Text></TouchableOpacity>
                <View style={styles.itemRow}>
                    <Text>🌙 Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} />
                </View>
                <TouchableOpacity style={styles.item}><Text>🔑 Security</Text></TouchableOpacity>
                <TouchableOpacity style={styles.item}><Text>🔔 Notifications</Text></TouchableOpacity>
                <View style={styles.itemRow}>
                    <Text>🔊 Sounds</Text>
                    <Switch value={soundsEnabled} onValueChange={setSoundsEnabled} />
                </View>
                <View style={styles.itemRow}>
                    <Text>⏸️ Vacation Mode</Text>
                    <Switch value={vacationMode} onValueChange={setVacationMode} />
                </View>
            </View>

            {/* About Us Section with Accordions */}
            <Text style={styles.sectionTitle}>ABOUT US</Text>
            <View style={styles.section}>
                <TouchableOpacity style={styles.item} onPress={() => toggleSection("rate")}>
                    <Text>⭐ Rate Routiner</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedSections.rate}>
                    <Text style={styles.collapsibleContent}>Rate our app on the App Store!</Text>
                </Collapsible>

                <TouchableOpacity style={styles.item} onPress={() => toggleSection("share")}>
                    <Text>📤 Share with Friends</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedSections.share}>
                    <Text style={styles.collapsibleContent}>Invite your friends to use Routiner.</Text>
                </Collapsible>

                <TouchableOpacity style={styles.item} onPress={() => toggleSection("about")}>
                    <Text>ℹ️ About Us</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedSections.about}>
                    <Text style={styles.collapsibleContent}>Our Habit Tracker app helps you build good routines, stay motivated, and track progress effortlessly. With simple tools and reminders, we make habit-building easy and enjoyable.</Text>
                </Collapsible>

                <TouchableOpacity style={styles.item} onPress={() => toggleSection("support")}>
                    <Text>🆘 Support</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedSections.support}>
                    <Text style={styles.collapsibleContent}>Contact us for any issues or inquiries. at 1800 222 456</Text>
                </Collapsible>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16 },
    back_setting: {
        flexDirection: "row",
        alignItems: "center"
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 20
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#777",
        marginTop: 16
    },
    section: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 12,
        marginTop: 8
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE"
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE"
    },
    collapsibleContent: {
        padding: 12,
        backgroundColor: "#F0F0F0",
        borderRadius: 5,
        marginVertical: 5,
        letterSpacing: 0.4
    }
});

export default SettingsScreen;

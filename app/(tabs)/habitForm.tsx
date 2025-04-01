import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Modal, FlatList, Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setHabitList } from "@/store/habitSlice";
import { fetchHabitData } from "@/services/api";

const availableIcons = ["🚶‍♀️", "🏃‍♂️", "🚴‍♀️", "🏊‍♂️", "🧘‍♀️", "🏋️‍♂️", "🎨", "🎸"];
const daysOfWeek = [
    { label: "M", value: "Mon" },
    { label: "T", value: "Tue" },
    { label: "W", value: "Wed" },
    { label: "T", value: "Thu" },
    { label: "F", value: "Fri" },
    { label: "S", value: "Sat" },
    { label: "S", value: "Sun" },
];

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8000', // Android emulator
    ios: 'http://localhost:8000',     // iOS simulator
    default: 'http://127.0.0.1:8000', // Local development
});

const HabitForm = () => {
    const router = useRouter();
    const [habitData, setHabitData] = useState({
        habitName: "Walking",
        habitType: "Build",
        selectedIcon: "🚶‍♀️",
        goalCount: "1",
        goalFrequency: "Daily",
        goalDays: "Every day",
        selectedDays: [] as string[],
        reminderEnabled: false,
        reminderTime: "09:30",
        iconModalVisible: false,
        goalModalVisible: false
    });
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useSelector((state: RootState) => state.auth);
    const { habitList } = useSelector((state: RootState) => state.habit);

    const handleChange = (key: string, value: any) => {
        setHabitData((prev) => ({ ...prev, [key]: value }));
    };

    const toggleDaySelection = (day: string) => {
        setHabitData((prev) => ({
            ...prev,
            selectedDays: prev.selectedDays.includes(day)
                ? prev.selectedDays.filter((d) => d !== day)
                : [...prev.selectedDays, day]
        }));
    };

    const handleCreateHabit = async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/habits/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(habitData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const newHabit = await response.json();
            // Update state with the new habit
            dispatch(setHabitList([...habitList, newHabit.habit]));

            // Reset the form
            setHabitData({
                habitName: "",
                habitType: "Build",
                selectedIcon: "🚶‍♀️",
                goalCount: "1",
                goalFrequency: "Daily",
                goalDays: "Every day",
                selectedDays: [],
                reminderEnabled: false,
                reminderTime: "09:30",
                iconModalVisible: false,
                goalModalVisible: false,
            });

            fetchData();
            router.push("/(tabs)/create");
        } catch (error) {
            console.error("Error adding habit:", error);
        }
    };

    const fetchData = async () => {
        const data = await fetchHabitData(userId);
        dispatch(setHabitList(data?.data));
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.back_heading}>
                <Ionicons name="arrow-back" size={24} color="grey" style={styles.back_icon} onPress={() => router.push("/create")} />
                <Text style={styles.form_heading}>Create Custom Habit</Text>
            </View>

            {/* Name Input */}
            <Text style={styles.label}>NAME</Text>
            <TextInput
                style={styles.input}
                value={habitData.habitName}
                onChangeText={(text) => handleChange("habitName", text)}
                placeholder="Enter habit name"
                placeholderTextColor="gray"
            />

            {/* Icon Selection */}
            <Text style={styles.label}>ICON</Text>
            <TouchableOpacity style={styles.box} onPress={() => handleChange("iconModalVisible", true)}>
                <Text style={styles.icon}>{habitData.selectedIcon}</Text>
            </TouchableOpacity>

            {/* Icon Modal */}
            <Modal
                visible={habitData.iconModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => handleChange("iconModalVisible", false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select an Icon</Text>
                        <FlatList
                            data={availableIcons}
                            numColumns={4}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.iconOption}
                                    onPress={() => {
                                        handleChange("selectedIcon", item);
                                        handleChange("iconModalVisible", false);
                                    }}
                                >
                                    <Text style={styles.icon}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* Goal Section */}
            <Text style={styles.label}>GOAL</Text>
            <View style={styles.goalCard}>
                <Text style={styles.goalText}>{habitData.goalCount} times or more per day</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleChange("goalModalVisible", true)}
                >
                    <Text>✏️</Text>
                </TouchableOpacity>
                <View style={styles.goalFooter}>
                    <Text style={styles.footerText}>📅 {habitData.goalDays}</Text>
                </View>
            </View>

            {/* Goal Modal */}
            <Modal
                visible={habitData.goalModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => handleChange("goalModalVisible", false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Goal</Text>
                        <Text style={styles.modalLabel}>How many times per day?</Text>
                        <TextInput
                            style={styles.modalInput}
                            keyboardType="numeric"
                            value={habitData.goalCount}
                            onChangeText={(text) => handleChange("goalCount", text)}
                        />
                        <Text style={styles.modalLabel}>Select Days</Text>
                        <View style={styles.daysContainer}>
                            {daysOfWeek.map((day) => (
                                <TouchableOpacity
                                    key={day.value}
                                    style={[styles.dayButton, habitData.selectedDays.includes(day.value) && styles.selectedDayButton]}
                                    onPress={() => toggleDaySelection(day.value)}
                                >
                                    <Text style={[styles.dayText, habitData.selectedDays.includes(day.value) && styles.selectedDayText]}>
                                        {day.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                handleChange("goalDays", habitData.selectedDays.join(", "));
                                handleChange("goalModalVisible", false);
                            }}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Reminders Section */}
            <Text style={styles.label}>REMINDERS</Text>
            <View style={styles.reminderCard}>
                <View style={styles.row1}>
                    <Text style={styles.reminderText1}>Set a reminder time:</Text>
                    <Switch
                        value={habitData.reminderEnabled}
                        onValueChange={(val) => handleChange("reminderEnabled", val)}
                    />
                </View>
                <View style={styles.goalFooter1}>

                    {/* Time Input */}
                    <Text style={styles.footerText1}>⏰ Pick Time</Text>
                    <TextInput
                        style={styles.timeInput}
                        value={habitData.reminderTime}
                        onChangeText={(text) => handleChange("reminderTime", text)}
                        keyboardType="numeric"
                        placeholder="HH:MM"
                        maxLength={5}
                    />
                </View>
            </View>

            {/* Habit Type Selection */}
            <Text style={styles.label}>HABIT TYPE</Text>
            <View style={styles.habitTypeContainer}>
                {["Build", "Quit"].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.habitTypeButton, habitData.habitType === type && styles.activeButton]}
                        onPress={() => handleChange("habitType", type)}
                    >
                        <Text style={habitData.habitType === type ? styles.activeText : styles.habitTypeText}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Create Habit Button */}
            <TouchableOpacity style={styles.createButtonStyle} onPress={handleCreateHabit}>
                <Text style={styles.createButtonTextStyle}>Add Habit</Text>
            </TouchableOpacity>
        </View >
    );
};



export default HabitForm;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F8F9FC",
        flex: 1,
    },
    back_heading: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20
    },
    back_icon: {
        height: "100%",
        width: "25%"
    },
    form_heading: {
        width: "75%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.4
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "gray",
        marginBottom: 5,
        textTransform: "uppercase",
        letterSpacing: 0.4
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    box: {
        width: "45%",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    icon: {
        fontSize: 24,
    },
    boxText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 0.4
    },
    colorBox: {
        width: 25,
        height: 25,
        borderRadius: 5,
    },
    goalCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    goalText: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.4
    },
    editButton: {
        position: "absolute",
        right: 15,
        top: 15,
    },
    goalFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    footerText: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.4
    },
    reminderCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    reminderText: {
        fontSize: 14,
        flex: 1,
        letterSpacing: 0.4
    },
    addButton: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.4
    },
    habitTypeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
    },
    habitTypeButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        letterSpacing: 0.4
    },
    activeButton: {
        backgroundColor: "#007AFF",
        letterSpacing: 0.4
    },
    habitTypeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
        letterSpacing: 0.4
    },
    activeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 0.4
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    iconOption: {
        padding: 10,
        margin: 10,
        backgroundColor: "#eee",
        borderRadius: 10,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },
    modalInput: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    daysContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    selectedDayButton: {
        backgroundColor: "#007AFF",
    },
    dayText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    selectedDayText: {
        color: "white",
    },
    row1: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    reminderText1: { fontSize: 14, flex: 1 },
    goalFooter1: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
    timeInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        width: 80,
        textAlign: "center"
    },
    footerText1: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },


    createButtonStyle: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    createButtonTextStyle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.4
    },

});


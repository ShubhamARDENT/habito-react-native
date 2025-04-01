import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateSelectedDate } from "@/store/habitSlice";

const CalendarStrip = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedDate } = useSelector((state: RootState) => state.habit);

    const dates = Array.from({ length: 30 }, (_, i) =>
        dayjs().add(i, "day").format("YYYY-MM-DD")
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const isSelected = item === selectedDate;
                    return (
                        <TouchableOpacity
                            onPress={() => dispatch(updateSelectedDate(item))}
                            style={[styles.dateContainer, isSelected && styles.selectedDate]}
                        >
                            <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                                {dayjs(item).format("D")}
                            </Text>
                            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                                {dayjs(item).format("ddd").toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginTop:30
    },
    dateContainer: {
        width: 60,
        height: 80,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dbdbdb",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },
    selectedDate: {
        borderWidth: 2,
        borderColor: "blue",
        backgroundColor: "white",
    },
    dateText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    selectedDateText: {
        color: "blue",
    },
    dayText: {
        fontSize: 12,
        color: "gray",
        marginTop: 2,
    },
    selectedDayText: {
        color: "blue",
    },
});

export default CalendarStrip;

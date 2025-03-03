import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const choseGender = () => {

    const [selectedGender, setSelectedGender] = useState<String>('');

    return (
        <SafeAreaView className='h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                {/* Back Button */}
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} >
                        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.push('/sign-up')} />
                    </TouchableOpacity>
                    <View style={styles.cardContainer}>
                        {/* Male Card */}
                        <TouchableOpacity
                            style={[styles.card, selectedGender === 'male' && styles.selectedCard]}
                            onPress={() => setSelectedGender('male')}
                        >
                            <Text style={[styles.emoji, selectedGender === 'male' && styles.selectedText]}>🤷🏻‍</Text>
                            <Text style={[styles.cardText, selectedGender === 'male' && styles.selectedText]}>Male</Text>
                        </TouchableOpacity>

                        {/* Female Card */}
                        <TouchableOpacity
                            style={[styles.card, selectedGender === 'female' && styles.selectedCard]}
                            onPress={() => setSelectedGender('female')}
                        >
                            <Text style={[styles.emoji, selectedGender === 'male' && styles.selectedText]}>🙋🏻‍♀️</Text>
                            <Text style={[styles.cardText, selectedGender === 'female' && styles.selectedText]}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nextContainer}>
                        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/(auth)/HabitScreen')}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default choseGender;

const styles = StyleSheet.create({
    emoji: {
        fontSize: 50,
    },
    cardContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    card: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    selectedCard: {
        backgroundColor: '#2B2BEF',
    },
    cardText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    selectedText: {
        color: 'white',
    },

    container: {
        flex: 1,
        backgroundColor: '#f6f9ff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#2B2BEF',
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,

    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextContainer: {
        marginBottom: 20,
        marginTop: 100
    },
})
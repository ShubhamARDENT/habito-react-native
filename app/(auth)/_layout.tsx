import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name='sign-in' options={{ headerShown: false }} />
            <Stack.Screen name='sign-up' options={{ headerShown: false }} />
            <Stack.Screen name='choseGender' options={{ headerShown: false }} />
            <Stack.Screen name='habitScreen' options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout

const styles = StyleSheet.create({})
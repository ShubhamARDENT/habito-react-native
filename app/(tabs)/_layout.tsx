import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../tabBar/TabBar';
import Ionicons from '@expo/vector-icons/Ionicons';


const TabsLayout = () => {
    return (
        <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="compass"
                options={{
                    title: "Compass",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    headerShown: false,
                }}
            />
         

        </Tabs>
    );
};

export default TabsLayout;
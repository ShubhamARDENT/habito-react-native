import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const icons: Record<string, (props: any) => JSX.Element> = {
        index: (props) => <Ionicons name="home-outline" size={40} {...props} />,
        profile: (props) => <Ionicons name="person-outline" size={40} {...props} />,
        create: (props) => <Ionicons name="add-circle-outline" size={40} {...props} />,
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {

                const routeName = route.name.split("/").pop() || "";
                const isFocused = state.index === index;
                const IconComponent = icons[routeName];

                if (!IconComponent) {
                    console.warn(`⚠️ No icon found for tab: ${route.name}`);
                    return null;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => !isFocused && navigation.navigate(route.name)}
                        style={styles.tabBarItem}
                    >
                        <IconComponent color={isFocused ? "#303afb" : "gray"} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        backgroundColor: "white",
        paddingVertical: 10,
        width: "100%",
        borderRadius: 20,
        position: "absolute",
        bottom: 10,

    },
    tabBarItem: {
        justifyContent: "center",
        alignItems: "center",
    },


});

export default TabBar;

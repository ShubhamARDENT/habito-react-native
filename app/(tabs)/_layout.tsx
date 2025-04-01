import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const HomeTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="home" size={size} color={color} />
);

const ProfileTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="person" size={size} color={color} />
);

const AddHabitTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="add-circle" size={size} color={color} />
);

const AddTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="man" size={size} color={color} />
);

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: HomeTabBarIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ProfileTabBarIcon,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Add Habit',
          tabBarIcon: AddHabitTabBarIcon,
        }}
      />
      <Tabs.Screen
        name="habitForm"
        options={{
          title: 'Add',
          tabBarIcon: AddTabBarIcon,
        }}
      />
    </Tabs>
  );
}
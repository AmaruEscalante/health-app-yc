import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import type { RootTabParamList, HomeStackParamList, WorkoutStackParamList, NutritionStackParamList, ProfileStackParamList } from './types';

// Placeholder screen for initial setup
function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  );
}

// Home Stack
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background.primary } }}>
      <HomeStack.Screen name="Dashboard">{() => <PlaceholderScreen title="Dashboard" />}</HomeStack.Screen>
      <HomeStack.Screen name="SleepTracker">{() => <PlaceholderScreen title="Sleep Tracker" />}</HomeStack.Screen>
      <HomeStack.Screen name="StressCheckin">{() => <PlaceholderScreen title="Stress Check-in" />}</HomeStack.Screen>
      <HomeStack.Screen name="Meditation">{() => <PlaceholderScreen title="Meditation" />}</HomeStack.Screen>
      <HomeStack.Screen name="Journal">{() => <PlaceholderScreen title="Journal" />}</HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

// Workout Stack
const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();
function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background.primary } }}>
      <WorkoutStack.Screen name="WorkoutOverview">{() => <PlaceholderScreen title="Workout Overview" />}</WorkoutStack.Screen>
      <WorkoutStack.Screen name="WorkoutLibrary">{() => <PlaceholderScreen title="Workout Library" />}</WorkoutStack.Screen>
      <WorkoutStack.Screen name="WorkoutDetail">{() => <PlaceholderScreen title="Workout Detail" />}</WorkoutStack.Screen>
      <WorkoutStack.Screen name="ActiveWorkout">{() => <PlaceholderScreen title="Active Workout" />}</WorkoutStack.Screen>
    </WorkoutStack.Navigator>
  );
}

// Nutrition Stack
const NutritionStack = createNativeStackNavigator<NutritionStackParamList>();
function NutritionStackNavigator() {
  return (
    <NutritionStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background.primary } }}>
      <NutritionStack.Screen name="NutritionOverview">{() => <PlaceholderScreen title="Nutrition Overview" />}</NutritionStack.Screen>
      <NutritionStack.Screen name="MealPlan">{() => <PlaceholderScreen title="Meal Plan" />}</NutritionStack.Screen>
      <NutritionStack.Screen name="AddMeal">{() => <PlaceholderScreen title="Add Meal" />}</NutritionStack.Screen>
    </NutritionStack.Navigator>
  );
}

// Profile Stack
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background.primary } }}>
      <ProfileStack.Screen name="Profile">{() => <PlaceholderScreen title="Profile" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="PersonalInfo">{() => <PlaceholderScreen title="Personal Info" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="Preferences">{() => <PlaceholderScreen title="Preferences" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="HealthGoals">{() => <PlaceholderScreen title="Health Goals" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="Medical">{() => <PlaceholderScreen title="Medical" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="VitalsLog">{() => <PlaceholderScreen title="Vitals Log" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="Medications">{() => <PlaceholderScreen title="Medications" />}</ProfileStack.Screen>
      <ProfileStack.Screen name="Appointments">{() => <PlaceholderScreen title="Appointments" />}</ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

// Bottom Tabs
const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          borderTopColor: colors.card.primary,
          borderTopWidth: 0.5,
          paddingBottom: 4,
          height: 85,
        },
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkoutTab"
        component={WorkoutStackNavigator}
        options={{
          tabBarLabel: 'Workout',
          tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="NutritionTab"
        component={NutritionStackNavigator}
        options={{
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  placeholderText: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: '600',
  },
});

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import type { RootTabParamList, HomeStackParamList, WorkoutStackParamList, NutritionStackParamList, ProfileStackParamList } from './types';

// Home screens
import { DashboardScreen } from '../screens/home/DashboardScreen';
import { SleepTrackerScreen } from '../screens/wellness/SleepTrackerScreen';
import { StressCheckinScreen } from '../screens/wellness/StressCheckinScreen';
import { MeditationScreen } from '../screens/wellness/MeditationScreen';
import { JournalScreen } from '../screens/wellness/JournalScreen';
import { CommunityFeedScreen } from '../screens/home/CommunityFeedScreen';

// Workout screens
import { WorkoutOverviewScreen } from '../screens/workout/WorkoutOverviewScreen';
import { WorkoutLibraryScreen } from '../screens/workout/WorkoutLibraryScreen';
import { WorkoutDetailScreen } from '../screens/workout/WorkoutDetailScreen';
import { ActiveWorkoutScreen } from '../screens/workout/ActiveWorkoutScreen';

// Nutrition screens
import { NutritionOverviewScreen } from '../screens/nutrition/NutritionOverviewScreen';
import { MealPlanScreen } from '../screens/nutrition/MealPlanScreen';
import { AddMealScreen } from '../screens/nutrition/AddMealScreen';

// Profile screens
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { PersonalInfoScreen } from '../screens/profile/PersonalInfoScreen';
import { PreferencesScreen } from '../screens/profile/PreferencesScreen';
import { HealthGoalsScreen } from '../screens/profile/HealthGoalsScreen';
import { MedicalScreen } from '../screens/profile/MedicalScreen';
import { VitalsLogScreen } from '../screens/profile/VitalsLogScreen';
import { MedicationsScreen } from '../screens/profile/MedicationsScreen';
import { AppointmentsScreen } from '../screens/profile/AppointmentsScreen';

const stackScreenOptions = { headerShown: false, contentStyle: { backgroundColor: colors.background.primary } } as const;

// Home Stack
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
      <HomeStack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
      <HomeStack.Screen name="SleepTracker" component={SleepTrackerScreen} />
      <HomeStack.Screen name="StressCheckin" component={StressCheckinScreen} />
      <HomeStack.Screen name="Meditation" component={MeditationScreen} />
      <HomeStack.Screen name="Journal" component={JournalScreen} />
    </HomeStack.Navigator>
  );
}

// Workout Stack
const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();
function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator screenOptions={stackScreenOptions}>
      <WorkoutStack.Screen name="WorkoutOverview" component={WorkoutOverviewScreen} />
      <WorkoutStack.Screen name="WorkoutLibrary" component={WorkoutLibraryScreen} />
      <WorkoutStack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
      <WorkoutStack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
    </WorkoutStack.Navigator>
  );
}

// Nutrition Stack
const NutritionStack = createNativeStackNavigator<NutritionStackParamList>();
function NutritionStackNavigator() {
  return (
    <NutritionStack.Navigator screenOptions={stackScreenOptions}>
      <NutritionStack.Screen name="NutritionOverview" component={NutritionOverviewScreen} />
      <NutritionStack.Screen name="MealPlan" component={MealPlanScreen} />
      <NutritionStack.Screen name="AddMeal" component={AddMealScreen} />
    </NutritionStack.Navigator>
  );
}

// Profile Stack
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <ProfileStack.Screen name="Preferences" component={PreferencesScreen} />
      <ProfileStack.Screen name="HealthGoals" component={HealthGoalsScreen} />
      <ProfileStack.Screen name="Medical" component={MedicalScreen} />
      <ProfileStack.Screen name="VitalsLog" component={VitalsLogScreen} />
      <ProfileStack.Screen name="Medications" component={MedicationsScreen} />
      <ProfileStack.Screen name="Appointments" component={AppointmentsScreen} />
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

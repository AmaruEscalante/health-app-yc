# Health & Wellness Test App — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 22-screen investor-demo quality React Native health & wellness app with dark mode, neon green accents, mocked data, and 4-tab navigation.

**Architecture:** Expo managed workflow with React Context + useReducer for state, all data mocked locally in TypeScript files. Bottom tab navigator (Home, Workout, Nutrition, Profile) with native stack navigators nested per tab.

**Tech Stack:** React Native, Expo, @react-navigation, react-native-svg, victory-native, react-native-reanimated, expo-linear-gradient, @expo/vector-icons

---

## Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`, `app.json`, `App.tsx`, `tsconfig.json`
- Create: `src/theme/colors.ts`
- Create: `src/theme/typography.ts`
- Create: `src/theme/spacing.ts`

**Step 1: Initialize Expo project**

```bash
cd /Users/amaru-mac/Documents/hackathons/yc-browser-use/e2e-app-test/test-app
npx create-expo-app@latest . --template blank-typescript
```

Expected: Expo project created with TypeScript template.

**Step 2: Install navigation dependencies**

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

**Step 3: Install UI/charting dependencies**

```bash
npx expo install react-native-svg react-native-reanimated expo-linear-gradient @expo/vector-icons
npm install victory-native
```

**Step 4: Create theme files**

`src/theme/colors.ts`:
```typescript
export const colors = {
  background: {
    primary: '#0D0D0D',
    secondary: '#1A1A1A',
  },
  card: {
    primary: '#1C1C1E',
    secondary: '#2C2C2E',
  },
  accent: {
    primary: '#C8FF00',      // neon/lime green
    primaryDim: '#AAFF00',
    secondary: '#34FF8E',    // bright green/teal
    secondaryAlt: '#00FFB3',
    tertiary: '#D9A8FF',     // lavender/purple
    tertiaryAlt: '#C78FFF',
  },
  macro: {
    carbs: '#FFD700',
    proteins: '#34C759',
    fats: '#A8D86E',         // yellow-green
  },
  semantic: {
    heart: '#FF3B30',
    calorieGradientStart: '#34C759',
    calorieGradientEnd: '#FFD700',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#AEAEB2',
    secondaryDim: '#8E8E93',
    tertiary: '#636366',
  },
  tabBar: {
    background: '#0D0D0D',
    active: '#C8FF00',
    inactive: '#8E8E93',
  },
};
```

`src/theme/typography.ts`:
```typescript
import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  largeHeader: { fontSize: 26, fontWeight: '700' },
  sectionHeader: { fontSize: 19, fontWeight: '600' },
  metricValue: { fontSize: 32, fontWeight: '700' },
  metricUnit: { fontSize: 13, fontWeight: '400' },
  body: { fontSize: 15, fontWeight: '400' },
  subLabel: { fontSize: 12, fontWeight: '400' },
  tabLabel: { fontSize: 11, fontWeight: '500' },
};
```

`src/theme/spacing.ts`:
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  cardRadius: 16,
  screenPadding: 16,
};
```

**Step 5: Verify project runs**

```bash
npx expo start
```

Expected: Expo dev server starts, app loads on simulator/device.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Expo project with dependencies and theme"
```

---

## Task 2: Mock Data Layer

**Files:**
- Create: `src/data/user.ts`
- Create: `src/data/activity.ts`
- Create: `src/data/nutrition.ts`
- Create: `src/data/wellness.ts`
- Create: `src/data/medical.ts`
- Create: `src/data/types.ts`

**Step 1: Create shared types**

`src/data/types.ts`:
```typescript
export interface UserProfile {
  name: string;
  age: number;
  avatar: string; // local asset or placeholder URL
  height: string;
  weight: number;
  bloodType: string;
  emergencyContact: { name: string; phone: string };
  goals: {
    steps: number;
    calories: number;
    sleepHours: number;
    targetWeight: number;
  };
  preferences: {
    units: 'metric' | 'imperial';
    workoutReminders: boolean;
    medicationAlerts: boolean;
    sleepReminders: boolean;
  };
}

export interface Workout {
  id: string;
  name: string;
  category: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT' | 'Walking';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMin: number;
  exercises: Exercise[];
  thumbnail: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  durationSec?: number;
}

export interface StepDay {
  date: string; // ISO date
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  time: string; // HH:mm
  date: string; // ISO date
  thumbnail?: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  goalCalories: number;
  carbs: { current: number; goal: number };
  proteins: { current: number; goal: number };
  fats: { current: number; goal: number };
  meals: Meal[];
}

export interface SleepLog {
  date: string;
  bedtime: string;
  wakeTime: string;
  totalHours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  deep: number;
  light: number;
  rem: number;
}

export interface StressEntry {
  date: string;
  level: number; // 1-10
  mood: string;
  notes?: string;
}

export interface MeditationSession {
  date: string;
  durationMin: number;
  type: 'guided' | 'unguided';
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  moodTags: string[];
}

export interface VitalReading {
  date: string;
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  weight?: number;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice daily' | 'weekly';
  time: string;
  reminderEnabled: boolean;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  reason?: string;
}

export interface AppState {
  user: UserProfile;
  activity: {
    workouts: Workout[];
    stepHistory: StepDay[];
    streaks: { training: number; nutrition: number };
  };
  nutrition: {
    dailyLog: DailyNutrition[];
    currentDay: number; // streak day
  };
  wellness: {
    sleepLogs: SleepLog[];
    stressEntries: StressEntry[];
    meditationSessions: MeditationSession[];
    meditationStreak: number;
    journal: JournalEntry[];
  };
  medical: {
    vitals: VitalReading[];
    medications: Medication[];
    appointments: Appointment[];
  };
}
```

**Step 2: Create user mock data**

`src/data/user.ts`:
```typescript
import { UserProfile } from './types';

export const mockUser: UserProfile = {
  name: 'Antony Thomas',
  age: 28,
  avatar: 'https://i.pravatar.cc/150?img=12',
  height: "5'11\"",
  weight: 175,
  bloodType: 'O+',
  emergencyContact: { name: 'Maria Thomas', phone: '(555) 234-5678' },
  goals: { steps: 10000, calories: 2200, sleepHours: 8, targetWeight: 170 },
  preferences: {
    units: 'imperial',
    workoutReminders: true,
    medicationAlerts: true,
    sleepReminders: false,
  },
};
```

**Step 3: Create activity mock data**

`src/data/activity.ts` — Generate 30 days of step history, 10 workouts across 5 categories, streaks:

```typescript
import { Workout, StepDay } from './types';

export const mockWorkouts: Workout[] = [
  {
    id: 'w1', name: 'HIIT Blast', category: 'HIIT', difficulty: 'Advanced',
    durationMin: 30,
    exercises: [
      { name: 'Burpees', sets: 3, reps: 15 },
      { name: 'Mountain Climbers', durationSec: 45 },
      { name: 'Jump Squats', sets: 3, reps: 20 },
      { name: 'High Knees', durationSec: 60 },
      { name: 'Plank Jacks', sets: 3, reps: 15 },
    ],
    thumbnail: 'hiit',
  },
  {
    id: 'w2', name: 'Upper Body Strength', category: 'Strength', difficulty: 'Intermediate',
    durationMin: 45,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 10 },
      { name: 'Overhead Press', sets: 3, reps: 12 },
      { name: 'Bent Over Rows', sets: 4, reps: 10 },
      { name: 'Bicep Curls', sets: 3, reps: 15 },
      { name: 'Tricep Dips', sets: 3, reps: 12 },
    ],
    thumbnail: 'strength',
  },
  {
    id: 'w3', name: 'Morning Yoga Flow', category: 'Yoga', difficulty: 'Beginner',
    durationMin: 25,
    exercises: [
      { name: 'Sun Salutation', durationSec: 120 },
      { name: 'Warrior Sequence', durationSec: 180 },
      { name: 'Tree Pose', durationSec: 60 },
      { name: 'Pigeon Pose', durationSec: 90 },
      { name: 'Savasana', durationSec: 120 },
    ],
    thumbnail: 'yoga',
  },
  {
    id: 'w4', name: 'Cardio Burn', category: 'Cardio', difficulty: 'Intermediate',
    durationMin: 40,
    exercises: [
      { name: 'Treadmill Run', durationSec: 600 },
      { name: 'Rowing Machine', durationSec: 300 },
      { name: 'Jump Rope', durationSec: 180 },
      { name: 'Cycling', durationSec: 600 },
    ],
    thumbnail: 'cardio',
  },
  {
    id: 'w5', name: 'Evening Walk', category: 'Walking', difficulty: 'Beginner',
    durationMin: 30,
    exercises: [
      { name: 'Warm-Up Walk', durationSec: 300 },
      { name: 'Brisk Walk', durationSec: 1200 },
      { name: 'Cool-Down Stretch', durationSec: 300 },
    ],
    thumbnail: 'walking',
  },
  {
    id: 'w6', name: 'Leg Day', category: 'Strength', difficulty: 'Advanced',
    durationMin: 50,
    exercises: [
      { name: 'Squats', sets: 5, reps: 8 },
      { name: 'Deadlifts', sets: 4, reps: 8 },
      { name: 'Leg Press', sets: 4, reps: 12 },
      { name: 'Lunges', sets: 3, reps: 12 },
      { name: 'Calf Raises', sets: 4, reps: 15 },
    ],
    thumbnail: 'strength',
  },
];

function generateStepHistory(): StepDay[] {
  const days: StepDay[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const steps = 6000 + Math.floor(Math.random() * 8000);
    days.push({
      date: date.toISOString().split('T')[0],
      steps,
      caloriesBurned: Math.floor(steps * 0.04),
      activeMinutes: Math.floor(steps / 100),
    });
  }
  return days;
}

export const mockStepHistory = generateStepHistory();
export const mockStreaks = { training: 12, nutrition: 12 };
```

**Step 4: Create nutrition mock data**

`src/data/nutrition.ts`:
```typescript
import { DailyNutrition, Meal } from './types';

function generateNutritionHistory(): DailyNutrition[] {
  const days: DailyNutrition[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const cals = 1400 + Math.floor(Math.random() * 800);
    const meals: Meal[] = [
      { id: `m-${dateStr}-1`, name: 'Oatmeal & Berries', calories: 320, carbs: 45, proteins: 12, fats: 8, mealType: 'Breakfast', time: '08:00', date: dateStr },
      { id: `m-${dateStr}-2`, name: 'Grilled Chicken Salad', calories: 480, carbs: 20, proteins: 42, fats: 18, mealType: 'Lunch', time: '12:30', date: dateStr },
      { id: `m-${dateStr}-3`, name: 'Salmon & Vegetables', calories: 520, carbs: 30, proteins: 38, fats: 22, mealType: 'Dinner', time: '19:00', date: dateStr },
      { id: `m-${dateStr}-4`, name: 'Protein Shake', calories: 180, carbs: 10, proteins: 30, fats: 3, mealType: 'Snack', time: '16:00', date: dateStr },
    ];
    days.push({
      date: dateStr,
      totalCalories: cals,
      goalCalories: 1500,
      carbs: { current: 80 + Math.floor(Math.random() * 40), goal: 174 },
      proteins: { current: 90 + Math.floor(Math.random() * 40), goal: 130 },
      fats: { current: 40 + Math.floor(Math.random() * 20), goal: 65 },
      meals,
    });
  }
  return days;
}

export const mockNutritionHistory = generateNutritionHistory();
```

**Step 5: Create wellness mock data**

`src/data/wellness.ts`:
```typescript
import { SleepLog, StressEntry, MeditationSession, JournalEntry } from './types';

function generateSleepLogs(): SleepLog[] {
  const logs: SleepLog[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const hours = 5.5 + Math.random() * 3;
    logs.push({
      date: date.toISOString().split('T')[0],
      bedtime: `${22 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '30' : '00'}`,
      wakeTime: `${6 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '15' : '00'}`,
      totalHours: Math.round(hours * 10) / 10,
      quality: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
      deep: Math.round(hours * 0.2 * 10) / 10,
      light: Math.round(hours * 0.5 * 10) / 10,
      rem: Math.round(hours * 0.3 * 10) / 10,
    });
  }
  return logs;
}

export const mockSleepLogs = generateSleepLogs();
export const mockMeditationStreak = 12;

export const mockStressEntries: StressEntry[] = [
  { date: new Date().toISOString().split('T')[0], level: 6, mood: 'Anxious', notes: 'Busy day at work' },
  { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], level: 4, mood: 'Calm' },
  { date: new Date(Date.now() - 172800000).toISOString().split('T')[0], level: 7, mood: 'Stressed', notes: 'Deadline pressure' },
];

export const mockMeditationSessions: MeditationSession[] = [
  { date: new Date().toISOString().split('T')[0], durationMin: 10, type: 'guided' },
  { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], durationMin: 5, type: 'unguided' },
  { date: new Date(Date.now() - 172800000).toISOString().split('T')[0], durationMin: 15, type: 'guided' },
];

export const mockJournal: JournalEntry[] = [
  { id: 'j1', date: new Date().toISOString().split('T')[0], content: 'Had a productive morning. Meditation helped me focus throughout the day. Need to work on managing afternoon stress better.', moodTags: ['Focused', 'Productive'] },
  { id: 'j2', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], content: 'Struggled with sleep last night. Going to try limiting screen time before bed.', moodTags: ['Tired', 'Reflective'] },
  { id: 'j3', date: new Date(Date.now() - 259200000).toISOString().split('T')[0], content: 'Great weekend hike. Nature really helps with stress levels.', moodTags: ['Happy', 'Relaxed'] },
];
```

**Step 6: Create medical mock data**

`src/data/medical.ts`:
```typescript
import { VitalReading, Medication, Appointment } from './types';

function generateVitals(): VitalReading[] {
  const readings: VitalReading[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    readings.push({
      date: date.toISOString().split('T')[0],
      systolic: 125 + Math.floor(Math.random() * 20),
      diastolic: 78 + Math.floor(Math.random() * 12),
      heartRate: 65 + Math.floor(Math.random() * 15),
      weight: 183 + Math.floor(Math.random() * 4),
    });
  }
  return readings;
}

export const mockVitals = generateVitals();

export const mockMedications: Medication[] = [
  { id: 'med1', name: 'Lisinopril', dosage: '10mg', frequency: 'daily', time: '08:00', reminderEnabled: true },
  { id: 'med2', name: 'Metformin', dosage: '500mg', frequency: 'twice daily', time: '08:00', reminderEnabled: true },
  { id: 'med3', name: 'Aspirin', dosage: '81mg', frequency: 'daily', time: '08:00', reminderEnabled: false },
  { id: 'med4', name: 'Vitamin D', dosage: '2000 IU', frequency: 'daily', time: '08:00', reminderEnabled: false },
];

export const mockAppointments: Appointment[] = [
  { id: 'apt1', doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', date: '2026-03-05', time: '10:00', location: 'Heart Health Center, Suite 200', reason: 'Quarterly checkup' },
  { id: 'apt2', doctor: 'Dr. James Wilson', specialty: 'Primary Care', date: '2026-03-15', time: '14:30', location: 'Family Medical Group', reason: 'Annual physical' },
  { id: 'apt3', doctor: 'Dr. Lisa Park', specialty: 'Endocrinologist', date: '2026-04-02', time: '09:00', location: 'Metro Endocrine Clinic', reason: 'Diabetes follow-up' },
];
```

**Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add mock data layer with types and 30-day history"
```

---

## Task 3: App Context & State Management

**Files:**
- Create: `src/context/AppContext.tsx`

**Step 1: Create AppContext with useReducer**

`src/context/AppContext.tsx`:
```typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Meal, VitalReading, Medication, Appointment, SleepLog, StressEntry, JournalEntry } from '../data/types';
import { mockUser } from '../data/user';
import { mockWorkouts, mockStepHistory, mockStreaks } from '../data/activity';
import { mockNutritionHistory } from '../data/nutrition';
import { mockSleepLogs, mockStressEntries, mockMeditationSessions, mockMeditationStreak, mockJournal } from '../data/wellness';
import { mockVitals, mockMedications, mockAppointments } from '../data/medical';

const initialState: AppState = {
  user: mockUser,
  activity: {
    workouts: mockWorkouts,
    stepHistory: mockStepHistory,
    streaks: mockStreaks,
  },
  nutrition: {
    dailyLog: mockNutritionHistory,
    currentDay: 12,
  },
  wellness: {
    sleepLogs: mockSleepLogs,
    stressEntries: mockStressEntries,
    meditationSessions: mockMeditationSessions,
    meditationStreak: mockMeditationStreak,
    journal: mockJournal,
  },
  medical: {
    vitals: mockVitals,
    medications: mockMedications,
    appointments: mockAppointments,
  },
};

type Action =
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'LOG_VITALS'; payload: VitalReading }
  | { type: 'ADD_MEDICATION'; payload: Medication }
  | { type: 'TOGGLE_MED_REMINDER'; payload: string }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'LOG_SLEEP'; payload: SleepLog }
  | { type: 'LOG_STRESS'; payload: StressEntry }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_USER'; payload: Partial<AppState['user']> }
  | { type: 'UPDATE_GOALS'; payload: Partial<AppState['user']['goals']> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppState['user']['preferences']> };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_MEAL': {
      const todayLog = state.nutrition.dailyLog[state.nutrition.dailyLog.length - 1];
      const updatedLog = {
        ...todayLog,
        meals: [...todayLog.meals, action.payload],
        totalCalories: todayLog.totalCalories + action.payload.calories,
      };
      return {
        ...state,
        nutrition: {
          ...state.nutrition,
          dailyLog: [...state.nutrition.dailyLog.slice(0, -1), updatedLog],
        },
      };
    }
    case 'LOG_VITALS':
      return { ...state, medical: { ...state.medical, vitals: [...state.medical.vitals, action.payload] } };
    case 'ADD_MEDICATION':
      return { ...state, medical: { ...state.medical, medications: [...state.medical.medications, action.payload] } };
    case 'TOGGLE_MED_REMINDER':
      return {
        ...state,
        medical: {
          ...state.medical,
          medications: state.medical.medications.map(m =>
            m.id === action.payload ? { ...m, reminderEnabled: !m.reminderEnabled } : m
          ),
        },
      };
    case 'ADD_APPOINTMENT':
      return { ...state, medical: { ...state.medical, appointments: [...state.medical.appointments, action.payload] } };
    case 'LOG_SLEEP':
      return { ...state, wellness: { ...state.wellness, sleepLogs: [...state.wellness.sleepLogs, action.payload] } };
    case 'LOG_STRESS':
      return { ...state, wellness: { ...state.wellness, stressEntries: [...state.wellness.stressEntries, action.payload] } };
    case 'ADD_JOURNAL_ENTRY':
      return { ...state, wellness: { ...state.wellness, journal: [action.payload, ...state.wellness.journal] } };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'UPDATE_GOALS':
      return { ...state, user: { ...state.user, goals: { ...state.user.goals, ...action.payload } } };
    case 'UPDATE_PREFERENCES':
      return { ...state, user: { ...state.user, preferences: { ...state.user.preferences, ...action.payload } } };
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
```

**Step 2: Commit**

```bash
git add src/context/
git commit -m "feat: add AppContext with useReducer and all actions"
```

---

## Task 4: Navigation Setup

**Files:**
- Create: `src/navigation/types.ts`
- Create: `src/navigation/AppNavigator.tsx`
- Modify: `App.tsx`

**Step 1: Define navigation types**

`src/navigation/types.ts`:
```typescript
export type RootTabParamList = {
  HomeTab: undefined;
  WorkoutTab: undefined;
  NutritionTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  SleepTracker: undefined;
  StressCheckin: undefined;
  Meditation: undefined;
  Journal: undefined;
};

export type WorkoutStackParamList = {
  WorkoutOverview: undefined;
  WorkoutLibrary: undefined;
  WorkoutDetail: { workoutId: string };
  ActiveWorkout: { workoutId: string };
};

export type NutritionStackParamList = {
  NutritionOverview: undefined;
  MealPlan: undefined;
  AddMeal: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  PersonalInfo: undefined;
  Preferences: undefined;
  HealthGoals: undefined;
  Medical: undefined;
  VitalsLog: undefined;
  Medications: undefined;
  Appointments: undefined;
};
```

**Step 2: Create AppNavigator with tab bar and stack navigators**

`src/navigation/AppNavigator.tsx` — Set up bottom tabs with the dark theme, neon green active color, and nested stack navigators per tab. Each stack initially uses a placeholder screen component.

- Tab bar: dark background (#0D0D0D), neon green (#C8FF00) active icons/labels, gray (#8E8E93) inactive
- Icons: Ionicons — home, barbell, leaf, person
- Each tab wraps a native stack navigator with `headerShown: false` for custom headers
- Stack screens use `contentStyle: { backgroundColor: '#0D0D0D' }` for dark backgrounds

**Step 3: Wire up App.tsx**

```typescript
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
```

**Step 4: Verify — app runs with 4 tabs visible**

```bash
npx expo start
```

Expected: App shows 4 tabs at bottom with correct icons and colors.

**Step 5: Commit**

```bash
git add src/navigation/ App.tsx
git commit -m "feat: add 4-tab navigation with stack navigators"
```

---

## Task 5: Shared Components

**Files:**
- Create: `src/components/MetricCard.tsx`
- Create: `src/components/DonutChart.tsx`
- Create: `src/components/MacroBar.tsx`
- Create: `src/components/StreakCard.tsx`
- Create: `src/components/WeekCalendar.tsx`
- Create: `src/components/FAB.tsx`
- Create: `src/components/HealthScoreRing.tsx`
- Create: `src/components/VitalsChart.tsx`
- Create: `src/components/WorkoutTimer.tsx`

Build each component following the design spec:

**MetricCard** — Colored circular icon container + bold metric value + unit + gray sub-label. Props: `icon`, `iconColor`, `value`, `unit`, `subLabel`.

**DonutChart** — SVG donut ring with green-to-yellow gradient progress. Center content: day label + fire icon + calorie value + goal subtitle. Props: `progress` (0-1), `centerValue`, `centerLabel`, `goalLabel`.

**MacroBar** — Horizontal progress bar with colored fill. Shows "current/goal" label. Props: `label`, `current`, `goal`, `color`.

**StreakCard** — Rounded card with colored gradient background (purple or green). Shows streak days + checkmark + "Daily Plan" button with arrow. Props: `title`, `subtitle`, `days`, `variant` ('training' | 'nutrition'), `onPress`.

**WeekCalendar** — Horizontal strip of Sun-Sat circular day indicators. Today: filled green circle. Selected: green ring. Other: default subtle. Props: `selectedDate`, `onSelectDate`.

**FAB** — Circular "+" button with neon green glowing ring, positioned above tab bar. Props: `onPress`. Uses react-native-svg for the glow ring effect.

**HealthScoreRing** — Animated circular progress ring in neon green. Props: `progress`, `size`, `label`.

**VitalsChart** — Line chart (using victory-native) for BP/HR/weight trends. Props: `data`, `type` ('bp' | 'hr' | 'weight').

**WorkoutTimer** — Countdown timer display with current exercise name, next exercise preview, pause/stop buttons. Props: `exercises`, `onComplete`.

Each component uses the theme colors/typography/spacing. No business logic — pure presentational.

**Commit after each 2-3 components:**

```bash
git commit -m "feat: add MetricCard, DonutChart, MacroBar components"
git commit -m "feat: add StreakCard, WeekCalendar, FAB components"
git commit -m "feat: add HealthScoreRing, VitalsChart, WorkoutTimer components"
```

---

## Task 6: Home Tab — Dashboard Screen

**Files:**
- Create: `src/screens/home/DashboardScreen.tsx`

Build the dashboard following the design spec:

- **Greeting header**: Avatar (circular 40px) + "Good Morning!" + user name from context + bell icon (top right)
- **3 nutrition summary cards** using MetricCard: Calories (fire icon, orange), Proteins (fork icon, green), Carbs (bolt icon, yellow). Data from today's nutrition log.
- **Community section**: Section header + search icon. Hardcode 2-3 community user cards with: avatar, name, follower count, green "Follow" pill button, overflow menu. One food image post (full-width rounded card), engagement row (heart + like count, avatar stack, comment icon + count, bookmark).
- **FAB** component at bottom
- ScrollView wrapper, dark background

**Commit:**
```bash
git commit -m "feat: add DashboardScreen with greeting, metrics, community feed"
```

---

## Task 7: Workout Tab — All 4 Screens

**Files:**
- Create: `src/screens/workout/WorkoutOverviewScreen.tsx`
- Create: `src/screens/workout/WorkoutLibraryScreen.tsx`
- Create: `src/screens/workout/WorkoutDetailScreen.tsx`
- Create: `src/screens/workout/ActiveWorkoutScreen.tsx`

**WorkoutOverviewScreen:**
- "PulseUp Fitness" bold header + QR code icon (top right)
- Clock icon + "Open · Closes at 21:50"
- Date: "Tuesday, Nov 18"
- 2 side-by-side StreakCards (training: purple variant, nutrition: green variant)
- Personal training photo card with dark overlay, "Personal Training" label, subtitle, booking text
- FAB + ScrollView

**WorkoutLibraryScreen:**
- Grid (2 columns) of workout categories from mock data
- Each card: colored thumbnail placeholder, category name, workout count badge
- Tapping navigates to WorkoutDetail with workoutId

**WorkoutDetailScreen:**
- Receives workoutId from navigation params
- Header with workout name + difficulty badge (colored pill)
- Duration display
- Exercise list: each row shows name, sets x reps or duration, with index number
- "Start Workout" button (full-width, neon green)

**ActiveWorkoutScreen:**
- WorkoutTimer component with exercises from the selected workout
- Large countdown timer display
- Current exercise name in large text
- Next exercise preview
- Pause button (outlined) + Stop button (red outlined)
- On complete: navigate back to WorkoutOverview

**Commit after each screen pair:**
```bash
git commit -m "feat: add WorkoutOverview and WorkoutLibrary screens"
git commit -m "feat: add WorkoutDetail and ActiveWorkout screens"
```

---

## Task 8: Nutrition Tab — All 3 Screens

**Files:**
- Create: `src/screens/nutrition/NutritionOverviewScreen.tsx`
- Create: `src/screens/nutrition/MealPlanScreen.tsx`
- Create: `src/screens/nutrition/AddMealScreen.tsx`

**NutritionOverviewScreen:**
- Nav bar: "Nutrition" title centered + overflow menu
- WeekCalendar component at top
- DonutChart component (center) — progress = today's calories / goal, center shows "Day 12" + fire + calorie value + goal
- 3 MacroBar components to the right of donut (carbs: yellow, proteins: green, fats: yellow-green)
- "Check Calories" row with camera icon
- Navigate to MealPlan on scroll down

**MealPlanScreen:**
- "Daily Meal" header + "Edit plan" link with pencil icon
- Motivational card with food illustration placeholder + gradient overlay
- Date range row: calendar icon + date range text
- Meal list: each row has checkbox, time, meal name, calorie count, small food thumbnail
- Grocery list row at bottom with cart icon
- Data from today's nutrition log via context

**AddMealScreen:**
- Form with: food name text input, calorie number input, carbs/proteins/fats number inputs, meal type selector (4 pill buttons: Breakfast/Lunch/Dinner/Snack)
- "Save" button (full-width, neon green)
- On save: dispatch ADD_MEAL action, navigate back
- All inputs use dark card background, white text, green focus border

**Commit:**
```bash
git commit -m "feat: add NutritionOverview, MealPlan, AddMeal screens"
```

---

## Task 9: Profile Tab — Profile, PersonalInfo, Preferences, HealthGoals

**Files:**
- Create: `src/screens/profile/ProfileScreen.tsx`
- Create: `src/screens/profile/PersonalInfoScreen.tsx`
- Create: `src/screens/profile/PreferencesScreen.tsx`
- Create: `src/screens/profile/HealthGoalsScreen.tsx`

**ProfileScreen:**
- Large avatar (80px circular) centered + name + age
- Bio stats row: height, weight, blood type in pill badges
- Settings list (dark cards, chevron right): Personal Info, Preferences, Health Goals, Medical, Sleep Tracker, Stress & Meditation, Journal
- Each row navigates to its screen

**PersonalInfoScreen:**
- Editable form: name, age, height, weight inputs (dark card bg, white text)
- Blood type dropdown/picker
- Emergency contact section: name + phone inputs
- "Save" button — dispatches UPDATE_USER

**PreferencesScreen:**
- Toggle rows (Switch component): Workout Reminders, Medication Alerts, Sleep Reminders
- Units toggle: Metric / Imperial (two pill buttons)
- All dispatches UPDATE_PREFERENCES

**HealthGoalsScreen:**
- 4 goal cards, each with: HealthScoreRing showing progress, goal name, current value, target input
- Goals: Daily Steps, Daily Calories, Sleep Hours, Target Weight
- Edit button per card opens inline edit
- "Save" dispatches UPDATE_GOALS

**Commit:**
```bash
git commit -m "feat: add Profile, PersonalInfo, Preferences, HealthGoals screens"
```

---

## Task 10: Profile Tab — Medical Screens (Medical, Vitals, Medications, Appointments)

**Files:**
- Create: `src/screens/profile/MedicalScreen.tsx`
- Create: `src/screens/profile/VitalsLogScreen.tsx`
- Create: `src/screens/profile/MedicationsScreen.tsx`
- Create: `src/screens/profile/AppointmentsScreen.tsx`

**MedicalScreen:**
- Hub with 3 summary cards: Latest Vitals (last BP + HR reading), Upcoming Appointments (next appointment), Active Medications (count badge)
- Each card navigates to its detail screen

**VitalsLogScreen:**
- VitalsChart component showing BP trend (30 days)
- Toggle: BP / Heart Rate / Weight chart views
- Latest reading displayed prominently
- "Log Vitals" button opens inline form: systolic, diastolic, HR, weight inputs + notes
- On save: dispatch LOG_VITALS

**MedicationsScreen:**
- List of medications from context: each row shows name (bold), dosage, frequency, reminder Switch toggle
- Toggle dispatches TOGGLE_MED_REMINDER
- "Add Medication" button at bottom
- Inline add form: name, dosage, frequency picker (3 pills: daily/twice daily/weekly), time, save button
- On save: dispatch ADD_MEDICATION

**AppointmentsScreen:**
- Upcoming appointments list: each card shows doctor name, specialty pill badge, date/time, location with map pin icon
- "Book Appointment" button
- Inline booking form: doctor name input, specialty dropdown, date picker, time slot buttons, reason text input, "Confirm" button
- On save: dispatch ADD_APPOINTMENT

**Commit:**
```bash
git commit -m "feat: add Medical, VitalsLog, Medications, Appointments screens"
```

---

## Task 11: Wellness Screens (Sleep, Stress, Meditation, Journal)

**Files:**
- Create: `src/screens/wellness/SleepTrackerScreen.tsx`
- Create: `src/screens/wellness/StressCheckinScreen.tsx`
- Create: `src/screens/wellness/MeditationScreen.tsx`
- Create: `src/screens/wellness/JournalScreen.tsx`

**SleepTrackerScreen:**
- Weekly sleep bar chart (victory-native VictoryBar, 7 days, colored by quality)
- Last night detail card: bedtime, wake time, total hours (large), quality stars
- Breakdown row: Deep / Light / REM with colored segments
- "Log Sleep" button opens form: bedtime picker, wake time picker, quality (5 star rating tap), notes
- On save: dispatch LOG_SLEEP

**StressCheckinScreen:**
- "How are you feeling?" header
- Stress level slider (1-10) with colored gradient track (green to red)
- Current value displayed large
- Mood selector: 3x3 emoji grid (Happy, Calm, Focused, Anxious, Stressed, Sad, Angry, Tired, Neutral)
- "Start Breathing Exercise" button — opens modal with animated expanding/contracting circle (4s inhale, 4s exhale), close button
- "Write in Journal" link navigates to Journal

**MeditationScreen:**
- Meditation streak: large number + "day streak" + calendar heat strip
- Session cards (3): 5 min, 10 min, 15 min. Each shows guided/unguided toggle
- "Start Session" opens timer view: large countdown, animated breathing ring (reanimated), pause/stop
- On complete: log session to context

**JournalScreen:**
- Past entries list: date header + mood tag pills + content preview (2 lines, truncated)
- "New Entry" FAB or button
- Entry form: large text area (dark card bg), mood tag selector (multi-select pills), date stamp auto-filled
- On save: dispatch ADD_JOURNAL_ENTRY

**Commit:**
```bash
git commit -m "feat: add SleepTracker, StressCheckin, Meditation, Journal screens"
```

---

## Task 12: Wire All Navigation Routes

**Files:**
- Modify: `src/navigation/AppNavigator.tsx`

**Step 1:** Register all screens in their respective stack navigators. Ensure all navigation.navigate() calls in screens reference correct route names and params.

**Step 2:** Verify every screen is reachable by navigating through the app manually.

**Step 3:** Commit

```bash
git commit -m "feat: wire all screen routes into navigation stacks"
```

---

## Task 13: Polish & Animations

**Files:**
- Modify: Various screen and component files

**Step 1:** Add entry animations to the Dashboard health score ring (animate from 0 to value on mount using react-native-reanimated).

**Step 2:** Add the FAB neon green glow pulse animation (subtle opacity oscillation).

**Step 3:** Add smooth transitions on chart data changes.

**Step 4:** Ensure all ScrollViews have `showsVerticalScrollIndicator={false}` and proper `contentContainerStyle` padding.

**Step 5:** Add `SafeAreaView` wrapping on all screens.

**Step 6:** Verify all screens match the design spec: dark backgrounds, correct colors, typography, spacing.

**Step 7:** Commit

```bash
git commit -m "feat: add animations and polish across all screens"
```

---

## Task 14: Final Verification

**Step 1:** Run the app and manually walk through all 3 persona flows:
- Alex (21): Dashboard → Activity → Workout → Calorie tracking → Goals
- Sarah (40): Dashboard → Sleep → Stress → Meditation → Journal → Medications
- Robert (60): Dashboard → Vitals → Medications → Appointments → Personal Info

**Step 2:** Verify all forms submit correctly (dispatch actions, state updates, navigation)

**Step 3:** Verify all charts render with 30-day mock data

**Step 4:** Verify dark theme is consistent across all 22 screens

**Step 5:** Final commit

```bash
git commit -m "chore: final verification of all screens and persona flows"
```

export interface UserProfile {
  name: string;
  age: number;
  avatar: string;
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
  date: string;
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
  time: string;
  date: string;
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
  level: number;
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

export interface CommunityPost {
  id: string;
  author: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
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
    currentDay: number;
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
  community: {
    posts: CommunityPost[];
  };
}

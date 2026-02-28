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

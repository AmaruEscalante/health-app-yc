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

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

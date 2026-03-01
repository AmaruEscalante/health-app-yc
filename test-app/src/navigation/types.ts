export type RootTabParamList = {
  HomeTab: undefined;
  WorkoutTab: undefined;
  NutritionTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  CommunityFeed: undefined;
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

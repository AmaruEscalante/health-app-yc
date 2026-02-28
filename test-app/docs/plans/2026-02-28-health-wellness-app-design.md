# Health & Wellness Test App — Design Document

## Purpose

A React Native (Expo) health and wellness app built as a test target for AI agents that automate mobile app testing. The app is investor-demo quality with all data mocked locally. The AI agent simulates different user personas to demonstrate diverse navigation paths and interactions.

## Approach

Feature-Hub App with 4-tab bottom navigation. Single app containing all features across fitness, nutrition, wellness, and medical domains. The AI agent navigates different paths based on persona (21yo fitness, 40yo wellness, 60yo medical).

## Navigation & Screen Map

### Tab Bar (4 tabs)

| Tab | Icon | Accent |
|-----|------|--------|
| Home | House (filled) | Neon green active |
| Workout | Dumbbell | Neon green active |
| Nutrition | Leaf | Neon green active |
| Profile | Person | Neon green active |

### Tab 1: Home (Dashboard)

- **DashboardScreen** — Greeting header (avatar + "Good Morning!" + name + bell icon), 3 nutrition summary cards (calories/proteins/carbs with colored circle icons, bold number + unit, gray sub-label), community section with user cards (avatar + name + followers + Follow pill + overflow menu), food image posts (full-width rounded cards), engagement row (heart + likes, avatar stack, comments, bookmark), FAB with neon green glow ring.

### Tab 2: Workout

- **WorkoutOverviewScreen** — "PulseUp Fitness" header + QR icon, open/close hours, date display, 2 side-by-side streak cards (Training: lavender/purple, Nutrition: bright green, each with day count + checkmark + "Daily Plan" button), personal training photo card with dark overlay.
- **WorkoutLibraryScreen** — Grid of workout categories (Strength, Cardio, Yoga, HIIT, Walking) with thumbnails.
- **WorkoutDetailScreen** — Exercise list with sets/reps/duration, start workout button, difficulty badge.
- **ActiveWorkoutScreen** — Countdown timer, current exercise display, next exercise preview, pause/stop controls.

### Tab 3: Nutrition

- **NutritionOverviewScreen** — Back nav + title, week calendar strip (Sun-Sat, circular day indicators, today filled green, selected green ring), donut/ring chart (green-to-yellow gradient progress, center: "Day 12" + fire icon + "764" + "1500 Kcal"), macro breakdown (3 horizontal bars: carbs yellow, proteins green, fats yellow-green, current/goal format), check calories row with camera icon.
- **MealPlanScreen** — "Daily Meal" header + "Edit plan" link, motivational card with food illustration, date range with calendar icon, meal item rows (checkbox + time/calories + food thumbnail), grocery list row.
- **AddMealScreen** — Food name input, calorie input, macro inputs, meal type selector (Breakfast/Lunch/Dinner/Snack), save button.

### Tab 4: Profile

- **ProfileScreen** — Avatar, name, age, bio stats (height/weight/blood type), settings list linking to sub-screens.
- **PersonalInfoScreen** — Editable form: name, age, height, weight, blood type dropdown, emergency contact.
- **PreferencesScreen** — Notification toggles (workout reminders, medication alerts, sleep reminders), units toggle (metric/imperial).
- **HealthGoalsScreen** — Goal cards (step goal, calorie goal, sleep goal, weight goal) with neon green progress rings, edit modal.
- **MedicalScreen** — Hub: latest vitals summary, upcoming appointments, active medications count.
- **VitalsLogScreen** — BP line chart (systolic/diastolic over time), HR trend, weight trend, "Log Vitals" form (BP inputs, HR, weight, date/time picker, notes).
- **MedicationsScreen** — List of current medications (name/dosage/frequency), reminder toggle per med, "Add Medication" form (name, dosage, frequency picker, time picker).
- **AppointmentsScreen** — Upcoming appointments list (doctor, specialty, date/time, location), "Book Appointment" form (doctor/specialty dropdown, date picker, time slots, reason, confirm).

### Wellness Screens (accessed from Home or Profile)

- **SleepTrackerScreen** — Weekly sleep bar chart, last night detail (bedtime, wake, deep/light/REM), "Log Sleep" form (bedtime picker, wake picker, quality 1-5 stars, notes).
- **StressCheckinScreen** — Stress level slider (1-10), mood selector (emoji grid), breathing exercise launcher, journal entry link.
- **MeditationScreen** — Session list (5/10/15min, guided/unguided), streak calendar, timer with breathing animation.
- **JournalScreen** — Past entries list, "New Entry" form (text area, mood tags, date stamp).

**Total: ~22 distinct screens.**

## Persona Flows

### Alex, 21 (Fitness-focused)

Primary tabs: Workout, Nutrition, Home.

1. Dashboard -> taps calories card -> NutritionOverview
2. Workout -> WorkoutLibrary -> picks "HIIT" -> WorkoutDetail -> ActiveWorkout timer
3. Nutrition -> AddMeal -> logs "Protein Shake, 320 cal, Snack"
4. Home -> checks daily calorie burn vs intake
5. Profile -> HealthGoals -> edits step goal to 12,000

Mock data: High step counts (10k+), intense workouts, protein-heavy meals, ambitious goals.

### Sarah, 40 (Stress & Sleep management)

Primary tabs: Home (wellness links), Profile (medical), Nutrition.

1. Dashboard -> taps sleep widget -> SleepTracker
2. StressCheckin -> stress level 7 -> "anxious" mood -> breathing exercise
3. Meditation -> "10min Guided" -> starts session
4. SleepTracker -> LogSleep -> 11:30pm bedtime, 6:15am wake, 3 stars
5. Journal -> new entry about work stress
6. Profile -> Medical -> Medications -> checks Melatonin reminder

Mock data: Irregular sleep, moderate stress, 12-day meditation streak, one medication.

### Robert, 60 (Medical tracking)

Primary tabs: Profile (medical), Home.

1. Dashboard -> taps heart rate -> VitalsLog
2. Medical -> VitalsLog -> logs BP 138/85, HR 72, weight 185
3. Medical -> Medications -> reviews 3 meds -> toggles Lisinopril reminder
4. Medical -> Appointments -> Book Appointment -> Cardiologist, next Tuesday 10am
5. Profile -> PersonalInfo -> updates emergency contact

Mock data: 3-4 medications (Lisinopril, Metformin, Aspirin, Vitamin D), BP trending high, upcoming appointments, 5,000 step goal.

## Design System

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Background | #0D0D0D - #1A1A1A | All screen backgrounds |
| Cards | #1C1C1E - #2C2C2E | Content cards, sections |
| Primary Accent | #AAFF00 - #C8FF00 | FAB, progress rings, active tabs, highlights |
| Secondary Accent | #34FF8E / #00FFB3 | Nutrition streak, checkmarks, positive indicators |
| Tertiary Accent | #D9A8FF / #C78FFF | Training streak card |
| Calorie Ring | Green-to-yellow gradient | Donut chart progress |
| Carbs | #FFD700 | Carbs bar, calendar highlights |
| Proteins | #34C759 | Proteins bar |
| Fats | Yellow-green | Fats bar |
| Heart/Likes | #FF3B30 | Like icon |
| Text Primary | #FFFFFF | Headers, main values |
| Text Secondary | #8E8E93 - #AEAEB2 | Subtitles, labels |
| Text Tertiary | #636366 | Burned/goal subtext |

### Typography

- Large headers: Bold, 24-28pt
- Section headers: Semi-bold, 18-20pt
- Metric values: Bold, 28-36pt
- Metric units: Regular, 12-14pt
- Body/labels: Regular, 14-16pt
- Sub-labels: Regular, 11-12pt, gray
- Tab labels: Medium, 10-11pt
- Font: System (San Francisco)

### UI Patterns

- Card radius: 16px
- Card shadows: None (dark theme elevation via lighter bg)
- Progress rings: Donut style, gradient fills, center content
- FAB: Circular + with glowing neon green ring, raised above tab bar
- Tab bar: 4 items, icon + label, green active, dark bg
- Avatars: Circular, 36-44px
- Buttons: Pill-shaped with border (Follow), filled cards with arrow (Daily Plan)
- Overflow: Vertical three-dot menu
- Dividers: None, spacing used instead
- Icons: SF Symbols / Material filled style, consistent weight

### Charts & Data Viz

- Donut/Ring: Calorie tracking, green-to-yellow gradient, center stats
- Horizontal bars: Macro nutrients with current/goal labels
- Line charts: Vitals trends (BP, HR, weight)
- Bar charts: Weekly sleep/activity
- Calendar strip: Horizontal week view, circular day selectors
- Circular progress rings: Neon green for goals and FAB

## Technical Architecture

### Stack

- React Native + Expo (managed workflow)
- @react-navigation/native + bottom-tabs + native-stack
- react-native-svg (donut charts, rings, custom graphics)
- victory-native (bar/line charts)
- react-native-reanimated (animations)
- expo-linear-gradient (gradient fills)
- @expo/vector-icons (Ionicons/MaterialIcons)

### Project Structure

```
src/
  navigation/
    AppNavigator.tsx
    types.ts
  screens/
    home/DashboardScreen.tsx
    workout/WorkoutOverviewScreen.tsx
    workout/WorkoutLibraryScreen.tsx
    workout/WorkoutDetailScreen.tsx
    workout/ActiveWorkoutScreen.tsx
    nutrition/NutritionOverviewScreen.tsx
    nutrition/MealPlanScreen.tsx
    nutrition/AddMealScreen.tsx
    profile/ProfileScreen.tsx
    profile/PersonalInfoScreen.tsx
    profile/PreferencesScreen.tsx
    profile/HealthGoalsScreen.tsx
    profile/MedicalScreen.tsx
    profile/VitalsLogScreen.tsx
    profile/MedicationsScreen.tsx
    profile/AppointmentsScreen.tsx
    wellness/SleepTrackerScreen.tsx
    wellness/StressCheckinScreen.tsx
    wellness/MeditationScreen.tsx
    wellness/JournalScreen.tsx
  components/
    DonutChart.tsx
    MacroBar.tsx
    StreakCard.tsx
    MetricCard.tsx
    WeekCalendar.tsx
    FAB.tsx
    HealthScoreRing.tsx
    VitalsChart.tsx
    WorkoutTimer.tsx
  data/
    user.ts
    activity.ts
    nutrition.ts
    wellness.ts
    medical.ts
  context/
    AppContext.tsx
  theme/
    colors.ts
    typography.ts
    spacing.ts
  utils/
    mockDataGenerators.ts
```

### State Management

Single React Context with useReducer. State shape:

```
AppState {
  user: UserProfile
  activity: { workouts, steps, streaks }
  nutrition: { meals, dailyCalories, macros }
  wellness: { sleep, stress, meditation, journal }
  medical: { vitals, medications, appointments }
}
```

All data mocked locally. No persistence. State initializes from mock data files on app start. All mutations in-memory only.

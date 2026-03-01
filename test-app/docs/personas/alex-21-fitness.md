# Alex, 21 — Fitness-Focused Persona

## Profile

- **Age:** 21
- **Focus:** Fitness performance, nutrition optimization, social engagement
- **Primary tabs:** Workout, Nutrition, Home
- **Mindset:** Competitive, goal-driven, socially active. Wants to hit macros, crush workouts, and share progress with the community.

## Session Flow

### 1. Morning Check-In — Dashboard

**Screen:** `DashboardScreen`

1. Opens the app. Sees greeting: "Good Morning! Antony Thomas"
2. Scans the **Daily Nutrition** cards — checks calories (764 kcal), proteins (102g), carbs (95g)
3. Notices he's behind on protein for the day
4. Scrolls down to the **Cooking Community** section
5. Sees Emma Thomas's post about packed bowls
6. **Taps the community card** to browse more posts

### 2. Browse & Post in Community

**Screen:** `CommunityFeedScreen`

7. Scrolls through the feed — reads posts about meal prep, smoothie recipes, low-cal pasta alternatives
8. Sees Jake Wilson's post about a post-workout smoothie and mentally notes the recipe
9. **Taps the FAB** (green + button) to create a post
10. Compose area slides open at the top
11. Types: "Just hit a new deadlift PR! 285lbs. Fueling with chicken and rice tonight"
12. **Taps "Post"** — sees his post appear at the top of the feed
13. **Taps the back arrow** to return to Dashboard

### 3. Start a Workout

**Screen:** `WorkoutOverviewScreen` → `WorkoutLibraryScreen` → `WorkoutDetailScreen` → `ActiveWorkoutScreen`

14. Taps the **Workout tab** in the bottom bar
15. Sees the overview with streak cards — Training: 12 days, Nutrition: 12 days
16. Taps into **Workout Library**
17. Browses categories, selects **HIIT**
18. Reviews the workout detail — sees exercises, sets, reps, difficulty (Advanced)
19. **Taps "Start Workout"**
20. Active workout screen shows countdown timer, current exercise, next exercise preview
21. Works through the exercises using pause/resume controls
22. Completes the workout

### 4. Log Post-Workout Meal

**Screen:** `NutritionOverviewScreen` → `AddMealScreen`

23. Taps the **Nutrition tab**
24. Sees the donut chart — 764 / 1500 kcal consumed so far
25. Checks macro bars: carbs at 80/174g, proteins at 102/130g, fats at 45/65g
26. **Taps the FAB** to add a meal
27. Fills in the form:
    - Food Name: "Protein Shake"
    - Calories: 320
    - Carbs: 15g, Proteins: 45g, Fats: 5g
    - Meal Type: selects **Snack** pill
28. **Taps "Save Meal"** — meal is added to today's log

### 5. Review & Edit Meal Plan

**Screen:** `MealPlanScreen`

29. **Taps "View Meal Plan"** from the Nutrition overview
30. Sees today's meals: Oatmeal & Berries, Grilled Chicken Salad, Salmon & Vegetables, Protein Shake
31. Decides to swap dinner for something higher in protein
32. **Taps "Edit plan"** — button changes to "Done", edit controls appear
33. Sees red X buttons and "Swap" buttons on each meal
34. **Taps "Swap"** on Salmon & Vegetables
35. Alternatives expand below: Chicken Stir-Fry (480 kcal), Shrimp Tacos (440 kcal), Lean Beef & Sweet Potato (550 kcal)
36. **Taps "Lean Beef & Sweet Potato"** — meal swaps in (550 kcal, 44g protein)
37. Also decides to remove the morning oatmeal and replace with something higher protein
38. **Taps "Swap"** on Oatmeal & Berries
39. Alternatives: Greek Yogurt Parfait (280 kcal), Smoothie Bowl (350 kcal), Avocado Toast & Eggs (420 kcal)
40. **Taps "Avocado Toast & Eggs"** — swaps in (420 kcal, 20g protein)
41. **Taps "Done"** — exits edit mode, sees updated meal plan

### 6. Update Fitness Goals

**Screen:** `ProfileScreen` → `HealthGoalsScreen`

42. Taps the **Profile tab**
43. Sees profile summary: name, age, height, weight, blood type
44. Scrolls to settings, taps **Health Goals**
45. Sees goal cards with progress rings: steps (10,000), calories (1,500), sleep (8h), weight (175 lbs)
46. Edits step goal to **12,000** — ring adjusts
47. **Taps back** to Profile

### 7. Quick Community Check Before Bed

**Screen:** `DashboardScreen` → `CommunityFeedScreen`

48. Returns to **Home tab**
49. **Taps the community card** again
50. Scrolls feed to see if anyone liked or engaged with his earlier post
51. Reads a few new posts, bookmarks a recipe
52. Closes the app

## Key Actions Summary

| Action | Screen | Interaction |
|--------|--------|-------------|
| Browse community feed | CommunityFeedScreen | Scroll FlatList |
| Create a community post | CommunityFeedScreen | FAB → TextInput → Post button |
| Start a workout | ActiveWorkoutScreen | Navigate through library → Start |
| Log a meal | AddMealScreen | Fill form → Save |
| Swap a meal in plan | MealPlanScreen | Edit plan → Swap → Select alternative |
| Edit fitness goals | HealthGoalsScreen | Tap goal → Edit value |

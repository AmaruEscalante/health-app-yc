# Sarah, 40 — Stress & Sleep Management Persona

## Profile

- **Age:** 40s
- **Focus:** Stress reduction, sleep quality, mindfulness, balanced nutrition
- **Primary tabs:** Home (wellness links), Profile (medical), Nutrition
- **Mindset:** Overwhelmed by work-life balance. Uses the app to track sleep patterns, manage stress, meditate, and keep nutrition on track. Values the community for recipe ideas and wellness tips.

## Session Flow

### 1. Morning — Check Sleep Quality

**Screen:** `DashboardScreen` → `SleepTrackerScreen`

1. Opens the app. Sees greeting: "Good Morning! Antony Thomas"
2. Glances at the nutrition summary cards — not her primary concern right now
3. Scrolls down past the community section
4. Navigates to **SleepTracker** from the Dashboard
5. Reviews the weekly sleep bar chart — notices inconsistent sleep across the week
6. Checks last night's detail: bedtime 11:30pm, wake 6:15am, 6.75h total, quality 3/5
7. Notes she's under her 8h sleep goal again

### 2. Log Last Night's Sleep

**Screen:** `SleepTrackerScreen`

8. **Taps "Log Sleep"** to manually record
9. Fills in the form:
    - Bedtime: 11:30 PM
    - Wake time: 6:15 AM
    - Quality: 3 stars
10. **Saves the entry** — bar chart updates

### 3. Mid-Morning Stress Check-In

**Screen:** `StressCheckinScreen`

11. Navigates to **Stress Check-In**
12. Drags the **stress level slider to 7** — reflecting a heavy workload
13. Selects **"anxious"** from the mood selector
14. Sees the option for a breathing exercise
15. Notes she'll come back for meditation after lunch

### 4. Browse Community for Healthy Meal Ideas

**Screen:** `DashboardScreen` → `CommunityFeedScreen`

16. Returns to the **Home tab**
17. **Taps the Cooking Community card**
18. Scrolls through the feed
19. Reads Sofia Ramirez's post about zucchini noodles — "Only 200 cal per serving!"
20. Reads Ryan Brooks's tip about frozen banana ice cream — thinks of making it for her kids
21. **Taps the FAB** to share her own tip
22. Types: "Found that chamomile tea 30 min before bed really helps with sleep. Anyone else tried this?"
23. **Taps "Post"** — sees her post at the top
24. **Taps back** to Dashboard

### 5. Lunch — Review & Adjust Meal Plan

**Screen:** `NutritionOverviewScreen` → `MealPlanScreen`

25. Taps the **Nutrition tab**
26. Checks the donut chart — about half her calorie goal consumed
27. Reviews macro bars — protein is low
28. **Taps "View Meal Plan"**
29. Sees today's meals: Oatmeal & Berries, Grilled Chicken Salad, Salmon & Vegetables, Protein Shake
30. Wants a lighter dinner — Salmon & Vegetables at 520 kcal feels heavy
31. **Taps "Edit plan"**
32. **Taps "Swap"** on Salmon & Vegetables
33. Sees alternatives: Chicken Stir-Fry (480 kcal), Shrimp Tacos (440 kcal), Lean Beef & Sweet Potato (550 kcal)
34. **Taps "Shrimp Tacos"** — lighter option at 440 kcal
35. Also removes the Protein Shake — not her style
36. **Taps the red X** on Protein Shake — meal disappears from the list
37. **Taps "Done"** — exits edit mode

### 6. Afternoon Meditation Session

**Screen:** `MeditationScreen`

38. Navigates to **Meditation**
39. Sees her streak: 12 days of consistent meditation
40. Browses session options: 5min, 10min, 15min — guided and unguided
41. Selects **"10min Guided"**
42. Starts the session — breathing animation plays
43. Completes the session — streak maintained

### 7. Evening Journal Entry

**Screen:** `JournalScreen`

44. Navigates to **Journal**
45. Sees past entries listed with dates and mood tags
46. **Taps "New Entry"**
47. Writes about her day: work stress, the meditation helping, planning to get to bed earlier
48. Selects mood tags: **"tired"**, **"hopeful"**
49. **Saves the entry** — it appears at the top of the list

### 8. Check Medications Before Bed

**Screen:** `ProfileScreen` → `MedicalScreen` → `MedicationsScreen`

50. Taps the **Profile tab**
51. Taps **Medical**
52. Sees the medical hub: latest vitals, upcoming appointments, active medications count
53. Taps **Medications**
54. Reviews her medication list — checks Melatonin
55. **Toggles the reminder** for Melatonin to ON
56. Confirms reminders are set for her other medications
57. **Navigates back** to Profile

### 9. Update Sleep Preferences

**Screen:** `PreferencesScreen`

58. From Profile, taps **Preferences**
59. Ensures **Sleep Reminders** toggle is ON
60. Checks that Medication Alerts are ON
61. **Navigates back** — heads to bed

## Key Actions Summary

| Action | Screen | Interaction |
|--------|--------|-------------|
| Review sleep data | SleepTrackerScreen | View bar chart + detail |
| Log sleep | SleepTrackerScreen | Fill form → Save |
| Stress check-in | StressCheckinScreen | Slider + mood selector |
| Browse community feed | CommunityFeedScreen | Scroll, read posts |
| Post to community | CommunityFeedScreen | FAB → TextInput → Post |
| Swap a meal | MealPlanScreen | Edit plan → Swap → Select |
| Remove a meal | MealPlanScreen | Edit plan → Tap red X |
| Meditate | MeditationScreen | Select session → Start |
| Journal entry | JournalScreen | New Entry → Write → Save |
| Toggle med reminder | MedicationsScreen | Toggle switch |
| Update preferences | PreferencesScreen | Toggle switches |

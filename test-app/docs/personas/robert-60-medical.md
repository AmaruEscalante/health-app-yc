# Robert, 60 — Medical Tracking Persona

## Profile

- **Age:** 60s
- **Focus:** Blood pressure monitoring, medication management, doctor appointments, gentle nutrition
- **Primary tabs:** Profile (medical), Home
- **Mindset:** Health-conscious out of necessity. Managing hypertension and diabetes with multiple medications. Wants to track vitals reliably, never miss a dose, and keep his doctor informed. Browses the community casually for simple, heart-healthy recipes.

## Session Flow

### 1. Morning — Log Vitals

**Screen:** `DashboardScreen` → `ProfileScreen` → `MedicalScreen` → `VitalsLogScreen`

1. Opens the app. Sees greeting: "Good Morning! Antony Thomas"
2. Glances at nutrition cards — notes his calorie intake from yesterday
3. Taps the **Profile tab** — this is his primary hub
4. Taps **Medical** from the settings list
5. Sees the medical hub: latest vitals summary, 3 upcoming appointments, 4 active medications
6. Taps **Vitals Log**
7. Reviews the line charts — sees BP trending slightly high over the past week (systolic 135-142)
8. **Taps "Log Vitals"** to record this morning's readings
9. Fills in the form:
    - Systolic: 138
    - Diastolic: 85
    - Heart Rate: 72
    - Weight: 185 lbs
    - Notes: "Took reading after breakfast"
10. **Saves the entry** — charts update with the new data point

### 2. Review Medications

**Screen:** `MedicationsScreen`

11. **Navigates back** to Medical hub
12. Taps **Medications**
13. Reviews his 4 medications:
    - Lisinopril 10mg — daily — for blood pressure
    - Metformin 500mg — twice daily — for blood sugar
    - Aspirin 81mg — daily — heart health
    - Vitamin D 1000IU — daily — supplement
14. Checks that reminders are on for all medications
15. **Toggles Lisinopril reminder** OFF then ON again to confirm it's active
16. Verifies times are correct for each medication

### 3. Book a Doctor Appointment

**Screen:** `AppointmentsScreen`

17. **Navigates back** to Medical hub
18. Taps **Appointments**
19. Reviews upcoming appointments:
    - Dr. Smith (Cardiologist) — next week
    - Dr. Patel (Endocrinologist) — in two weeks
    - Dr. Lee (General) — next month
20. Wants to add a follow-up with his cardiologist
21. **Taps "Book Appointment"**
22. Fills in the form:
    - Doctor: Cardiologist
    - Date: next Tuesday
    - Time: 10:00 AM
    - Location: Heart Health Center
    - Reason: "Follow-up on BP readings"
23. **Confirms the booking** — appointment appears in the list

### 4. Browse Community for Heart-Healthy Ideas

**Screen:** `DashboardScreen` → `CommunityFeedScreen`

24. Taps the **Home tab** to return to Dashboard
25. Scrolls down to the **Cooking Community** section
26. **Taps the community card** to browse the feed
27. Reads Marcus Chen's post about grilled chicken and quinoa bowls — notes it's a good low-sodium option
28. Reads Sofia Ramirez's post about zucchini noodles — considers trying it
29. Reads Aisha Patel's salmon dinner post — salmon is good for heart health
30. **Taps the FAB** to share a tip
31. Types: "My doctor recommended reducing sodium. Found that lemon juice and herbs are a great replacement for salt in most dishes."
32. **Taps "Post"** — post appears at the top of the feed
33. Scrolls a bit more, then **taps back** to Dashboard

### 5. Review & Simplify Meal Plan

**Screen:** `NutritionOverviewScreen` → `MealPlanScreen`

34. Taps the **Nutrition tab**
35. Checks the donut chart — sees calorie intake for the day
36. Glances at macro bars — his doctor recommended moderate carbs
37. **Taps "View Meal Plan"**
38. Sees today's meals: Oatmeal & Berries, Grilled Chicken Salad, Salmon & Vegetables, Protein Shake
39. Protein shakes aren't his thing — wants to swap for something simpler
40. **Taps "Edit plan"**
41. **Taps "Swap"** on Protein Shake
42. Sees alternatives: Trail Mix (200 kcal), Apple & Peanut Butter (220 kcal), Greek Yogurt & Honey (160 kcal)
43. **Taps "Greek Yogurt & Honey"** — simple, low calorie, good for him
44. Also wants to swap breakfast for something lighter
45. **Taps "Swap"** on Oatmeal & Berries
46. Sees: Greek Yogurt Parfait (280 kcal), Smoothie Bowl (350 kcal), Avocado Toast & Eggs (420 kcal)
47. **Taps "Greek Yogurt Parfait"** — lighter at 280 kcal
48. **Taps "Done"** — sees updated meal plan with gentler options

### 6. Update Emergency Contact

**Screen:** `ProfileScreen` → `PersonalInfoScreen`

49. Taps the **Profile tab**
50. Taps **Personal Info**
51. Scrolls to the emergency contact section
52. Updates the emergency contact phone number — his daughter got a new number
53. **Saves the changes**
54. **Navigates back** to Profile

### 7. Evening — Check Vitals Trend

**Screen:** `MedicalScreen` → `VitalsLogScreen`

55. Before bed, opens the app one more time
56. Goes to **Profile → Medical → Vitals Log**
57. Reviews the BP chart for the past 30 days
58. Notes the trend: systolic has been between 132-142 this month
59. Checks heart rate trend — stable around 70-75 BPM
60. Checks weight trend — holding steady at 185
61. Makes a mental note to mention the slight BP uptick at his upcoming cardiologist visit

### 8. Check Preferences

**Screen:** `PreferencesScreen`

62. From Profile, taps **Preferences**
63. Ensures **Medication Alerts** are ON — critical for him
64. Ensures **Workout Reminders** are ON — his doctor recommended daily walks
65. **Navigates back** — closes the app

## Key Actions Summary

| Action | Screen | Interaction |
|--------|--------|-------------|
| Log vitals (BP, HR, weight) | VitalsLogScreen | Fill form → Save |
| Review vitals charts | VitalsLogScreen | Scroll line charts |
| Review medications | MedicationsScreen | Scroll list, check details |
| Toggle med reminder | MedicationsScreen | Toggle switch |
| Book appointment | AppointmentsScreen | Fill form → Confirm |
| Browse community feed | CommunityFeedScreen | Scroll, read posts |
| Post to community | CommunityFeedScreen | FAB → TextInput → Post |
| Swap a meal | MealPlanScreen | Edit plan → Swap → Select |
| Update emergency contact | PersonalInfoScreen | Edit form → Save |
| Check preferences | PreferencesScreen | Review toggle states |

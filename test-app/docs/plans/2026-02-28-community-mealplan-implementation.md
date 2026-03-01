# Community Posting & Meal Plan Editing — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a cooking community feed with text posts and meal plan edit mode (swap/remove meals).

**Architecture:** Two independent features sharing the same AppContext pattern. Community feed is a new screen in HomeStack with its own mock data file. Meal plan editing adds edit-mode state to the existing MealPlanScreen with swap alternatives from nutrition data.

**Tech Stack:** React Native (Expo), React Context + useReducer, @react-navigation/native-stack, Ionicons, existing theme tokens.

---

### Task 1: Add CommunityPost type and mock data

**Files:**
- Modify: `src/data/types.ts`
- Create: `src/data/community.ts`

**Step 1: Add CommunityPost interface to types.ts**

Add after the `Appointment` interface (line 127) and before `AppState`:

```typescript
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
```

Then add `community` to the `AppState` interface:

```typescript
export interface AppState {
  // ... existing fields ...
  community: {
    posts: CommunityPost[];
  };
}
```

**Step 2: Create mock community data**

Create `src/data/community.ts`:

```typescript
import { CommunityPost } from './types';

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'cp-1',
    author: 'Emma Thomas',
    avatarColor: '#FF6B6B',
    text: 'Just tried making overnight oats with chia seeds and mango. Game changer for busy mornings!',
    timestamp: '2h ago',
    likes: 42,
    comments: 8,
    liked: false,
  },
  {
    id: 'cp-2',
    author: 'Marcus Chen',
    avatarColor: '#4ECDC4',
    text: 'Anyone else meal prepping on Sundays? My grilled chicken and quinoa bowls last the whole week.',
    timestamp: '4h ago',
    likes: 67,
    comments: 15,
    liked: true,
  },
  {
    id: 'cp-3',
    author: 'Sofia Ramirez',
    avatarColor: '#FFE66D',
    text: 'Found a great low-cal substitute for pasta — zucchini noodles with pesto. Only 200 cal per serving!',
    timestamp: '6h ago',
    likes: 93,
    comments: 22,
    liked: false,
  },
  {
    id: 'cp-4',
    author: 'Jake Wilson',
    avatarColor: '#A8D86E',
    text: 'Post-workout smoothie recipe: banana, spinach, protein powder, almond milk. Simple and effective.',
    timestamp: '8h ago',
    likes: 31,
    comments: 5,
    liked: false,
  },
  {
    id: 'cp-5',
    author: 'Aisha Patel',
    avatarColor: '#D9A8FF',
    text: 'Hosting a dinner party tonight — making salmon with roasted vegetables and a lemon dill sauce. Wish me luck!',
    timestamp: '12h ago',
    likes: 55,
    comments: 11,
    liked: true,
  },
  {
    id: 'cp-6',
    author: 'Ryan Brooks',
    avatarColor: '#34C759',
    text: 'Tip: freeze ripe bananas and blend them for instant healthy ice cream. My kids love it.',
    timestamp: '1d ago',
    likes: 120,
    comments: 28,
    liked: false,
  },
];
```

**Step 3: Verify the app still compiles**

Run: `cd /Users/amaru-mac/Documents/hackathons/yc-browser-use/e2e-app-test/test-app && npx expo start --web` (quick check, then Ctrl+C)

**Step 4: Commit**

```bash
git add src/data/types.ts src/data/community.ts
git commit -m "feat: add CommunityPost type and mock data"
```

---

### Task 2: Add community state and ADD_COMMUNITY_POST action to AppContext

**Files:**
- Modify: `src/context/AppContext.tsx`

**Step 1: Import mock community data and CommunityPost type**

At the top of `AppContext.tsx`, add `CommunityPost` to the types import and import mock data:

```typescript
import { AppState, Meal, VitalReading, Medication, Appointment, SleepLog, StressEntry, JournalEntry, CommunityPost } from '../data/types';
import { mockCommunityPosts } from '../data/community';
```

**Step 2: Add community to initialState**

Add after the `medical` block in `initialState` (after line 31):

```typescript
community: {
  posts: mockCommunityPosts,
},
```

**Step 3: Add ADD_COMMUNITY_POST to Action type**

Add to the Action union type:

```typescript
| { type: 'ADD_COMMUNITY_POST'; payload: CommunityPost }
```

**Step 4: Add reducer case**

Add before the `default` case in `appReducer`:

```typescript
case 'ADD_COMMUNITY_POST':
  return {
    ...state,
    community: {
      ...state.community,
      posts: [action.payload, ...state.community.posts],
    },
  };
```

**Step 5: Commit**

```bash
git add src/context/AppContext.tsx
git commit -m "feat: add community state and ADD_COMMUNITY_POST action"
```

---

### Task 3: Add REMOVE_MEAL and SWAP_MEAL actions to AppContext

**Files:**
- Modify: `src/context/AppContext.tsx`

**Step 1: Add actions to Action type**

Add to the Action union:

```typescript
| { type: 'REMOVE_MEAL'; payload: { mealId: string } }
| { type: 'SWAP_MEAL'; payload: { oldMealId: string; newMeal: Meal } }
```

**Step 2: Add reducer cases**

Add before the `default` case:

```typescript
case 'REMOVE_MEAL': {
  const todayLog = state.nutrition.dailyLog[state.nutrition.dailyLog.length - 1];
  const removedMeal = todayLog.meals.find(m => m.id === action.payload.mealId);
  const updatedLog = {
    ...todayLog,
    meals: todayLog.meals.filter(m => m.id !== action.payload.mealId),
    totalCalories: todayLog.totalCalories - (removedMeal?.calories ?? 0),
  };
  return {
    ...state,
    nutrition: {
      ...state.nutrition,
      dailyLog: [...state.nutrition.dailyLog.slice(0, -1), updatedLog],
    },
  };
}
case 'SWAP_MEAL': {
  const todayLog = state.nutrition.dailyLog[state.nutrition.dailyLog.length - 1];
  const oldMeal = todayLog.meals.find(m => m.id === action.payload.oldMealId);
  const updatedLog = {
    ...todayLog,
    meals: todayLog.meals.map(m =>
      m.id === action.payload.oldMealId ? action.payload.newMeal : m
    ),
    totalCalories: todayLog.totalCalories - (oldMeal?.calories ?? 0) + action.payload.newMeal.calories,
  };
  return {
    ...state,
    nutrition: {
      ...state.nutrition,
      dailyLog: [...state.nutrition.dailyLog.slice(0, -1), updatedLog],
    },
  };
}
```

**Step 3: Commit**

```bash
git add src/context/AppContext.tsx
git commit -m "feat: add REMOVE_MEAL and SWAP_MEAL reducer actions"
```

---

### Task 4: Add meal alternatives data

**Files:**
- Modify: `src/data/nutrition.ts`

**Step 1: Add mealAlternatives export**

Add after the `mockNutritionHistory` export:

```typescript
export const mealAlternatives: Record<string, Meal[]> = {
  Breakfast: [
    { id: 'alt-b1', name: 'Greek Yogurt Parfait', calories: 280, carbs: 35, proteins: 18, fats: 8, mealType: 'Breakfast', time: '08:00', date: '' },
    { id: 'alt-b2', name: 'Smoothie Bowl', calories: 350, carbs: 50, proteins: 14, fats: 10, mealType: 'Breakfast', time: '08:00', date: '' },
    { id: 'alt-b3', name: 'Avocado Toast & Eggs', calories: 420, carbs: 30, proteins: 20, fats: 24, mealType: 'Breakfast', time: '08:00', date: '' },
  ],
  Lunch: [
    { id: 'alt-l1', name: 'Turkey Wrap', calories: 450, carbs: 35, proteins: 32, fats: 18, mealType: 'Lunch', time: '12:30', date: '' },
    { id: 'alt-l2', name: 'Quinoa Buddha Bowl', calories: 520, carbs: 55, proteins: 22, fats: 20, mealType: 'Lunch', time: '12:30', date: '' },
    { id: 'alt-l3', name: 'Tuna Poke Bowl', calories: 460, carbs: 40, proteins: 35, fats: 14, mealType: 'Lunch', time: '12:30', date: '' },
  ],
  Dinner: [
    { id: 'alt-d1', name: 'Chicken Stir-Fry', calories: 480, carbs: 35, proteins: 40, fats: 16, mealType: 'Dinner', time: '19:00', date: '' },
    { id: 'alt-d2', name: 'Shrimp Tacos', calories: 440, carbs: 38, proteins: 30, fats: 18, mealType: 'Dinner', time: '19:00', date: '' },
    { id: 'alt-d3', name: 'Lean Beef & Sweet Potato', calories: 550, carbs: 42, proteins: 44, fats: 20, mealType: 'Dinner', time: '19:00', date: '' },
  ],
  Snack: [
    { id: 'alt-s1', name: 'Trail Mix', calories: 200, carbs: 18, proteins: 6, fats: 14, mealType: 'Snack', time: '16:00', date: '' },
    { id: 'alt-s2', name: 'Apple & Peanut Butter', calories: 220, carbs: 25, proteins: 8, fats: 12, mealType: 'Snack', time: '16:00', date: '' },
    { id: 'alt-s3', name: 'Greek Yogurt & Honey', calories: 160, carbs: 20, proteins: 14, fats: 4, mealType: 'Snack', time: '16:00', date: '' },
  ],
};
```

**Step 2: Commit**

```bash
git add src/data/nutrition.ts
git commit -m "feat: add meal alternatives for swap feature"
```

---

### Task 5: Add CommunityFeed to navigation

**Files:**
- Modify: `src/navigation/types.ts`
- Modify: `src/navigation/AppNavigator.tsx`

**Step 1: Add CommunityFeed to HomeStackParamList**

In `src/navigation/types.ts`, add to `HomeStackParamList`:

```typescript
export type HomeStackParamList = {
  Dashboard: undefined;
  CommunityFeed: undefined;   // <-- add this
  SleepTracker: undefined;
  StressCheckin: undefined;
  Meditation: undefined;
  Journal: undefined;
};
```

**Step 2: Import and register CommunityFeedScreen in AppNavigator**

In `src/navigation/AppNavigator.tsx`, add the import:

```typescript
import { CommunityFeedScreen } from '../screens/home/CommunityFeedScreen';
```

Add the screen inside `HomeStackNavigator`, after the Dashboard screen:

```typescript
<HomeStack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
```

**Step 3: Commit**

```bash
git add src/navigation/types.ts src/navigation/AppNavigator.tsx
git commit -m "feat: register CommunityFeed in HomeStack navigation"
```

---

### Task 6: Create CommunityFeedScreen

**Files:**
- Create: `src/screens/home/CommunityFeedScreen.tsx`

**Step 1: Create the full screen component**

Create `src/screens/home/CommunityFeedScreen.tsx`:

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { FAB } from '../../components/FAB';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function CommunityFeedScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const [composing, setComposing] = useState(false);
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (!postText.trim()) return;
    dispatch({
      type: 'ADD_COMMUNITY_POST',
      payload: {
        id: `cp-${Date.now()}`,
        author: state.user.name,
        avatarColor: '#C8FF00',
        text: postText.trim(),
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        liked: false,
      },
    });
    setPostText('');
    setComposing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cooking Community</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Compose Area */}
        {composing && (
          <View style={styles.composeArea}>
            <TextInput
              style={styles.composeInput}
              placeholder="Share something with the community..."
              placeholderTextColor={colors.text.tertiary}
              value={postText}
              onChangeText={setPostText}
              multiline
              autoFocus
            />
            <View style={styles.composeActions}>
              <TouchableOpacity onPress={() => { setComposing(false); setPostText(''); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!postText.trim()}
              >
                <Text style={[styles.postButtonText, !postText.trim() && styles.postButtonTextDisabled]}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Feed */}
        <FlatList
          data={state.community.posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={[styles.avatarCircle, { backgroundColor: item.avatarColor }]}>
                  <Text style={styles.avatarLetter}>{item.author[0]}</Text>
                </View>
                <View style={styles.postHeaderText}>
                  <Text style={styles.authorName}>{item.author}</Text>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{item.text}</Text>
              <View style={styles.engagementRow}>
                <View style={styles.engagementLeft}>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons
                      name={item.liked ? 'heart' : 'heart-outline'}
                      size={18}
                      color={item.liked ? colors.semantic.heart : colors.text.secondary}
                    />
                    <Text style={styles.engagementText}>{item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons name="chatbubble-outline" size={16} color={colors.text.secondary} />
                    <Text style={styles.engagementText}>{item.comments}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={18} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>

      {!composing && <FAB onPress={() => setComposing(true)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },

  // Compose
  composeArea: {
    backgroundColor: colors.card.primary,
    marginHorizontal: spacing.screenPadding,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  composeInput: {
    ...typography.body,
    color: colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  composeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  postButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  postButtonDisabled: {
    opacity: 0.4,
  },
  postButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '600',
  },
  postButtonTextDisabled: {
    opacity: 0.6,
  },

  // Feed
  feedContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarLetter: {
    ...typography.body,
    fontWeight: '700',
    color: colors.background.primary,
  },
  postHeaderText: {
    flex: 1,
  },
  authorName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  timestamp: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
  postText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  engagementText: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
});
```

**Step 2: Verify the screen renders**

Run the app and navigate from Dashboard → Cooking Community card. Verify:
- Feed of 6 mock posts renders
- FAB appears at bottom
- Tapping FAB shows compose area
- Typing and posting prepends a new card

**Step 3: Commit**

```bash
git add src/screens/home/CommunityFeedScreen.tsx
git commit -m "feat: create CommunityFeedScreen with feed and compose"
```

---

### Task 7: Make Dashboard community card tappable

**Files:**
- Modify: `src/screens/home/DashboardScreen.tsx`

**Step 1: Import useNavigation and type**

Add to existing imports:

```typescript
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/types';
```

**Step 2: Get navigation in the component**

Add inside `DashboardScreen`, after `const { state } = useApp();`:

```typescript
const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
```

**Step 3: Wrap the community card in TouchableOpacity**

Replace the `{/* Community Card */}` View wrapper (`<View style={styles.communityCard}>`) with:

```typescript
<TouchableOpacity
  style={styles.communityCard}
  activeOpacity={0.8}
  onPress={() => navigation.navigate('CommunityFeed')}
>
```

And change the matching closing `</View>` to `</TouchableOpacity>`.

**Step 4: Verify navigation works**

Tap the community card on Dashboard. It should navigate to CommunityFeedScreen.

**Step 5: Commit**

```bash
git add src/screens/home/DashboardScreen.tsx
git commit -m "feat: make Dashboard community card navigate to CommunityFeed"
```

---

### Task 8: Add edit mode to MealPlanScreen (swap & remove)

**Files:**
- Modify: `src/screens/nutrition/MealPlanScreen.tsx`

**Step 1: Import mealAlternatives and add state**

Add to imports:

```typescript
import { mealAlternatives } from '../../data/nutrition';
import { Meal } from '../../data/types';
```

**Step 2: Add state variables inside the component**

Add after the `today` variable:

```typescript
const { dispatch } = useApp();  // update the existing destructure to include dispatch
const [editing, setEditing] = useState(false);
const [swappingMealId, setSwappingMealId] = useState<string | null>(null);
```

Add `useState` to the React import.

**Step 3: Update the "Edit plan" button**

Replace the existing `editPlanButton` TouchableOpacity (lines 46-56) with:

```typescript
<TouchableOpacity
  style={styles.editPlanButton}
  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
  onPress={() => { setEditing(!editing); setSwappingMealId(null); }}
>
  <Ionicons
    name={editing ? 'checkmark-outline' : 'pencil-outline'}
    size={16}
    color={colors.accent.primary}
  />
  <Text style={styles.editPlanText}>{editing ? 'Done' : 'Edit plan'}</Text>
</TouchableOpacity>
```

**Step 4: Update the meal list rendering**

Replace the meal map block (lines 81-109) with:

```typescript
{today.meals.map((meal) => (
  <View key={meal.id}>
    <View style={styles.mealRow}>
      {editing ? (
        <TouchableOpacity
          onPress={() => dispatch({ type: 'REMOVE_MEAL', payload: { mealId: meal.id } })}
        >
          <Ionicons name="close-circle" size={24} color={colors.semantic.heart} />
        </TouchableOpacity>
      ) : (
        <Ionicons name="checkmark-circle" size={24} color={colors.macro.proteins} />
      )}
      <View style={styles.mealInfo}>
        <Text style={styles.mealTime}>{meal.time}</Text>
        <Text style={styles.mealName}>{meal.name}</Text>
      </View>
      {editing ? (
        <TouchableOpacity
          style={styles.swapButton}
          onPress={() => setSwappingMealId(swappingMealId === meal.id ? null : meal.id)}
        >
          <Ionicons name="swap-horizontal" size={16} color={colors.accent.primary} />
          <Text style={styles.swapButtonText}>Swap</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.mealCalorieSection}>
          <Text style={styles.mealCalories}>
            {meal.calories}{' '}
            <Text style={styles.mealCalorieUnit}>kcal</Text>
          </Text>
          <View
            style={[
              styles.mealTypeDot,
              { backgroundColor: MEAL_TYPE_COLORS[meal.mealType] || colors.text.secondary },
            ]}
          />
        </View>
      )}
    </View>
    {editing && swappingMealId === meal.id && (
      <View style={styles.alternativesContainer}>
        {(mealAlternatives[meal.mealType] || []).map((alt) => (
          <TouchableOpacity
            key={alt.id}
            style={styles.alternativeRow}
            onPress={() => {
              const swapMeal = { ...alt, id: meal.id, date: meal.date, time: meal.time };
              dispatch({ type: 'SWAP_MEAL', payload: { oldMealId: meal.id, newMeal: swapMeal } });
              setSwappingMealId(null);
            }}
          >
            <View style={styles.alternativeInfo}>
              <Text style={styles.alternativeName}>{alt.name}</Text>
              <Text style={styles.alternativeCalories}>{alt.calories} kcal</Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={20} color={colors.accent.primary} />
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
))}
```

**Step 5: Add new styles**

Add to the `StyleSheet.create` block:

```typescript
swapButton: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.xs,
  backgroundColor: colors.card.secondary,
  borderRadius: 12,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
},
swapButtonText: {
  ...typography.subLabel,
  color: colors.accent.primary,
  fontWeight: '600',
},
alternativesContainer: {
  marginLeft: spacing.xl,
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
  gap: spacing.xs,
},
alternativeRow: {
  backgroundColor: colors.card.secondary,
  borderRadius: 12,
  padding: spacing.sm,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
alternativeInfo: {
  flex: 1,
},
alternativeName: {
  ...typography.body,
  color: colors.text.primary,
  fontWeight: '500',
},
alternativeCalories: {
  ...typography.subLabel,
  color: colors.text.secondary,
},
```

**Step 6: Verify edit mode works**

1. Navigate to MealPlan screen
2. Tap "Edit plan" — button changes to "Done", red X icons appear on meals, "Swap" buttons appear
3. Tap "Swap" on a meal — alternatives expand below
4. Tap an alternative — meal is replaced
5. Tap red X on a meal — meal is removed
6. Tap "Done" — returns to normal view

**Step 7: Commit**

```bash
git add src/screens/nutrition/MealPlanScreen.tsx
git commit -m "feat: add edit mode to MealPlanScreen with swap and remove"
```

---

### Task 9: Final verification

**Step 1: Run the full app and test both features end-to-end**

- Dashboard → tap community card → feed loads → FAB → compose → post appears at top
- Nutrition → View Meal Plan → Edit plan → remove a meal → swap a meal → Done
- Verify no console errors

**Step 2: Commit any fixes if needed**

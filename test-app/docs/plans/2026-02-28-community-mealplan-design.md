# Community Posting & Meal Plan Editing — Design

## Overview

Two new features for the health & wellness app:
1. **Cooking Community Feed** — a social feed of text posts, accessible from the Dashboard, where users can read and create posts.
2. **Meal Plan Editing** — edit mode on the existing MealPlanScreen allowing users to swap or remove meals.

## Feature 1: Cooking Community Feed

### Navigation

- New `CommunityFeed` screen added to `HomeStackNavigator`.
- The existing "Cooking Community" card on `DashboardScreen` becomes tappable and navigates to `CommunityFeed`.

### Data Model

```typescript
interface CommunityPost {
  id: string;
  author: string;
  avatarColor: string;  // colored circle placeholder
  text: string;
  timestamp: string;    // relative, e.g. "2h ago"
  likes: number;
  comments: number;
  liked: boolean;
}
```

### State

- Add `community: { posts: CommunityPost[] }` to `AppState`.
- New action: `ADD_COMMUNITY_POST` — prepends a new post to the list.
- ~5-6 seed posts in `src/data/community.ts`.

### New Files

- `src/data/community.ts` — mock posts and type definitions.
- `src/screens/home/CommunityFeedScreen.tsx` — feed screen with inline compose.

### Screen Layout

- Header: back arrow + "Cooking Community" title.
- Scrollable feed of post cards (avatar circle, author name, timestamp, text body, like/comment counts).
- FAB at bottom-right opens an inline text input area at the top of the feed.
- "Post" button submits and prepends to feed.

## Feature 2: Meal Plan Editing

### Modified Files

- `src/screens/nutrition/MealPlanScreen.tsx` — add edit mode with swap/remove.
- `src/data/nutrition.ts` — add alternative meals data.
- `src/context/AppContext.tsx` — add `REMOVE_MEAL` and `SWAP_MEAL` actions.
- `src/data/types.ts` — add types if needed.

### Edit Mode Behavior

- "Edit plan" button toggles edit mode (text changes to "Done").
- In edit mode, each meal card shows:
  - Red X button on the left to remove the meal.
  - "Swap" button on the right.
- Tapping "Swap" reveals 2-3 alternative meals below the card (same meal type).
- Tapping an alternative replaces the original meal.
- Tapping "Done" exits edit mode.

### Mock Alternatives Data

~2-3 alternatives per meal type in `src/data/nutrition.ts`:

```typescript
const mealAlternatives: Record<MealType, Meal[]> = {
  breakfast: [{ name: 'Greek Yogurt Parfait', ... }, { name: 'Smoothie Bowl', ... }],
  lunch: [...],
  dinner: [...],
  snack: [...],
}
```

### New Reducer Actions

- `REMOVE_MEAL` — `{ type: 'REMOVE_MEAL', payload: { mealId: string } }` — removes from today's meals.
- `SWAP_MEAL` — `{ type: 'SWAP_MEAL', payload: { oldMealId: string, newMeal: Meal } }` — replaces one meal with another.

## Approach Rationale

- **Inline compose over separate screen**: Text-only posts don't warrant a dedicated compose screen.
- **Edit mode toggle over separate screen**: Keeps user in context, less navigation overhead.
- **Button-based swap/remove over gestures**: More discoverable and testable by AI agents (the app's primary purpose).

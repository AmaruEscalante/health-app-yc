import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const MEAL_TYPE_COLORS: Record<string, string> = {
  Breakfast: colors.macro.carbs,
  Lunch: colors.macro.proteins,
  Dinner: colors.accent.tertiary,
  Snack: colors.macro.fats,
};

export function MealPlanScreen() {
  const { state } = useApp();
  const navigation = useNavigation<any>();

  const today =
    state.nutrition.dailyLog[state.nutrition.dailyLog.length - 1];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Meal</Text>
        <TouchableOpacity
          style={styles.editPlanButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name="pencil-outline"
            size={16}
            color={colors.accent.primary}
          />
          <Text style={styles.editPlanText}>Edit plan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Motivational card */}
        <View style={styles.motivationalCard}>
          <Text style={styles.motivationalText}>
            It's time to customize your Grocery list & Recipes
          </Text>
          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={colors.text.secondary}
            />
            <Text style={styles.dateText}>Nov 26 - Nov 20</Text>
          </View>
        </View>

        {/* Meal list */}
        <View style={styles.mealListContainer}>
          {today.meals.map((meal) => (
            <View key={meal.id} style={styles.mealRow}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={colors.macro.proteins}
              />
              <View style={styles.mealInfo}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealName}>{meal.name}</Text>
              </View>
              <View style={styles.mealCalorieSection}>
                <Text style={styles.mealCalories}>
                  {meal.calories}{' '}
                  <Text style={styles.mealCalorieUnit}>kcal</Text>
                </Text>
                <View
                  style={[
                    styles.mealTypeDot,
                    {
                      backgroundColor:
                        MEAL_TYPE_COLORS[meal.mealType] ||
                        colors.text.secondary,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Grocery list row */}
        <TouchableOpacity style={styles.groceryRow} activeOpacity={0.7}>
          <View style={styles.groceryContent}>
            <Ionicons
              name="cart-outline"
              size={22}
              color={colors.accent.primary}
            />
            <Text style={styles.groceryText}>Grocery list</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
  editPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  editPlanText: {
    ...typography.body,
    color: colors.accent.primary,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  motivationalCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  motivationalText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateText: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  mealListContainer: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  mealRow: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  mealInfo: {
    flex: 1,
  },
  mealTime: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  mealName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  mealCalorieSection: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  mealCalories: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  mealCalorieUnit: {
    ...typography.subLabel,
    color: colors.text.secondary,
    fontWeight: '400',
  },
  mealTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  groceryRow: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groceryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  groceryText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
});

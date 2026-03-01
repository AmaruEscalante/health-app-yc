import React, { useState } from 'react';
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
import { DonutChart } from '../../components/DonutChart';
import { MacroBar } from '../../components/MacroBar';
import { WeekCalendar } from '../../components/WeekCalendar';
import { FAB } from '../../components/FAB';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function NutritionOverviewScreen() {
  const { state } = useApp();
  const navigation = useNavigation<any>();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

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
        <Text style={styles.headerTitle}>Nutrition</Text>
        <TouchableOpacity
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={22}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Week calendar */}
        <WeekCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Main content row */}
        <View style={styles.mainRow}>
          {/* Donut chart */}
          <DonutChart
            progress={today.totalCalories / today.goalCalories}
            centerValue={today.totalCalories.toString()}
            centerLabel={`Day ${state.nutrition.currentDay}`}
            goalLabel={`${today.goalCalories} Kcal`}
            size={160}
          />

          {/* Macro bars */}
          <View style={styles.macroColumn}>
            <MacroBar
              label="Carbs"
              current={today.carbs.current}
              goal={today.carbs.goal}
              color={colors.macro.carbs}
            />
            <MacroBar
              label="Proteins"
              current={today.proteins.current}
              goal={today.proteins.goal}
              color={colors.macro.proteins}
            />
            <MacroBar
              label="Fats"
              current={today.fats.current}
              goal={today.fats.goal}
              color={colors.macro.fats}
            />
          </View>
        </View>

        {/* Check calories card */}
        <TouchableOpacity style={styles.checkCaloriesCard} activeOpacity={0.7}>
          <View style={styles.checkCaloriesContent}>
            <View>
              <Text style={styles.checkCaloriesTitle}>Check calories</Text>
              <Text style={styles.checkCaloriesSubtitle}>
                Scan your food to track nutrition
              </Text>
            </View>
            <Ionicons
              name="camera-outline"
              size={28}
              color={colors.accent.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Meal plan link */}
        <TouchableOpacity
          style={styles.mealPlanButton}
          onPress={() => navigation.navigate('MealPlan')}
          activeOpacity={0.7}
        >
          <View style={styles.mealPlanContent}>
            <Ionicons
              name="restaurant-outline"
              size={20}
              color={colors.accent.primary}
            />
            <Text style={styles.mealPlanText}>View Meal Plan</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* FAB */}
      <FAB onPress={() => navigation.navigate('AddMeal')} />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  macroColumn: {
    flex: 1,
  },
  checkCaloriesCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  checkCaloriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCaloriesTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  checkCaloriesSubtitle: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  mealPlanButton: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  mealPlanContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mealPlanText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
});

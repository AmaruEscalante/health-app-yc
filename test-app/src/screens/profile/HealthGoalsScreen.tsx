import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { HealthScoreRing } from '../../components/HealthScoreRing';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function HealthGoalsScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const { user, activity, nutrition, wellness } = state;

  // Compute current values
  const currentSteps =
    activity.stepHistory.length > 0
      ? activity.stepHistory[activity.stepHistory.length - 1].steps
      : 0;

  const todayNutrition =
    nutrition.dailyLog.length > 0
      ? nutrition.dailyLog[nutrition.dailyLog.length - 1].totalCalories
      : 0;

  const currentSleep =
    wellness.sleepLogs.length > 0
      ? wellness.sleepLogs[wellness.sleepLogs.length - 1].totalHours
      : 0;

  const currentWeight = user.weight;

  // Editable targets
  const [stepsTarget, setStepsTarget] = useState(String(user.goals.steps));
  const [caloriesTarget, setCaloriesTarget] = useState(String(user.goals.calories));
  const [sleepTarget, setSleepTarget] = useState(String(user.goals.sleepHours));
  const [weightTarget, setWeightTarget] = useState(String(user.goals.targetWeight));

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_GOALS',
      payload: {
        steps: Number(stepsTarget),
        calories: Number(caloriesTarget),
        sleepHours: Number(sleepTarget),
        targetWeight: Number(weightTarget),
      },
    });
    navigation.goBack();
  };

  const goals = [
    {
      name: 'Daily Steps',
      current: currentSteps,
      target: Number(stepsTarget) || 1,
      value: stepsTarget,
      onChangeText: setStepsTarget,
      unit: 'steps',
    },
    {
      name: 'Daily Calories',
      current: todayNutrition,
      target: Number(caloriesTarget) || 1,
      value: caloriesTarget,
      onChangeText: setCaloriesTarget,
      unit: 'kcal',
    },
    {
      name: 'Sleep Hours',
      current: currentSleep,
      target: Number(sleepTarget) || 1,
      value: sleepTarget,
      onChangeText: setSleepTarget,
      unit: 'hrs',
    },
    {
      name: 'Target Weight',
      current: currentWeight,
      target: Number(weightTarget) || 1,
      value: weightTarget,
      onChangeText: setWeightTarget,
      unit: 'lbs',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Goals</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Goal Cards */}
        {goals.map((goal) => {
          const progress = Math.min(goal.current / goal.target, 1);
          return (
            <View key={goal.name} style={styles.goalCard}>
              <HealthScoreRing progress={progress} size={64} label={goal.name} />
              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalCurrent}>
                  {goal.current} {goal.unit}
                </Text>
                <View style={styles.targetRow}>
                  <Text style={styles.targetLabel}>Target:</Text>
                  <TextInput
                    style={styles.targetInput}
                    value={goal.value}
                    onChangeText={goal.onChangeText}
                    keyboardType="numeric"
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Save */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  goalCurrent: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  targetLabel: {
    ...typography.subLabel,
    color: colors.text.secondaryDim,
  },
  targetInput: {
    flex: 1,
    backgroundColor: colors.card.secondary,
    color: colors.text.primary,
    height: 36,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    ...typography.body,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
  },
});

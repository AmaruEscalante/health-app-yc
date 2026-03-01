import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Exercise, Workout } from '../../data/types';

const difficultyColors: Record<Workout['difficulty'], string> = {
  Beginner: '#34C759',
  Intermediate: '#FFD60A',
  Advanced: '#FF3B30',
};

function formatExerciseDetail(exercise: Exercise): string {
  if (exercise.sets && exercise.reps) {
    return `${exercise.sets} sets x ${exercise.reps} reps`;
  }
  if (exercise.durationSec) {
    const mins = Math.floor(exercise.durationSec / 60);
    const secs = exercise.durationSec % 60;
    if (mins > 0 && secs > 0) return `${mins}m ${secs}s`;
    if (mins > 0) return `${mins} min`;
    return `${secs}s`;
  }
  return '';
}

export function WorkoutDetailScreen() {
  const { state } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { workoutId } = route.params as { workoutId: string };

  const workout = state.activity.workouts.find((w) => w.id === workoutId);

  if (!workout) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>Workout not found.</Text>
      </SafeAreaView>
    );
  }

  const diffColor = difficultyColors[workout.difficulty];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {workout.name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Difficulty Badge */}
        <View style={[styles.difficultyBadge, { backgroundColor: diffColor + '22' }]}>
          <Text style={[styles.difficultyText, { color: diffColor }]}>
            {workout.difficulty}
          </Text>
        </View>

        {/* Duration */}
        <View style={styles.durationRow}>
          <Ionicons name="time-outline" size={18} color={colors.text.secondary} />
          <Text style={styles.durationText}>{workout.durationMin} min</Text>
        </View>

        {/* Exercises */}
        <Text style={styles.sectionHeader}>Exercises</Text>
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseRow}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetail}>
                {formatExerciseDetail(exercise)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Start Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ActiveWorkout', { workoutId: workout.id })}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
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
    ...typography.largeHeader,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.screenPadding,
    paddingBottom: 100,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: spacing.md,
  },
  difficultyText: {
    ...typography.subLabel,
    fontWeight: '700',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.lg,
  },
  durationText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  sectionHeader: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  exerciseNumberText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  exerciseDetail: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  errorText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  bottomBar: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.lg,
  },
  startButton: {
    backgroundColor: colors.accent.primary,
    height: 50,
    borderRadius: spacing.cardRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});

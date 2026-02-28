import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Exercise } from '../data/types';

interface WorkoutTimerProps {
  exercises: Exercise[];
  onComplete: () => void;
}

export function WorkoutTimer({ exercises, onComplete }: WorkoutTimerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentExercise = exercises[currentIndex];
  const nextExercise = exercises[currentIndex + 1];

  const getExerciseDuration = useCallback((exercise: Exercise) => {
    return exercise.durationSec || (exercise.sets || 1) * (exercise.reps || 10) * 3;
  }, []);

  useEffect(() => {
    if (currentExercise) {
      setTimeLeft(getExerciseDuration(currentExercise));
    }
  }, [currentIndex, currentExercise, getExerciseDuration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentIndex < exercises.length - 1) {
            setCurrentIndex((i) => i + 1);
          } else {
            onComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, timeLeft, currentIndex, exercises.length, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentExercise) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseLabel}>CURRENT EXERCISE</Text>
      <Text style={styles.exerciseName}>{currentExercise.name}</Text>

      {currentExercise.sets && (
        <Text style={styles.setsReps}>
          {currentExercise.sets} sets x {currentExercise.reps} reps
        </Text>
      )}

      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

      {nextExercise && (
        <View style={styles.nextContainer}>
          <Text style={styles.nextLabel}>NEXT UP</Text>
          <Text style={styles.nextName}>{nextExercise.name}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Ionicons
            name={isPaused ? 'play' : 'pause'}
            size={28}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.stopButton]}
          onPress={onComplete}
        >
          <Ionicons name="stop" size={28} color={colors.semantic.heart} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentIndex + 1) / exercises.length) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentIndex + 1} / {exercises.length} exercises
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  exerciseLabel: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  exerciseName: {
    ...typography.largeHeader,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  setsReps: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  timer: {
    fontSize: 72,
    fontWeight: '200',
    color: colors.accent.primary,
    marginBottom: spacing.xl,
    fontVariant: ['tabular-nums'],
  },
  nextContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  nextLabel: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    letterSpacing: 1,
  },
  nextName: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    borderColor: colors.semantic.heart,
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: colors.card.secondary,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.accent.primary,
    borderRadius: 2,
  },
  progressText: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
});

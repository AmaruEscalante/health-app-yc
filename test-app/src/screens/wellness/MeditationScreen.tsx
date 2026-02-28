import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const SESSION_OPTIONS = [5, 10, 15];

export function MeditationScreen() {
  const navigation = useNavigation();
  const { state } = useApp();
  const { meditationSessions, meditationStreak } = state.wellness;

  const [selectedType, setSelectedType] = useState<Record<number, 'guided' | 'unguided'>>({
    5: 'guided',
    10: 'guided',
    15: 'guided',
  });
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Last 7 days session check
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
  const sessionDates = new Set(meditationSessions.map((s) => s.date));

  useEffect(() => {
    if (timerActive && !timerPaused && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive, timerPaused, secondsLeft]);

  function startTimer(minutes: number) {
    setTimerDuration(minutes);
    setSecondsLeft(minutes * 60);
    setTimerActive(true);
    setTimerPaused(false);
  }

  function stopTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerActive(false);
    setSecondsLeft(0);
  }

  function togglePause() {
    if (timerPaused) {
      setTimerPaused(false);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimerPaused(true);
    }
  }

  function formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  if (timerActive) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.timerContainer}>
          {/* Breathing Ring */}
          <View style={styles.breathRing}>
            <Text style={styles.breathLabel}>Breathe</Text>
          </View>

          {/* Countdown */}
          <Text style={styles.countdown}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.timerSubtext}>{timerDuration} min session</Text>

          {/* Controls */}
          <View style={styles.timerControls}>
            <TouchableOpacity style={styles.controlBtn} onPress={togglePause}>
              <Ionicons
                name={timerPaused ? 'play' : 'pause'}
                size={28}
                color={colors.text.primary}
              />
              <Text style={styles.controlLabel}>
                {timerPaused ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={stopTimer}>
              <Ionicons name="stop" size={28} color={colors.semantic.heart} />
              <Text style={styles.controlLabel}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meditation</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <Text style={styles.streakNumber}>{meditationStreak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
          <View style={styles.heatStrip}>
            {last7Days.map((day) => (
              <View
                key={day}
                style={[
                  styles.heatDot,
                  {
                    backgroundColor: sessionDates.has(day)
                      ? colors.accent.secondary
                      : colors.text.tertiary,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Session Cards */}
        {SESSION_OPTIONS.map((mins) => (
          <View key={mins} style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{mins} Minutes</Text>
            {/* Type Toggle */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.togglePill,
                  selectedType[mins] === 'guided' && styles.togglePillActive,
                ]}
                onPress={() =>
                  setSelectedType((prev) => ({ ...prev, [mins]: 'guided' }))
                }
              >
                <Text
                  style={[
                    styles.toggleText,
                    selectedType[mins] === 'guided' && styles.toggleTextActive,
                  ]}
                >
                  Guided
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.togglePill,
                  selectedType[mins] === 'unguided' && styles.togglePillActive,
                ]}
                onPress={() =>
                  setSelectedType((prev) => ({ ...prev, [mins]: 'unguided' }))
                }
              >
                <Text
                  style={[
                    styles.toggleText,
                    selectedType[mins] === 'unguided' && styles.toggleTextActive,
                  ]}
                >
                  Unguided
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => startTimer(mins)}
            >
              <Text style={styles.startBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  streakCard: {
    alignItems: 'center',
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.accent.primary,
  },
  streakLabel: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  heatStrip: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heatDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sessionCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sessionTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  togglePill: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.card.secondary,
    alignItems: 'center',
  },
  togglePillActive: {
    backgroundColor: colors.accent.primary,
  },
  toggleText: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: colors.background.primary,
  },
  startBtn: {
    backgroundColor: colors.accent.secondary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  startBtnText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
  },
  // Timer View
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  breathRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  breathLabel: {
    ...typography.body,
    color: colors.accent.primary,
    fontWeight: '600',
  },
  countdown: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  timerSubtext: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  timerControls: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  controlBtn: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  controlLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
});

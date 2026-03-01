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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { StreakCard } from '../../components/StreakCard';
import { FAB } from '../../components/FAB';

export function WorkoutOverviewScreen() {
  const { state } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { streaks } = state.activity;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PulseUp Fitness</Text>
          <TouchableOpacity>
            <Ionicons name="qr-code" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Open status */}
        <View style={styles.statusRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={colors.text.secondary}
          />
          <Text style={styles.statusText}>Open · Closes at 21:50</Text>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>Tuesday, Nov 18</Text>

        {/* Streak Cards */}
        <View style={styles.streakRow}>
          <StreakCard
            title="Training Streak"
            subtitle="Today's Training"
            days={streaks.training}
            variant="training"
          />
          <StreakCard
            title="Nutrition Streak"
            subtitle="Today's Nutrition"
            days={streaks.nutrition}
            variant="nutrition"
          />
        </View>

        {/* Personal Training Card */}
        <View style={styles.personalTrainingCard}>
          <Text style={styles.ptLabel}>Personal Training</Text>
          <Text style={styles.ptSubtitle}>Individual program</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.ptBody}>
            Book a personal trainer at ironpeak Fitness
          </Text>
        </View>

        {/* Community Section */}
        <Text style={styles.sectionHeader}>Community</Text>

        {/* Navigate to Workout Library */}
        <TouchableOpacity
          style={styles.libraryButton}
          onPress={() => navigation.navigate('WorkoutLibrary')}
          activeOpacity={0.8}
        >
          <Text style={styles.libraryButtonText}>Workout Library</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={colors.background.primary}
          />
        </TouchableOpacity>
      </ScrollView>

      <FAB onPress={() => {}} />
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
  scrollContent: {
    padding: spacing.screenPadding,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerTitle: {
    ...typography.largeHeader,
    color: colors.text.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  statusText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  dateText: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  personalTrainingCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    height: 200,
    marginBottom: spacing.lg,
  },
  ptLabel: {
    ...typography.subLabel,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  ptSubtitle: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
  ptBody: {
    ...typography.body,
    color: colors.text.primary,
  },
  sectionHeader: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  libraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent.primary,
    paddingVertical: 14,
    borderRadius: spacing.cardRadius,
    gap: 8,
  },
  libraryButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
  },
});

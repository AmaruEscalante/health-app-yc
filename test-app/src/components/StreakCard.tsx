import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface StreakCardProps {
  title: string;
  subtitle: string;
  days: number;
  variant: 'training' | 'nutrition';
  onPress?: () => void;
}

const variantColors = {
  training: { bg: colors.accent.tertiary, text: '#1C1C1E' },
  nutrition: { bg: colors.accent.secondary, text: '#1C1C1E' },
};

export function StreakCard({ title, subtitle, days, variant, onPress }: StreakCardProps) {
  const scheme = variantColors[variant];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.streakRow}>
          <Text style={styles.days}>{days} days</Text>
          <Ionicons name="checkmark-circle" size={16} color={colors.accent.secondary} />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: scheme.bg }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: scheme.text }]}>{subtitle}</Text>
        <Ionicons name={variant === 'training' ? 'barbell-outline' : 'restaurant-outline'} size={18} color={scheme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.planRow} onPress={onPress}>
        <Text style={styles.planText}>Daily Plan</Text>
        <Ionicons name="arrow-forward" size={14} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  days: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 13,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
  },
  planText: {
    ...typography.subLabel,
    color: colors.text.primary,
    fontWeight: '500',
  },
});

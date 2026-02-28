import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

export function MacroBar({ label, current, goal, color }: MacroBarProps) {
  const progress = Math.min(current / goal, 1);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.value}>
          {current}/{goal}g
        </Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  value: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  label: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    marginLeft: 16,
  },
  barBackground: {
    height: 4,
    backgroundColor: colors.card.secondary,
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
});

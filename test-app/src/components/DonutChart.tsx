import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface DonutChartProps {
  progress: number; // 0-1
  centerValue: string;
  centerLabel: string;
  goalLabel: string;
  size?: number;
}

export function DonutChart({ progress, centerValue, centerLabel, goalLabel, size = 180 }: DonutChartProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(progress, 1));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="calorieGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.semantic.calorieGradientStart} />
            <Stop offset="1" stopColor={colors.semantic.calorieGradientEnd} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.card.secondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#calorieGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.centerContent}>
        <Text style={styles.centerLabel}>{centerLabel}</Text>
        <View style={styles.valueRow}>
          <Ionicons name="flame" size={18} color={colors.semantic.calorieGradientEnd} />
          <Text style={styles.centerValue}> {centerValue}</Text>
        </View>
        <Text style={styles.goalLabel}>{goalLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerValue: {
    ...typography.metricValue,
    color: colors.text.primary,
    fontSize: 28,
  },
  goalLabel: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginTop: 2,
  },
});

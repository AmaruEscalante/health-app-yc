import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle as SvgCircle, Line } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface VitalsChartProps {
  data: { date: string; value: number }[];
  type: 'bp' | 'hr' | 'weight';
  height?: number;
}

const typeColors = {
  bp: colors.semantic.heart,
  hr: colors.accent.primary,
  weight: colors.accent.secondary,
};

export function VitalsChart({ data, type, height = 160 }: VitalsChartProps) {
  if (data.length === 0) return null;

  const chartWidth = 320;
  const padding = { top: 20, bottom: 30, left: 10, right: 10 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) - 5;
  const maxVal = Math.max(...values) + 5;
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * plotWidth;
    const y = padding.top + plotHeight - ((d.value - minVal) / range) * plotHeight;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const color = typeColors[type];

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
          <Line
            key={frac}
            x1={padding.left}
            y1={padding.top + plotHeight * (1 - frac)}
            x2={chartWidth - padding.right}
            y2={padding.top + plotHeight * (1 - frac)}
            stroke={colors.card.secondary}
            strokeWidth={0.5}
          />
        ))}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* Last point dot */}
        {points.length > 0 && (
          <SvgCircle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={4}
            fill={color}
          />
        )}
      </Svg>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{data[0]?.date.slice(5)}</Text>
        <Text style={styles.label}>{data[data.length - 1]?.date.slice(5)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
    paddingHorizontal: 10,
    marginTop: -20,
  },
  label: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
});

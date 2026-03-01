import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface HealthScoreRingProps {
  progress: number; // 0-1
  size?: number;
  label: string;
}

export function HealthScoreRing({ progress, size = 80, label }: HealthScoreRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayPercent, setDisplayPercent] = useState(0);

  const clampedProgress = Math.min(progress, 1);

  useEffect(() => {
    // Listen to animated value changes to update the percentage text
    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayPercent(Math.round(value * 100));
    });

    // Animate from 0 to target progress on mount
    Animated.timing(animatedValue, {
      toValue: clampedProgress,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [clampedProgress]);

  // Interpolate the animated value to strokeDashoffset
  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.card.secondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accent.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.percentage}>{displayPercent}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentage: {
    ...typography.body,
    color: colors.accent.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

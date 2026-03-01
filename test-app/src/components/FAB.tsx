import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

interface FABProps {
  onPress: () => void;
}

export function FAB({ onPress }: FABProps) {
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [glowOpacity]);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.glowRing, { opacity: glowOpacity }]}>
        <Svg width={64} height={64}>
          <Circle
            cx={32}
            cy={32}
            r={29}
            stroke={colors.accent.primary}
            strokeWidth={2.5}
            fill="none"
          />
        </Svg>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color={colors.background.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface WeekCalendarProps {
  selectedDate: string; // ISO date
  onSelectDate: (date: string) => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeekCalendar({ selectedDate, onSelectDate }: WeekCalendarProps) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      label: DAY_LABELS[i],
      num: date.getDate(),
      dateStr: date.toISOString().split('T')[0],
    };
  });

  return (
    <View style={styles.container}>
      {days.map((day) => {
        const isToday = day.dateStr === todayStr;
        const isSelected = day.dateStr === selectedDate;

        return (
          <TouchableOpacity
            key={day.dateStr}
            style={styles.dayColumn}
            onPress={() => onSelectDate(day.dateStr)}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
            <View
              style={[
                styles.dayCircle,
                isToday && styles.todayCircle,
                isSelected && !isToday && styles.selectedCircle,
              ]}
            >
              <Text
                style={[
                  styles.dayNum,
                  isToday && styles.todayText,
                ]}
              >
                {day.num}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: colors.accent.primary,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: colors.accent.primary,
  },
  dayNum: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  todayText: {
    color: '#0D0D0D',
  },
});

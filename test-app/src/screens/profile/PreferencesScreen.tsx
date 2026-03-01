import React from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const toggleItems: { label: string; key: 'workoutReminders' | 'medicationAlerts' | 'sleepReminders' }[] = [
  { label: 'Workout Reminders', key: 'workoutReminders' },
  { label: 'Medication Alerts', key: 'medicationAlerts' },
  { label: 'Sleep Reminders', key: 'sleepReminders' },
];

export function PreferencesScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const { preferences } = state.user;

  const handleToggle = (key: 'workoutReminders' | 'medicationAlerts' | 'sleepReminders') => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [key]: !preferences[key] },
    });
  };

  const handleUnitChange = (units: 'metric' | 'imperial') => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { units },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preferences</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Toggle Rows */}
        {toggleItems.map((item) => (
          <View key={item.key} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{item.label}</Text>
            <Switch
              value={preferences[item.key]}
              onValueChange={() => handleToggle(item.key)}
              trackColor={{ false: colors.card.secondary, true: colors.accent.secondary }}
              thumbColor={colors.text.primary}
            />
          </View>
        ))}

        {/* Units */}
        <Text style={styles.sectionLabel}>Units</Text>
        <View style={styles.unitRow}>
          <TouchableOpacity
            style={[
              styles.unitPill,
              preferences.units === 'metric' ? styles.unitPillActive : styles.unitPillInactive,
            ]}
            onPress={() => handleUnitChange('metric')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.unitText,
                preferences.units === 'metric' ? styles.unitTextActive : styles.unitTextInactive,
              ]}
            >
              Metric
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitPill,
              preferences.units === 'imperial' ? styles.unitPillActive : styles.unitPillInactive,
            ]}
            onPress={() => handleUnitChange('imperial')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.unitText,
                preferences.units === 'imperial' ? styles.unitTextActive : styles.unitTextInactive,
              ]}
            >
              Imperial
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: spacing.cardRadius,
    marginBottom: spacing.sm,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  unitRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  unitPill: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 20,
    alignItems: 'center',
  },
  unitPillActive: {
    backgroundColor: colors.accent.primary,
  },
  unitPillInactive: {
    backgroundColor: colors.card.secondary,
  },
  unitText: {
    ...typography.body,
    fontWeight: '600',
  },
  unitTextActive: {
    color: colors.background.primary,
  },
  unitTextInactive: {
    color: colors.text.secondary,
  },
});

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { VitalsChart } from '../../components/VitalsChart';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type VitalTab = 'bp' | 'hr' | 'weight';

export function VitalsLogScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<VitalTab>('bp');
  const [showForm, setShowForm] = useState(false);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const vitals = state.medical.vitals;
  const last14 = vitals.slice(-14);
  const latest = vitals[vitals.length - 1];

  const tabs: { key: VitalTab; label: string }[] = [
    { key: 'bp', label: 'Blood Pressure' },
    { key: 'hr', label: 'Heart Rate' },
    { key: 'weight', label: 'Weight' },
  ];

  const chartData = last14
    .map((v) => {
      const value =
        activeTab === 'bp' ? v.systolic : activeTab === 'hr' ? v.heartRate : v.weight;
      return value != null ? { date: v.date, value } : null;
    })
    .filter((d): d is { date: string; value: number } => d !== null);

  const handleSave = () => {
    dispatch({
      type: 'LOG_VITALS',
      payload: {
        date: new Date().toISOString().split('T')[0],
        systolic: Number(systolic) || undefined,
        diastolic: Number(diastolic) || undefined,
        heartRate: Number(heartRate) || undefined,
        weight: Number(weight) || undefined,
        notes: notes || undefined,
      },
    });
    setSystolic('');
    setDiastolic('');
    setHeartRate('');
    setWeight('');
    setNotes('');
    setShowForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vitals</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Tab Selector */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <VitalsChart data={chartData} type={activeTab} />
        </View>

        {/* Latest Reading Card */}
        <View style={styles.latestCard}>
          <Text style={styles.latestLabel}>Latest Reading</Text>
          {activeTab === 'bp' && (
            <Text style={styles.latestValue}>
              {latest?.systolic && latest?.diastolic
                ? `${latest.systolic}/${latest.diastolic} mmHg`
                : 'No data'}
            </Text>
          )}
          {activeTab === 'hr' && (
            <Text style={styles.latestValue}>
              {latest?.heartRate ? `${latest.heartRate} bpm` : 'No data'}
            </Text>
          )}
          {activeTab === 'weight' && (
            <Text style={styles.latestValue}>
              {latest?.weight ? `${latest.weight} lbs` : 'No data'}
            </Text>
          )}
          {latest && (
            <Text style={styles.latestDate}>{latest.date}</Text>
          )}
        </View>

        {/* Log Vitals Button */}
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => setShowForm(!showForm)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showForm ? 'close' : 'add'}
            size={20}
            color={colors.background.primary}
          />
          <Text style={styles.logButtonText}>
            {showForm ? 'Cancel' : 'Log Vitals'}
          </Text>
        </TouchableOpacity>

        {/* Inline Form */}
        {showForm && (
          <View style={styles.formCard}>
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Systolic</Text>
                <TextInput
                  style={styles.formInput}
                  value={systolic}
                  onChangeText={setSystolic}
                  keyboardType="numeric"
                  placeholder="120"
                  placeholderTextColor={colors.text.tertiary}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Diastolic</Text>
                <TextInput
                  style={styles.formInput}
                  value={diastolic}
                  onChangeText={setDiastolic}
                  keyboardType="numeric"
                  placeholder="80"
                  placeholderTextColor={colors.text.tertiary}
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Heart Rate</Text>
                <TextInput
                  style={styles.formInput}
                  value={heartRate}
                  onChangeText={setHeartRate}
                  keyboardType="numeric"
                  placeholder="72"
                  placeholderTextColor={colors.text.tertiary}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Weight</Text>
                <TextInput
                  style={styles.formInput}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="165"
                  placeholderTextColor={colors.text.tertiary}
                />
              </View>
            </View>
            <Text style={styles.formLabel}>Notes</Text>
            <TextInput
              style={[styles.formInput, styles.formInputMultiline]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Optional notes..."
              placeholderTextColor={colors.text.tertiary}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.largeHeader,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.card.secondary,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.accent.primary,
  },
  tabText: {
    ...typography.subLabel,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.background.primary,
  },

  // Chart
  chartContainer: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },

  // Latest Reading
  latestCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  latestLabel: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  latestValue: {
    ...typography.metricValue,
    color: colors.text.primary,
  },
  latestDate: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  // Log Button
  logButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  logButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.background.primary,
  },

  // Form
  formCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  formField: {
    flex: 1,
  },
  formLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  formInput: {
    backgroundColor: colors.card.secondary,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    color: colors.text.primary,
    ...typography.body,
  },
  formInputMultiline: {
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.background.primary,
  },
});

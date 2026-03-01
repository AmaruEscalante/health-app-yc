import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type Frequency = 'daily' | 'twice daily' | 'weekly';

export function MedicationsScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<any>();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('daily');

  const frequencies: Frequency[] = ['daily', 'twice daily', 'weekly'];

  const handleSave = () => {
    if (!name.trim() || !dosage.trim()) return;
    dispatch({
      type: 'ADD_MEDICATION',
      payload: {
        id: 'med' + Date.now(),
        name: name.trim(),
        dosage: dosage.trim(),
        frequency,
        time: '08:00',
        reminderEnabled: true,
      },
    });
    setName('');
    setDosage('');
    setFrequency('daily');
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
          <Text style={styles.headerTitle}>Medications</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Medication List */}
        <FlatList
          data={state.medical.medications}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.medCard}>
              <View style={styles.medInfo}>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.medDosage}>{item.dosage}</Text>
                <Text style={styles.medFrequency}>{item.frequency}</Text>
              </View>
              <Switch
                value={item.reminderEnabled}
                onValueChange={() =>
                  dispatch({ type: 'TOGGLE_MED_REMINDER', payload: item.id })
                }
                trackColor={{
                  false: colors.card.secondary,
                  true: colors.accent.primary,
                }}
                thumbColor={colors.text.primary}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* Add Medication Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showForm ? 'close' : 'add'}
            size={20}
            color={colors.background.primary}
          />
          <Text style={styles.addButtonText}>
            {showForm ? 'Cancel' : 'Add Medication'}
          </Text>
        </TouchableOpacity>

        {/* Inline Form */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={styles.formInput}
              value={name}
              onChangeText={setName}
              placeholder="Medication name"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Dosage</Text>
            <TextInput
              style={styles.formInput}
              value={dosage}
              onChangeText={setDosage}
              placeholder="e.g. 10mg"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Frequency</Text>
            <View style={styles.freqRow}>
              {frequencies.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.freqPill, frequency === f && styles.freqPillActive]}
                  onPress={() => setFrequency(f)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.freqPillText,
                      frequency === f && styles.freqPillTextActive,
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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

  // Medication Card
  medCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text.primary,
  },
  medDosage: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginTop: 2,
  },
  medFrequency: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  separator: {
    height: spacing.sm,
  },

  // Add Button
  addButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  addButtonText: {
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
  formLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  formInput: {
    backgroundColor: colors.card.secondary,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    color: colors.text.primary,
    ...typography.body,
  },
  freqRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  freqPill: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.card.secondary,
    alignItems: 'center',
  },
  freqPillActive: {
    backgroundColor: colors.accent.primary,
  },
  freqPillText: {
    ...typography.subLabel,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  freqPillTextActive: {
    color: colors.background.primary,
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

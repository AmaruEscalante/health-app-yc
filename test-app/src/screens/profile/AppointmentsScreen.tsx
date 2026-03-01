import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function AppointmentsScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<any>();
  const [showForm, setShowForm] = useState(false);
  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');

  const handleSave = () => {
    if (!doctor.trim() || !specialty.trim() || !date.trim() || !time.trim() || !location.trim())
      return;
    dispatch({
      type: 'ADD_APPOINTMENT',
      payload: {
        id: 'apt' + Date.now(),
        doctor: doctor.trim(),
        specialty: specialty.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        reason: reason.trim() || undefined,
      },
    });
    setDoctor('');
    setSpecialty('');
    setDate('');
    setTime('');
    setLocation('');
    setReason('');
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
          <Text style={styles.headerTitle}>Appointments</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Appointment List */}
        {state.medical.appointments.map((apt) => (
          <View key={apt.id} style={styles.aptCard}>
            {/* Doctor + Specialty */}
            <View style={styles.aptHeaderRow}>
              <Text style={styles.aptDoctor}>{apt.doctor}</Text>
              <View style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{apt.specialty}</Text>
              </View>
            </View>

            {/* Date + Time */}
            <View style={styles.aptDetailRow}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={colors.text.secondary}
              />
              <Text style={styles.aptDetailText}>
                {apt.date} at {apt.time}
              </Text>
            </View>

            {/* Location */}
            <View style={styles.aptDetailRow}>
              <Ionicons name="location-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.aptDetailText}>{apt.location}</Text>
            </View>

            {/* Reason */}
            {apt.reason ? (
              <Text style={styles.aptReason}>{apt.reason}</Text>
            ) : null}
          </View>
        ))}

        {/* Book Appointment Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowForm(!showForm)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showForm ? 'close' : 'add'}
            size={20}
            color={colors.background.primary}
          />
          <Text style={styles.bookButtonText}>
            {showForm ? 'Cancel' : 'Book Appointment'}
          </Text>
        </TouchableOpacity>

        {/* Inline Form */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formLabel}>Doctor</Text>
            <TextInput
              style={styles.formInput}
              value={doctor}
              onChangeText={setDoctor}
              placeholder="Doctor name"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Specialty</Text>
            <TextInput
              style={styles.formInput}
              value={specialty}
              onChangeText={setSpecialty}
              placeholder="e.g. Cardiology"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Date</Text>
            <TextInput
              style={styles.formInput}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Time</Text>
            <TextInput
              style={styles.formInput}
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Location</Text>
            <TextInput
              style={styles.formInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Clinic or hospital"
              placeholderTextColor={colors.text.tertiary}
            />

            <Text style={styles.formLabel}>Reason</Text>
            <TextInput
              style={styles.formInput}
              value={reason}
              onChangeText={setReason}
              placeholder="Optional reason for visit"
              placeholderTextColor={colors.text.tertiary}
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

  // Appointment Card
  aptCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  aptHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  aptDoctor: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text.primary,
    flex: 1,
  },
  specialtyBadge: {
    backgroundColor: colors.card.secondary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: spacing.sm,
  },
  specialtyText: {
    ...typography.subLabel,
    color: colors.accent.primary,
    fontWeight: '600',
  },
  aptDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  aptDetailText: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  aptReason: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },

  // Book Button
  bookButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  bookButtonText: {
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
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.background.primary,
  },
});

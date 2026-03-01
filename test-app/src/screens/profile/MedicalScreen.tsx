import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function MedicalScreen() {
  const { state } = useApp();
  const navigation = useNavigation<any>();

  const lastVital = state.medical.vitals[state.medical.vitals.length - 1];
  const nextAppointment = state.medical.appointments[0];
  const medicationCount = state.medical.medications.length;

  const bpText =
    lastVital?.systolic && lastVital?.diastolic
      ? `${lastVital.systolic}/${lastVital.diastolic} mmHg`
      : 'No data';
  const hrText = lastVital?.heartRate ? `${lastVital.heartRate} bpm` : '';

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
          <Text style={styles.headerTitle}>Medical</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Latest Vitals Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VitalsLog')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.semantic.heart + '22' }]}>
            <Ionicons name="heart" size={22} color={colors.semantic.heart} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Latest Vitals</Text>
            <Text style={styles.cardValue}>{bpText}</Text>
            {hrText ? <Text style={styles.cardSub}>{hrText}</Text> : null}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        {/* Upcoming Appointment Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Appointments')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.accent.primary + '22' }]}>
            <Ionicons name="calendar" size={22} color={colors.accent.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Upcoming Appointment</Text>
            {nextAppointment ? (
              <>
                <Text style={styles.cardValue}>{nextAppointment.doctor}</Text>
                <Text style={styles.cardSub}>{nextAppointment.date}</Text>
              </>
            ) : (
              <Text style={styles.cardValue}>None scheduled</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        {/* Medications Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Medications')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.accent.secondary + '22' }]}>
            <Ionicons name="medkit" size={22} color={colors.accent.secondary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Medications</Text>
            <Text style={styles.cardValue}>
              {medicationCount} active medication{medicationCount !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
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
  card: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  cardValue: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardSub: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginTop: 2,
  },
});

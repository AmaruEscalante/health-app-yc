import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const MOODS = [
  'Happy', 'Calm', 'Focused',
  'Anxious', 'Stressed', 'Sad',
  'Angry', 'Tired', 'Neutral',
];

function getLevelColor(level: number): string {
  if (level <= 3) return colors.accent.secondary;
  if (level <= 6) return '#FFD700';
  return colors.semantic.heart;
}

function getMoodText(level: number): string {
  if (level <= 2) return 'Very Relaxed';
  if (level <= 4) return 'Calm';
  if (level <= 6) return 'Moderate';
  if (level <= 8) return 'Elevated';
  return 'Very High';
}

export function StressCheckinScreen() {
  const navigation = useNavigation();
  const { dispatch } = useApp();

  const [level, setLevel] = useState(5);
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');

  function handleSave() {
    if (!mood) return;
    dispatch({
      type: 'LOG_STRESS',
      payload: {
        date: new Date().toISOString().split('T')[0],
        level,
        mood,
        notes: notes || undefined,
      },
    });
    setLevel(5);
    setMood('');
    setNotes('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Stress Check-in</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.heroText}>How are you feeling?</Text>

        {/* Stress Level Selector */}
        <View style={styles.levelRow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <TouchableOpacity
              key={n}
              onPress={() => setLevel(n)}
              style={[
                styles.levelCircle,
                {
                  backgroundColor:
                    n === level ? colors.accent.primary : colors.card.secondary,
                  borderColor: getLevelColor(n),
                  borderWidth: n === level ? 0 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.levelNum,
                  { color: n === level ? colors.background.primary : getLevelColor(n) },
                ]}
              >
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Value */}
        <View style={styles.valueContainer}>
          <Text style={[styles.bigLevel, { color: getLevelColor(level) }]}>{level}</Text>
          <Text style={styles.moodText}>{getMoodText(level)}</Text>
        </View>

        {/* Mood Selector */}
        <Text style={styles.sectionTitle}>Select Your Mood</Text>
        <View style={styles.moodGrid}>
          {MOODS.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMood(m)}
              style={[
                styles.moodPill,
                {
                  backgroundColor:
                    mood === m ? colors.accent.primary : colors.card.secondary,
                },
              ]}
            >
              <Text
                style={[
                  styles.moodPillText,
                  {
                    color:
                      mood === m ? colors.background.primary : colors.text.secondary,
                  },
                ]}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any notes? (optional)"
          placeholderTextColor={colors.text.tertiary}
          multiline
          numberOfLines={3}
        />

        {/* Save */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Save Check-in</Text>
        </TouchableOpacity>

        {/* Breathing Exercise */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setShowBreathing(true);
            setBreathPhase('in');
          }}
        >
          <Ionicons name="leaf-outline" size={20} color={colors.accent.secondary} />
          <Text style={styles.secondaryButtonText}>Start Breathing Exercise</Text>
        </TouchableOpacity>

        {/* Journal Link */}
        <TouchableOpacity
          onPress={() => (navigation as any).navigate('Journal')}
          style={styles.linkRow}
        >
          <Ionicons name="book-outline" size={18} color={colors.accent.primary} />
          <Text style={styles.linkText}>Write in Journal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Breathing Modal */}
      <Modal visible={showBreathing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowBreathing(false)}
            >
              <Ionicons name="close" size={28} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setBreathPhase((p) => (p === 'in' ? 'out' : 'in'))}
              style={[
                styles.breathCircle,
                { opacity: breathPhase === 'in' ? 1 : 0.5 },
              ]}
            >
              <Text style={styles.breathText}>
                {breathPhase === 'in' ? 'Breathe In...' : 'Breathe Out...'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.breathHint}>Tap circle to alternate</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  heroText: {
    ...typography.largeHeader,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  levelCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNum: {
    fontSize: 12,
    fontWeight: '700',
  },
  valueContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  bigLevel: {
    fontSize: 48,
    fontWeight: '700',
  },
  moodText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  moodPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  moodPillText: {
    ...typography.body,
    fontWeight: '500',
  },
  notesInput: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    color: colors.text.primary,
    ...typography.body,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    ...typography.sectionHeader,
    color: colors.background.primary,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.accent.secondary,
    fontWeight: '600',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  linkText: {
    ...typography.body,
    color: colors.accent.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  closeBtn: {
    position: 'absolute',
    top: -40,
    right: 0,
  },
  breathCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathText: {
    ...typography.sectionHeader,
    color: colors.background.primary,
    textAlign: 'center',
  },
  breathHint: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginTop: spacing.md,
  },
});

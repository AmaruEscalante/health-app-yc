import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const MOOD_OPTIONS = [
  'Happy', 'Calm', 'Focused', 'Anxious', 'Stressed',
  'Sad', 'Tired', 'Reflective', 'Productive', 'Relaxed',
];

const TAG_COLORS: Record<string, string> = {
  Happy: colors.accent.secondary,
  Calm: '#4A90D9',
  Focused: colors.accent.primary,
  Anxious: '#FFD700',
  Stressed: colors.semantic.heart,
  Sad: '#8E8E93',
  Tired: '#D9A8FF',
  Reflective: colors.accent.tertiary,
  Productive: colors.accent.secondaryAlt,
  Relaxed: '#4A90D9',
};

export function JournalScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useApp();
  const { journal } = state.wellness;

  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSave() {
    if (!content.trim()) return;
    dispatch({
      type: 'ADD_JOURNAL_ENTRY',
      payload: {
        id: 'j' + Date.now(),
        date: today,
        content: content.trim(),
        moodTags: selectedTags,
      },
    });
    setShowForm(false);
    setContent('');
    setSelectedTags([]);
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Journal</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* New Entry Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.primaryButtonText}>
            {showForm ? 'Cancel' : 'New Entry'}
          </Text>
        </TouchableOpacity>

        {/* Inline Form */}
        {showForm && (
          <View style={styles.formCard}>
            <TextInput
              style={styles.textArea}
              value={content}
              onChangeText={setContent}
              placeholder="How was your day?"
              placeholderTextColor={colors.text.tertiary}
              multiline
              numberOfLines={5}
            />
            <Text style={styles.label}>Mood Tags</Text>
            <View style={styles.tagRow}>
              {MOOD_OPTIONS.map((tag) => {
                const selected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    style={[
                      styles.tagPill,
                      {
                        backgroundColor: selected
                          ? colors.accent.primary
                          : colors.card.secondary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagPillText,
                        {
                          color: selected
                            ? colors.background.primary
                            : colors.text.secondary,
                        },
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.dateText}>{formatDate(today)}</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.primaryButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Past Entries */}
        {journal.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
            {entry.moodTags.length > 0 && (
              <View style={styles.entryTagRow}>
                {entry.moodTags.map((tag) => (
                  <View
                    key={tag}
                    style={[
                      styles.entryTag,
                      { backgroundColor: TAG_COLORS[tag] || colors.card.secondary },
                    ]}
                  >
                    <Text style={styles.entryTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text style={styles.entryContent} numberOfLines={2}>
              {entry.content}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  formCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  textArea: {
    backgroundColor: colors.card.secondary,
    borderRadius: spacing.sm,
    padding: spacing.md,
    color: colors.text.primary,
    ...typography.body,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tagPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  tagPillText: {
    ...typography.subLabel,
    fontWeight: '500',
  },
  dateText: {
    ...typography.subLabel,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  entryCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  entryDate: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  entryTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  entryTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  entryTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.background.primary,
  },
  entryContent: {
    ...typography.body,
    color: colors.text.secondary,
  },
});

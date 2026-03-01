import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Workout } from '../../data/types';

const categoryColors: Record<Workout['category'], string> = {
  Strength: '#FF3B30',
  Cardio: '#007AFF',
  Yoga: '#AF52DE',
  HIIT: '#FF9500',
  Walking: '#34C759',
};

const difficultyColors: Record<Workout['difficulty'], string> = {
  Beginner: '#34C759',
  Intermediate: '#FFD60A',
  Advanced: '#FF3B30',
};

export function WorkoutLibraryScreen() {
  const { state } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const workouts = state.activity.workouts;

  const renderWorkoutCard = ({ item }: { item: Workout }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}
    >
      <View
        style={[
          styles.categoryIndicator,
          { backgroundColor: categoryColors[item.category] },
        ]}
      />
      <View style={styles.cardContent}>
        <Text style={styles.workoutName} numberOfLines={2}>
          {item.name}
        </Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColors[item.difficulty] + '22' },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: difficultyColors[item.difficulty] },
            ]}
          >
            {item.difficulty}
          </Text>
        </View>
        <View style={styles.durationRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color={colors.text.secondary}
          />
          <Text style={styles.durationText}>{item.durationMin} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Library</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={workouts}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  listContent: {
    padding: spacing.screenPadding,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    overflow: 'hidden',
    width: '48%',
  },
  categoryIndicator: {
    height: 4,
    width: '100%',
  },
  cardContent: {
    padding: spacing.md,
  },
  workoutName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  difficultyText: {
    ...typography.subLabel,
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
});

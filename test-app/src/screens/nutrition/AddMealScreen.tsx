import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const;

export function AddMealScreen() {
  const { dispatch } = useApp();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [mealType, setMealType] = useState<(typeof MEAL_TYPES)[number]>(
    'Breakfast'
  );

  const handleSave = () => {
    dispatch({
      type: 'ADD_MEAL',
      payload: {
        id: Date.now().toString(),
        name,
        calories: Number(calories),
        carbs: Number(carbs),
        proteins: Number(proteins),
        fats: Number(fats),
        mealType,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        date: new Date().toISOString().split('T')[0],
      },
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Meal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Food name */}
        <Text style={styles.inputLabel}>Food Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Chicken Salad"
          placeholderTextColor={colors.text.tertiary}
          value={name}
          onChangeText={setName}
        />

        {/* Calories */}
        <Text style={styles.inputLabel}>Calories</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor={colors.text.tertiary}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />

        {/* Macro row */}
        <View style={styles.macroRow}>
          <View style={styles.macroInputWrapper}>
            <Text style={styles.inputLabel}>Carbs (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.text.tertiary}
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.macroInputWrapper}>
            <Text style={styles.inputLabel}>Proteins (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.text.tertiary}
              value={proteins}
              onChangeText={setProteins}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.macroInputWrapper}>
            <Text style={styles.inputLabel}>Fats (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.text.tertiary}
              value={fats}
              onChangeText={setFats}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Meal type selector */}
        <Text style={styles.inputLabel}>Meal Type</Text>
        <View style={styles.mealTypeRow}>
          {MEAL_TYPES.map((type) => {
            const isSelected = mealType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mealTypePill,
                  isSelected && styles.mealTypePillSelected,
                ]}
                onPress={() => setMealType(type)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.mealTypePillText,
                    isSelected && styles.mealTypePillTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Meal</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  inputLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    ...typography.body,
    color: colors.text.primary,
  },
  macroRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  macroInputWrapper: {
    flex: 1,
  },
  mealTypeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  mealTypePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    backgroundColor: colors.card.secondary,
  },
  mealTypePillSelected: {
    backgroundColor: colors.accent.primary,
  },
  mealTypePillText: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  mealTypePillTextSelected: {
    color: colors.background.primary,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});

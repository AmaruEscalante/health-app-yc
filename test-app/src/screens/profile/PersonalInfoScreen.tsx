import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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

export function PersonalInfoScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const { user } = state;

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(String(user.age));
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(String(user.weight));
  const [bloodType, setBloodType] = useState(user.bloodType);
  const [ecName, setEcName] = useState(user.emergencyContact.name);
  const [ecPhone, setEcPhone] = useState(user.emergencyContact.phone);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        name,
        age: Number(age),
        height,
        weight: Number(weight),
        bloodType,
        emergencyContact: { name: ecName, phone: ecPhone },
      },
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Info</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.text.tertiary}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor={colors.text.tertiary}
        />

        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholderTextColor={colors.text.tertiary}
        />

        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholderTextColor={colors.text.tertiary}
        />

        <Text style={styles.label}>Blood Type</Text>
        <TextInput
          style={styles.input}
          value={bloodType}
          onChangeText={setBloodType}
          placeholderTextColor={colors.text.tertiary}
        />

        {/* Emergency Contact */}
        <Text style={styles.sectionTitle}>Emergency Contact</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={ecName}
          onChangeText={setEcName}
          placeholderTextColor={colors.text.tertiary}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={ecPhone}
          onChangeText={setEcPhone}
          keyboardType="phone-pad"
          placeholderTextColor={colors.text.tertiary}
        />

        {/* Save */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.card.primary,
    color: colors.text.primary,
    height: 50,
    borderRadius: spacing.cardRadius,
    paddingHorizontal: spacing.md,
    ...typography.body,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.cardRadius,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '700',
  },
});

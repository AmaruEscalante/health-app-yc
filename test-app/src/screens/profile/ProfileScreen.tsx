import React from 'react';
import {
  View,
  Text,
  Image,
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

const menuItems = [
  { label: 'Personal Info', icon: 'person' as const, screen: 'PersonalInfo', crossTab: false },
  { label: 'Preferences', icon: 'settings' as const, screen: 'Preferences', crossTab: false },
  { label: 'Health Goals', icon: 'trophy' as const, screen: 'HealthGoals', crossTab: false },
  { label: 'Medical', icon: 'medkit' as const, screen: 'Medical', crossTab: true },
  { label: 'Sleep Tracker', icon: 'moon' as const, screen: 'SleepTracker', crossTab: true, parentTab: 'HomeTab' },
  { label: 'Stress & Meditation', icon: 'leaf' as const, screen: 'StressCheckin', crossTab: true },
  { label: 'Journal', icon: 'book' as const, screen: 'Journal', crossTab: true },
];

export function ProfileScreen() {
  const { state } = useApp();
  const navigation = useNavigation<any>();
  const { user } = state;

  const handleNavigate = (item: (typeof menuItems)[number]) => {
    if (item.crossTab) {
      if (item.parentTab) {
        navigation.getParent()?.navigate(item.parentTab, { screen: item.screen });
      } else {
        navigation.getParent()?.navigate(item.screen);
      }
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.age}>Age {user.age}</Text>
        </View>

        {/* Bio Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statText}>{user.height}</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statText}>{user.weight} lbs</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statText}>{user.bloodType}</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuRow}
              onPress={() => handleNavigate(item)}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={22} color={colors.text.primary} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          ))}
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
  avatarSection: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    fontWeight: '700',
  },
  age: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statPill: {
    backgroundColor: colors.card.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statText: {
    ...typography.body,
    color: colors.text.primary,
  },
  menuSection: {
    gap: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: spacing.cardRadius,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
});

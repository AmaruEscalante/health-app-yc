import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../../components/MetricCard';
import { FAB } from '../../components/FAB';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function DashboardScreen() {
  const { state } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const todayLog = state.nutrition.dailyLog[state.nutrition.dailyLog.length - 1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: state.user.avatar }} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.greetingLabel}>Good Morning!</Text>
              <Text style={styles.userName}>{state.user.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Daily Nutrition Section */}
        <Text style={styles.sectionTitle}>Your Daily Nutrition</Text>
        <View style={styles.metricsRow}>
          <MetricCard
            icon="flame"
            iconColor="#FF9500"
            value={String(todayLog.totalCalories)}
            unit="Kcal"
            subLabel={`/ ${todayLog.goalCalories - todayLog.totalCalories} burned`}
          />
          <View style={styles.metricSpacer} />
          <MetricCard
            icon="restaurant"
            iconColor={colors.macro.proteins}
            value={String(todayLog.proteins.current)}
            unit="gm"
            subLabel={`/ ${todayLog.proteins.goal} Kcal`}
          />
          <View style={styles.metricSpacer} />
          <MetricCard
            icon="flash"
            iconColor={colors.macro.carbs}
            value={String(todayLog.carbs.current)}
            unit="gm"
            subLabel={`/ ${todayLog.carbs.goal} Kcal`}
          />
        </View>

        {/* Cooking Community Section */}
        <View style={styles.communitySectionHeader}>
          <Text style={styles.sectionTitle}>Cooking Community</Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Community Card */}
        <TouchableOpacity
          style={styles.communityCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CommunityFeed')}
        >
          {/* User Row */}
          <View style={styles.communityUserRow}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={styles.communityAvatar}
            />
            <View style={styles.communityUserInfo}>
              <Text style={styles.communityUserName}>Emma Thomas</Text>
              <Text style={styles.communityFollowers}>12k Followers</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overflowButton}>
              <Ionicons name="ellipsis-vertical" size={18} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Food Image Placeholder */}
          <View style={styles.foodImagePlaceholder}>
            <Ionicons name="image-outline" size={48} color={colors.text.tertiary} />
          </View>
          <Text style={styles.foodCaption}>
            Packed bowl: quinoa, avocado, grilled protein, and g...
          </Text>

          {/* Engagement Row */}
          <View style={styles.engagementRow}>
            <View style={styles.engagementLeft}>
              <TouchableOpacity style={styles.engagementItem}>
                <Ionicons name="heart" size={20} color={colors.semantic.heart} />
                <Text style={styles.engagementText}>90 Likes</Text>
              </TouchableOpacity>

              <View style={styles.overlappingAvatars}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
                  style={[styles.smallAvatar, { zIndex: 3 }]}
                />
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                  style={[styles.smallAvatar, styles.avatarOverlap, { zIndex: 2 }]}
                />
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                  style={[styles.smallAvatar, styles.avatarOverlapDouble, { zIndex: 1 }]}
                />
              </View>

              <TouchableOpacity style={styles.engagementItem}>
                <Ionicons name="chatbubble-outline" size={18} color={colors.text.secondary} />
                <Text style={styles.engagementText}>18</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <FAB onPress={() => {}} />
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  headerText: {
    justifyContent: 'center',
  },
  greetingLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  userName: {
    ...typography.largeHeader,
    color: colors.text.primary,
  },
  bellButton: {
    padding: spacing.xs,
  },

  // Section Title
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Metrics Row
  metricsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  metricSpacer: {
    width: spacing.sm,
  },

  // Community Section
  communitySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  communityCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
  },
  communityUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  communityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  communityUserInfo: {
    flex: 1,
  },
  communityUserName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  communityFollowers: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
  followButton: {
    borderWidth: 1,
    borderColor: colors.accent.secondary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  followButtonText: {
    ...typography.subLabel,
    color: colors.accent.secondary,
    fontWeight: '600',
  },
  overflowButton: {
    padding: spacing.xs,
  },

  // Food Image Placeholder
  foodImagePlaceholder: {
    height: 200,
    backgroundColor: colors.card.secondary,
    borderRadius: spacing.cardRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  foodCaption: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },

  // Engagement Row
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  engagementText: {
    ...typography.subLabel,
    color: colors.text.secondary,
  },
  overlappingAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.card.primary,
  },
  avatarOverlap: {
    marginLeft: -10,
  },
  avatarOverlapDouble: {
    marginLeft: -10,
  },
});

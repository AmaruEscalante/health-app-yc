import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { FAB } from '../../components/FAB';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export function CommunityFeedScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const [composing, setComposing] = useState(false);
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (!postText.trim()) return;
    dispatch({
      type: 'ADD_COMMUNITY_POST',
      payload: {
        id: `cp-${Date.now()}`,
        author: state.user.name,
        avatarColor: '#C8FF00',
        text: postText.trim(),
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        liked: false,
      },
    });
    setPostText('');
    setComposing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cooking Community</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Compose Area */}
        {composing && (
          <View style={styles.composeArea}>
            <TextInput
              style={styles.composeInput}
              placeholder="Share something with the community..."
              placeholderTextColor={colors.text.tertiary}
              value={postText}
              onChangeText={setPostText}
              multiline
              autoFocus
            />
            <View style={styles.composeActions}>
              <TouchableOpacity onPress={() => { setComposing(false); setPostText(''); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!postText.trim()}
              >
                <Text style={[styles.postButtonText, !postText.trim() && styles.postButtonTextDisabled]}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Feed */}
        <FlatList
          data={state.community.posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={[styles.avatarCircle, { backgroundColor: item.avatarColor }]}>
                  <Text style={styles.avatarLetter}>{item.author[0]}</Text>
                </View>
                <View style={styles.postHeaderText}>
                  <Text style={styles.authorName}>{item.author}</Text>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{item.text}</Text>
              <View style={styles.engagementRow}>
                <View style={styles.engagementLeft}>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons
                      name={item.liked ? 'heart' : 'heart-outline'}
                      size={18}
                      color={item.liked ? colors.semantic.heart : colors.text.secondary}
                    />
                    <Text style={styles.engagementText}>{item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons name="chatbubble-outline" size={16} color={colors.text.secondary} />
                    <Text style={styles.engagementText}>{item.comments}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={18} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>

      {!composing && <FAB onPress={() => setComposing(true)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  flex: {
    flex: 1,
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
  composeArea: {
    backgroundColor: colors.card.primary,
    marginHorizontal: spacing.screenPadding,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  composeInput: {
    ...typography.body,
    color: colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  composeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  postButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  postButtonDisabled: {
    opacity: 0.4,
  },
  postButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: '600',
  },
  postButtonTextDisabled: {
    opacity: 0.6,
  },
  feedContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarLetter: {
    ...typography.body,
    fontWeight: '700',
    color: colors.background.primary,
  },
  postHeaderText: {
    flex: 1,
  },
  authorName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  timestamp: {
    ...typography.subLabel,
    color: colors.text.tertiary,
  },
  postText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
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
});

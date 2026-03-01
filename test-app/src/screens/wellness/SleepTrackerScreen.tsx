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
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getQualityColor(quality: number): string {
  if (quality <= 2) return colors.semantic.heart;
  if (quality === 3) return '#FFD700';
  return colors.accent.secondary;
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return DAY_LABELS[d.getDay()];
}

export function SleepTrackerScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useApp();
  const { sleepLogs } = state.wellness;

  const [showForm, setShowForm] = useState(false);
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState<number>(3);

  const last7 = sleepLogs.slice(-7);
  const lastNight = sleepLogs[sleepLogs.length - 1];

  const maxHours = 10;
  const chartWidth = 280;
  const chartHeight = 140;
  const barWidth = 28;
  const barGap = (chartWidth - barWidth * 7) / 6;

  function handleSave() {
    if (!bedtime || !wakeTime) return;
    const [bH, bM] = bedtime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);
    let totalHours = wH + wM / 60 - (bH + bM / 60);
    if (totalHours < 0) totalHours += 24;
    totalHours = Math.round(totalHours * 10) / 10;

    const deep = Math.round(totalHours * 0.2 * 10) / 10;
    const rem = Math.round(totalHours * 0.25 * 10) / 10;
    const light = Math.round((totalHours - deep - rem) * 10) / 10;

    dispatch({
      type: 'LOG_SLEEP',
      payload: {
        date: new Date().toISOString().split('T')[0],
        bedtime,
        wakeTime,
        totalHours,
        quality: quality as 1 | 2 | 3 | 4 | 5,
        deep,
        light,
        rem,
      },
    });
    setShowForm(false);
    setBedtime('');
    setWakeTime('');
    setQuality(3);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sleep Tracker</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Weekly Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Last 7 Nights</Text>
          <View style={styles.chartWrapper}>
            <Svg width={chartWidth} height={chartHeight + 24}>
              {last7.map((log, i) => {
                const barH = (log.totalHours / maxHours) * chartHeight;
                const x = i * (barWidth + barGap);
                const y = chartHeight - barH;
                return (
                  <React.Fragment key={log.date}>
                    <Rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      rx={4}
                      fill={getQualityColor(log.quality)}
                    />
                    <SvgText
                      x={x + barWidth / 2}
                      y={chartHeight + 16}
                      fill={colors.text.secondary}
                      fontSize={11}
                      textAnchor="middle"
                    >
                      {getDayLabel(log.date)}
                    </SvgText>
                  </React.Fragment>
                );
              })}
            </Svg>
          </View>
        </View>

        {/* Last Night Detail */}
        {lastNight && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Last Night</Text>
            <View style={styles.row}>
              <View style={styles.timeBlock}>
                <Text style={styles.label}>Bedtime</Text>
                <Text style={styles.timeValue}>{lastNight.bedtime}</Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.label}>Wake</Text>
                <Text style={styles.timeValue}>{lastNight.wakeTime}</Text>
              </View>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalHours}>{lastNight.totalHours}</Text>
              <Text style={styles.hoursLabel}>hours</Text>
            </View>
            {/* Star Rating */}
            <View style={styles.starsRow}>
              <Text style={styles.label}>Quality</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= lastNight.quality ? 'star' : 'star-outline'}
                    size={22}
                    color={colors.accent.primary}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
            {/* Sleep Breakdown */}
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownItem}>
                <View style={[styles.dot, { backgroundColor: '#4A90D9' }]} />
                <Text style={styles.breakdownLabel}>Deep</Text>
                <Text style={styles.breakdownValue}>{lastNight.deep}h</Text>
              </View>
              <View style={styles.breakdownItem}>
                <View style={[styles.dot, { backgroundColor: colors.text.secondary }]} />
                <Text style={styles.breakdownLabel}>Light</Text>
                <Text style={styles.breakdownValue}>{lastNight.light}h</Text>
              </View>
              <View style={styles.breakdownItem}>
                <View style={[styles.dot, { backgroundColor: '#D9A8FF' }]} />
                <Text style={styles.breakdownLabel}>REM</Text>
                <Text style={styles.breakdownValue}>{lastNight.rem}h</Text>
              </View>
            </View>
          </View>
        )}

        {/* Log Sleep Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.primaryButtonText}>
            {showForm ? 'Cancel' : 'Log Sleep'}
          </Text>
        </TouchableOpacity>

        {/* Inline Form */}
        {showForm && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Log Sleep</Text>
            <Text style={styles.label}>Bedtime (HH:MM)</Text>
            <TextInput
              style={styles.input}
              value={bedtime}
              onChangeText={setBedtime}
              placeholder="23:00"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numbers-and-punctuation"
            />
            <Text style={styles.label}>Wake Time (HH:MM)</Text>
            <TextInput
              style={styles.input}
              value={wakeTime}
              onChangeText={setWakeTime}
              placeholder="07:00"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numbers-and-punctuation"
            />
            <Text style={styles.label}>Quality</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setQuality(s)}>
                  <Ionicons
                    name={s <= quality ? 'star' : 'star-outline'}
                    size={32}
                    color={colors.accent.primary}
                    style={{ marginRight: 6 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
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
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chartContainer: {
    marginBottom: spacing.lg,
  },
  chartWrapper: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.card.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  timeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  timeValue: {
    ...typography.sectionHeader,
    color: colors.text.primary,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  totalHours: {
    ...typography.metricValue,
    color: colors.text.primary,
  },
  hoursLabel: {
    ...typography.metricUnit,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  breakdownLabel: {
    ...typography.subLabel,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  breakdownValue: {
    ...typography.body,
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
  input: {
    backgroundColor: colors.card.secondary,
    borderRadius: spacing.sm,
    padding: spacing.md,
    color: colors.text.primary,
    ...typography.body,
    marginBottom: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});

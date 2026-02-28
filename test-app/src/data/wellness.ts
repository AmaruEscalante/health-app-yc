import { SleepLog, StressEntry, MeditationSession, JournalEntry } from './types';

function generateSleepLogs(): SleepLog[] {
  const logs: SleepLog[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const hours = 5.5 + Math.random() * 3;
    logs.push({
      date: date.toISOString().split('T')[0],
      bedtime: `${22 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '30' : '00'}`,
      wakeTime: `${6 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '15' : '00'}`,
      totalHours: Math.round(hours * 10) / 10,
      quality: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
      deep: Math.round(hours * 0.2 * 10) / 10,
      light: Math.round(hours * 0.5 * 10) / 10,
      rem: Math.round(hours * 0.3 * 10) / 10,
    });
  }
  return logs;
}

export const mockSleepLogs = generateSleepLogs();
export const mockMeditationStreak = 12;

export const mockStressEntries: StressEntry[] = [
  { date: new Date().toISOString().split('T')[0], level: 6, mood: 'Anxious', notes: 'Busy day at work' },
  { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], level: 4, mood: 'Calm' },
  { date: new Date(Date.now() - 172800000).toISOString().split('T')[0], level: 7, mood: 'Stressed', notes: 'Deadline pressure' },
];

export const mockMeditationSessions: MeditationSession[] = [
  { date: new Date().toISOString().split('T')[0], durationMin: 10, type: 'guided' },
  { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], durationMin: 5, type: 'unguided' },
  { date: new Date(Date.now() - 172800000).toISOString().split('T')[0], durationMin: 15, type: 'guided' },
];

export const mockJournal: JournalEntry[] = [
  { id: 'j1', date: new Date().toISOString().split('T')[0], content: 'Had a productive morning. Meditation helped me focus throughout the day. Need to work on managing afternoon stress better.', moodTags: ['Focused', 'Productive'] },
  { id: 'j2', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], content: 'Struggled with sleep last night. Going to try limiting screen time before bed.', moodTags: ['Tired', 'Reflective'] },
  { id: 'j3', date: new Date(Date.now() - 259200000).toISOString().split('T')[0], content: 'Great weekend hike. Nature really helps with stress levels.', moodTags: ['Happy', 'Relaxed'] },
];

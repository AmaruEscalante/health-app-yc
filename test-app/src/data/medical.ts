import { VitalReading, Medication, Appointment } from './types';

function generateVitals(): VitalReading[] {
  const readings: VitalReading[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    readings.push({
      date: date.toISOString().split('T')[0],
      systolic: 125 + Math.floor(Math.random() * 20),
      diastolic: 78 + Math.floor(Math.random() * 12),
      heartRate: 65 + Math.floor(Math.random() * 15),
      weight: 183 + Math.floor(Math.random() * 4),
    });
  }
  return readings;
}

export const mockVitals = generateVitals();

export const mockMedications: Medication[] = [
  { id: 'med1', name: 'Lisinopril', dosage: '10mg', frequency: 'daily', time: '08:00', reminderEnabled: true },
  { id: 'med2', name: 'Metformin', dosage: '500mg', frequency: 'twice daily', time: '08:00', reminderEnabled: true },
  { id: 'med3', name: 'Aspirin', dosage: '81mg', frequency: 'daily', time: '08:00', reminderEnabled: false },
  { id: 'med4', name: 'Vitamin D', dosage: '2000 IU', frequency: 'daily', time: '08:00', reminderEnabled: false },
];

export const mockAppointments: Appointment[] = [
  { id: 'apt1', doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', date: '2026-03-05', time: '10:00', location: 'Heart Health Center, Suite 200', reason: 'Quarterly checkup' },
  { id: 'apt2', doctor: 'Dr. James Wilson', specialty: 'Primary Care', date: '2026-03-15', time: '14:30', location: 'Family Medical Group', reason: 'Annual physical' },
  { id: 'apt3', doctor: 'Dr. Lisa Park', specialty: 'Endocrinologist', date: '2026-04-02', time: '09:00', location: 'Metro Endocrine Clinic', reason: 'Diabetes follow-up' },
];

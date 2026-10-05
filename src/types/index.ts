export type TabType = 'home' | 'medicines' | 'health' | 'ai' | 'profile' | 'caregiver';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string; // e.g. "১ ট্যাবলেট"
  strength: string; // e.g. "500mg"
  time: string; // "8:00 PM"
  timeBangla: string; // "রাত ৮:০০"
  mealTiming: 'before_meal' | 'after_meal' | 'with_meal';
  mealTimingBangla: string; // "খাবারের পরে"
  status: 'upcoming' | 'taken' | 'skipped';
  frequency: string; // "প্রতিদিন ১ বার"
  duration: string; // "৭ দিন"
  category: 'fever' | 'gastric' | 'vitamin' | 'diabetes' | 'pressure' | 'other';
  takenAt?: string;
  notes?: string;
}

export interface HealthMetric {
  id: string;
  name: string;
  nameBangla: string;
  value: string;
  unit: string;
  status: 'normal' | 'attention' | 'optimal';
  statusBangla: string;
  trend: 'up' | 'down' | 'stable';
  trendText: string;
  history: { day: string; value: number; label?: string }[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  doctorNameBangla: string;
  specialty: string;
  specialtyBangla: string;
  hospital: string;
  hospitalBangla: string;
  date: string;
  time: string;
  serialNo: string;
  location: string;
  phone: string;
  status: 'upcoming' | 'completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  suggestions?: string[];
  isVoice?: boolean;
}

export interface MedicalReport {
  id: string;
  title: string;
  titleBangla: string;
  date: string;
  labName: string;
  fileType: 'PDF' | 'JPG' | 'PNG';
  summary: string;
  parameters: {
    name: string;
    value: string;
    unit: string;
    range: string;
    status: 'normal' | 'low' | 'high';
    explanation: string;
  }[];
}

export interface FamilyActivity {
  id: string;
  title: string;
  time: string;
  type: 'taken' | 'bp' | 'pending';
  medicineName?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  relationBangla: string;
  age: number;
  phone: string;
  status: 'Active' | 'Resting';
  statusBangla: string;
  adherenceRate: number;
  totalDoses: number;
  takenDoses: number;
  recentActivity: FamilyActivity[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'medicine' | 'appointment' | 'alert' | 'family';
  read: boolean;
}

export interface UserSettings {
  language: 'bn' | 'en';
  largeText: boolean;
  highContrast: boolean;
  voiceAssistant: boolean;
  audioFeedback: boolean;
  screenReader: boolean;
}

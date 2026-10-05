import React, { useState, useEffect } from 'react';
import { TabType, Medicine, HealthMetric, Appointment, NotificationItem, UserSettings } from './types';
import {
  initialMedicines,
  initialHealthMetrics,
  upcomingAppointment,
  initialNotifications,
} from './data/mockData';
import { Header } from './components/common/Header';
import { BottomNavigation } from './components/common/BottomNavigation';
import { SidebarNavigation } from './components/common/SidebarNavigation';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { HomeDashboard } from './components/home/HomeDashboard';
import { MedicinesView } from './components/medicine/MedicinesView';
import { AddMedicineModal } from './components/medicine/AddMedicineModal';
import { HealthOverview } from './components/health/HealthOverview';
import { MedicalReportsModal } from './components/health/MedicalReportsModal';
import { AppointmentModal } from './components/health/AppointmentModal';
import { AIChatView } from './components/ai/AIChatView';
import { VoiceAssistantModal } from './components/ai/VoiceAssistantModal';
import { AIFeaturesShowcase } from './components/ai/AIFeaturesShowcase';
import { CaregiverView } from './components/caregiver/CaregiverView';
import { EmergencySOSModal } from './components/emergency/EmergencySOSModal';
import { ProfileView } from './components/profile/ProfileView';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

export default function App() {
  // Navigation & View States
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // App Data States
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [metrics, setMetrics] = useState<HealthMetric[]>(initialHealthMetrics);
  const [appointment, setAppointment] = useState<Appointment>(upcomingAppointment);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // User Settings & Accessibility
  const [settings, setSettings] = useState<UserSettings>({
    language: 'bn',
    largeText: false,
    highContrast: false,
    voiceAssistant: true,
    audioFeedback: true,
    screenReader: false,
  });

  // Modal Visibility States
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isVoiceModeOpen, setIsVoiceModeOpen] = useState<boolean>(false);
  const [isAIFeaturesOpen, setIsAIFeaturesOpen] = useState<boolean>(false);
  const [isReportsOpen, setIsReportsOpen] = useState<boolean>(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync Accessibility Classes to DOM body
  useEffect(() => {
    if (settings.largeText) {
      document.body.classList.add('accessibility-large-text');
    } else {
      document.body.classList.remove('accessibility-large-text');
    }

    if (settings.highContrast) {
      document.body.classList.add('accessibility-high-contrast');
    } else {
      document.body.classList.remove('accessibility-high-contrast');
    }
  }, [settings.largeText, settings.highContrast]);

  // Medicine Actions
  const handleMarkTaken = (id: string) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const nowStr = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
          addToast('ওষুধ সম্পন্ন ✓', `${med.name} সময়মতো গ্রহণ করা হয়েছে।`, 'success');
          return {
            ...med,
            status: 'taken',
            takenAt: nowStr,
          };
        }
        return med;
      })
    );
  };

  const handleSkipMedicine = (id: string) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          addToast('ওষুধ বাদ দেওয়া হয়েছে', `${med.name} আজকের জন্য স্কিপ করা হলো।`, 'info');
          return {
            ...med,
            status: 'skipped',
          };
        }
        return med;
      })
    );
  };

  const handleAddMedicine = (newMed: Medicine) => {
    setMedicines((prev) => [newMed, ...prev]);
    addToast('নতুন ওষুধ যুক্ত হয়েছে', `${newMed.name} সফলভাবে আপনার রুটিনে যোগ হয়েছে।`, 'success');
  };

  const handleAddMultipleMedicines = (newMeds: Medicine[]) => {
    setMedicines((prev) => [...newMeds, ...prev]);
    addToast('প্রেসক্রিপশন সিঙ্ক সম্পন্ন', `${newMeds.length}টি ওষুধ শিডিউলে যোগ করা হয়েছে।`, 'success');
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('বিজ্ঞপ্তি হালনাগাদ', 'সব নোটিফিকেশন পড়া হয়েছে চিহ্নিত করা হয়েছে।', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const pendingMedicineCount = medicines.filter((m) => m.status === 'upcoming').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Onboarding Dialog */}
      {showOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Main Responsive Layout Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar Navigation */}
        <SidebarNavigation
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onTriggerSOS={() => setIsEmergencyOpen(true)}
          onOpenReportModal={() => setIsReportsOpen(true)}
          pendingMedicineCount={pendingMedicineCount}
          isMobilePreviewMode={isMobileFrameMode}
          onToggleMobilePreview={() => setIsMobileFrameMode((prev) => !prev)}
        />

        {/* Content Container (Adaptive full-width or Mobile Device Frame on Desktop) */}
        <div className={`flex-1 flex flex-col min-w-0 ${isMobileFrameMode ? 'p-4 sm:p-8 flex items-center justify-center' : ''}`}>
          <div
            className={`w-full flex-1 flex flex-col transition-all duration-300 ${
              isMobileFrameMode
                ? 'max-w-[420px] bg-white rounded-[40px] shadow-2xl border-[8px] border-slate-900 overflow-hidden min-h-[780px]'
                : ''
            }`}
          >
            {/* Top Bar Header */}
            <Header
              currentTab={currentTab}
              unreadCount={unreadNotificationsCount}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              onOpenAiAssistant={() => {
                setCurrentTab('ai');
              }}
              onNavigateTab={setCurrentTab}
              largeText={settings.largeText}
            />

            {/* Screen Content Viewport */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {currentTab === 'home' && (
                <HomeDashboard
                  medicines={medicines}
                  metrics={metrics}
                  appointment={appointment}
                  onMarkTaken={handleMarkTaken}
                  onSkip={handleSkipMedicine}
                  onOpenVoiceMode={() => setIsVoiceModeOpen(true)}
                  onOpenAiAssistant={() => setCurrentTab('ai')}
                  onOpenEmergency={() => setIsEmergencyOpen(true)}
                  onOpenAppointment={() => setIsAppointmentOpen(true)}
                  onOpenAddMedicine={() => setIsAddMedicineOpen(true)}
                  onNavigateTab={setCurrentTab}
                  largeText={settings.largeText}
                />
              )}

              {currentTab === 'medicines' && (
                <MedicinesView
                  medicines={medicines}
                  onMarkTaken={handleMarkTaken}
                  onSkip={handleSkipMedicine}
                  onOpenAddModal={() => setIsAddMedicineOpen(true)}
                  onOpenPrescriptionScan={() => setIsAddMedicineOpen(true)}
                  largeText={settings.largeText}
                />
              )}

              {currentTab === 'health' && (
                <HealthOverview
                  onOpenReportModal={() => setIsReportsOpen(true)}
                  onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
                  onOpenAiAssistant={() => setCurrentTab('ai')}
                  onToast={addToast}
                  largeText={settings.largeText}
                />
              )}

              {currentTab === 'ai' && (
                <AIChatView
                  onOpenVoiceMode={() => setIsVoiceModeOpen(true)}
                  onOpenFeaturesShowcase={() => setIsAIFeaturesOpen(true)}
                  largeText={settings.largeText}
                />
              )}

              {currentTab === 'caregiver' && (
                <CaregiverView
                  onToast={addToast}
                  largeText={settings.largeText}
                />
              )}

              {currentTab === 'profile' && (
                <ProfileView
                  settings={settings}
                  onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
                  onOpenCaregiver={() => setCurrentTab('caregiver')}
                  onOpenReports={() => setIsReportsOpen(true)}
                  onOpenFeatures={() => setIsAIFeaturesOpen(true)}
                  onReplayOnboarding={() => setShowOnboarding(true)}
                  onToast={addToast}
                />
              )}
            </main>

            {/* Mobile Fixed Bottom Navigation */}
            <BottomNavigation
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onTriggerSOS={() => setIsEmergencyOpen(true)}
              pendingMedicineCount={pendingMedicineCount}
            />
          </div>
        </div>
      </div>

      {/* Global Interactive Modals & Sheets */}
      <AddMedicineModal
        isOpen={isAddMedicineOpen}
        onClose={() => setIsAddMedicineOpen(false)}
        onAddMedicine={handleAddMedicine}
        onAddMultipleMedicines={handleAddMultipleMedicines}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModeOpen}
        onClose={() => setIsVoiceModeOpen(false)}
        onTranscriptReceived={(transcript) => {
          setCurrentTab('ai');
          addToast('ভয়েস কমান্ড গৃহীত', `"${transcript}" প্রক্রিয়াজাত করা হচ্ছে`, 'info');
        }}
      />

      <AIFeaturesShowcase
        isOpen={isAIFeaturesOpen}
        onClose={() => setIsAIFeaturesOpen(false)}
        onTriggerFeature={(featKey) => {
          if (featKey === 'voice') setIsVoiceModeOpen(true);
          else if (featKey === 'scanner') setIsAddMedicineOpen(true);
          else if (featKey === 'report') setIsReportsOpen(true);
          else if (featKey === 'assistant') setCurrentTab('ai');
          else if (featKey === 'analysis') setCurrentTab('medicines');
          else if (featKey === 'memory') setCurrentTab('health');
        }}
      />

      <MedicalReportsModal
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        appointment={appointment}
        onToast={addToast}
      />

      <EmergencySOSModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onToast={addToast}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onDismiss={handleDismissNotification}
      />
    </div>
  );
}

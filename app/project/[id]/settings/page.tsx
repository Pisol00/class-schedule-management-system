// app/project/[id]/settings/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

// Settings Components
import GeneralSettings from '@/components/project/settings/GeneralSettings';
import ScheduleSettings from '@/components/project/settings/ScheduleSettings';
import NotificationSettings from '@/components/project/settings/NotificationSettings';
import AccessControlSettings from '@/components/project/settings/AccessControlSettings';
import ExportImportSettings from '@/components/project/settings/ExportImportSettings';
import AdvancedSettings from '@/components/project/settings/AdvancedSettings';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
  description: string;
  component: React.ComponentType<any>;
  badge?: string;
}

const settingsTabs: SettingsTab[] = [
  {
    id: 'general',
    label: 'ตั้งค่าทั่วไป',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    description: 'ข้อมูลพื้นฐานของโครงการ',
    component: GeneralSettings
  },
  {
    id: 'schedule',
    label: 'ตั้งค่าตาราง',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    description: 'กำหนดเวลาและรูปแบบตาราง',
    component: ScheduleSettings
  },
  {
    id: 'notifications',
    label: 'การแจ้งเตือน',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    description: 'ตั้งค่าการแจ้งเตือนและอีเมล',
    component: NotificationSettings,
    badge: '3'
  },
  {
    id: 'access',
    label: 'สิทธิ์การเข้าถึง',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    description: 'จัดการสิทธิ์ผู้ใช้งาน',
    component: AccessControlSettings
  },
  {
    id: 'export',
    label: 'นำเข้า/ส่งออก',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
    description: 'ตั้งค่าการนำเข้าและส่งออกข้อมูล',
    component: ExportImportSettings
  },
  {
    id: 'advanced',
    label: 'ขั้นสูง',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description: 'ตั้งค่าขั้นสูงและการดูแลระบบ',
    component: AdvancedSettings
  }
];

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentTab = settingsTabs.find(tab => tab.id === activeTab);
  const CurrentComponent = currentTab?.component;

  const handleTabChange = (tabId: string) => {
    if (hasUnsavedChanges) {
      if (confirm('คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการออกจากหน้านี้หรือไม่?')) {
        setActiveTab(tabId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ตั้งค่าโครงการ</h1>
            <p className="text-gray-600 mt-1">
              จัดการและปรับแต่งการตั้งค่าต่างๆ ของโครงการ
            </p>
          </div>
          
          {/* Save Indicator */}
          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-yellow-700 font-medium">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <motion.div
            className="bg-white rounded-2xl border border-gray-200 p-2 sticky top-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-1">
              {settingsTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-100'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    } transition-colors`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-sm truncate">
                          {tab.label}
                        </h3>
                        {tab.badge && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {tab.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200"
          >
            {CurrentComponent && (
              <CurrentComponent
                projectId={projectId}
                onUnsavedChanges={setHasUnsavedChanges}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Save Button */}
      {hasUnsavedChanges && (
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <button
            onClick={() => {
              // Save logic here
              setHasUnsavedChanges(false);
              alert('บันทึกการตั้งค่าสำเร็จ!');
            }}
            className="flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium">บันทึกการเปลี่ยนแปลง</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
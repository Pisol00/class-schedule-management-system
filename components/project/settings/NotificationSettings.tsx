'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NotificationSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface NotificationConfig {
  emailNotifications: {
    enabled: boolean;
    scheduleChanges: boolean;
    conflicts: boolean;
    assignments: boolean;
    deadlines: boolean;
    systemUpdates: boolean;
  };
  inAppNotifications: {
    enabled: boolean;
    scheduleChanges: boolean;
    conflicts: boolean;
    assignments: boolean;
    deadlines: boolean;
    mentions: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    urgent: boolean;
    daily: boolean;
  };
  notificationTiming: {
    quietHours: boolean;
    quietStart: string;
    quietEnd: string;
    frequency: 'immediate' | 'hourly' | 'daily';
  };
  recipients: {
    coordinators: boolean;
    instructors: boolean;
    admins: boolean;
    students: boolean;
  };
}

const initialNotificationSettings: NotificationConfig = {
  emailNotifications: {
    enabled: true,
    scheduleChanges: true,
    conflicts: true,
    assignments: true,
    deadlines: true,
    systemUpdates: false
  },
  inAppNotifications: {
    enabled: true,
    scheduleChanges: true,
    conflicts: true,
    assignments: true,
    deadlines: true,
    mentions: true
  },
  pushNotifications: {
    enabled: false,
    urgent: true,
    daily: false
  },
  notificationTiming: {
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    frequency: 'immediate'
  },
  recipients: {
    coordinators: true,
    instructors: true,
    admins: true,
    students: false
  }
};

export default function NotificationSettings({ projectId, onUnsavedChanges }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationConfig>(initialNotificationSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(initialNotificationSettings);
    onUnsavedChanges(hasChanges);
  }, [settings, onUnsavedChanges]);

  const handleNestedChange = (category: keyof NotificationConfig, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('บันทึกการตั้งค่าการแจ้งเตือนสำเร็จ!');
      onUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">การแจ้งเตือน</h2>
        <p className="text-gray-600">จัดการการแจ้งเตือนและการสื่อสารในโครงการ</p>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <section className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              การแจ้งเตือนทางอีเมล
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications.enabled}
                onChange={(e) => handleNestedChange('emailNotifications', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.emailNotifications.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              {Object.entries({
                scheduleChanges: 'การเปลี่ยนแปลงตาราง',
                conflicts: 'ความขัดแย้งในตาราง',
                assignments: 'การมอบหมายงาน',
                deadlines: 'กำหนดส่งงาน',
                systemUpdates: 'อัพเดทระบบ'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-700">{label}</span>
                  <input
                    type="checkbox"
                    checked={(settings.emailNotifications as any)[key]}
                    onChange={(e) => handleNestedChange('emailNotifications', key, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </section>

        {/* In-App Notifications */}
        <section className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              การแจ้งเตือนในแอป
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.inAppNotifications.enabled}
                onChange={(e) => handleNestedChange('inAppNotifications', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          {settings.inAppNotifications.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              {Object.entries({
                scheduleChanges: 'การเปลี่ยนแปลงตาราง',
                conflicts: 'ความขัดแย้งในตาราง',
                assignments: 'การมอบหมายงาน',
                deadlines: 'กำหนดส่งงาน',
                mentions: 'การกล่าวถึงในความคิดเห็น'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-700">{label}</span>
                  <input
                    type="checkbox"
                    checked={(settings.inAppNotifications as any)[key]}
                    onChange={(e) => handleNestedChange('inAppNotifications', key, e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Notification Timing */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            เวลาการแจ้งเตือน
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความถี่การแจ้งเตือน
                </label>
                <select
                  value={settings.notificationTiming.frequency}
                  onChange={(e) => handleNestedChange('notificationTiming', 'frequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="immediate">ทันที</option>
                  <option value="hourly">ทุกชั่วโมง</option>
                  <option value="daily">ทุกวัน</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">เงียบในช่วงเวลาที่กำหนด</h4>
                  <p className="text-sm text-gray-600">ไม่แจ้งเตือนในช่วงเวลาพักผ่อน</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationTiming.quietHours}
                    onChange={(e) => handleNestedChange('notificationTiming', 'quietHours', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {settings.notificationTiming.quietHours && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เริ่มเวลาเงียบ
                  </label>
                  <input
                    type="time"
                    value={settings.notificationTiming.quietStart}
                    onChange={(e) => handleNestedChange('notificationTiming', 'quietStart', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สิ้นสุดเวลาเงียบ
                  </label>
                  <input
                    type="time"
                    value={settings.notificationTiming.quietEnd}
                    onChange={(e) => handleNestedChange('notificationTiming', 'quietEnd', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setSettings(initialNotificationSettings)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            รีเซ็ต
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            {isLoading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>บันทึกการตั้งค่า</span>
          </button>
        </div>
      </div>
    </div>
  );
}
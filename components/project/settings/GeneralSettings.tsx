// components/project/settings/GeneralSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GeneralSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface ProjectSettings {
  title: string;
  description: string;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  timezone: string;
  language: string;
  department: string;
  coordinator: string;
  email: string;
  phone: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  isPublic: boolean;
  allowExternalAccess: boolean;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

const initialSettings: ProjectSettings = {
  title: 'ภาคการศึกษา 1/2567',
  description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 1 ปีการศึกษา 2567',
  academicYear: '2567',
  semester: '1',
  startDate: '2024-08-19',
  endDate: '2024-12-20',
  timezone: 'Asia/Bangkok',
  language: 'th',
  department: 'คณะเทคโนโลยีสารสนเทศ',
  coordinator: 'อาจารย์สมชาย ใจดี',
  email: 'coordinator@it.kmitl.ac.th',
  phone: '02-329-8000 ต่อ 6900',
  status: 'active',
  isPublic: true,
  allowExternalAccess: false,
  autoBackup: true,
  backupFrequency: 'weekly'
};

export default function GeneralSettings({ projectId, onUnsavedChanges }: GeneralSettingsProps) {
  const [settings, setSettings] = useState<ProjectSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(initialSettings);
    onUnsavedChanges(hasChanges);
  }, [settings, onUnsavedChanges]);

  const handleInputChange = (field: keyof ProjectSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!settings.title.trim()) {
      newErrors.title = 'กรุณากรอกชื่อโครงการ';
    }
    if (!settings.description.trim()) {
      newErrors.description = 'กรุณากรอกคำอธิบายโครงการ';
    }
    if (!settings.startDate) {
      newErrors.startDate = 'กรุณาเลือกวันที่เริ่มต้น';
    }
    if (!settings.endDate) {
      newErrors.endDate = 'กรุณาเลือกวันที่สิ้นสุด';
    }
    if (settings.startDate && settings.endDate && new Date(settings.startDate) >= new Date(settings.endDate)) {
      newErrors.endDate = 'วันที่สิ้นสุดต้องหลังจากวันที่เริ่มต้น';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update initial settings to match current settings
      // initialSettings = { ...settings }; // In real app, this would be handled by state management
      
      alert('บันทึกการตั้งค่าสำเร็จ!');
      onUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: 'draft', label: 'แบบร่าง', color: 'text-gray-600' },
    { value: 'active', label: 'กำลังดำเนินการ', color: 'text-green-600' },
    { value: 'completed', label: 'เสร็จสิ้น', color: 'text-blue-600' },
    { value: 'archived', label: 'เก็บถาวร', color: 'text-gray-600' }
  ];

  const semesterOptions = [
    { value: '1', label: 'ภาคการศึกษาที่ 1' },
    { value: '2', label: 'ภาคการศึกษาที่ 2' },
    { value: '3', label: 'ภาคฤดูร้อน' }
  ];

  const languageOptions = [
    { value: 'th', label: 'ไทย' },
    { value: 'en', label: 'English' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'ทุกวัน' },
    { value: 'weekly', label: 'ทุกสัปดาห์' },
    { value: 'monthly', label: 'ทุกเดือน' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ตั้งค่าทั่วไป</h2>
        <p className="text-gray-600">จัดการข้อมูลพื้นฐานและการตั้งค่าหลักของโครงการ</p>
      </div>

      <div className="space-y-8">
        {/* Project Information Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ข้อมูลโครงการ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อโครงการ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="กรอกชื่อโครงการ"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานะโครงการ
              </label>
              <select
                value={settings.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คำอธิบายโครงการ <span className="text-red-500">*</span>
              </label>
              <textarea
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="กรอกคำอธิบายโครงการ"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Academic Information Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ข้อมูลการศึกษา
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปีการศึกษา
              </label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) => handleInputChange('academicYear', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น 2567"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ภาคการศึกษา
              </label>
              <select
                value={settings.semester}
                onChange={(e) => handleInputChange('semester', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {semesterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่เริ่มต้น <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={settings.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.startDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่สิ้นสุด <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={settings.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.endDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
        </motion.section>



        {/* System Settings Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            </svg>
            ตั้งค่าระบบ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ภาษา
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เขตเวลา
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Asia/Bangkok">เวลาไทย (UTC+7)</option>
                <option value="UTC">UTC (GMT+0)</option>
              </select>
            </div>

            {/* Settings Toggles */}
            <div className="md:col-span-2 space-y-4">
              {/* Public Access */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">เข้าถึงได้สาธารณะ</h4>
                  <p className="text-sm text-gray-600">อนุญาตให้ผู้ใช้ทั่วไปเข้าดูตารางได้</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.isPublic}
                    onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* External Access */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">การเข้าถึงจากภายนอก</h4>
                  <p className="text-sm text-gray-600">อนุญาตให้เข้าถึงผ่าน API หรือ Integration</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowExternalAccess}
                    onChange={(e) => handleInputChange('allowExternalAccess', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto Backup */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">สำรองข้อมูลอัตโนมัติ</h4>
                  <p className="text-sm text-gray-600">สำรองข้อมูลโครงการโดยอัตโนมัติ</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Backup Frequency */}
              {settings.autoBackup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ความถี่ในการสำรองข้อมูล
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                    className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {backupFrequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end space-x-4 pt-6 border-t border-gray-200"
        >
          <button
            type="button"
            onClick={() => setSettings(initialSettings)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            รีเซ็ต
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isLoading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>บันทึกการตั้งค่า</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
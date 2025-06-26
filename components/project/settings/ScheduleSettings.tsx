// components/project/settings/ScheduleSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScheduleSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface TimeSlot {
  id: string;
  label: string;
  start: string;
  end: string;
  isActive: boolean;
}

interface ScheduleConfig {
  workingDays: string[];
  timeSlots: TimeSlot[];
  defaultPeriodDuration: number; // in minutes
  breakDuration: number; // in minutes
  lunchBreakStart: string;
  lunchBreakEnd: string;
  allowOverlapping: boolean;
  allowWeekendClasses: boolean;
  autoConflictDetection: boolean;
  maxConsecutivePeriods: number;
  minBreakBetweenClasses: number;
  roomBookingBuffer: number; // minutes before/after class
  enableBlockScheduling: boolean;
  defaultClassDuration: {
    lecture: number;
    lab: number;
    seminar: number;
  };
  schedulingRules: {
    enforceInstructorLimit: boolean;
    maxHoursPerDay: number;
    maxHoursPerWeek: number;
    allowBackToBackClasses: boolean;
    preferredTeachingDays: string[];
  };
}

const defaultTimeSlots: TimeSlot[] = [
  { id: '1', label: 'คาบที่ 1', start: '08:00', end: '09:00', isActive: true },
  { id: '2', label: 'คาบที่ 2', start: '09:00', end: '10:00', isActive: true },
  { id: '3', label: 'คาบที่ 3', start: '10:00', end: '11:00', isActive: true },
  { id: '4', label: 'คาบที่ 4', start: '11:00', end: '12:00', isActive: true },
  { id: '5', label: 'พักกลางวัน', start: '12:00', end: '13:00', isActive: false },
  { id: '6', label: 'คาบที่ 5', start: '13:00', end: '14:00', isActive: true },
  { id: '7', label: 'คาบที่ 6', start: '14:00', end: '15:00', isActive: true },
  { id: '8', label: 'คาบที่ 7', start: '15:00', end: '16:00', isActive: true },
  { id: '9', label: 'คาบที่ 8', start: '16:00', end: '17:00', isActive: true },
  { id: '10', label: 'คาบที่ 9', start: '17:00', end: '18:00', isActive: false },
  { id: '11', label: 'คาบที่ 10', start: '18:00', end: '19:00', isActive: false },
  { id: '12', label: 'คาบที่ 11', start: '19:00', end: '20:00', isActive: false },
  { id: '13', label: 'คาบที่ 12', start: '20:00', end: '21:00', isActive: false }
];

const initialSettings: ScheduleConfig = {
  workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  timeSlots: defaultTimeSlots,
  defaultPeriodDuration: 60,
  breakDuration: 10,
  lunchBreakStart: '12:00',
  lunchBreakEnd: '13:00',
  allowOverlapping: false,
  allowWeekendClasses: false,
  autoConflictDetection: true,
  maxConsecutivePeriods: 4,
  minBreakBetweenClasses: 10,
  roomBookingBuffer: 15,
  enableBlockScheduling: true,
  defaultClassDuration: {
    lecture: 60,
    lab: 180,
    seminar: 120
  },
  schedulingRules: {
    enforceInstructorLimit: true,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 40,
    allowBackToBackClasses: true,
    preferredTeachingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  }
};

const dayOptions = [
  { id: 'monday', label: 'จันทร์', shortLabel: 'จ.' },
  { id: 'tuesday', label: 'อังคาร', shortLabel: 'อ.' },
  { id: 'wednesday', label: 'พุธ', shortLabel: 'พ.' },
  { id: 'thursday', label: 'พฤหัสบดี', shortLabel: 'พฤ.' },
  { id: 'friday', label: 'ศุกร์', shortLabel: 'ศ.' },
  { id: 'saturday', label: 'เสาร์', shortLabel: 'ส.' },
  { id: 'sunday', label: 'อาทิตย์', shortLabel: 'อา.' }
];

export default function ScheduleSettings({ projectId, onUnsavedChanges }: ScheduleSettingsProps) {
  const [settings, setSettings] = useState<ScheduleConfig>(initialSettings);
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(initialSettings);
    onUnsavedChanges(hasChanges);
  }, [settings, onUnsavedChanges]);

  const handleInputChange = (field: keyof ScheduleConfig, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parent: keyof ScheduleConfig, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [field]: value
      }
    }));
  };

  const toggleWorkingDay = (day: string) => {
    setSettings(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const toggleTimeSlot = (slotId: string) => {
    setSettings(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map(slot =>
        slot.id === slotId ? { ...slot, isActive: !slot.isActive } : slot
      )
    }));
  };

  const updateTimeSlot = (slotId: string, field: 'start' | 'end' | 'label', value: string) => {
    setSettings(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map(slot =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const addTimeSlot = () => {
    const lastSlot = settings.timeSlots[settings.timeSlots.length - 1];
    const newId = String(settings.timeSlots.length + 1);
    const startTime = lastSlot ? lastSlot.end : '21:00';
    const endTime = lastSlot ? 
      String(parseInt(lastSlot.end.split(':')[0]) + 1).padStart(2, '0') + ':00' : 
      '22:00';

    const newSlot: TimeSlot = {
      id: newId,
      label: `คาบที่ ${newId}`,
      start: startTime,
      end: endTime,
      isActive: false
    };

    setSettings(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, newSlot]
    }));
  };

  const removeTimeSlot = (slotId: string) => {
    setSettings(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter(slot => slot.id !== slotId)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('บันทึกการตั้งค่าตารางสำเร็จ!');
      onUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'พื้นฐาน', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'timeslots', label: 'คาบเรียน', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'rules', label: 'กฎการจัดตาราง', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'advanced', label: 'ขั้นสูง', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ตั้งค่าตาราง</h2>
        <p className="text-gray-600">กำหนดเวลา รูปแบบ และกฎเกณฑ์ในการจัดตารางเรียนการสอน</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'basic' && (
          <div className="space-y-8">
            {/* Working Days */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">วันเรียนการสอน</h3>
              <div className="grid grid-cols-7 gap-4">
                {dayOptions.map((day) => (
                  <motion.div
                    key={day.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      settings.workingDays.includes(day.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => toggleWorkingDay(day.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="font-medium">{day.shortLabel}</div>
                      <div className="text-xs mt-1">{day.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Basic Settings */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การตั้งค่าพื้นฐาน</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ระยะเวลาคาบเรียน (นาที)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="240"
                    step="15"
                    value={settings.defaultPeriodDuration}
                    onChange={(e) => handleInputChange('defaultPeriodDuration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ระยะเวลาพัก (นาที)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    step="5"
                    value={settings.breakDuration}
                    onChange={(e) => handleInputChange('breakDuration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    บัฟเฟอร์การจองห้อง (นาที)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    step="5"
                    value={settings.roomBookingBuffer}
                    onChange={(e) => handleInputChange('roomBookingBuffer', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Lunch Break */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">เวลาพักกลางวัน</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เริ่มพักกลางวัน
                    </label>
                    <input
                      type="time"
                      value={settings.lunchBreakStart}
                      onChange={(e) => handleInputChange('lunchBreakStart', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      สิ้นสุดพักกลางวัน
                    </label>
                    <input
                      type="time"
                      value={settings.lunchBreakEnd}
                      onChange={(e) => handleInputChange('lunchBreakEnd', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Class Duration Settings */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">ระยะเวลาเรียนตามประเภท</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    บรรยาย (นาที)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="240"
                    step="15"
                    value={settings.defaultClassDuration.lecture}
                    onChange={(e) => handleNestedInputChange('defaultClassDuration', 'lecture', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ปฏิบัติการ (นาที)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="480"
                    step="15"
                    value={settings.defaultClassDuration.lab}
                    onChange={(e) => handleNestedInputChange('defaultClassDuration', 'lab', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สัมมนา (นาที)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="240"
                    step="15"
                    value={settings.defaultClassDuration.seminar}
                    onChange={(e) => handleNestedInputChange('defaultClassDuration', 'seminar', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'timeslots' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">จัดการคาบเรียน</h3>
              <button
                onClick={addTimeSlot}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>เพิ่มคาบเรียน</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-medium text-sm text-gray-700">
                <div>คาบที่</div>
                <div>เวลาเริ่มต้น</div>
                <div>เวลาสิ้นสุด</div>
                <div>สถานะ</div>
                <div>การกระทำ</div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {settings.timeSlots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50"
                  >
                    <div>
                      <input
                        type="text"
                        value={slot.label}
                        onChange={(e) => updateTimeSlot(slot.id, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(slot.id, 'start', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(slot.id, 'end', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <button
                        onClick={() => toggleTimeSlot(slot.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          slot.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {slot.isActive ? 'ใช้งาน' : 'ปิดใช้งาน'}
                      </button>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => removeTimeSlot(slot.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        disabled={settings.timeSlots.length <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-8">
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">กฎการจัดตาราง</h3>
              
              <div className="space-y-6">
                {/* Conflict Detection */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">ตรวจจับความขัดแย้งอัตโนมัติ</h4>
                    <p className="text-sm text-gray-600">ตรวจสอบความขัดแย้งของตารางโดยอัตโนมัติ</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoConflictDetection}
                      onChange={(e) => handleInputChange('autoConflictDetection', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Block Scheduling */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การจัดตารางแบบบล็อก</h4>
                    <p className="text-sm text-gray-600">จัดวิชาหลายคาบติดกันในบล็อกเดียว</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableBlockScheduling}
                      onChange={(e) => handleInputChange('enableBlockScheduling', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Instructor Rules */}
                <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                  <h4 className="font-medium text-gray-900">กฎเกณฑ์อาจารย์ผู้สอน</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        จำนวนชั่วโมงสูงสุดต่อวัน
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={settings.schedulingRules.maxHoursPerDay}
                        onChange={(e) => handleNestedInputChange('schedulingRules', 'maxHoursPerDay', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        จำนวนชั่วโมงสูงสุดต่อสัปดาห์
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={settings.schedulingRules.maxHoursPerWeek}
                        onChange={(e) => handleNestedInputChange('schedulingRules', 'maxHoursPerWeek', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">อนุญาตให้สอนคาบติดกัน</h5>
                      <p className="text-sm text-gray-600">อนุญาตให้อาจารย์สอนหลายคาบติดกันโดยไม่มีช่วงพัก</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.schedulingRules.allowBackToBackClasses}
                        onChange={(e) => handleNestedInputChange('schedulingRules', 'allowBackToBackClasses', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* General Rules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      จำนวนคาบติดกันสูงสุด
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={settings.maxConsecutivePeriods}
                      onChange={(e) => handleInputChange('maxConsecutivePeriods', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เวลาพักขั้นต่ำระหว่างคาบ (นาที)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      step="5"
                      value={settings.minBreakBetweenClasses}
                      onChange={(e) => handleInputChange('minBreakBetweenClasses', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-8">
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การตั้งค่าขั้นสูง</h3>
              
              <div className="space-y-6">
                {/* Weekend Classes */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">อนุญาตเรียนวันหยุดสุดสัปดาห์</h4>
                    <p className="text-sm text-gray-600">เปิดใช้งานการจัดตารางในวันเสาร์และอาทิตย์</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowWeekendClasses}
                      onChange={(e) => handleInputChange('allowWeekendClasses', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Overlapping Classes */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">อนุญาตเวลาซ้อนทับ</h4>
                    <p className="text-sm text-gray-600">อนุญาตให้เวลาเรียนของวิชาต่างๆ ซ้อนทับกันได้</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowOverlapping}
                      onChange={(e) => handleInputChange('allowOverlapping', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Algorithm Settings */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">การตั้งค่าอัลกอริทึม</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <h5 className="font-medium text-yellow-800">คำเตือน</h5>
                          <p className="text-sm text-yellow-700 mt-1">การเปลี่ยนแปลงการตั้งค่าขั้นสูงอาจส่งผลต่อประสิทธิภาพของระบบ กรุณาปรึกษาผู้ดูแลระบบก่อนทำการเปลี่ยนแปลง</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('การตั้งค่าอัลกอริทึมขั้นสูงจะเปิดในเร็วๆ นี้')}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
                    >
                      เปิดการตั้งค่าอัลกอริทึมขั้นสูง
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
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
      </div>
    </div>
  );
}
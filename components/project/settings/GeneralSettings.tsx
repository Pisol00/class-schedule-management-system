// components/project/settings/GeneralSettings.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  FolderOpen, 
  Calendar, 
  Archive, 
  Rocket, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Info,
  GraduationCap,
  Clock,
  AlertTriangle,
  Loader2
} from 'lucide-react';

interface GeneralSettingsProps {
  projectId: string;
  onUnsavedChanges?: (hasChanges: boolean) => void;
  onCalendarVisibilityChange?: (isVisible: boolean) => void;
}

interface ProjectSettings {
  title: string;
  description: string;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'archived';
}

const initialSettings: ProjectSettings = {
  title: 'ภาคการศึกษา 1/2567',
  description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 1 ปีการศึกษา 2567',
  academicYear: '2567',
  semester: '1',
  startDate: '2024-08-19',
  endDate: '2024-12-20',
  status: 'active'
};

export default function GeneralSettings({ 
  projectId, 
  onUnsavedChanges,
  onCalendarVisibilityChange
}: GeneralSettingsProps) {
  const [settings, setSettings] = useState<ProjectSettings>(initialSettings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Calendar modal states
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarField, setCalendarField] = useState<'startDate' | 'endDate' | 'range' | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  // Delete project modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Safe callback for unsaved changes
  const handleUnsavedChanges = useCallback((hasChanges: boolean) => {
    if (typeof onUnsavedChanges === 'function') {
      try {
        onUnsavedChanges(hasChanges);
      } catch (error) {
        console.warn('Error calling onUnsavedChanges:', error);
      }
    }
  }, [onUnsavedChanges]);

  // Check for unsaved changes
  useEffect(() => {
    try {
      const hasChanges = JSON.stringify(settings) !== JSON.stringify(initialSettings);
      handleUnsavedChanges(hasChanges);
    } catch (error) {
      console.warn('Error checking unsaved changes:', error);
    }
  }, [settings, handleUnsavedChanges]);

  // Track calendar visibility
  useEffect(() => {
    if (typeof onCalendarVisibilityChange === 'function') {
      try {
        onCalendarVisibilityChange(showCalendar || showDeleteModal);
      } catch (error) {
        console.warn('Error calling onCalendarVisibilityChange:', error);
      }
    }
  }, [showCalendar, showDeleteModal, onCalendarVisibilityChange]);

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

  // Delete project functions
  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setDeleteConfirmText('');
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText('');
    setIsDeleting(false);
    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  const handleDeleteProject = async () => {
    if (deleteConfirmText !== settings.title) {
      return;
    }

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('โปรเจคถูกลบเรียบร้อยแล้ว');
      // Redirect to projects list
      window.location.href = '/projects';
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบโปรเจค');
      setIsDeleting(false);
    }
  };

  const isDeleteConfirmValid = deleteConfirmText === settings.title;

  // Calendar functions
  const openCalendar = (field: 'startDate' | 'endDate' | 'range') => {
    setCalendarField(field);
    setIsSelectingRange(field === 'range');
    
    if (field === 'range') {
      // Range selection mode
      const startValue = settings.startDate ? new Date(settings.startDate) : null;
      const endValue = settings.endDate ? new Date(settings.endDate) : null;
      setTempStartDate(startValue);
      setTempEndDate(endValue);
      setCurrentMonth(startValue || new Date());
    } else {
      // Single date selection
      const currentValue = settings[field];
      if (currentValue) {
        const date = new Date(currentValue);
        setCurrentMonth(date);
        setSelectedDate(date);
      } else {
        setCurrentMonth(new Date());
        setSelectedDate(null);
      }
    }
    setShowCalendar(true);
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false);
    setCalendarField(null);
    setSelectedDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setIsSelectingRange(false);
    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  const confirmDate = () => {
    if (isSelectingRange && tempStartDate && tempEndDate) {
      // Confirm range selection
      const startString = tempStartDate.toISOString().split('T')[0];
      const endString = tempEndDate.toISOString().split('T')[0];
      handleInputChange('startDate', startString);
      handleInputChange('endDate', endString);
      closeCalendar();
    } else if (selectedDate && calendarField && calendarField !== 'range') {
      // Confirm single date selection
      const dateString = selectedDate.toISOString().split('T')[0];
      handleInputChange(calendarField, dateString);
      closeCalendar();
    }
  };

  const handleDateClick = (date: Date) => {
    if (isSelectingRange) {
      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        // Start new range selection
        setTempStartDate(date);
        setTempEndDate(null);
      } else if (tempStartDate && !tempEndDate) {
        // Complete range selection
        if (date < tempStartDate) {
          setTempStartDate(date);
          setTempEndDate(tempStartDate);
        } else {
          setTempEndDate(date);
        }
      }
    } else {
      setSelectedDate(date);
    }
  };

  const formatDateThai = (dateString: string) => {
    if (!dateString) return 'เลือกวันที่';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = () => {
    if (!settings.startDate || !settings.endDate) return 'เลือกช่วงวันที่';
    const startDate = new Date(settings.startDate);
    const endDate = new Date(settings.endDate);
    
    const startStr = startDate.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short'
    });
    const endStr = endDate.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    return `${startStr} - ${endStr}`;
  };

  // Quick date presets
  const getAcademicYearPresets = () => {
    return [
      {
        label: 'ภาคเรียนที่ 1/2567',
        startDate: new Date(2024, 7, 19), // August 19, 2024
        endDate: new Date(2024, 11, 20), // December 20, 2024
      },
      {
        label: 'ภาคเรียนที่ 2/2567',
        startDate: new Date(2025, 0, 13), // January 13, 2025
        endDate: new Date(2025, 4, 16), // May 16, 2025
      },

    ];
  };

  const applyPreset = (preset: { startDate: Date; endDate: Date }) => {
    setTempStartDate(preset.startDate);
    setTempEndDate(preset.endDate);
  };

  // Check if date is in range
  const isDateInRange = (date: Date) => {
    if (!tempStartDate || !tempEndDate) return false;
    return date >= tempStartDate && date <= tempEndDate;
  };

  // Check if date is range boundary
  const isRangeBoundary = (date: Date) => {
    if (!tempStartDate && !tempEndDate) return false;
    return (tempStartDate && date.getTime() === tempStartDate.getTime()) ||
           (tempEndDate && date.getTime() === tempEndDate.getTime());
  };

  // Get days count between dates
  const getDaysBetween = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const statusOptions = [
    { value: 'active', label: 'กำลังดำเนินการ', color: 'bg-green-50 text-green-700 border-green-200', icon: Rocket },
    { value: 'completed', label: 'เสร็จสิ้น', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FolderOpen },
    { value: 'archived', label: 'เก็บถาวร', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Archive }
  ];

  const semesterOptions = [
    { value: '1', label: 'ภาคการศึกษาที่ 1' },
    { value: '2', label: 'ภาคการศึกษาที่ 2' },
  ];

  return (
    <div className="relative">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Project Information Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">ข้อมูลโครงการ</h3>
                <p className="text-slate-600">ข้อมูลพื้นฐานและรายละเอียดของโครงการ</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-3 space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    ชื่อโครงการ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={settings.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md hover:bg-white/90 ${
                      errors.title ? 'border-red-300 bg-red-50/80 hover:border-red-400' : 'border-slate-200/60 hover:border-blue-300'
                    }`}
                    placeholder="กรอกชื่อโครงการ"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    คำอธิบายโครงการ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={settings.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm hover:shadow-md hover:bg-white/90 ${
                      errors.description ? 'border-red-300 bg-red-50/80 hover:border-red-400' : 'border-slate-200/60 hover:border-blue-300'
                    }`}
                    placeholder="กรอกคำอธิบายโครงการ"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Status */}
              <div className="space-y-6">
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    สถานะโครงการ
                  </label>
                  <div className="space-y-3">
                    {statusOptions.map(option => {
                      const IconComponent = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:shadow-md hover:scale-[1.02] ${
                            settings.status === option.value
                              ? 'border-blue-300 bg-blue-50/80 shadow-md'
                              : 'border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={settings.status === option.value}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="sr-only"
                          />
                          <div className="w-8 h-8 mr-3 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">{option.label}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Academic Information Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">ข้อมูลการศึกษา</h3>
                <p className="text-slate-600">รายละเอียดภาคการศึกษาและช่วงเวลา</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Academic Year */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  ปีการศึกษา
                </label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) => handleInputChange('academicYear', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-slate-200/60 rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:bg-white/90 bg-white/80 backdrop-blur-sm"
                  placeholder="เช่น 2567"
                />
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  ภาคการศึกษา
                </label>
                <select
                  value={settings.semester}
                  onChange={(e) => handleInputChange('semester', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-slate-200/60 rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:bg-white/90 bg-white/80 backdrop-blur-sm cursor-pointer"
                >
                  {semesterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Picker - Full Width */}
              <div className="xl:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  ระยะเวลาการศึกษา <span className="text-red-500">*</span>
                </label>
                
                {/* Range Picker Button */}
                <button
                  type="button"
                  onClick={() => openCalendar('range')}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-500 transition-all duration-300 text-left flex items-center justify-between group bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.01] cursor-pointer ${
                    (errors.startDate || errors.endDate) ? 'border-red-300 bg-red-50/80 hover:border-red-400' : 'border-slate-200/60 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className={`text-sm ${(settings.startDate && settings.endDate) ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                        {formatDateRange()}
                      </div>
                      {settings.startDate && settings.endDate && (
                        <div className="text-xs text-emerald-600 mt-1">
                          {getDaysBetween(new Date(settings.startDate), new Date(settings.endDate))} วัน
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Error Messages */}
                {(errors.startDate || errors.endDate) && (
                  <div className="mt-2 space-y-1">
                    {errors.startDate && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.startDate}
                      </p>
                    )}
                    {errors.endDate && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Danger Zone Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-red-200/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-800">ลบโปรเจคถาวร</h3>
                <p className="text-red-600">การกระทำที่ไม่สามารถย้อนกลับได้</p>
              </div>
            </div>

            <div className="bg-red-50/80 backdrop-blur-sm rounded-xl p-6 border border-red-200/60">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-red-800 mb-2">ลบโปรเจคนี้</h4>
                  <p className="text-red-700 text-sm mb-4">
                    การลบโปรเจคจะทำให้ข้อมูลทั้งหมดหายไปอย่างถาวร รวมถึงตารางเรียน ตารางสอน และการตั้งค่าต่างๆ
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">การกระทำนี้ไม่สามารถย้อนกลับได้</span>
                  </div>
                </div>
                <button
                  onClick={openDeleteModal}
                  className="ml-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 group cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 group-hover:animate-pulse" />
                  <span>ลบโปรเจค</span>
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <>
          <style jsx>{`
            .calendar-modal-backdrop {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              z-index: 2147483647 !important;
              width: 100vw !important;
              height: 100vh !important;
            }
            .calendar-modal-content {
              position: relative !important;
              z-index: 2147483647 !important;
            }
          `}</style>
          <div
            className="calendar-modal-backdrop fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeCalendar();
              }
            }}
          >
            <div
              className="calendar-modal-content bg-white rounded-3xl shadow-2xl w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left Panel - Calendar */}
                <div className="flex-1 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {isSelectingRange ? 'เลือกช่วงวันที่' : 
                         calendarField === 'startDate' ? 'เลือกวันที่เริ่มต้น' : 'เลือกวันที่สิ้นสุด'}
                      </h3>
                      {isSelectingRange && tempStartDate && tempEndDate && (
                        <p className="text-sm text-slate-600 mt-1">
                          {getDaysBetween(tempStartDate, tempEndDate)} วัน
                        </p>
                      )}
                    </div>
                    <button
                      onClick={closeCalendar}
                      className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                    >
                      <X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>

                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={previousMonth}
                      className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-slate-800">
                        {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'][currentMonth.getMonth()]} {currentMonth.getFullYear() + 543}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {currentMonth.getFullYear()}
                      </p>
                    </div>
                    <button
                      onClick={nextMonth}
                      className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                      <div key={day} className="p-3 text-center text-sm font-medium text-slate-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {(() => {
                      const daysInMonth = getDaysInMonth(currentMonth);
                      const firstDay = getFirstDayOfMonth(currentMonth);
                      const days = [];
                      
                      // Empty cells for days before the first day of month
                      for (let i = 0; i < firstDay; i++) {
                        days.push(null);
                      }
                      
                      // Days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        days.push(day);
                      }

                      return days.map((day, index) => {
                        if (!day) {
                          return <div key={index} className="p-3"></div>;
                        }

                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const isSelected = selectedDate && 
                          date.getTime() === selectedDate.getTime();
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isInRange = isSelectingRange && isDateInRange(date);
                        const isBoundary = isSelectingRange && isRangeBoundary(date);
                        
                        // Date restrictions
                        const isDisabled = calendarField === 'endDate' && settings.startDate && 
                          date < new Date(settings.startDate);

                        return (
                          <button
                            key={day}
                            onClick={() => !isDisabled && handleDateClick(date)}
                            disabled={isDisabled}
                            className={`p-3 text-sm rounded-xl transition-all duration-200 relative ${
                              isDisabled
                                ? 'text-slate-300 cursor-not-allowed'
                                : isSelected || isBoundary
                                  ? 'bg-blue-600 text-white shadow-lg scale-105 cursor-pointer'
                                  : isInRange
                                    ? 'bg-blue-100 text-blue-700 cursor-pointer'
                                    : isToday
                                      ? 'bg-blue-50 text-blue-600 font-medium ring-2 ring-blue-200 cursor-pointer'
                                      : 'hover:bg-slate-100 text-slate-800 hover:scale-105 cursor-pointer'
                            }`}
                          >
                            {day}
                            {isToday && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                            )}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  {/* Selection Info */}
                  {isSelectingRange && (
                    <div className="mb-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50">
                      <div className="text-sm text-blue-800">
                        {!tempStartDate && !tempEndDate && "คลิกเพื่อเลือกวันเริ่มต้น"}
                        {tempStartDate && !tempEndDate && "คลิกเพื่อเลือกวันสิ้นสุด"}
                        {tempStartDate && tempEndDate && (
                          <div className="space-y-1">
                            <div className="font-medium">ช่วงที่เลือก:</div>
                            <div>{tempStartDate.toLocaleDateString('th-TH')} - {tempEndDate.toLocaleDateString('th-TH')}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={closeCalendar}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-300 font-medium cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={confirmDate}
                      disabled={
                        isSelectingRange 
                          ? !tempStartDate || !tempEndDate 
                          : !selectedDate
                      }
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 font-medium cursor-pointer"
                    >
                      ตกลง
                    </button>
                  </div>
                </div>

                {/* Right Panel - Presets & Quick Actions */}
                <div className="lg:w-80 bg-slate-50/80 backdrop-blur-sm p-6 border-l border-slate-200/50">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">ตัวเลือกด่วน</h4>
                  
                  {/* Academic Year Presets */}
                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-medium text-slate-700">ภาคการศึกษา</p>
                    {getAcademicYearPresets().map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyPreset(preset)}
                        className="w-full p-3 text-left rounded-xl border border-slate-200/60 hover:border-blue-300 hover:bg-white/80 hover:shadow-md hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm cursor-pointer"
                      >
                        <div className="font-medium text-slate-800 text-sm">{preset.label}</div>
                        <div className="text-xs text-slate-600 mt-1">
                          {preset.startDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - 
                          {preset.endDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Current Selection Display */}
                  {(settings.startDate || settings.endDate) && (
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50">
                      <p className="text-sm font-medium text-slate-700 mb-2">การตั้งค่าปัจจุบัน</p>
                      {settings.startDate && (
                        <div className="text-sm text-slate-600 mb-1">
                          <span className="font-medium">เริ่ม:</span> {formatDateThai(settings.startDate)}
                        </div>
                      )}
                      {settings.endDate && (
                        <div className="text-sm text-slate-600">
                          <span className="font-medium">สิ้นสุด:</span> {formatDateThai(settings.endDate)}
                        </div>
                      )}
                      {settings.startDate && settings.endDate && (
                        <div className="text-xs text-blue-600 mt-2 font-medium">
                          รวม {getDaysBetween(new Date(settings.startDate), new Date(settings.endDate))} วัน
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <style jsx>{`
            .delete-modal-backdrop {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              z-index: 2147483647 !important;
              width: 100vw !important;
              height: 100vh !important;
            }
            .delete-modal-content {
              position: relative !important;
              z-index: 2147483647 !important;
            }
          `}</style>
          <div
            className="delete-modal-backdrop fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeDeleteModal();
              }
            }}
          >
            <div
              className="delete-modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md border border-red-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800">ยืนยันการลบโปรเจค</h3>
                    <p className="text-red-600 text-sm mt-1">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-2">การลบโปรเจคจะทำให้สูญเสีย:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-700">
                      <li>ข้อมูลตารางเรียนและตารางสอนทั้งหมด</li>
                      <li>การตั้งค่าและข้อมูลโปรเจค</li>
                      <li>ประวัติการเปลี่ยนแปลงทั้งหมด</li>
                    </ul>
                  </div>
                </div>

                {/* Confirmation Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    พิมพ์ชื่อโปรเจค <span className="text-red-500 font-bold">"{settings.title}"</span> เพื่อยืนยันการลบ
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-red-100/50 transition-all duration-300 hover:shadow-md ${
                      deleteConfirmText && !isDeleteConfirmValid
                        ? 'border-red-300 bg-red-50/80 focus:border-red-500 hover:border-red-400'
                        : isDeleteConfirmValid
                          ? 'border-green-300 bg-green-50/80 focus:border-green-500 hover:border-green-400'
                          : 'border-slate-200 focus:border-red-400 hover:border-slate-300'
                    }`}
                    placeholder="พิมพ์ชื่อโปรเจคที่นี่"
                    disabled={isDeleting}
                  />
                  {deleteConfirmText && !isDeleteConfirmValid && (
                    <p className="text-red-500 text-sm mt-2">ชื่อโปรเจคไม่ตรงกัน</p>
                  )}
                  {isDeleteConfirmValid && (
                    <p className="text-green-600 text-sm mt-2">✓ ชื่อโปรเจคถูกต้อง</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-300 font-medium disabled:opacity-50 cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleDeleteProject}
                    disabled={!isDeleteConfirmValid || isDeleting}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 font-medium flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>กำลังลบ...</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        <span>ลบโปรเจคอย่างถาวร</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
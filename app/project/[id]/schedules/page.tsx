'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Calendar, 
  Clock, 
  Users, 
  Building,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  AlertTriangle,
  CheckCircle,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Settings,
  BookOpen,
  MapPin,
  User,
  Zap
} from 'lucide-react';

// Types
interface ScheduleSlot {
  id: string;
  subjectCode: string;
  subjectName: string;
  subjectType: 'lecture' | 'lab' | 'seminar' | 'practicum';
  instructor: string;
  instructorId: string;
  room: string;
  roomId: string;
  day: number; // 0=Sunday, 1=Monday, etc.
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  studentsCount: number;
  maxStudents: number;
  semester: number;
  academicYear: number;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'changed';
  conflicts: Conflict[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Conflict {
  id: string;
  type: 'room_conflict' | 'instructor_conflict' | 'student_conflict' | 'time_conflict';
  severity: 'high' | 'medium' | 'low';
  description: string;
  affectedSchedules: string[];
  suggestions?: string[];
}

interface TimeSlot {
  time: string;
  label: string;
}

interface WeekDay {
  id: number;
  name: string;
  shortName: string;
}

interface ScheduleFormData {
  subjectCode: string;
  subjectName: string;
  subjectType: 'lecture' | 'lab' | 'seminar' | 'practicum';
  instructorId: string;
  roomId: string;
  day: number;
  startTime: string;
  endTime: string;
  studentsCount: number;
  notes?: string;
}

// Mock data
const timeSlots: TimeSlot[] = [
  { time: '08:00', label: 'คาบที่ 1' },
  { time: '09:00', label: 'คาบที่ 2' },
  { time: '10:00', label: 'คาบที่ 3' },
  { time: '11:00', label: 'คาบที่ 4' },
  { time: '12:00', label: 'พักเที่ยง' },
  { time: '13:00', label: 'คาบที่ 5' },
  { time: '14:00', label: 'คาบที่ 6' },
  { time: '15:00', label: 'คาบที่ 7' },
  { time: '16:00', label: 'คาบที่ 8' },
  { time: '17:00', label: 'คาบที่ 9' },
  { time: '18:00', label: 'คาบที่ 10' },
  { time: '19:00', label: 'คาบที่ 11' },
  { time: '20:00', label: 'คาบที่ 12' }
];

const weekDays: WeekDay[] = [
  { id: 1, name: 'จันทร์', shortName: 'จ' },
  { id: 2, name: 'อังคาร', shortName: 'อ' },
  { id: 3, name: 'พุธ', shortName: 'พ' },
  { id: 4, name: 'พฤหัสบดี', shortName: 'พฤ' },
  { id: 5, name: 'ศุกร์', shortName: 'ศ' },
  { id: 6, name: 'เสาร์', shortName: 'ส' },
  { id: 0, name: 'อาทิตย์', shortName: 'อา' }
];

const mockSchedules: ScheduleSlot[] = [
  {
    id: '1',
    subjectCode: 'CS101',
    subjectName: 'Introduction to Computer Science',
    subjectType: 'lecture',
    instructor: 'ดร.สมชาย ใจดี',
    instructorId: '1',
    room: 'LE-201',
    roomId: '2',
    day: 1,
    startTime: '08:00',
    endTime: '11:00',
    duration: 180,
    studentsCount: 45,
    maxStudents: 100,
    semester: 1,
    academicYear: 2024,
    status: 'confirmed',
    conflicts: [],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-26'
  },
  {
    id: '2',
    subjectCode: 'CS201',
    subjectName: 'Data Structures and Algorithms',
    subjectType: 'lecture',
    instructor: 'ผศ.ดร.วิชัย สมใจ',
    instructorId: '3',
    room: 'LE-201',
    roomId: '2',
    day: 1,
    startTime: '13:00',
    endTime: '16:00',
    duration: 180,
    studentsCount: 38,
    maxStudents: 100,
    semester: 1,
    academicYear: 2024,
    status: 'confirmed',
    conflicts: [],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-25'
  },
  {
    id: '3',
    subjectCode: 'CS301L',
    subjectName: 'Database Systems Lab',
    subjectType: 'lab',
    instructor: 'อ.สุดา มานะ',
    instructorId: '2',
    room: 'CS-301',
    roomId: '1',
    day: 2,
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    studentsCount: 25,
    maxStudents: 50,
    semester: 1,
    academicYear: 2024,
    status: 'confirmed',
    conflicts: [],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-22'
  },
  {
    id: '4',
    subjectCode: 'CS401',
    subjectName: 'Senior Project I',
    subjectType: 'seminar',
    instructor: 'ดร.สมชาย ใจดี',
    instructorId: '1',
    room: 'CS-301',
    roomId: '1',
    day: 3,
    startTime: '14:00',
    endTime: '17:00',
    duration: 180,
    studentsCount: 30,
    maxStudents: 50,
    semester: 1,
    academicYear: 2024,
    status: 'scheduled',
    conflicts: [
      {
        id: 'c1',
        type: 'room_conflict',
        severity: 'medium',
        description: 'ห้อง CS-301 อาจไม่เหมาะสำหรับการสัมมนา',
        affectedSchedules: ['4'],
        suggestions: ['ใช้ห้องสัมมนาแทน', 'ย้ายไปห้อง SEM-101']
      }
    ],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-20'
  },
  {
    id: '5',
    subjectCode: 'MA101',
    subjectName: 'Mathematics for IT',
    subjectType: 'lecture',
    instructor: 'ดร.สมชาย ใจดี',
    instructorId: '1',
    room: 'LE-201',
    roomId: '2',
    day: 4,
    startTime: '08:00',
    endTime: '10:00',
    duration: 120,
    studentsCount: 85,
    maxStudents: 100,
    semester: 1,
    academicYear: 2024,
    status: 'confirmed',
    conflicts: [],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-24'
  }
];

const subjectTypes = [
  { value: 'lecture', label: 'บรรยาย', color: 'bg-blue-100 text-blue-800' },
  { value: 'lab', label: 'ปฏิบัติการ', color: 'bg-green-100 text-green-800' },
  { value: 'seminar', label: 'สัมมนา', color: 'bg-purple-100 text-purple-800' },
  { value: 'practicum', label: 'ฝึกงาน', color: 'bg-orange-100 text-orange-800' }
];

export default function SchedulesPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [schedules, setSchedules] = useState<ScheduleSlot[]>(mockSchedules);
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleSlot[]>(mockSchedules);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSlot | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Filter and search logic
  useEffect(() => {
    let filtered = schedules;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(schedule =>
        schedule.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.room.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Day filter
    if (selectedDay !== 'all') {
      filtered = filtered.filter(schedule => schedule.day === selectedDay);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(schedule => schedule.subjectType === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(schedule => schedule.status === selectedStatus);
    }

    // Instructor filter
    if (selectedInstructor !== 'all') {
      filtered = filtered.filter(schedule => schedule.instructorId === selectedInstructor);
    }

    // Room filter
    if (selectedRoom !== 'all') {
      filtered = filtered.filter(schedule => schedule.roomId === selectedRoom);
    }

    setFilteredSchedules(filtered);
  }, [searchQuery, selectedDay, selectedType, selectedStatus, selectedInstructor, selectedRoom, schedules]);

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setShowAddModal(true);
  };

  const handleEditSchedule = (schedule: ScheduleSlot) => {
    setSelectedSchedule(schedule);
    setShowEditModal(true);
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบตารางนี้?')) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
    }
  };

  const handleShowConflicts = () => {
    setShowConflictModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'changed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'จัดแล้ว';
      case 'confirmed':
        return 'ยืนยันแล้ว';
      case 'cancelled':
        return 'ยกเลิก';
      case 'changed':
        return 'เปลี่ยนแปลง';
      default:
        return status;
    }
  };

  const getTypeInfo = (type: string) => {
    return subjectTypes.find(t => t.value === type) || subjectTypes[0];
  };

  const getConflictColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const totalSchedules = schedules.length;
  const confirmedSchedules = schedules.filter(s => s.status === 'confirmed').length;
  const conflictSchedules = schedules.filter(s => s.conflicts.length > 0).length;
  const totalStudents = schedules.reduce((sum, s) => sum + s.studentsCount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการตารางเรียน</h1>
            <p className="text-gray-600">
              จัดการและสร้างตารางเรียน ตรวจสอบความขัดแย้ง และอนุมัติตารางสอน
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <Grid3X3 className="w-4 h-4" />
                ตาราง
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <List className="w-4 h-4" />
                รายการ
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  viewMode === 'calendar' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <Calendar className="w-4 h-4" />
                ปฏิทิน
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              ตัวกรอง
            </button>
            {conflictSchedules > 0 && (
              <button
                onClick={handleShowConflicts}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <AlertTriangle className="w-5 h-5" />
                ความขัดแย้ง ({conflictSchedules})
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              นำเข้า
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              ส่งออก
            </button>
            <button
              onClick={handleAddSchedule}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มตาราง
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ตารางทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{totalSchedules}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ยืนยันแล้ว</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedSchedules}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">มีความขัดแย้ง</p>
                <p className="text-2xl font-bold text-gray-900">{conflictSchedules}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">นักศึกษารวม</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาตาราง (รหัสวิชา, ชื่อวิชา, อาจารย์, ห้อง)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    วัน
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {weekDays.map(day => (
                      <option key={day.id} value={day.id}>
                        {day.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภท
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {subjectTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะ
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="scheduled">จัดแล้ว</option>
                    <option value="confirmed">ยืนยันแล้ว</option>
                    <option value="cancelled">ยกเลิก</option>
                    <option value="changed">เปลี่ยนแปลง</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อาจารย์
                  </label>
                  <select
                    value={selectedInstructor}
                    onChange={(e) => setSelectedInstructor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="1">ดร.สมชาย ใจดี</option>
                    <option value="2">อ.สุดา มานะ</option>
                    <option value="3">ผศ.ดร.วิชัย สมใจ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ห้อง
                  </label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="1">CS-301</option>
                    <option value="2">LE-201</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      {viewMode === 'grid' && (
        <ScheduleGrid 
          schedules={filteredSchedules}
          onEdit={handleEditSchedule}
          onDelete={handleDeleteSchedule}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getTypeInfo={getTypeInfo}
          getConflictColor={getConflictColor}
          timeSlots={timeSlots}
          weekDays={weekDays}
        />
      )}

      {viewMode === 'list' && (
        <ScheduleList 
          schedules={filteredSchedules}
          onEdit={handleEditSchedule}
          onDelete={handleDeleteSchedule}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getTypeInfo={getTypeInfo}
          getConflictColor={getConflictColor}
          weekDays={weekDays}
        />
      )}

      {viewMode === 'calendar' && (
        <ScheduleCalendar 
          schedules={filteredSchedules}
          onEdit={handleEditSchedule}
          onDelete={handleDeleteSchedule}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getTypeInfo={getTypeInfo}
          getConflictColor={getConflictColor}
          timeSlots={timeSlots}
          weekDays={weekDays}
          currentWeek={currentWeek}
          onWeekChange={setCurrentWeek}
        />
      )}

      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ไม่พบตาราง
          </h3>
          <p className="text-gray-600 mb-4">
            ไม่พบตารางที่ตรงกับเงื่อนไขการค้นหา
          </p>
          <button
            onClick={handleAddSchedule}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            เพิ่มตารางใหม่
          </button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <ScheduleFormModal
            schedule={selectedSchedule}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedSchedule(null);
            }}
            onSave={(scheduleData) => {
              if (selectedSchedule) {
                // Edit existing schedule
                setSchedules(prev => prev.map(s => 
                  s.id === selectedSchedule.id 
                    ? { ...s, ...scheduleData, updatedAt: new Date().toISOString().split('T')[0] }
                    : s
                ));
              } else {
                // Add new schedule
                const newSchedule: ScheduleSlot = {
                  ...scheduleData,
                  id: Date.now().toString(),
                  duration: calculateDuration(scheduleData.startTime, scheduleData.endTime),
                  maxStudents: 100, // Default
                  semester: 1,
                  academicYear: 2024,
                  status: 'scheduled',
                  conflicts: [],
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0]
                };
                setSchedules(prev => [...prev, newSchedule]);
              }
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedSchedule(null);
            }}
          />
        )}

        {showConflictModal && (
          <ConflictModal
            schedules={schedules.filter(s => s.conflicts.length > 0)}
            isOpen={showConflictModal}
            onClose={() => setShowConflictModal(false)}
            onResolve={(scheduleId, conflictId) => {
              setSchedules(prev => prev.map(s => 
                s.id === scheduleId 
                  ? { ...s, conflicts: s.conflicts.filter(c => c.id !== conflictId) }
                  : s
              ));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function
function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(`2000-01-01T${startTime}:00`);
  const end = new Date(`2000-01-01T${endTime}:00`);
  return (end.getTime() - start.getTime()) / (1000 * 60);
}

// Schedule Grid Component
interface ScheduleGridProps {
  schedules: ScheduleSlot[];
  onEdit: (schedule: ScheduleSlot) => void;
  onDelete: (scheduleId: string) => void;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  getTypeInfo: (type: string) => any;
  getConflictColor: (severity: string) => string;
  timeSlots: TimeSlot[];
  weekDays: WeekDay[];
}

function ScheduleGrid({ 
  schedules, onEdit, onDelete, getStatusColor, getStatusLabel, 
  getTypeInfo, getConflictColor, timeSlots, weekDays 
}: ScheduleGridProps) {
  const getScheduleForSlot = (day: number, time: string) => {
    return schedules.find(s => s.day === day && s.startTime <= time && s.endTime > time);
  };

  const getScheduleSpan = (schedule: ScheduleSlot, time: string) => {
    if (schedule.startTime !== time) return 0;
    const startIndex = timeSlots.findIndex(t => t.time === schedule.startTime);
    const endIndex = timeSlots.findIndex(t => t.time === schedule.endTime);
    return endIndex - startIndex;
  };

  const shouldShowSlot = (day: number, time: string) => {
    const schedule = getScheduleForSlot(day, time);
    if (!schedule) return true;
    return schedule.startTime === time;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
            <div className="p-4 font-medium text-gray-900 border-r border-gray-200">
              เวลา
            </div>
            {weekDays.map(day => (
              <div key={day.id} className="p-4 font-medium text-gray-900 text-center border-r border-gray-200 last:border-r-0">
                <div>{day.name}</div>
                <div className="text-xs text-gray-500 mt-1">{day.shortName}</div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeSlot.time} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
              <div className="p-4 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center">
                <div className="font-medium text-gray-900">{timeSlot.time}</div>
                <div className="text-xs text-gray-500">{timeSlot.label}</div>
              </div>
              
              {weekDays.map(day => (
                <div key={day.id} className="border-r border-gray-200 last:border-r-0 relative min-h-[80px]">
                  {shouldShowSlot(day.id, timeSlot.time) && (() => {
                    const schedule = getScheduleForSlot(day.id, timeSlot.time);
                    if (!schedule) {
                      return (
                        <div className="h-full p-2 hover:bg-blue-50 cursor-pointer transition-colors">
                          <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                            ว่าง
                          </div>
                        </div>
                      );
                    }

                    const span = getScheduleSpan(schedule, timeSlot.time);
                    const typeInfo = getTypeInfo(schedule.subjectType);
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute inset-2 rounded-lg p-3 shadow-sm cursor-pointer transition-all hover:shadow-md ${typeInfo.color}`}
                        style={{ 
                          height: `${span * 80 - 16}px`,
                          zIndex: 10
                        }}
                        onClick={() => onEdit(schedule)}
                      >
                        <div className="h-full flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">{schedule.subjectCode}</h4>
                              <p className="text-xs opacity-90 truncate">{schedule.subjectName}</p>
                            </div>
                            {schedule.conflicts.length > 0 && (
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 ml-1" />
                            )}
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-between text-xs opacity-90">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <User className="w-3 h-3" />
                                <span className="truncate">{schedule.instructor}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-1">
                                <MapPin className="w-3 h-3" />
                                <span>{schedule.room}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{schedule.studentsCount}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs font-medium">
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getStatusColor(schedule.status)}`}>
                                {getStatusLabel(schedule.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Schedule List Component
function ScheduleList({ 
  schedules, onEdit, onDelete, getStatusColor, getStatusLabel, 
  getTypeInfo, getConflictColor, weekDays 
}: ScheduleGridProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รายวิชา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อาจารย์
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ห้อง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เวลา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                นักศึกษา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {schedules.map((schedule) => {
                const typeInfo = getTypeInfo(schedule.subjectType);
                const dayName = weekDays.find(d => d.id === schedule.day)?.name || '';
                
                return (
                  <motion.tr
                    key={schedule.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {schedule.subjectCode}
                            {schedule.conflicts.length > 0 && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{schedule.subjectName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{schedule.instructor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{schedule.room}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{dayName}</div>
                        <div className="text-gray-600">
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {schedule.studentsCount}/{schedule.maxStudents}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {getStatusLabel(schedule.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(schedule)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(schedule.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Schedule Calendar Component
interface ScheduleCalendarProps extends ScheduleGridProps {
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
}

function ScheduleCalendar({ 
  schedules, onEdit, onDelete, getStatusColor, getStatusLabel, 
  getTypeInfo, getConflictColor, timeSlots, weekDays, currentWeek, onWeekChange 
}: ScheduleCalendarProps) {
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    onWeekChange(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    onWeekChange(nextWeek);
  };

  const goToToday = () => {
    onWeekChange(new Date());
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
    
    return `${startOfWeek.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {formatWeekRange(currentWeek)}
          </h3>
          <button
            onClick={goToToday}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            วันนี้
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid - Same as Schedule Grid but with week navigation */}
      <ScheduleGrid
        schedules={schedules}
        onEdit={onEdit}
        onDelete={onDelete}
        getStatusColor={getStatusColor}
        getStatusLabel={getStatusLabel}
        getTypeInfo={getTypeInfo}
        getConflictColor={getConflictColor}
        timeSlots={timeSlots}
        weekDays={weekDays}
      />
    </div>
  );
}

// Schedule Form Modal (simplified for brevity)
interface ScheduleFormModalProps {
  schedule: ScheduleSlot | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

function ScheduleFormModal({ schedule, isOpen, onClose, onSave }: ScheduleFormModalProps) {
  const [formData, setFormData] = useState<ScheduleFormData>({
    subjectCode: '',
    subjectName: '',
    subjectType: 'lecture',
    instructorId: '',
    roomId: '',
    day: 1,
    startTime: '08:00',
    endTime: '11:00',
    studentsCount: 0,
    notes: ''
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        subjectCode: schedule.subjectCode,
        subjectName: schedule.subjectName,
        subjectType: schedule.subjectType,
        instructorId: schedule.instructorId,
        roomId: schedule.roomId,
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        studentsCount: schedule.studentsCount,
        notes: schedule.notes || ''
      });
    }
  }, [schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      instructor: formData.instructorId === '1' ? 'ดร.สมชาย ใจดี' : 
                  formData.instructorId === '2' ? 'อ.สุดา มานะ' : 
                  'ผศ.ดร.วิชัย สมใจ',
      room: formData.roomId === '1' ? 'CS-301' : 'LE-201'
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {schedule ? 'แก้ไขตาราง' : 'เพิ่มตารางใหม่'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสวิชา *
              </label>
              <input
                type="text"
                required
                value={formData.subjectCode}
                onChange={(e) => setFormData(prev => ({ ...prev, subjectCode: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภท *
              </label>
              <select
                required
                value={formData.subjectType}
                onChange={(e) => setFormData(prev => ({ ...prev, subjectType: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อวิชา *
            </label>
            <input
              type="text"
              required
              value={formData.subjectName}
              onChange={(e) => setFormData(prev => ({ ...prev, subjectName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อาจารย์ *
              </label>
              <select
                required
                value={formData.instructorId}
                onChange={(e) => setFormData(prev => ({ ...prev, instructorId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">เลือกอาจารย์</option>
                <option value="1">ดร.สมชาย ใจดี</option>
                <option value="2">อ.สุดา มานะ</option>
                <option value="3">ผศ.ดร.วิชัย สมใจ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ห้อง *
              </label>
              <select
                required
                value={formData.roomId}
                onChange={(e) => setFormData(prev => ({ ...prev, roomId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">เลือกห้อง</option>
                <option value="1">CS-301 (ห้องคอมพิวเตอร์)</option>
                <option value="2">LE-201 (ห้องบรรยาย)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วัน *
              </label>
              <select
                required
                value={formData.day}
                onChange={(e) => setFormData(prev => ({ ...prev, day: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {weekDays.map(day => (
                  <option key={day.id} value={day.id}>
                    {day.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เวลาเริ่ม *
              </label>
              <select
                required
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeSlots.map(time => (
                  <option key={time.time} value={time.time}>
                    {time.time} ({time.label})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เวลาสิ้นสุด *
              </label>
              <select
                required
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeSlots.map(time => (
                  <option key={time.time} value={time.time}>
                    {time.time} ({time.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              จำนวนนักศึกษา *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.studentsCount}
              onChange={(e) => setFormData(prev => ({ ...prev, studentsCount: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมายเหตุ
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="หมายเหตุเพิ่มเติม..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {schedule ? 'บันทึกการแก้ไข' : 'เพิ่มตาราง'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Conflict Modal
interface ConflictModalProps {
  schedules: ScheduleSlot[];
  isOpen: boolean;
  onClose: () => void;
  onResolve: (scheduleId: string, conflictId: string) => void;
}

function ConflictModal({ schedules, isOpen, onClose, onResolve }: ConflictModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              ความขัดแย้งในตาราง
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {schedule.subjectCode} - {schedule.subjectName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {schedule.instructor} • {schedule.room} • 
                      {weekDays.find(d => d.id === schedule.day)?.name} {schedule.startTime}-{schedule.endTime}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                    {schedule.conflicts.length} ความขัดแย้ง
                  </span>
                </div>

                <div className="space-y-3">
                  {schedule.conflicts.map((conflict) => (
                    <div key={conflict.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className={`w-4 h-4 ${
                              conflict.severity === 'high' ? 'text-red-500' :
                              conflict.severity === 'medium' ? 'text-yellow-500' :
                              'text-blue-500'
                            }`} />
                            <span className={`text-sm font-medium ${
                              conflict.severity === 'high' ? 'text-red-700' :
                              conflict.severity === 'medium' ? 'text-yellow-700' :
                              'text-blue-700'
                            }`}>
                              {conflict.type === 'room_conflict' ? 'ความขัดแย้งของห้อง' :
                               conflict.type === 'instructor_conflict' ? 'ความขัดแย้งของอาจารย์' :
                               conflict.type === 'student_conflict' ? 'ความขัดแย้งของนักศึกษา' :
                               'ความขัดแย้งของเวลา'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{conflict.description}</p>
                          {conflict.suggestions && conflict.suggestions.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">คำแนะนำ:</p>
                              <ul className="text-xs text-gray-600 list-disc list-inside">
                                {conflict.suggestions.map((suggestion, index) => (
                                  <li key={index}>{suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => onResolve(schedule.id, conflict.id)}
                          className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
                        >
                          แก้ไขแล้ว
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
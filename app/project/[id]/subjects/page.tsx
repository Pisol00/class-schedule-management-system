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
  BookOpen, 
  Users, 
  Clock, 
  MapPin,
  Edit3,
  Trash2,
  FileText,
  ChevronDown,
  X,
  Save,
  User
} from 'lucide-react';

// Types
interface Subject {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  credits: number;
  type: 'lecture' | 'lab' | 'seminar' | 'practicum';
  curriculum: string;
  semester: number;
  year: number;
  description: string;
  prerequisites: string[];
  instructors: Instructor[];
  maxStudents: number;
  currentStudents: number;
  status: 'active' | 'inactive' | 'draft';
  scheduleCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'main' | 'assistant' | 'guest';
}

interface SubjectFormData {
  code: string;
  name: string;
  nameEn: string;
  credits: number;
  type: 'lecture' | 'lab' | 'seminar' | 'practicum';
  curriculum: string;
  semester: number;
  year: number;
  description: string;
  maxStudents: number;
}

// Mock data
const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    nameEn: 'Introduction to Computer Science',
    credits: 3,
    type: 'lecture',
    curriculum: 'Computer Science',
    semester: 1,
    year: 1,
    description: 'พื้นฐานวิทยาการคอมพิวเตอร์',
    prerequisites: [],
    instructors: [
      { id: '1', name: 'ดร.สมชาย ใจดี', email: 'somchai@university.ac.th', department: 'CS', role: 'main' },
      { id: '2', name: 'อ.สุดา มานะ', email: 'suda@university.ac.th', department: 'CS', role: 'assistant' }
    ],
    maxStudents: 50,
    currentStudents: 45,
    status: 'active',
    scheduleCount: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20'
  },
  {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    nameEn: 'Data Structures and Algorithms',
    credits: 3,
    type: 'lecture',
    curriculum: 'Computer Science',
    semester: 1,
    year: 2,
    description: 'โครงสร้างข้อมูลและอัลกอริทึม',
    prerequisites: ['CS101'],
    instructors: [
      { id: '3', name: 'ผศ.ดร.วิชัย สมใจ', email: 'vichai@university.ac.th', department: 'CS', role: 'main' }
    ],
    maxStudents: 40,
    currentStudents: 38,
    status: 'active',
    scheduleCount: 3,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-25'
  },
  {
    id: '3',
    code: 'CS301L',
    name: 'Database Systems Lab',
    nameEn: 'Database Systems Lab',
    credits: 1,
    type: 'lab',
    curriculum: 'Computer Science',
    semester: 1,
    year: 3,
    description: 'ปฏิบัติการระบบฐานข้อมูล',
    prerequisites: ['CS201'],
    instructors: [
      { id: '4', name: 'อ.ภัทรภร วัฒนาชีพ', email: 'pattraporn@university.ac.th', department: 'CS', role: 'main' }
    ],
    maxStudents: 30,
    currentStudents: 25,
    status: 'active',
    scheduleCount: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-22'
  }
];

const mockCurriculums = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Digital Media',
  'Cybersecurity'
];

const subjectTypes = [
  { value: 'lecture', label: 'บรรยาย', color: 'bg-blue-100 text-blue-800' },
  { value: 'lab', label: 'ปฏิบัติการ', color: 'bg-green-100 text-green-800' },
  { value: 'seminar', label: 'สัมมนา', color: 'bg-purple-100 text-purple-800' },
  { value: 'practicum', label: 'ฝึกงาน', color: 'bg-orange-100 text-orange-800' }
];

export default function SubjectsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(mockSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = subjects;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(subject =>
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(subject => subject.type === selectedType);
    }

    // Curriculum filter
    if (selectedCurriculum !== 'all') {
      filtered = filtered.filter(subject => subject.curriculum === selectedCurriculum);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(subject => subject.status === selectedStatus);
    }

    setFilteredSubjects(filtered);
  }, [searchQuery, selectedType, selectedCurriculum, selectedStatus, subjects]);

  const handleAddSubject = () => {
    setSelectedSubject(null);
    setShowAddModal(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowEditModal(true);
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบรายวิชานี้?')) {
      setSubjects(prev => prev.filter(s => s.id !== subjectId));
    }
  };

  const getTypeLabel = (type: string) => {
    return subjectTypes.find(t => t.value === type)?.label || type;
  };

  const getTypeColor = (type: string) => {
    return subjectTypes.find(t => t.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'ใช้งาน';
      case 'inactive':
        return 'ไม่ใช้งาน';
      case 'draft':
        return 'แบบร่าง';
      default:
        return status;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการรายวิชา</h1>
            <p className="text-gray-600">
              จัดการรายวิชาในโปรเจค รวมถึงการเพิ่ม แก้ไข และกำหนดอาจารย์ผู้สอน
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              ตัวกรอง
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              นำเข้า CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              ส่งออก
            </button>
            <button
              onClick={handleAddSubject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มรายวิชา
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">รายวิชาทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">รายวิชาที่ใช้งาน</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjects.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ตารางที่จัดแล้ว</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjects.reduce((sum, s) => sum + s.scheduleCount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">นักศึกษาทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjects.reduce((sum, s) => sum + s.currentStudents, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหารายวิชา (รหัสวิชา, ชื่อวิชา)..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทรายวิชา
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
                    หลักสูตร
                  </label>
                  <select
                    value={selectedCurriculum}
                    onChange={(e) => setSelectedCurriculum(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {mockCurriculums.map(curriculum => (
                      <option key={curriculum} value={curriculum}>
                        {curriculum}
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
                    <option value="active">ใช้งาน</option>
                    <option value="inactive">ไม่ใช้งาน</option>
                    <option value="draft">แบบร่าง</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subjects Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายวิชา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หน่วยกิต
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  อาจารย์ผู้สอน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  นักศึกษา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ตาราง
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
                {filteredSubjects.map((subject) => (
                  <motion.tr
                    key={subject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {subject.code}
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.name}
                        </div>
                        {subject.nameEn && (
                          <div className="text-xs text-gray-500">
                            {subject.nameEn}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(subject.type)}`}>
                        {getTypeLabel(subject.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subject.credits}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {subject.instructors.slice(0, 2).map((instructor) => (
                          <div key={instructor.id} className="text-sm">
                            <span className="text-gray-900">{instructor.name}</span>
                            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded ${
                              instructor.role === 'main' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {instructor.role === 'main' ? 'หลัก' : 'ผู้ช่วย'}
                            </span>
                          </div>
                        ))}
                        {subject.instructors.length > 2 && (
                          <div className="text-xs text-gray-500">
                            และอีก {subject.instructors.length - 2} คน
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span>{subject.currentStudents}/{subject.maxStudents}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min((subject.currentStudents / subject.maxStudents) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {subject.scheduleCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
                        {getStatusLabel(subject.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditSubject(subject)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่พบรายวิชา
            </h3>
            <p className="text-gray-600 mb-4">
              ไม่พบรายวิชาที่ตรงกับเงื่อนไขการค้นหา
            </p>
            <button
              onClick={handleAddSubject}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มรายวิชาใหม่
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Subject Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <SubjectModal
            subject={selectedSubject}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedSubject(null);
            }}
            onSave={(subjectData) => {
              if (selectedSubject) {
                // Edit existing subject
                setSubjects(prev => prev.map(s => 
                  s.id === selectedSubject.id 
                    ? { ...s, ...subjectData, updatedAt: new Date().toISOString().split('T')[0] }
                    : s
                ));
              } else {
                // Add new subject
                const newSubject: Subject = {
                  ...subjectData,
                  id: Date.now().toString(),
                  prerequisites: [],
                  instructors: [],
                  currentStudents: 0,
                  status: 'draft',
                  scheduleCount: 0,
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0]
                };
                setSubjects(prev => [...prev, newSubject]);
              }
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedSubject(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Subject Modal Component
interface SubjectModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SubjectFormData) => void;
}

function SubjectModal({ subject, isOpen, onClose, onSave }: SubjectModalProps) {
  const [formData, setFormData] = useState<SubjectFormData>({
    code: '',
    name: '',
    nameEn: '',
    credits: 3,
    type: 'lecture',
    curriculum: 'Computer Science',
    semester: 1,
    year: 1,
    description: '',
    maxStudents: 50
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        code: subject.code,
        name: subject.name,
        nameEn: subject.nameEn,
        credits: subject.credits,
        type: subject.type,
        curriculum: subject.curriculum,
        semester: subject.semester,
        year: subject.year,
        description: subject.description,
        maxStudents: subject.maxStudents
      });
    } else {
      setFormData({
        code: '',
        name: '',
        nameEn: '',
        credits: 3,
        type: 'lecture',
        curriculum: 'Computer Science',
        semester: 1,
        year: 1,
        description: '',
        maxStudents: 50
      });
    }
  }, [subject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              {subject ? 'แก้ไขรายวิชา' : 'เพิ่มรายวิชาใหม่'}
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
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เช่น CS101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หน่วยกิต *
              </label>
              <input
                type="number"
                required
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อวิชา (ไทย) *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="เช่น พื้นฐานวิทยาการคอมพิวเตอร์"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อวิชา (อังกฤษ)
            </label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="เช่น Introduction to Computer Science"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทรายวิชา *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ภาคเรียน *
              </label>
              <select
                required
                value={formData.semester}
                onChange={(e) => setFormData(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>ภาคเรียนที่ 1</option>
                <option value={2}>ภาคเรียนที่ 2</option>
                <option value={3}>ภาคฤดูร้อน</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชั้นปี *
              </label>
              <select
                required
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>ปีที่ 1</option>
                <option value={2}>ปีที่ 2</option>
                <option value={3}>ปีที่ 3</option>
                <option value={4}>ปีที่ 4</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หลักสูตร *
              </label>
              <select
                required
                value={formData.curriculum}
                onChange={(e) => setFormData(prev => ({ ...prev, curriculum: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {mockCurriculums.map(curriculum => (
                  <option key={curriculum} value={curriculum}>
                    {curriculum}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนนักศึกษาสูงสุด *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.maxStudents}
                onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบายรายวิชา
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="คำอธิบายรายวิชา..."
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
              {subject ? 'บันทึกการแก้ไข' : 'เพิ่มรายวิชา'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
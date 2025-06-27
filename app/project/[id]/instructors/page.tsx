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
  Users, 
  User, 
  Clock, 
  BookOpen,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Building,
  Award,
  X,
  Save,
  Eye,
  Calendar,
  GraduationCap,
  Briefcase
} from 'lucide-react';

// Types
interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentType: 'full-time' | 'part-time' | 'visiting' | 'adjunct';
  academicRank: string;
  specializations: string[];
  maxTeachingHours: number;
  currentTeachingHours: number;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
  joinDate: string;
  subjects: SubjectAssignment[];
  biography?: string;
  qualifications: string[];
  officeLocation?: string;
  officeHours?: string;
  createdAt: string;
  updatedAt: string;
}

interface SubjectAssignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  role: 'main' | 'assistant' | 'guest';
  semester: number;
  year: number;
  studentsCount: number;
}

interface InstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentType: 'full-time' | 'part-time' | 'visiting' | 'adjunct';
  academicRank: string;
  specializations: string[];
  maxTeachingHours: number;
  biography?: string;
  qualifications: string[];
  officeLocation?: string;
  officeHours?: string;
}

// Mock data
const mockInstructors: Instructor[] = [
  {
    id: '1',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    fullName: 'ดร.สมชาย ใจดี',
    email: 'somchai@university.ac.th',
    phone: '02-123-4567',
    department: 'Computer Science',
    position: 'อาจารย์ประจำ',
    employmentType: 'full-time',
    academicRank: 'อาจารย์',
    specializations: ['Machine Learning', 'Data Science', 'AI'],
    maxTeachingHours: 18,
    currentTeachingHours: 15,
    status: 'active',
    joinDate: '2020-01-15',
    subjects: [
      { id: '1', subjectCode: 'CS101', subjectName: 'Introduction to CS', role: 'main', semester: 1, year: 1, studentsCount: 45 },
      { id: '2', subjectCode: 'CS401', subjectName: 'Machine Learning', role: 'main', semester: 1, year: 4, studentsCount: 30 }
    ],
    biography: 'ดร.สมชาย มีประสบการณ์ในด้าน Machine Learning และ Data Science มากว่า 10 ปี',
    qualifications: ['Ph.D. Computer Science, Stanford University', 'M.S. Computer Science, MIT'],
    officeLocation: 'ห้อง 301 อาคารวิทยาศาสตร์',
    officeHours: 'จันทร์-ศุกร์ 13:00-16:00',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20'
  },
  {
    id: '2',
    firstName: 'สุดา',
    lastName: 'มานะ',
    fullName: 'อ.สุดา มานะ',
    email: 'suda@university.ac.th',
    phone: '02-234-5678',
    department: 'Computer Science',
    position: 'อาจารย์ประจำ',
    employmentType: 'full-time',
    academicRank: 'อาจารย์',
    specializations: ['Database Systems', 'Web Development'],
    maxTeachingHours: 16,
    currentTeachingHours: 12,
    status: 'active',
    joinDate: '2019-08-01',
    subjects: [
      { id: '3', subjectCode: 'CS201', subjectName: 'Database Systems', role: 'main', semester: 1, year: 2, studentsCount: 38 },
      { id: '4', subjectCode: 'CS301L', subjectName: 'Database Lab', role: 'assistant', semester: 1, year: 3, studentsCount: 25 }
    ],
    biography: 'อาจารย์สุดา เชี่ยวชาญด้านระบบฐานข้อมูลและการพัฒนาเว็บ',
    qualifications: ['M.S. Computer Science, Chulalongkorn University', 'B.S. Computer Engineering, KMUTT'],
    officeLocation: 'ห้อง 205 อาคารวิทยาศาสตร์',
    officeHours: 'อังคาร-พฤหัสบดี 14:00-17:00',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-18'
  },
  {
    id: '3',
    firstName: 'วิชัย',
    lastName: 'สมใจ',
    fullName: 'ผศ.ดร.วิชัย สมใจ',
    email: 'vichai@university.ac.th',
    phone: '02-345-6789',
    department: 'Computer Science',
    position: 'ผู้ช่วยศาสตราจารย์',
    employmentType: 'full-time',
    academicRank: 'ผู้ช่วยศาสตราจารย์',
    specializations: ['Software Engineering', 'Algorithms', 'System Design'],
    maxTeachingHours: 20,
    currentTeachingHours: 18,
    status: 'active',
    joinDate: '2018-06-01',
    subjects: [
      { id: '5', subjectCode: 'CS201', subjectName: 'Data Structures', role: 'main', semester: 1, year: 2, studentsCount: 42 },
      { id: '6', subjectCode: 'CS302', subjectName: 'Software Engineering', role: 'main', semester: 1, year: 3, studentsCount: 35 }
    ],
    biography: 'ผศ.ดร.วิชัย มีประสบการณ์ในอุตสาหกรรมซอฟต์แวร์มากว่า 15 ปี',
    qualifications: ['Ph.D. Software Engineering, CMU', 'M.S. Computer Science, UC Berkeley'],
    officeLocation: 'ห้อง 308 อาคารวิทยาศาสตร์',
    officeHours: 'จันทร์-พุธ-ศุกร์ 10:00-12:00',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-25'
  },
  {
    id: '4',
    firstName: 'ภัทรภร',
    lastName: 'วัฒนาชีพ',
    fullName: 'ดร.ภัทรภร วัฒนาชีพ',
    email: 'pattraporn@university.ac.th',
    phone: '02-456-7890',
    department: 'Information Technology',
    position: 'อาจารย์พิเศษ',
    employmentType: 'part-time',
    academicRank: 'อาจารย์',
    specializations: ['Cybersecurity', 'Network Security'],
    maxTeachingHours: 12,
    currentTeachingHours: 8,
    status: 'active',
    joinDate: '2022-01-15',
    subjects: [
      { id: '7', subjectCode: 'IT401', subjectName: 'Cybersecurity', role: 'main', semester: 1, year: 4, studentsCount: 28 }
    ],
    biography: 'ดร.ภัทรภร ผู้เชี่ยวชาญด้านความปลอดภัยไซเบอร์',
    qualifications: ['Ph.D. Cybersecurity, Georgia Tech', 'M.S. Information Security, NYU'],
    officeLocation: 'ห้อง 105 อาคารเทคโนโลยี',
    officeHours: 'พฤหัสบดี 13:00-17:00',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-15'
  }
];

const mockDepartments = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Digital Media',
  'Cybersecurity',
  'Data Science'
];

const employmentTypes = [
  { value: 'full-time', label: 'พนักงานประจำ', color: 'bg-green-100 text-green-800' },
  { value: 'part-time', label: 'พนักงานชั่วคราว', color: 'bg-blue-100 text-blue-800' },
  { value: 'visiting', label: 'อาจารย์เยี่ยม', color: 'bg-purple-100 text-purple-800' },
  { value: 'adjunct', label: 'อาจารย์พิเศษ', color: 'bg-orange-100 text-orange-800' }
];

const academicRanks = [
  'อาจารย์',
  'ผู้ช่วยศาสตราจารย์',
  'รองศาสตราจารย์',
  'ศาสตราจารย์',
  'ศาสตราจารย์เกียรติคุณ'
];

export default function InstructorsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>(mockInstructors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = instructors;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(instructor =>
        instructor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.specializations.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(instructor => instructor.department === selectedDepartment);
    }

    // Employment type filter
    if (selectedEmploymentType !== 'all') {
      filtered = filtered.filter(instructor => instructor.employmentType === selectedEmploymentType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(instructor => instructor.status === selectedStatus);
    }

    setFilteredInstructors(filtered);
  }, [searchQuery, selectedDepartment, selectedEmploymentType, selectedStatus, instructors]);

  const handleAddInstructor = () => {
    setSelectedInstructor(null);
    setShowAddModal(true);
  };

  const handleEditInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowEditModal(true);
  };

  const handleViewInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowDetailModal(true);
  };

  const handleDeleteInstructor = async (instructorId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบอาจารย์ท่านนี้?')) {
      setInstructors(prev => prev.filter(i => i.id !== instructorId));
    }
  };

  const getEmploymentTypeLabel = (type: string) => {
    return employmentTypes.find(t => t.value === type)?.label || type;
  };

  const getEmploymentTypeColor = (type: string) => {
    return employmentTypes.find(t => t.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'ปฏิบัติงาน';
      case 'inactive':
        return 'ไม่ปฏิบัติงาน';
      case 'on-leave':
        return 'ลาพัก';
      default:
        return status;
    }
  };

  const totalTeachingHours = instructors.reduce((sum, i) => sum + i.currentTeachingHours, 0);
  const totalMaxHours = instructors.reduce((sum, i) => sum + i.maxTeachingHours, 0);
  const totalSubjects = instructors.reduce((sum, i) => sum + i.subjects.length, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการอาจารย์ผู้สอน</h1>
            <p className="text-gray-600">
              จัดการข้อมูลอาจารย์ผู้สอน รวมถึงการมอบหมายรายวิชาและการกำหนดภาระงานสอน
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
              onClick={handleAddInstructor}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มอาจารย์
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">อาจารย์ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{instructors.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">อาจารย์ประจำ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {instructors.filter(i => i.employmentType === 'full-time').length}
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
                <p className="text-sm text-gray-600">ชั่วโมงสอนรวม</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalTeachingHours}/{totalMaxHours}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">รายวิชาที่สอน</p>
                <p className="text-2xl font-bold text-gray-900">{totalSubjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาอาจารย์ (ชื่อ, อีเมล, แผนก, ความเชี่ยวชาญ)..."
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
                    แผนก
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {mockDepartments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทการจ้างงาน
                  </label>
                  <select
                    value={selectedEmploymentType}
                    onChange={(e) => setSelectedEmploymentType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {employmentTypes.map(type => (
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
                    <option value="active">ปฏิบัติงาน</option>
                    <option value="inactive">ไม่ปฏิบัติงาน</option>
                    <option value="on-leave">ลาพัก</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructors Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  อาจารย์
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  แผนก
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภทการจ้างงาน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ภาระงานสอน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายวิชา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ความเชี่ยวชาญ
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
                {filteredInstructors.map((instructor) => (
                  <motion.tr
                    key={instructor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {instructor.fullName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {instructor.position}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {instructor.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{instructor.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(instructor.employmentType)}`}>
                        {getEmploymentTypeLabel(instructor.employmentType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {instructor.currentTeachingHours}/{instructor.maxTeachingHours} ชม.
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min((instructor.currentTeachingHours / instructor.maxTeachingHours) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{instructor.subjects.length} วิชา</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {instructor.specializations.slice(0, 2).map((spec, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full mr-1"
                          >
                            {spec}
                          </span>
                        ))}
                        {instructor.specializations.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{instructor.specializations.length - 2} เพิ่มเติม
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instructor.status)}`}>
                        {getStatusLabel(instructor.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewInstructor(instructor)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="ดูรายละเอียด"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditInstructor(instructor)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInstructor(instructor.id)}
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

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่พบอาจารย์
            </h3>
            <p className="text-gray-600 mb-4">
              ไม่พบอาจารย์ที่ตรงกับเงื่อนไขการค้นหา
            </p>
            <button
              onClick={handleAddInstructor}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มอาจารย์ใหม่
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <InstructorFormModal
            instructor={selectedInstructor}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedInstructor(null);
            }}
            onSave={(instructorData) => {
              if (selectedInstructor) {
                // Edit existing instructor
                setInstructors(prev => prev.map(i => 
                  i.id === selectedInstructor.id 
                    ? { 
                        ...i, 
                        ...instructorData,
                        fullName: `${instructorData.firstName} ${instructorData.lastName}`,
                        updatedAt: new Date().toISOString().split('T')[0] 
                      }
                    : i
                ));
              } else {
                // Add new instructor
                const newInstructor: Instructor = {
                  ...instructorData,
                  id: Date.now().toString(),
                  fullName: `${instructorData.firstName} ${instructorData.lastName}`,
                  currentTeachingHours: 0,
                  status: 'active',
                  joinDate: new Date().toISOString().split('T')[0],
                  subjects: [],
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0]
                };
                setInstructors(prev => [...prev, newInstructor]);
              }
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedInstructor(null);
            }}
          />
        )}

        {showDetailModal && selectedInstructor && (
          <InstructorDetailModal
            instructor={selectedInstructor}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedInstructor(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Instructor Form Modal Component
interface InstructorFormModalProps {
  instructor: Instructor | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InstructorFormData) => void;
}

function InstructorFormModal({ instructor, isOpen, onClose, onSave }: InstructorFormModalProps) {
  const [formData, setFormData] = useState<InstructorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    position: 'อาจารย์ประจำ',
    employmentType: 'full-time',
    academicRank: 'อาจารย์',
    specializations: [],
    maxTeachingHours: 18,
    biography: '',
    qualifications: [],
    officeLocation: '',
    officeHours: ''
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newQualification, setNewQualification] = useState('');

  useEffect(() => {
    if (instructor) {
      setFormData({
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email,
        phone: instructor.phone,
        department: instructor.department,
        position: instructor.position,
        employmentType: instructor.employmentType,
        academicRank: instructor.academicRank,
        specializations: instructor.specializations,
        maxTeachingHours: instructor.maxTeachingHours,
        biography: instructor.biography || '',
        qualifications: instructor.qualifications,
        officeLocation: instructor.officeLocation || '',
        officeHours: instructor.officeHours || ''
      });
    }
  }, [instructor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }));
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
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
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {instructor ? 'แก้ไขข้อมูลอาจารย์' : 'เพิ่มอาจารย์ใหม่'}
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
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลการทำงาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  แผนก *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mockDepartments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ตำแหน่ง *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเภทการจ้างงาน *
                </label>
                <select
                  required
                  value={formData.employmentType}
                  onChange={(e) => setFormData(prev => ({ ...prev, employmentType: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ตำแหน่งทางวิชาการ *
                </label>
                <select
                  required
                  value={formData.academicRank}
                  onChange={(e) => setFormData(prev => ({ ...prev, academicRank: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {academicRanks.map(rank => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชั่วโมงสอนสูงสุด *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="40"
                  value={formData.maxTeachingHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxTeachingHours: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ห้องทำงาน
                </label>
                <input
                  type="text"
                  value={formData.officeLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, officeLocation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เช่น ห้อง 301 อาคารวิทยาศาสตร์"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เวลาพบนักศึกษา
              </label>
              <input
                type="text"
                value={formData.officeHours}
                onChange={(e) => setFormData(prev => ({ ...prev, officeHours: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เช่น จันทร์-ศุกร์ 13:00-16:00"
              />
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ความเชี่ยวชาญ</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เพิ่มความเชี่ยวชาญ..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                />
                <button
                  type="button"
                  onClick={addSpecialization}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {spec}
                    <button
                      type="button"
                      onClick={() => removeSpecialization(index)}
                      className="w-4 h-4 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">คุณวุฒิการศึกษา</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เพิ่มคุณวุฒิ..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                />
                <button
                  type="button"
                  onClick={addQualification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>
              <div className="space-y-2">
                {formData.qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-900">{qual}</span>
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ประวัติโดยย่อ
            </label>
            <textarea
              rows={4}
              value={formData.biography}
              onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ประวัติและผลงานของอาจารย์..."
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
              {instructor ? 'บันทึกการแก้ไข' : 'เพิ่มอาจารย์'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Instructor Detail Modal Component
interface InstructorDetailModalProps {
  instructor: Instructor;
  isOpen: boolean;
  onClose: () => void;
}

function InstructorDetailModal({ instructor, isOpen, onClose }: InstructorDetailModalProps) {
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
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{instructor.fullName}</h2>
                <p className="text-gray-600">{instructor.position}</p>
                <p className="text-sm text-gray-500">{instructor.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลติดต่อ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">อีเมล</p>
                  <p className="text-gray-900">{instructor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">เบอร์โทรศัพท์</p>
                  <p className="text-gray-900">{instructor.phone}</p>
                </div>
              </div>
              {instructor.officeLocation && (
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ห้องทำงาน</p>
                    <p className="text-gray-900">{instructor.officeLocation}</p>
                  </div>
                </div>
              )}
              {instructor.officeHours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">เวลาพบนักศึกษา</p>
                    <p className="text-gray-900">{instructor.officeHours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลทางวิชาการ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ตำแหน่งทางวิชาการ</p>
                  <p className="text-gray-900">{instructor.academicRank}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ประเภทการจ้างงาน</p>
                  <p className="text-gray-900">{employmentTypes.find(t => t.value === instructor.employmentType)?.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ภาระงานสอน</p>
                  <p className="text-gray-900">{instructor.currentTeachingHours}/{instructor.maxTeachingHours} ชั่วโมง</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">วันที่เริ่มงาน</p>
                  <p className="text-gray-900">{new Date(instructor.joinDate).toLocaleDateString('th-TH')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ความเชี่ยวชาญ</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">คุณวุฒิการศึกษา</h3>
            <div className="space-y-2">
              {instructor.qualifications.map((qual, index) => (
                <div key={index} className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900">{qual}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Subjects */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">รายวิชาที่สอน</h3>
            <div className="space-y-3">
              {instructor.subjects.map((subject) => (
                <div key={subject.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{subject.subjectCode}</h4>
                      <p className="text-sm text-gray-600">{subject.subjectName}</p>
                      <p className="text-xs text-gray-500">
                        ภาคเรียนที่ {subject.semester} ปีที่ {subject.year} • {subject.studentsCount} คน
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      subject.role === 'main' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subject.role === 'main' ? 'อาจารย์หลัก' : 'อาจารย์ผู้ช่วย'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biography */}
          {instructor.biography && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติโดยย่อ</h3>
              <p className="text-gray-700 leading-relaxed">{instructor.biography}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
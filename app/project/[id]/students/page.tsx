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
  GraduationCap, 
  Users, 
  BookOpen, 
  Clock,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
  UserCheck
} from 'lucide-react';

// Types
interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  address?: string;
  curriculum: string;
  major: string;
  academicYear: number;
  semester: number;
  admissionYear: number;
  status: 'active' | 'inactive' | 'graduated' | 'dropped' | 'suspended';
  gpa?: number;
  totalCredits: number;
  enrolledSubjects: EnrolledSubject[];
  avatar?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  advisor?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
}

interface EnrolledSubject {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  semester: number;
  academicYear: number;
  grade?: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'failed';
  instructor: string;
}

interface StudentFormData {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  address?: string;
  curriculum: string;
  major: string;
  academicYear: number;
  semester: number;
  admissionYear: number;
  nationality: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  advisor?: string;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: '65070158',
    firstName: 'พิศลย์',
    lastName: 'อุตตาลกาญจนา',
    fullName: 'นายพิศลย์ อุตตาลกาญจนา',
    email: 'phisaln@student.university.ac.th',
    phone: '081-234-5678',
    dateOfBirth: '2002-03-15',
    address: '123 ถนนรามคำแหง เขตหัวหมาก กรุงเทพฯ 10240',
    curriculum: 'Computer Science',
    major: 'วิทยาการคอมพิวเตอร์',
    academicYear: 4,
    semester: 1,
    admissionYear: 2022,
    status: 'active',
    gpa: 3.45,
    totalCredits: 108,
    enrolledSubjects: [
      {
        id: '1',
        subjectCode: 'CS401',
        subjectName: 'Senior Project I',
        credits: 3,
        semester: 1,
        academicYear: 4,
        status: 'enrolled',
        instructor: 'ดร.สมชาย ใจดี'
      },
      {
        id: '2',
        subjectCode: 'CS402',
        subjectName: 'Machine Learning',
        credits: 3,
        semester: 1,
        academicYear: 4,
        status: 'enrolled',
        instructor: 'ผศ.ดร.วิชัย สมใจ'
      }
    ],
    emergencyContact: {
      name: 'นางสาวสมใส อุตตาลกาญจนา',
      relationship: 'แม่',
      phone: '081-111-2222'
    },
    advisor: 'ดร.สมชาย ใจดี',
    nationality: 'ไทย',
    createdAt: '2022-06-15',
    updatedAt: '2024-06-26'
  },
  {
    id: '2',
    studentId: '65070170',
    firstName: 'ภัทรภร',
    lastName: 'จิตต์ปราณี',
    fullName: 'นางสาวภัทรภร จิตต์ปราณี',
    email: 'pattrapornj@student.university.ac.th',
    phone: '082-345-6789',
    dateOfBirth: '2002-07-22',
    address: '456 ถนนพระราม 4 เขตปทุมวัน กรุงเทพฯ 10330',
    curriculum: 'Computer Science',
    major: 'วิทยาการคอมพิวเตอร์',
    academicYear: 4,
    semester: 1,
    admissionYear: 2022,
    status: 'active',
    gpa: 3.72,
    totalCredits: 112,
    enrolledSubjects: [
      {
        id: '3',
        subjectCode: 'CS401',
        subjectName: 'Senior Project I',
        credits: 3,
        semester: 1,
        academicYear: 4,
        status: 'enrolled',
        instructor: 'ดร.สมชาย ใจดี'
      },
      {
        id: '4',
        subjectCode: 'CS403',
        subjectName: 'Software Engineering',
        credits: 3,
        semester: 1,
        academicYear: 4,
        status: 'enrolled',
        instructor: 'อ.สุดา มานะ'
      }
    ],
    emergencyContact: {
      name: 'นายสมศักดิ์ จิตต์ปราณี',
      relationship: 'พ่อ',
      phone: '081-333-4444'
    },
    advisor: 'อ.สุดา มานะ',
    nationality: 'ไทย',
    createdAt: '2022-06-15',
    updatedAt: '2024-06-25'
  },
  {
    id: '3',
    studentId: '66070201',
    firstName: 'อนันต์',
    lastName: 'วิศิษฏ์กุล',
    fullName: 'นายอนันต์ วิศิษฏ์กุล',
    email: 'ananw@student.university.ac.th',
    phone: '083-456-7890',
    dateOfBirth: '2003-01-10',
    curriculum: 'Information Technology',
    major: 'เทคโนโลยีสารสนเทศ',
    academicYear: 3,
    semester: 1,
    admissionYear: 2023,
    status: 'active',
    gpa: 3.21,
    totalCredits: 78,
    enrolledSubjects: [
      {
        id: '5',
        subjectCode: 'IT301',
        subjectName: 'Web Development',
        credits: 3,
        semester: 1,
        academicYear: 3,
        status: 'enrolled',
        instructor: 'อ.สุดา มานะ'
      },
      {
        id: '6',
        subjectCode: 'IT302',
        subjectName: 'Database Systems',
        credits: 3,
        semester: 1,
        academicYear: 3,
        status: 'enrolled',
        instructor: 'ผศ.ดร.วิชัย สมใจ'
      }
    ],
    advisor: 'ดร.ภัทรภร วัฒนาชีพ',
    nationality: 'ไทย',
    createdAt: '2023-06-15',
    updatedAt: '2024-06-20'
  },
  {
    id: '4',
    studentId: '64070089',
    firstName: 'มาลี',
    lastName: 'ใจงาม',
    fullName: 'นางสาวมาลี ใจงาม',
    email: 'maleej@student.university.ac.th',
    dateOfBirth: '2001-11-05',
    curriculum: 'Software Engineering',
    major: 'วิศวกรรมซอฟต์แวร์',
    academicYear: 4,
    semester: 1,
    admissionYear: 2021,
    status: 'graduated',
    gpa: 3.89,
    totalCredits: 140,
    enrolledSubjects: [],
    advisor: 'ผศ.ดร.วิชัย สมใจ',
    nationality: 'ไทย',
    createdAt: '2021-06-15',
    updatedAt: '2024-05-30'
  }
];

const mockCurriculums = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Digital Media',
  'Cybersecurity'
];

const mockMajors = [
  'วิทยาการคอมพิวเตอร์',
  'เทคโนโลยีสารสนเทศ',
  'วิศวกรรมซอฟต์แวร์',
  'สื่อดิจิทัล',
  'ความมั่นคงไซเบอร์'
];

const academicYears = [1, 2, 3, 4, 5];

export default function StudentsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter and search logic
  useEffect(() => {
    let filtered = students;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.curriculum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.major.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Curriculum filter
    if (selectedCurriculum !== 'all') {
      filtered = filtered.filter(student => student.curriculum === selectedCurriculum);
    }

    // Academic year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(student => student.academicYear === parseInt(selectedYear));
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    setFilteredStudents(filtered);
  }, [searchQuery, selectedCurriculum, selectedYear, selectedStatus, students]);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setShowAddModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบนักศึกษาคนนี้?')) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'graduated':
        return 'bg-blue-100 text-blue-800';
      case 'dropped':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'กำลังศึกษา';
      case 'inactive':
        return 'ไม่ได้ศึกษา';
      case 'graduated':
        return 'จบการศึกษา';
      case 'dropped':
        return 'ออกกลางคัน';
      case 'suspended':
        return 'พักการศึกษา';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'graduated':
        return Award;
      case 'dropped':
        return XCircle;
      case 'suspended':
        return AlertTriangle;
      default:
        return UserCheck;
    }
  };

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const graduatedStudents = students.filter(s => s.status === 'graduated').length;
  const avgGPA = students
    .filter(s => s.gpa)
    .reduce((sum, s) => sum + (s.gpa || 0), 0) / students.filter(s => s.gpa).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการนักศึกษา</h1>
            <p className="text-gray-600">
              จัดการข้อมูลนักศึกษา รวมถึงการลงทะเบียนเรียนและผลการเรียน
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'table' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                ตาราง
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                การ์ด
              </button>
            </div>
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
              onClick={handleAddStudent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มนักศึกษา
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
                <p className="text-sm text-gray-600">นักศึกษาทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">กำลังศึกษา</p>
                <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">จบการศึกษา</p>
                <p className="text-2xl font-bold text-gray-900">{graduatedStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">เกรดเฉลี่ย</p>
                <p className="text-2xl font-bold text-gray-900">
                  {avgGPA ? avgGPA.toFixed(2) : 'N/A'}
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
            placeholder="ค้นหานักศึกษา (รหัส, ชื่อ, อีเมล, หลักสูตร)..."
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
                    ชั้นปี
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {academicYears.map(year => (
                      <option key={year} value={year.toString()}>
                        ปีที่ {year}
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
                    <option value="active">กำลังศึกษา</option>
                    <option value="graduated">จบการศึกษา</option>
                    <option value="dropped">ออกกลางคัน</option>
                    <option value="suspended">พักการศึกษา</option>
                    <option value="inactive">ไม่ได้ศึกษา</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <StudentsTable 
          students={filteredStudents}
          onEdit={handleEditStudent}
          onView={handleViewStudent}
          onDelete={handleDeleteStudent}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getStatusIcon={getStatusIcon}
          getGradeColor={getGradeColor}
        />
      ) : (
        <StudentsGrid 
          students={filteredStudents}
          onEdit={handleEditStudent}
          onView={handleViewStudent}
          onDelete={handleDeleteStudent}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getStatusIcon={getStatusIcon}
          getGradeColor={getGradeColor}
        />
      )}

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ไม่พบนักศึกษา
          </h3>
          <p className="text-gray-600 mb-4">
            ไม่พบนักศึกษาที่ตรงกับเงื่อนไขการค้นหา
          </p>
          <button
            onClick={handleAddStudent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            เพิ่มนักศึกษาใหม่
          </button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <StudentFormModal
            student={selectedStudent}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
            onSave={(studentData) => {
              if (selectedStudent) {
                // Edit existing student
                setStudents(prev => prev.map(s => 
                  s.id === selectedStudent.id 
                    ? { 
                        ...s, 
                        ...studentData,
                        fullName: `${studentData.firstName} ${studentData.lastName}`,
                        updatedAt: new Date().toISOString().split('T')[0] 
                      }
                    : s
                ));
              } else {
                // Add new student
                const newStudent: Student = {
                  ...studentData,
                  id: Date.now().toString(),
                  fullName: `${studentData.firstName} ${studentData.lastName}`,
                  status: 'active',
                  totalCredits: 0,
                  enrolledSubjects: [],
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0]
                };
                setStudents(prev => [...prev, newStudent]);
              }
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
          />
        )}

        {showDetailModal && selectedStudent && (
          <StudentDetailModal
            student={selectedStudent}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Students Table Component
interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onDelete: (studentId: string) => void;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  getStatusIcon: (status: string) => any;
  getGradeColor: (gpa: number) => string;
}

function StudentsTable({ 
  students, onEdit, onView, onDelete, 
  getStatusColor, getStatusLabel, getStatusIcon, getGradeColor 
}: StudentsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                นักศึกษา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หลักสูตร
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชั้นปี
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เกรดเฉลี่ย
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หน่วยกิต
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รายวิชา
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
              {students.map((student) => {
                const StatusIcon = getStatusIcon(student.status);
                
                return (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {student.fullName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {student.studentId}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{student.curriculum}</div>
                        <div className="text-xs text-gray-500">{student.major}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">ปีที่ {student.academicYear}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ภาคเรียนที่ {student.semester}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {student.gpa ? (
                        <span className={`text-sm font-medium ${getGradeColor(student.gpa)}`}>
                          {student.gpa.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{student.totalCredits}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{student.enrolledSubjects.length} วิชา</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(student)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="ดูรายละเอียด"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(student)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(student.id)}
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

// Students Grid Component
function StudentsGrid({ 
  students, onEdit, onView, onDelete, 
  getStatusColor, getStatusLabel, getStatusIcon, getGradeColor 
}: StudentsTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {students.map((student) => {
          const StatusIcon = getStatusIcon(student.status);
          
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.fullName}</h3>
                      <p className="text-sm text-gray-600">{student.studentId}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    {getStatusLabel(student.status)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">หลักสูตร</p>
                    <p className="text-sm text-gray-900">{student.curriculum}</p>
                    <p className="text-xs text-gray-500">{student.major}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">ชั้นปี</p>
                      <p className="text-sm text-gray-900">ปีที่ {student.academicYear}</p>
                    </div>
                    {student.gpa && (
                      <div>
                        <p className="text-xs text-gray-500">เกรดเฉลี่ย</p>
                        <p className={`text-sm font-medium ${getGradeColor(student.gpa)}`}>
                          {student.gpa.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {student.totalCredits} หน่วยกิต
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {student.enrolledSubjects.length} วิชา
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(student)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="ดูรายละเอียด"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="แก้ไข"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Student Form Modal (simplified for brevity)
interface StudentFormModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
}

function StudentFormModal({ student, isOpen, onClose, onSave }: StudentFormModalProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    curriculum: 'Computer Science',
    major: 'วิทยาการคอมพิวเตอร์',
    academicYear: 1,
    semester: 1,
    admissionYear: new Date().getFullYear(),
    nationality: 'ไทย',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    advisor: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone || '',
        dateOfBirth: student.dateOfBirth,
        address: student.address || '',
        curriculum: student.curriculum,
        major: student.major,
        academicYear: student.academicYear,
        semester: student.semester,
        admissionYear: student.admissionYear,
        nationality: student.nationality,
        emergencyContact: student.emergencyContact,
        advisor: student.advisor || ''
      });
    }
  }, [student]);

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
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {student ? 'แก้ไขข้อมูลนักศึกษา' : 'เพิ่มนักศึกษาใหม่'}
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
                  รหัสนักศึกษา *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
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
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันเกิด *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลการศึกษา</h3>
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
                  สาขาวิชา *
                </label>
                <select
                  required
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mockMajors.map(major => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชั้นปี *
                </label>
                <select
                  required
                  value={formData.academicYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, academicYear: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>
                      ปีที่ {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ปีที่เข้าศึกษา *
                </label>
                <input
                  type="number"
                  required
                  min="2020"
                  max={new Date().getFullYear() + 1}
                  value={formData.admissionYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, admissionYear: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
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
              {student ? 'บันทึกการแก้ไข' : 'เพิ่มนักศึกษา'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Student Detail Modal (simplified for brevity)
interface StudentDetailModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.fullName}</h2>
                <p className="text-gray-600">{student.studentId}</p>
                <p className="text-sm text-gray-500">{student.curriculum} - {student.major}</p>
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
          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลการศึกษา</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ชั้นปี</p>
                  <p className="text-gray-900">ปีที่ {student.academicYear}</p>
                </div>
              </div>
              {student.gpa && (
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">เกรดเฉลี่ย</p>
                    <p className="text-gray-900">{student.gpa.toFixed(2)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">หน่วยกิตสะสม</p>
                  <p className="text-gray-900">{student.totalCredits}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ปีที่เข้าศึกษา</p>
                  <p className="text-gray-900">{student.admissionYear}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลติดต่อ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">อีเมล</p>
                  <p className="text-gray-900">{student.email}</p>
                </div>
              </div>
              {student.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">เบอร์โทรศัพท์</p>
                    <p className="text-gray-900">{student.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enrolled Subjects */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">รายวิชาที่ลงทะเบียน</h3>
            <div className="space-y-3">
              {student.enrolledSubjects.map((subject) => (
                <div key={subject.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{subject.subjectCode}</h4>
                      <p className="text-sm text-gray-600">{subject.subjectName}</p>
                      <p className="text-xs text-gray-500">
                        อาจารย์: {subject.instructor} • {subject.credits} หน่วยกิต
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      subject.status === 'enrolled' 
                        ? 'bg-blue-100 text-blue-800' 
                        : subject.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subject.status === 'enrolled' ? 'กำลังเรียน' : 
                       subject.status === 'completed' ? 'เรียนจบ' : subject.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
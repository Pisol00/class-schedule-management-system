'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Subject {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  credits: number;
  type: 'core' | 'major' | 'elective' | 'general';
  semester: number;
  year: number;
  prerequisites?: string[];
  description: string;
  status: 'active' | 'inactive';
}

interface Program {
  id: string;
  name: string;
  nameEn: string;
  faculty: string;
  degree: string;
  duration: number;
  totalCredits: number;
  subjects: Subject[];
  description: string;
  status: 'active' | 'inactive';
}

interface Branch {
  id: string;
  name: string;
  nameEn: string;
  programId: string;
  description: string;
  status: 'active' | 'inactive';
}

// Mock data
const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'วิทยาการคอมพิวเตอร์',
    nameEn: 'Computer Science',
    faculty: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    duration: 4,
    totalCredits: 132,
    subjects: [],
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
    status: 'active'
  },
  {
    id: '2',
    name: 'เทคโนโลยีสารสนเทศ',
    nameEn: 'Information Technology',
    faculty: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    duration: 4,
    totalCredits: 132,
    subjects: [],
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ',
    status: 'active'
  },
  {
    id: '3',
    name: 'วิศวกรรมซอฟต์แวร์',
    nameEn: 'Software Engineering',
    faculty: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    duration: 4,
    totalCredits: 132,
    subjects: [],
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์',
    status: 'active'
  },
  {
    id: '4',
    name: 'ระบบสารสนเทศ',
    nameEn: 'Information Systems',
    faculty: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    duration: 4,
    totalCredits: 132,
    subjects: [],
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาระบบสารสนเทศ',
    status: 'active'
  }
];

const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS101',
    nameEn: 'Introduction to Computer Science',
    nameTh: 'พื้นฐานวิทยาการคอมพิวเตอร์',
    credits: 3,
    type: 'core',
    semester: 1,
    year: 1,
    prerequisites: [],
    description: 'การแนะนำพื้นฐานวิทยาการคอมพิวเตอร์และการเขียนโปรแกรม',
    status: 'active'
  },
  {
    id: '2',
    code: 'CS102',
    nameEn: 'Computer Programming',
    nameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    credits: 3,
    type: 'core',
    semester: 1,
    year: 1,
    prerequisites: ['CS101'],
    description: 'หลักการเขียนโปรแกรมขั้นพื้นฐาน',
    status: 'active'
  },
  {
    id: '3',
    code: 'CS201',
    nameEn: 'Data Structures',
    nameTh: 'โครงสร้างข้อมูล',
    credits: 3,
    type: 'major',
    semester: 1,
    year: 2,
    prerequisites: ['CS102'],
    description: 'การศึกษาโครงสร้างข้อมูลและอัลกอริทึมพื้นฐาน',
    status: 'active'
  },
  {
    id: '4',
    code: 'MA101',
    nameEn: 'Calculus I',
    nameTh: 'แคลคูลัส 1',
    credits: 3,
    type: 'general',
    semester: 1,
    year: 1,
    prerequisites: [],
    description: 'คณิตศาสตร์แคลคูลัสเบื้องต้น',
    status: 'active'
  }
];

export default function CurriculumManagement() {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'core' | 'major' | 'elective' | 'general'>('all');
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);

  // Filter subjects based on search and type
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || subject.type === filterType;
    return matchesSearch && matchesType;
  });

  const getSubjectTypeLabel = (type: Subject['type']) => {
    const labels = {
      core: 'วิชาแกน',
      major: 'วิชาเอก',
      elective: 'วิชาเลือก',
      general: 'วิชาศึกษาทั่วไป'
    };
    return labels[type];
  };

  const getSubjectTypeColor = (type: Subject['type']) => {
    const colors = {
      core: 'bg-red-100 text-red-700',
      major: 'bg-blue-100 text-blue-700',
      elective: 'bg-green-100 text-green-700',
      general: 'bg-orange-100 text-orange-700'
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900" style={{ letterSpacing: '-0.025em' }}>
                  จัดการหลักสูตร
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  จัดการข้อมูลหลักสูตร สาขาวิชา และรายวิชาต่างๆ
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setShowProgramModal(true)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  เพิ่มหลักสูตร
                </motion.button>
                <motion.button
                  onClick={() => setShowAddSubjectModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  เพิ่มรายวิชา
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Programs List */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Programs Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-lg font-semibold text-slate-900">หลักสูตรทั้งหมด</h2>
                <p className="text-sm text-slate-600 mt-1">{programs.length} หลักสูตร</p>
              </div>

              {/* Programs List */}
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedProgram?.id === program.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedProgram(program)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedProgram?.id === program.id ? 'bg-blue-500' : 'bg-slate-100'
                      }`}>
                        <svg className={`w-5 h-5 ${
                          selectedProgram?.id === program.id ? 'text-white' : 'text-slate-600'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm ${
                          selectedProgram?.id === program.id ? 'text-blue-900' : 'text-slate-900'
                        }`}>
                          {program.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{program.nameEn}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">{program.degree}</span>
                          <span className="text-xs font-medium text-slate-700">{program.totalCredits} หน่วยกิต</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Subjects Management */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Subjects Header */}
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">รายวิชาทั้งหมด</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {selectedProgram ? `หลักสูตร ${selectedProgram.name}` : 'รายวิชาทั้งหมดในระบบ'}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    {filteredSubjects.length} รายวิชา
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="ค้นหารายวิชา..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter */}
                  <div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="all">ประเภทวิชาทั้งหมด</option>
                      <option value="core">วิชาแกน</option>
                      <option value="major">วิชาเอก</option>
                      <option value="elective">วิชาเลือก</option>
                      <option value="general">วิชาศึกษาทั่วไป</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subjects List */}
              <div className="p-6">
                {filteredSubjects.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">ไม่พบรายวิชา</h3>
                    <p className="text-sm text-slate-500">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSubjects.map((subject, index) => (
                      <motion.div
                        key={subject.id}
                        className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                  <span className="text-sm font-semibold text-blue-700">
                                    {subject.code.substring(0, 2)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold text-slate-900">{subject.code}</h3>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectTypeColor(subject.type)}`}>
                                    {getSubjectTypeLabel(subject.type)}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 mb-1">{subject.nameTh}</p>
                                <p className="text-xs text-slate-500 mb-2">{subject.nameEn}</p>
                                <p className="text-xs text-slate-600 line-clamp-2">{subject.description}</p>
                                <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500">
                                  <span>หน่วยกิต: {subject.credits}</span>
                                  <span>ชั้นปีที่ {subject.year}</span>
                                  <span>ภาคเรียนที่ {subject.semester}</span>
                                  {subject.prerequisites && subject.prerequisites.length > 0 && (
                                    <span>วิชาพื้นฐาน: {subject.prerequisites.join(', ')}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <motion.button
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => alert(`แก้ไขรายวิชา ${subject.code}`)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                            </motion.button>
                            <motion.button
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => alert(`ลบรายวิชา ${subject.code}`)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Cards */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard
            title="หลักสูตรทั้งหมด"
            value={programs.length}
            icon="🎓"
            color="blue"
          />
          <StatCard
            title="รายวิชาทั้งหมด"
            value={subjects.length}
            icon="📚"
            color="green"
          />
          <StatCard
            title="วิชาแกน"
            value={subjects.filter(s => s.type === 'core').length}
            icon="🔥"
            color="red"
          />
          <StatCard
            title="วิชาเอก"
            value={subjects.filter(s => s.type === 'major').length}
            icon="⭐"
            color="orange"
          />
        </motion.div>
      </div>
    </div>
  );
}

// Statistics Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'red' | 'orange';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700'
  };

  return (
    <motion.div 
      className={`p-6 rounded-2xl border ${colorClasses[color]}`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm font-medium">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
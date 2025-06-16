'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Types
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
  practicalHours: number;
  theoryHours: number;
}

interface Curriculum {
  id: string;
  title: string;
  year: string;
  description: string;
  englishTitle: string;
  totalCredits: number;
  practicalHours: number;
  theoryHours: number;
  status: 'active' | 'inactive' | 'pending' | 'draft';
  department: string;
  degree: string;
  lastUpdated: string;
  createdAt: string;
  updatedBy: string;
  subjects: Subject[];
  version: string;
  approvalDate?: string;
  effectiveDate: string;
  statistics: {
    coreSubjects: number;
    majorSubjects: number;
    electiveSubjects: number;
    generalSubjects: number;
    totalSubjects: number;
  };
}

interface CurriculumFormData {
  title: string;
  year: string;
  description: string;
  englishTitle: string;
  department: string;
  degree: string;
  effectiveDate: string;
  version: string;
  status: 'active' | 'inactive' | 'pending' | 'draft';
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

// Mock data with complete information
const mockCurriculums: Curriculum[] = [
  {
    id: '1',
    title: 'หลักสูตรปรับปรุง พ.ศ. 2565',
    year: '2565',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ',
    englishTitle: 'Bachelor of Science Program in Information Technology',
    totalCredits: 132,
    practicalHours: 960,
    theoryHours: 1200,
    status: 'active',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '2 วันที่แล้ว',
    createdAt: '2024-01-15',
    updatedBy: 'อ.สมชาย ใจดี',
    subjects: [],
    version: '2.1',
    approvalDate: '2024-06-15',
    effectiveDate: '2024-08-01',
    statistics: {
      coreSubjects: 18,
      majorSubjects: 25,
      electiveSubjects: 12,
      generalSubjects: 15,
      totalSubjects: 70
    }
  },
  {
    id: '2',
    title: 'หลักสูตรปรับปรุง พ.ศ. 2565',
    year: '2565',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์',
    englishTitle: 'Bachelor of Science Program in Software Engineering',
    totalCredits: 132,
    practicalHours: 1020,
    theoryHours: 1140,
    status: 'pending',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '5 วันที่แล้ว',
    createdAt: '2024-02-20',
    updatedBy: 'อ.สุดา มานะ',
    subjects: [],
    version: '1.0',
    effectiveDate: '2025-01-01',
    statistics: {
      coreSubjects: 20,
      majorSubjects: 28,
      electiveSubjects: 10,
      generalSubjects: 15,
      totalSubjects: 73
    }
  },
  {
    id: '3',
    title: 'หลักสูตรปรับปรุง พ.ศ. 2565',
    year: '2565',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
    englishTitle: 'Bachelor of Science Program in Computer Science',
    totalCredits: 132,
    practicalHours: 900,
    theoryHours: 1260,
    status: 'active',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '1 สัปดาห์ที่แล้ว',
    createdAt: '2024-01-10',
    updatedBy: 'อ.วิชัย สมใจ',
    subjects: [],
    version: '2.0',
    approvalDate: '2024-05-20',
    effectiveDate: '2024-08-01',
    statistics: {
      coreSubjects: 22,
      majorSubjects: 24,
      electiveSubjects: 14,
      generalSubjects: 15,
      totalSubjects: 75
    }
  },
  {
    id: '4',
    title: 'หลักสูตรปรับปรุง พ.ศ. 2565',
    year: '2565',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาระบบสารสนเทศ',
    englishTitle: 'Bachelor of Science Program in Information Systems',
    totalCredits: 132,
    practicalHours: 840,
    theoryHours: 1320,
    status: 'draft',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '3 วันที่แล้ว',
    createdAt: '2024-03-01',
    updatedBy: 'อ.ประยุทธ มั่นคง',
    subjects: [],
    version: '1.0',
    effectiveDate: '2025-06-01',
    statistics: {
      coreSubjects: 16,
      majorSubjects: 26,
      electiveSubjects: 16,
      generalSubjects: 15,
      totalSubjects: 73
    }
  },
  {
    id: '5',
    title: 'หลักสูตรปรับปรุง พ.ศ. 2562',
    year: '2562',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ (เก่า)',
    englishTitle: 'Bachelor of Science Program in Information Technology (Legacy)',
    totalCredits: 130,
    practicalHours: 800,
    theoryHours: 1200,
    status: 'inactive',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '2 สัปดาห์ที่แล้ว',
    createdAt: '2019-01-15',
    updatedBy: 'อ.สมชาย ใจดี',
    subjects: [],
    version: '1.5',
    approvalDate: '2019-06-15',
    effectiveDate: '2019-08-01',
    statistics: {
      coreSubjects: 20,
      majorSubjects: 22,
      electiveSubjects: 10,
      generalSubjects: 15,
      totalSubjects: 67
    }
  }
];

const departments = [
  'คณะเทคโนโลยีสารสนเทศ',
  'คณะวิศวกรรมศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะสถาปัตยกรรมศาสตร์'
];

const degrees = [
  'วิทยาศาสตรบัณฑิต',
  'วิศวกรรมศาสตรบัณฑิต',
  'สถาปัตยกรรมศาสตรบัณฑิต'
];

export default function CurriculumManagement() {
  // States
  const [curriculums, setCurriculums] = useState<Curriculum[]>(mockCurriculums);
  const [filteredCurriculums, setFilteredCurriculums] = useState<Curriculum[]>(mockCurriculums);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('ทุกสถานะ');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status' | 'credits'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);

  // Form state
  const [formData, setFormData] = useState<CurriculumFormData>({
    title: '',
    year: new Date().getFullYear().toString(),
    description: '',
    englishTitle: '',
    department: departments[0],
    degree: degrees[0],
    effectiveDate: '',
    version: '1.0',
    status: 'draft'
  });
  const [formErrors, setFormErrors] = useState<Partial<CurriculumFormData>>({});

  // Toast functionality
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...curriculums];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(curriculum =>
        curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.degree.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (currentFilter !== 'ทุกสถานะ') {
      const statusMap: { [key: string]: string } = {
        'ใช้งาน': 'active',
        'รออนุมัติ': 'pending',
        'ไม่ใช้งาน': 'inactive',
        'แบบร่าง': 'draft'
      };
      filtered = filtered.filter(curriculum => curriculum.status === statusMap[currentFilter]);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'credits':
          aValue = a.totalCredits;
          bValue = b.totalCredits;
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCurriculums(filtered);
    setCurrentPage(1);
  }, [searchTerm, currentFilter, sortBy, sortOrder, curriculums]);

  // Pagination
  const totalPages = Math.ceil(filteredCurriculums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCurriculums = filteredCurriculums.slice(startIndex, endIndex);

  // Statistics
  const stats = {
    total: curriculums.length,
    active: curriculums.filter(c => c.status === 'active').length,
    pending: curriculums.filter(c => c.status === 'pending').length,
    inactive: curriculums.filter(c => c.status === 'inactive').length,
    draft: curriculums.filter(c => c.status === 'draft').length
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<CurriculumFormData> = {};

    if (!formData.title.trim()) errors.title = 'กรุณาระบุชื่อหลักสูตร';
    if (!formData.year.trim()) errors.year = 'กรุณาระบุปี';
    if (!formData.description.trim()) errors.description = 'กรุณาระบุคำอธิบาย';
    if (!formData.englishTitle.trim()) errors.englishTitle = 'กรุณาระบุชื่อหลักสูตรภาษาอังกฤษ';
    if (!formData.effectiveDate) errors.effectiveDate = 'กรุณาระบุวันที่มีผล';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // CRUD Operations
  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCurriculum: Curriculum = {
        id: Date.now().toString(),
        ...formData,
        totalCredits: 132,
        practicalHours: 0,
        theoryHours: 0,
        lastUpdated: 'เมื่อสักครู่',
        createdAt: new Date().toISOString().split('T')[0],
        updatedBy: 'อ.สมชาย ใจดี',
        subjects: [],
        statistics: {
          coreSubjects: 0,
          majorSubjects: 0,
          electiveSubjects: 0,
          generalSubjects: 0,
          totalSubjects: 0
        }
      };

      setCurriculums(prev => [newCurriculum, ...prev]);
      setShowCreateModal(false);
      resetForm();
      addToast({
        type: 'success',
        title: 'สำเร็จ',
        message: 'สร้างหลักสูตรใหม่เรียบร้อยแล้ว'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถสร้างหลักสูตรได้'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedCurriculum || !validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurriculums(prev => prev.map(c =>
        c.id === selectedCurriculum.id
          ? {
            ...c,
            ...formData,
            lastUpdated: 'เมื่อสักครู่',
            updatedBy: 'อ.สมชาย ใจดี'
          }
          : c
      ));

      setShowEditModal(false);
      setSelectedCurriculum(null);
      resetForm();
      addToast({
        type: 'success',
        title: 'สำเร็จ',
        message: 'แก้ไขหลักสูตรเรียบร้อยแล้ว'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถแก้ไขหลักสูตรได้'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCurriculum) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurriculums(prev => prev.filter(c => c.id !== selectedCurriculum.id));
      setShowDeleteModal(false);
      setSelectedCurriculum(null);
      addToast({
        type: 'success',
        title: 'สำเร็จ',
        message: 'ลบหลักสูตรเรียบร้อยแล้ว'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถลบหลักสูตรได้'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCurriculums.length === 0) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurriculums(prev => prev.filter(c => !selectedCurriculums.includes(c.id)));
      setSelectedCurriculums([]);
      setShowBulkDeleteModal(false);
      addToast({
        type: 'success',
        title: 'สำเร็จ',
        message: `ลบหลักสูตร ${selectedCurriculums.length} รายการเรียบร้อยแล้ว`
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถลบหลักสูตรได้'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicate = async (curriculum: Curriculum) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const duplicatedCurriculum: Curriculum = {
        ...curriculum,
        id: Date.now().toString(),
        title: `${curriculum.title} (สำเนา)`,
        status: 'draft',
        lastUpdated: 'เมื่อสักครู่',
        createdAt: new Date().toISOString().split('T')[0],
        updatedBy: 'อ.สมชาย ใจดี',
        version: '1.0'
      };

      setCurriculums(prev => [duplicatedCurriculum, ...prev]);
      addToast({
        type: 'success',
        title: 'สำเร็จ',
        message: 'ทำสำเนาหลักสูตรเรียบร้อยแล้ว'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถทำสำเนาหลักสูตรได้'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const data = selectedCurriculums.length > 0
      ? curriculums.filter(c => selectedCurriculums.includes(c.id))
      : filteredCurriculums;

    // Simulate export
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curriculums_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'สำเร็จ',
      message: `ส่งออกข้อมูล ${data.length} หลักสูตรเรียบร้อยแล้ว`
    });
  };

  // Utility functions
  const resetForm = () => {
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      description: '',
      englishTitle: '',
      department: departments[0],
      degree: degrees[0],
      effectiveDate: '',
      version: '1.0',
      status: 'draft'
    });
    setFormErrors({});
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const openEditModal = (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum);
    setFormData({
      title: curriculum.title,
      year: curriculum.year,
      description: curriculum.description,
      englishTitle: curriculum.englishTitle,
      department: curriculum.department,
      degree: curriculum.degree,
      effectiveDate: curriculum.effectiveDate,
      version: curriculum.version,
      status: curriculum.status
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum);
    setShowDetailsModal(true);
  };

  const toggleSelectCurriculum = (id: string) => {
    setSelectedCurriculums(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedCurriculums(prev =>
      prev.length === currentCurriculums.length ? [] : currentCurriculums.map(c => c.id)
    );
  };

  const getStatusColor = (status: Curriculum['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Curriculum['status']) => {
    switch (status) {
      case 'active':
        return 'ใช้งาน';
      case 'pending':
        return 'รออนุมัติ';
      case 'inactive':
        return 'ไม่ใช้งาน';
      case 'draft':
        return 'แบบร่าง';
      default:
        return 'ไม่ทราบ';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            openCreateModal();
            break;
          case 'f':
            e.preventDefault();
            document.getElementById('search-input')?.focus();
            break;
          case 'a':
            e.preventDefault();
            if (currentCurriculums.length > 0) {
              toggleSelectAll();
            }
            break;
          case 'e':
            e.preventDefault();
            if (selectedCurriculums.length > 0) {
              handleExport();
            }
            break;
        }
      }
      if (e.key === 'Delete' && selectedCurriculums.length > 0) {
        setShowBulkDeleteModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCurriculums, currentCurriculums]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700">กำลังดำเนินการ...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {/* Title and Stats */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">หลักสูตร</h1>
                  <p className="text-gray-600 mt-1">จัดการและดูรายละเอียดหลักสูตรทั้งหมด</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-500">ทั้งหมด</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <div className="text-sm text-gray-500">ใช้งาน</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  <div className="text-sm text-gray-500">รออนุมัติ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
                  <div className="text-sm text-gray-500">แบบร่าง</div>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="ค้นหาหลักสูตร... (Ctrl+F)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <select
                  value={currentFilter}
                  onChange={(e) => setCurrentFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ทุกสถานะ">ทุกสถานะ</option>
                  <option value="ใช้งาน">ใช้งาน</option>
                  <option value="รออนุมัติ">รออนุมัติ</option>
                  <option value="ไม่ใช้งาน">ไม่ใช้งาน</option>
                  <option value="แบบร่าง">แบบร่าง</option>
                </select>

                {/* Sort */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field as any);
                    setSortOrder(order as any);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date-desc">วันที่ล่าสุด</option>
                  <option value="date-asc">วันที่เก่าสุด</option>
                  <option value="name-asc">ชื่อ A-Z</option>
                  <option value="name-desc">ชื่อ Z-A</option>
                  <option value="status-asc">สถานะ</option>
                  <option value="credits-desc">หน่วยกิต (มาก-น้อย)</option>
                </select>

                {/* Items per page */}
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={6}>6 ต่อหน้า</option>
                  <option value={12}>12 ต่อหน้า</option>
                  <option value={24}>24 ต่อหน้า</option>
                  <option value={50}>50 ต่อหน้า</option>
                </select>

                {/* Bulk Actions */}
                {selectedCurriculums.length > 0 && (
                  <>
                    <motion.button
                      onClick={handleExport}
                      className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>ส่งออก ({selectedCurriculums.length})</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setShowBulkDeleteModal(true)}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>ลบ ({selectedCurriculums.length})</span>
                    </motion.button>
                  </>
                )}

                {/* Add Button */}
                <motion.button
                  onClick={openCreateModal}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>เพิ่มหลักสูตร (Ctrl+N)</span>
                </motion.button>
              </div>
            </div>

            {/* Bulk Selection */}
            {currentCurriculums.length > 0 && (
              <div className="mt-4 flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCurriculums.length === currentCurriculums.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    เลือกทั้งหมดในหน้านี้ ({selectedCurriculums.length}/{currentCurriculums.length})
                  </span>
                </label>

                {selectedCurriculums.length > 0 && (
                  <span className="text-sm text-blue-600">
                    เลือก {selectedCurriculums.length} รายการ
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
        {/* Curriculum Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence>
            {currentCurriculums.map((curriculum, index) => (
              <motion.div
                key={curriculum.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" }}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-4 right-4">
                  <input
                    type="checkbox"
                    checked={selectedCurriculums.includes(curriculum.id)}
                    onChange={() => toggleSelectCurriculum(curriculum.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Header with Icon */}
                <div className="flex items-start space-x-4 mb-4" onClick={() => openDetailsModal(curriculum)}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {curriculum.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {curriculum.description}
                    </p>
                  </div>
                </div>

                {/* English Title */}
                <p className="text-sm text-gray-500 mb-4 italic">
                  {curriculum.englishTitle}
                </p>

                {/* Stats */}
                <div className="space-y-3">
                  {/* Credits */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">หน่วยกิต</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {curriculum.totalCredits} หน่วยกิต
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">รายวิชา</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {curriculum.statistics.totalSubjects} วิชา
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">สถานะ</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(curriculum.status)}`}>
                      {getStatusText(curriculum.status)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    อัพเดท: {curriculum.lastUpdated}
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(curriculum);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="แก้ไข"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(curriculum);
                      }}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="ทำสำเนา"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(curriculum);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="ลบ"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              แสดง {startIndex + 1}-{Math.min(endIndex, filteredCurriculums.length)} จาก {filteredCurriculums.length} รายการ
            </div>

            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <motion.button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </motion.button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                if (page > 0 && page <= totalPages) {
                  return (
                    <PageButton
                      key={page}
                      page={page}
                      currentPage={currentPage}
                      onClick={handlePageChange}
                    />
                  );
                }
                return null;
              })}

              {/* Next Button */}
              <motion.button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCurriculums.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || currentFilter !== 'ทุกสถานะ' ? 'ไม่พบหลักสูตรที่ตรงเงื่อนไข' : 'ยังไม่มีหลักสูตร'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || currentFilter !== 'ทุกสถานะ'
                ? 'ลองเปลี่ยนคำค้นหาหรือตัวกรอง'
                : 'เริ่มต้นด้วยการเพิ่มหลักสูตรแรก'
              }
            </p>
            <motion.button
              onClick={openCreateModal}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>เพิ่มหลักสูตรแรก</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <CurriculumModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="เพิ่มหลักสูตรใหม่"
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        departments={departments}
        degrees={degrees}
        isLoading={isLoading}
      />

      <CurriculumModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEdit}
        title="แก้ไขหลักสูตร"
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        departments={departments}
        degrees={degrees}
        isLoading={isLoading}
        isEdit
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="ลบหลักสูตร"
        message={`คุณต้องการลบหลักสูตร "${selectedCurriculum?.title}" หรือไม่?`}
        isLoading={isLoading}
      />

      <DeleteModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={handleBulkDelete}
        title="ลบหลักสูตร"
        message={`คุณต้องการลบหลักสูตร ${selectedCurriculums.length} รายการที่เลือกหรือไม่?`}
        isLoading={isLoading}
      />

      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        curriculum={selectedCurriculum}
      />

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-lg shadow-lg max-w-sm ${toast.type === 'success' ? 'bg-green-500 text-white' :
                toast.type === 'error' ? 'bg-red-500 text-white' :
                  toast.type === 'warning' ? 'bg-yellow-500 text-white' :
                    'bg-blue-500 text-white'
                }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {toast.type === 'success' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {toast.type === 'error' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium">{toast.title}</p>
                  <p className="text-sm opacity-90">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-20 rounded"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: Page Button
function PageButton({ page, currentPage, onClick }: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) {
  const isActive = page === currentPage;

  return (
    <motion.button
      onClick={() => onClick(page)}
      className={`w-10 h-10 rounded-lg font-medium transition-colors ${isActive
        ? 'bg-blue-500 text-white'
        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {page}
    </motion.button>
  );
}

// Component: Curriculum Modal
function CurriculumModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  formData,
  setFormData,
  formErrors,
  departments,
  degrees,
  isLoading,
  isEdit = false
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  formData: CurriculumFormData;
  setFormData: (data: CurriculumFormData) => void;
  formErrors: Partial<CurriculumFormData>;
  departments: string[];
  degrees: string[];
  isLoading: boolean;
  isEdit?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อหลักสูตร <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="เช่น หลักสูตรปรับปรุง พ.ศ. 2565"
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปี พ.ศ. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="2565"
              />
              {formErrors.year && (
                <p className="mt-1 text-sm text-red-500">{formErrors.year}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อหลักสูตรภาษาอังกฤษ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.englishTitle}
              onChange={(e) => setFormData({ ...formData, englishTitle: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.englishTitle ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Bachelor of Science Program in..."
            />
            {formErrors.englishTitle && (
              <p className="mt-1 text-sm text-red-500">{formErrors.englishTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบาย <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="รายละเอียดของหลักสูตร..."
            />
            {formErrors.description && (
              <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คณะ
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปริญญา
              </label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่มีผล <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.effectiveDate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {formErrors.effectiveDate && (
                <p className="mt-1 text-sm text-red-500">{formErrors.effectiveDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เวอร์ชัน
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานะ
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">แบบร่าง</option>
                <option value="pending">รออนุมัติ</option>
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ใช้งาน</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <motion.button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            <span>{isEdit ? 'บันทึกการแก้ไข' : 'สร้างหลักสูตร'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// Component: Delete Modal
function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 mt-1">{message}</p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              ยกเลิก
            </button>
            <motion.button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>ลบ</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Component: Details Modal
function DetailsModal({
  isOpen,
  onClose,
  curriculum
}: {
  isOpen: boolean;
  onClose: () => void;
  curriculum: Curriculum | null;
}) {
  if (!isOpen || !curriculum) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{curriculum.title}</h2>
                <p className="text-gray-600">{curriculum.englishTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">คณะ</label>
                <p className="text-gray-900">{curriculum.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ปริญญา</label>
                <p className="text-gray-900">{curriculum.degree}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ปี พ.ศ.</label>
                <p className="text-gray-900">{curriculum.year}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">เวอร์ชัน</label>
                <p className="text-gray-900">v{curriculum.version}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">วันที่มีผล</label>
                <p className="text-gray-900">{new Date(curriculum.effectiveDate).toLocaleDateString('th-TH')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">สถานะ</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${curriculum.status === 'active' ? 'bg-green-100 text-green-700' :
                  curriculum.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    curriculum.status === 'inactive' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                  {curriculum.status === 'active' ? 'ใช้งาน' :
                    curriculum.status === 'pending' ? 'รออนุมัติ' :
                      curriculum.status === 'inactive' ? 'ไม่ใช้งาน' :
                        'แบบร่าง'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">คำอธิบาย</h3>
            <p className="text-gray-700 leading-relaxed">{curriculum.description}</p>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติรายวิชา</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{curriculum.statistics.totalSubjects}</div>
                <div className="text-sm text-gray-600">รวมทั้งหมด</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{curriculum.statistics.coreSubjects}</div>
                <div className="text-sm text-gray-600">วิชาแกน</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{curriculum.statistics.majorSubjects}</div>
                <div className="text-sm text-gray-600">วิชาเอก</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{curriculum.statistics.electiveSubjects}</div>
                <div className="text-sm text-gray-600">วิชาเลือк</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{curriculum.statistics.generalSubjects}</div>
                <div className="text-sm text-gray-600">ศึกษาทั่วไป</div>
              </div>
            </div>
          </div>

          {/* Credits and Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">หน่วยกิตและชั่วโมง</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{curriculum.totalCredits}</div>
                <div className="text-sm font-medium text-gray-700">หน่วยกิตรวม</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{curriculum.theoryHours}</div>
                <div className="text-sm font-medium text-gray-700">ชั่วโมงทฤษฎี</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{curriculum.practicalHours}</div>
                <div className="text-sm font-medium text-gray-700">ชั่วโมงปฏิบัติ</div>
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการแก้ไข</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">สร้างเมื่อ:</span>
                <span className="text-gray-900">{new Date(curriculum.createdAt).toLocaleDateString('th-TH')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">แก้ไขล่าสุด:</span>
                <span className="text-gray-900">{curriculum.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">แก้ไขโดย:</span>
                <span className="text-gray-900">{curriculum.updatedBy}</span>
              </div>
              {curriculum.approvalDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">อนุมัติเมื่อ:</span>
                  <span className="text-gray-900">{new Date(curriculum.approvalDate).toLocaleDateString('th-TH')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
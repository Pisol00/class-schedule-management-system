'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CurriculumCard from './CurriculumCard';
import CurriculumHeader from './CurriculumHeader.tsx';
import CurriculumModal from './CurriculumModal';
import CurriculumPagination from './CurriculumPagination';
import FloatingActionHints from './FloatingActionHints';
import { 
  Curriculum, 
  CurriculumFormData, 
  Toast, 
  CurriculumStats as StatsType 
} from '@/types/curriculum';

// Mock data
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
    title: 'หลักสูตรวิศวกรรมซอฟต์แวร์ พ.ศ. 2564',
    year: '2564',
    description: 'หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์',
    englishTitle: 'Bachelor of Engineering Program in Software Engineering',
    totalCredits: 140,
    practicalHours: 1080,
    theoryHours: 1320,
    status: 'pending',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิศวกรรมศาสตรบัณฑิต',
    lastUpdated: '1 สัปดาห์ที่แล้ว',
    createdAt: '2024-02-20',
    updatedBy: 'อ.วิชัย สมใจ',
    subjects: [],
    version: '1.0',
    approvalDate: '',
    effectiveDate: '2024-08-01',
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
    title: 'หลักสูตรระบบสารสนเทศ พ.ศ. 2566',
    year: '2566',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาระบบสารสนเทศ',
    englishTitle: 'Bachelor of Science Program in Information Systems',
    totalCredits: 128,
    practicalHours: 900,
    theoryHours: 1140,
    status: 'draft',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '3 วันที่แล้ว',
    createdAt: '2024-03-10',
    updatedBy: 'อ.สุดา มานะ',
    subjects: [],
    version: '0.5',
    approvalDate: '',
    effectiveDate: '2025-08-01',
    statistics: {
      coreSubjects: 16,
      majorSubjects: 22,
      electiveSubjects: 14,
      generalSubjects: 15,
      totalSubjects: 67
    }
  },
  {
    id: '4',
    title: 'หลักสูตรวิทยาการคอมพิวเตอร์ พ.ศ. 2563',
    year: '2563',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
    englishTitle: 'Bachelor of Science Program in Computer Science',
    totalCredits: 135,
    practicalHours: 1020,
    theoryHours: 1260,
    status: 'active',
    department: 'คณะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '1 เดือนที่แล้ว',
    createdAt: '2023-12-05',
    updatedBy: 'อ.ประยุทธ มั่นคง',
    subjects: [],
    version: '3.2',
    approvalDate: '2023-05-15',
    effectiveDate: '2023-08-01',
    statistics: {
      coreSubjects: 19,
      majorSubjects: 26,
      electiveSubjects: 13,
      generalSubjects: 15,
      totalSubjects: 73
    }
  },
  {
    id: '5',
    title: 'หลักสูตรเทคโนโลยีมัลติมีเดีย พ.ศ. 2565',
    year: '2565',
    description: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีมัลติมีเดีย',
    englishTitle: 'Bachelor of Science Program in Multimedia Technology',
    totalCredits: 130,
    practicalHours: 1140,
    theoryHours: 1080,
    status: 'inactive',
    department: 'คণะเทคโนโลยีสารสนเทศ',
    degree: 'วิทยาศาสตรบัณฑิต',
    lastUpdated: '2 เดือนที่แล้ว',
    createdAt: '2024-01-25',
    updatedBy: 'อ.สมชาย ใจดี',
    subjects: [],
    version: '1.8',
    approvalDate: '2024-04-10',
    effectiveDate: '2024-08-01',
    statistics: {
      coreSubjects: 17,
      majorSubjects: 24,
      electiveSubjects: 15,
      generalSubjects: 15,
      totalSubjects: 71
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        curriculum.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.year.includes(searchTerm)
      );
    }

    setFilteredCurriculums(filtered);
    setCurrentPage(1);
  }, [searchTerm, curriculums]);

  // Pagination
  const totalPages = Math.ceil(filteredCurriculums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCurriculums = filteredCurriculums.slice(startIndex, endIndex);

  // Statistics
  const stats: StatsType = {
    total: curriculums.length,
    active: curriculums.filter(c => c.status === 'active').length,
    pending: curriculums.filter(c => c.status === 'pending').length,
    inactive: curriculums.filter(c => c.status === 'inactive').length,
    draft: curriculums.filter(c => c.status === 'draft').length
  };



  // CRUD Operations
  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
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

  const handleEdit = (curriculum: Curriculum) => {
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

  const handleDelete = (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum);
    setShowDeleteModal(true);
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

  const toggleSelectCurriculum = (id: string) => {
    setSelectedCurriculums(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header with Search */}
      <CurriculumHeader 
        stats={stats} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreateNew={() => {
          resetForm();
          setShowCreateModal(true);
        }} 
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
        {/* Bulk Selection */}
        {currentCurriculums.length > 0 && (
          <div className="mb-6 flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCurriculums.length === currentCurriculums.length}
                onChange={() => {
                  if (selectedCurriculums.length === currentCurriculums.length) {
                    setSelectedCurriculums([]);
                  } else {
                    setSelectedCurriculums(currentCurriculums.map(c => c.id));
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                เลือกทั้งหมดในหน้านี้ ({selectedCurriculums.length}/{currentCurriculums.length})
              </span>
            </label>

            {selectedCurriculums.length > 0 && (
              <>
                <span className="text-sm text-blue-600">
                  เลือก {selectedCurriculums.length} รายการ
                </span>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>ส่งออก</span>
                  </motion.button>

                  <motion.button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>ลบ</span>
                  </motion.button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Curriculum Grid */}
        {filteredCurriculums.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'ไม่พบหลักสูตรที่ตรงเงื่อนไข' : 'ยังไม่มีหลักสูตร'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `ไม่พบหลักสูตรที่ตรงกับ "${searchTerm}"`
                : 'เริ่มต้นด้วยการเพิ่มหลักสูตรแรก'
              }
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              เพิ่มหลักสูตรแรก
            </button>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence>
                {currentCurriculums.map((curriculum, index) => (
                  <CurriculumCard
                    key={curriculum.id}
                    curriculum={curriculum}
                    isSelected={selectedCurriculums.includes(curriculum.id)}
                    onSelect={toggleSelectCurriculum}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onDetails={(curriculum) => alert(`ดูรายละเอียด ${curriculum.title}`)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <CurriculumPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredCurriculums.length}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Floating Action Hints for Mobile */}
      <FloatingActionHints
        selectedCount={selectedCurriculums.length}
        onExport={handleExport}
        onBulkDelete={handleBulkDelete}
        onCreateNew={() => {
          resetForm();
          setShowCreateModal(true);
        }}
      />

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
        onSubmit={() => alert('Edit functionality')}
        title="แก้ไขหลักสูตร"
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        departments={departments}
        degrees={degrees}
        isLoading={isLoading}
        isEdit
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
              className={`p-4 rounded-lg shadow-lg max-w-sm ${
                toast.type === 'success' ? 'bg-green-500 text-white' :
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
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
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

      <Footer />
    </div>
  );
}
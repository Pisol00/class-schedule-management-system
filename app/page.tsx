'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectSearch from '@/components/projects/ProjectSearch';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectGrid from '@/components/projects/ProjectGrid';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import Toast from '@/components/ui/Toast';
import { Project } from '@/components/projects/ProjectCard';
import { ProjectFormData } from '@/components/projects/CreateProjectModal';

// Demo data
const projectsData: Project[] = [
  {
    id: '2567-1',
    title: 'ภาคการศึกษา 1/2567',
    description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 1 ปีการศึกษา 2567',
    status: 'กำลังดำเนินการ',
    subjects: 247,
    schedules: 189,
    conflicts: 12,
    members: [
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' },
      { id: '2', name: 'อ.สุดา มานะ', role: 'ที่ปรึกษา' },
      { id: '3', name: 'พิศลย์ อ.', role: 'นักพัฒนา' },
      { id: '4', name: 'ภัทรภร จ.', role: 'ออกแบบ' },
      { id: '5', name: 'อ.วิชัย สมใจ', role: 'ผู้ตรวจสอบ' },
      { id: '6', name: 'นางสาวสิริ', role: 'เลขานุการ' },
      { id: '7', name: 'นายธนา', role: 'ผู้ช่วย' },
      { id: '8', name: 'นางสาวนิตยา', role: 'ผู้ช่วย' }
    ],
    progress: 77,
    lastUpdated: '2 ชั่วโมงที่แล้ว',
    icon: 'calendar'
  },
  {
    id: '2567-2',
    title: 'ภาคการศึกษา 2/2567',
    description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 2 ปีการศึกษา 2567',
    status: 'แบบร่าง',
    subjects: 203,
    schedules: 45,
    conflicts: 0,
    members: [
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' },
      { id: '2', name: 'อ.สุดา มานะ', role: 'ที่ปรึกษา' },
      { id: '3', name: 'พิศลย์ อ.', role: 'นักพัฒนา' },
      { id: '4', name: 'ภัทรภร จ.', role: 'ออกแบบ' },
      { id: '5', name: 'อ.วิชัย สมใจ', role: 'ผู้ตรวจสอบ' }
    ],
    progress: 22,
    lastUpdated: '3 วันที่แล้ว',
    icon: 'calendar'
  },
  {
    id: '2566-3',
    title: 'ภาคการศึกษา 3/2566',
    description: 'ตารางเรียนตารางสอนภาคฤดูร้อน ปีการศึกษา 2566',
    status: 'เสร็จสิ้น',
    subjects: 89,
    schedules: 89,
    conflicts: 0,
    members: [
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' },
      { id: '2', name: 'อ.ประยุทธ มั่นคง', role: 'ที่ปรึกษา' },
      { id: '3', name: 'นายอนันต์', role: 'นักพัฒนา' },
      { id: '4', name: 'นางสาวอริสา', role: 'ออกแบบ' }
    ],
    progress: 100,
    lastUpdated: '1 สัปดาห์ที่แล้ว',
    icon: 'check'
  },
  {
    id: '2566-2',
    title: 'ภาคการศึกษา 2/2566',
    description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 2 ปีการศึกษา 2566',
    status: 'เสร็จสิ้น',
    subjects: 234,
    schedules: 234,
    conflicts: 0,
    members: [
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' },
      { id: '2', name: 'อ.สุดา มานะ', role: 'ที่ปรึกษา' },
      { id: '3', name: 'นายธีรพงษ์', role: 'นักพัฒนา' },
      { id: '4', name: 'นางสาวมาลี', role: 'ออกแบบ' },
      { id: '5', name: 'อ.วิชัย สมใจ', role: 'ผู้ตรวจสอบ' },
      { id: '6', name: 'นางสาวสิริ', role: 'เลขานุการ' }
    ],
    progress: 100,
    lastUpdated: '2 เดือนที่แล้ว',
    icon: 'check'
  },
  {
    id: '2566-1',
    title: 'ภาคการศึกษา 1/2566',
    description: 'ตารางเรียนตารางสอนภาคการศึกษาที่ 1 ปีการศึกษา 2566',
    status: 'เก็บถาวร',
    subjects: 267,
    schedules: 267,
    conflicts: 0,
    members: [
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' },
      { id: '2', name: 'อ.ประยุทธ มั่นคง', role: 'ที่ปรึกษา' },
      { id: '3', name: 'นายกิตติ', role: 'นักพัฒนา' },
      { id: '4', name: 'นางสาวปณิดา', role: 'ออกแบบ' },
      { id: '5', name: 'อ.วิชัย สมใจ', role: 'ผู้ตรวจสอบ' },
      { id: '6', name: 'นางสาวชนิดา', role: 'เลขานุการ' },
      { id: '7', name: 'นายสมศักดิ์', role: 'ผู้ช่วย' }
    ],
    progress: 100,
    lastUpdated: '6 เดือนที่แล้ว',
    icon: 'archive'
  }
];

const recentProjects = ['2567-1', '2567-2', '2566-3'];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('ทั้งหมด');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Filter projects based on search term and current filter
  useEffect(() => {
    let filtered = projectsData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (currentFilter !== 'ทั้งหมด') {
      switch (currentFilter) {
        case 'โครงการล่าสุด':
          filtered = filtered.filter(project => recentProjects.includes(project.id));
          break;
        case 'กำลังดำเนินการ':
          filtered = filtered.filter(project => 
            project.status === 'กำลังดำเนินการ' || project.status === 'แบบร่าง'
          );
          break;
        case 'เสร็จสิ้น':
          filtered = filtered.filter(project => project.status === 'เสร็จสิ้น');
          break;
        case 'เก็บถาวร':
          filtered = filtered.filter(project => project.status === 'เก็บถาวร');
          break;
      }
    }

    setFilteredProjects(filtered);
  }, [searchTerm, currentFilter]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleProjectClick = (project: Project) => {
    console.log('Opening project:', project.id, project.title);
    alert(`กำลังเปิด Dashboard สำหรับ ${project.title}`);
  };

  const handleAddProject = () => {
    setShowCreateModal(true);
  };

  const handleCreateProject = (projectData: ProjectFormData) => {
    console.log('Creating new project:', projectData);
    
    // สร้างโปรเจคใหม่จากข้อมูลที่กรอก
    const newProject: Project = {
      id: `${projectData.academicYear}-${projectData.semester}`,
      title: projectData.title || `ภาคการศึกษา ${projectData.semester}/${projectData.academicYear}`,
      description: projectData.description,
      status: 'แบบร่าง',
      subjects: 0,
      schedules: 0,
      conflicts: 0,
      members: projectData.members.map(memberId => ({
        id: memberId,
        name: `สมาชิก ${memberId}`,
        role: 'สมาชิก'
      })),
      progress: 0,
      lastUpdated: 'เมื่อสักครู่',
      icon: 'calendar'
    };
    
    // ในระบบจริงจะส่งข้อมูลไป API
    // แต่ตอนนี้จะ simulate การเพิ่มโปรเจค
    setToastMessage(`สร้างโครงการ "${newProject.title}" สำเร็จ!`);
    setShowToast(true);
    
    // ปิด modal
    setShowCreateModal(false);
    
    // Refresh หน้า (ในระบบจริงจะ fetch ข้อมูลใหม่)
    // setTimeout(() => window.location.reload(), 2000);
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setCurrentFilter('ทั้งหมด');
  };

  const quickFilter = (term: string) => {
    setSearchTerm(term);
  };

  const getSectionTitle = () => {
    if (searchTerm && filteredProjects.length === 0) {
      return 'ไม่พบโครงการ';
    }
    if (searchTerm) {
      return 'ผลการค้นหา';
    }
    switch (currentFilter) {
      case 'โครงการล่าสุด':
        return 'โครงการล่าสุด';
      case 'กำลังดำเนินการ':
        return 'โครงการกำลังดำเนินการ';
      case 'เสร็จสิ้น':
        return 'โครงการที่เสร็จสิ้น';
      case 'เก็บถาวร':
        return 'โครงการที่เก็บถาวร';
      default:
        return 'โครงการทั้งหมด';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            เลือกโครงการ
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            เลือกภาคการศึกษาหรือโครงการตารางเรียนตารางสอนที่ต้องการจัดการ
          </motion.p>
        </motion.div>

        {/* Search Section */}
        <ProjectSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Projects Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold text-slate-900">{getSectionTitle()}</h2>
            
            {/* Filter Section */}
            <ProjectFilters
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              projectCount={filteredProjects.length}
              onReset={resetAllFilters}
              onQuickFilter={quickFilter}
            />
          </div>

          {/* Projects Grid */}
          <ProjectGrid
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
            onAddProject={handleAddProject}
          />
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer z-30 group"
        onClick={handleAddProject}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.5 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 30px -10px rgba(59, 130, 246, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.svg 
          className="w-6 h-6 text-white" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
        </motion.svg>
      </motion.div>

      {/* Footer */}
      <Footer />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type="success"
      />
    </div>
  );
}
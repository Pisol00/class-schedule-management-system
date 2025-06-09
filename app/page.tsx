'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types
interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'กำลังดำเนินการ' | 'แบบร่าง' | 'เสร็จสิ้น' | 'เก็บถาวร';
  subjects: number;
  schedules: number;
  conflicts: number;
  members: ProjectMember[];
  progress: number;
  lastUpdated: string;
  icon: string;
}

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
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDataDropdown, setShowDataDropdown] = useState(false);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowFilterDropdown(false);
      setShowProfileDropdown(false);
      setShowDataDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      if (e.key === 'Escape') {
        setShowFilterDropdown(false);
        setShowProfileDropdown(false);
        setShowDataDropdown(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'bg-green-100 text-green-700';
      case 'แบบร่าง':
        return 'bg-yellow-100 text-yellow-700';
      case 'เสร็จสิ้น':
        return 'bg-blue-100 text-blue-700';
      case 'เก็บถาวร':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        );
      case 'check':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'archive':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const handleProjectClick = (project: Project) => {
    console.log('Opening project:', project.id, project.title);
    alert(`กำลังเปิด Dashboard สำหรับ ${project.title}`);
  };

  const handleAddProject = () => {
    const newProjectName = prompt('ชื่อโครงการใหม่ (เช่น ภาคการศึกษา 1/2568):');
    if (newProjectName) {
      alert(`กำลังสร้างโครงการ "${newProjectName}"`);
    }
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setCurrentFilter('ทั้งหมด');
    setShowFilterDropdown(false);
  };

  const quickFilter = (term: string) => {
    setSearchTerm(term);
    setShowFilterDropdown(false);
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

  const filterCounts = {
    'ทั้งหมด': projectsData.length,
    'โครงการล่าสุด': recentProjects.length,
    'กำลังดำเนินการ': projectsData.filter(p => p.status === 'กำลังดำเนินการ' || p.status === 'แบบร่าง').length,
    'เสร็จสิ้น': projectsData.filter(p => p.status === 'เสร็จสิ้น').length,
    'เก็บถาวร': projectsData.filter(p => p.status === 'เก็บถาวร').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <motion.header 
        className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 lg:flex lg:justify-between">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  IT
                </motion.div>
                <div>
                  <span className="text-xl font-semibold text-slate-900">IT KMITL</span>
                  <div className="text-xs text-slate-500 -mt-1">ระบบตารางเรียนตารางสอน</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center justify-center space-x-8">
              {/* จัดการข้อมูลระบบ Dropdown */}
              <div className="relative">
                <motion.button
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors flex items-center space-x-2 relative group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDataDropdown(!showDataDropdown);
                  }}
                  whileHover={{ y: -1 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  <span>จัดการข้อมูลระบบ</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ rotate: showDataDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </motion.svg>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-4/5 transition-all duration-200" />
                </motion.button>

                {/* Data Management Dropdown */}
                <AnimatePresence>
                  {showDataDropdown && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-64 py-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900">จัดการข้อมูลระบบ</h3>
                        <p className="text-xs text-slate-500">จัดการข้อมูลพื้นฐานของระบบ</p>
                      </div>
                      
                      {[
                        { name: 'หลักสูตร', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', desc: 'จัดการหลักสูตรการศึกษา' },
                        { name: 'รายวิชา', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', desc: 'จัดการรายวิชาและเนื้อหา' },
                        { name: 'อาจารย์', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', desc: 'จัดการข้อมูลอาจารย์' },
                        { name: 'ห้องเรียน', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', desc: 'จัดการห้องเรียนและสถานที่' },
                        { name: 'นักศึกษา', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', desc: 'จัดการข้อมูลนักศึกษา' }
                      ].map((item, index) => (
                        <motion.a
                          key={item.name}
                          href="#"
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowDataDropdown(false);
                            alert(`เปิดหน้า${item.name}`);
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start space-x-3">
                            <svg className="w-4 h-4 mt-0.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                            </svg>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Menu Items */}
              <motion.a 
                href="#" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors flex items-center space-x-2 relative group"
                whileHover={{ y: -1 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>รายงาน</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-4/5 transition-all duration-200" />
              </motion.a>

              <motion.a 
                href="#" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors flex items-center space-x-2 relative group"
                whileHover={{ y: -1 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>ตั้งค่า</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-4/5 transition-all duration-200" />
              </motion.a>
            </nav>
            
            {/* User Profile */}
            <div className="relative flex items-center justify-end space-x-3">
              {/* Mobile Menu Button */}
              <motion.button 
                className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(!showMobileMenu);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={{ rotate: showMobileMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {showMobileMenu ? (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  ) : (
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  )}
                </motion.svg>
              </motion.button>

              {/* Notification Icon */}
              <motion.button 
                className="hidden md:flex relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('แสดงการแจ้งเตือน')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {/* Notification Badge */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  3
                </motion.div>
              </motion.button>
              
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-slate-900">อาจารย์สมชาย ใจดี</div>
                <div className="text-xs text-slate-500">เจ้าหน้าที่ฝ่ายวิชาการ</div>
              </div>
              
              <motion.button 
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                {/* Online Status Indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </motion.button>
              
              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    className="absolute right-0 top-full mt-2 w-64 py-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">อาจารย์สมชาย ใจดี</div>
                          <div className="text-xs text-slate-500">เจ้าหน้าที่ฝ่ายวิชาการ</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        โปรไฟล์
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        ตั้งค่า
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                        การแจ้งเตือน
                        <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                      </a>
                    </div>

                    <div className="border-t border-slate-100 py-1">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        ออกจากระบบ
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              className="lg:hidden bg-white border-t border-slate-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-1">
                {/* จัดการข้อมูลระบบ Section */}
                <div className="pb-2 mb-2 border-b border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                    จัดการข้อมูลระบบ
                  </div>
                  {[
                    { name: 'หลักสูตร', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                    { name: 'รายวิชา', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                    { name: 'อาจารย์', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                    { name: 'ห้องเรียน', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                    { name: 'นักศึกษา', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' }
                  ].map((item, index) => (
                    <motion.a 
                      key={item.name}
                      href="#" 
                      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`เปิดหน้า${item.name}`);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                      </svg>
                      <span>{item.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Other Menu Items */}
                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span>รายงาน</span>
                </motion.a>

                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>ตั้งค่า</span>
                </motion.a>

                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ x: 5 }}
                  onClick={() => alert('แสดงการแจ้งเตือน')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                  <span>การแจ้งเตือน</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input 
                id="search-input"
                type="text" 
                placeholder="ค้นหาตามภาคการศึกษา ปีการศึกษา หรือชื่อโครงการ..." 
                className="w-full pl-12 pr-16 py-3.5 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 bg-white text-base shadow-sm focus:shadow-md focus:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1 text-xs text-slate-400">
                <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs border">⌘K</kbd>
              </div>
            </div>
          </div>
        </motion.div>

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
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <span className="text-sm text-slate-500">{filteredProjects.length} โครงการ</span>
              
              <div className="flex items-center space-x-2">
                {/* Filter Dropdown */}
                <div className="relative">
                  <motion.button 
                    className="flex items-center space-x-2 px-4 py-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors min-w-[140px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilterDropdown(!showFilterDropdown);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium text-slate-700">{currentFilter}</span>
                    <motion.svg 
                      className="w-4 h-4 text-slate-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      animate={{ rotate: showFilterDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </motion.svg>
                  </motion.button>
                  
                  {/* Enhanced Dropdown Menu */}
                  <AnimatePresence>
                    {showFilterDropdown && (
                      <motion.div 
                        className="absolute right-0 mt-2 w-72 py-3 bg-white border border-slate-200 rounded-xl shadow-lg z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <h3 className="text-sm font-semibold text-slate-900">กรองโครงการ</h3>
                          <p className="text-xs text-slate-500 mt-1">เลือกประเภทโครงการที่ต้องการดู</p>
                        </div>
                        
                        <div className="py-2">
                          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            ประเภทโครงการ
                          </div>
                          {Object.entries(filterCounts).slice(0, 2).map(([filter, count]) => (
                            <motion.button 
                              key={filter}
                              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors"
                              onClick={() => {
                                setCurrentFilter(filter);
                                setShowFilterDropdown(false);
                              }}
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${filter === 'ทั้งหมด' ? 'bg-slate-400' : 'bg-blue-400'}`}></div>
                                <span>{filter}</span>
                              </div>
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{count} โครงการ</span>
                            </motion.button>
                          ))}
                        </div>
                        
                        <div className="border-t border-slate-100 py-2">
                          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            สถานะ
                          </div>
                          {Object.entries(filterCounts).slice(2).map(([filter, count]) => (
                            <motion.button 
                              key={filter}
                              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors"
                              onClick={() => {
                                setCurrentFilter(filter);
                                setShowFilterDropdown(false);
                              }}
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  filter === 'กำลังดำเนินการ' ? 'bg-green-400' : 
                                  filter === 'เสร็จสิ้น' ? 'bg-blue-400' : 'bg-slate-400'
                                }`}></div>
                                <span>{filter}</span>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                filter === 'กำลังดำเนินการ' ? 'bg-green-100 text-green-700' :
                                filter === 'เสร็จสิ้น' ? 'bg-blue-100 text-blue-700' :
                                'bg-slate-100 text-slate-500'
                              }`}>{count} โครงการ</span>
                            </motion.button>
                          ))}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="border-t border-slate-100 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {['ภาคปกติ', 'ภาคฤดูร้อน', '2567'].map((term) => (
                                <motion.button 
                                  key={term}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded transition-colors"
                                  onClick={() => quickFilter(term)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {term}
                                </motion.button>
                              ))}
                            </div>
                            <motion.button 
                              className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                              onClick={resetAllFilters}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              รีเซ็ต
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Quick Reset Button */}
                <motion.button 
                  className="p-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
                  title="รีเซ็ตตัวกรอง"
                  onClick={resetAllFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            
            {/* Add New Project Card */}
            <motion.div 
              className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group"
              onClick={handleAddProject}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.svg 
                className="w-16 h-16 mb-4 text-slate-400 group-hover:text-blue-500 transition-colors" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </motion.svg>
              <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600 mb-2 transition-colors">สร้างโครงการใหม่</h3>
              <p className="text-sm text-slate-500 group-hover:text-blue-500 transition-colors">เริ่มต้นภาคการศึกษาใหม่</p>
            </motion.div>
            
            {/* Project Cards */}
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => handleProjectClick(project)}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                  }}
                  layout
                >
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          project.status === 'กำลังดำเนินการ' ? 'bg-green-100 text-green-600' :
                          project.status === 'แบบร่าง' ? 'bg-yellow-100 text-yellow-600' :
                          project.status === 'เสร็จสิ้น' ? 'bg-blue-100 text-blue-600' :
                          'bg-slate-100 text-slate-600'
                        }`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getIconByType(project.icon)}
                      </motion.div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Project Title & Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Members Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                          </svg>
                          <span>สมาชิก ({project.members.length} คน)</span>
                        </span>
                      </div>
                      
                      {/* Member Avatars */}
                      <div className="flex items-center space-x-1 mb-2">
                        {project.members.slice(0, 5).map((member, memberIndex) => {
                          const initials = member.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2);
                          const colors = [
                            'bg-blue-500 text-white',
                            'bg-green-500 text-white', 
                            'bg-purple-500 text-white',
                            'bg-orange-500 text-white',
                            'bg-pink-500 text-white',
                            'bg-indigo-500 text-white',
                            'bg-red-500 text-white',
                            'bg-teal-500 text-white'
                          ];
                          
                          return (
                            <motion.div
                              key={member.id}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${colors[memberIndex % colors.length]} border-2 border-white shadow-sm`}
                              title={`${member.name} - ${member.role}`}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.3 + (memberIndex * 0.1) }}
                              whileHover={{ scale: 1.2, zIndex: 10 }}
                            >
                              {initials}
                            </motion.div>
                          );
                        })}
                        
                        {project.members.length > 5 && (
                          <motion.div
                            className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm"
                            title={`และอีก ${project.members.length - 5} คน: ${project.members.slice(5).map(m => m.name).join(', ')}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8 }}
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                          >
                            +{project.members.length - 5}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Project Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-slate-900">{project.subjects}</div>
                        <div className="text-xs text-slate-600">รายวิชา</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-slate-900">{project.schedules}</div>
                        <div className="text-xs text-slate-600">ตารางสอน</div>
                      </div>
                    </div>

                    {/* Conflicts Info */}
                    {project.conflicts > 0 && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-sm font-medium text-red-700">{project.conflicts} ความขัดแย้ง</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Progress Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">ความคืบหน้า</span>
                        <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 1.2 + (index * 0.1) }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>อัปเดตล่าสุด</span>
                        <span>{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
      <motion.footer 
        className="bg-white border-t border-slate-200 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* KMITL Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    IT
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">IT KMITL</h3>
                    <p className="text-sm text-slate-600">ระบบจัดการตารางเรียนตารางสอน</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br/>
                  คณะเทคโนโลยีสารสนเทศ
                </p>
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>02-329-8000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>info@it.kmitl.ac.th</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  ลิงก์ด่วน
                </h4>
                <ul className="space-y-3">
                  {[
                    'หน้าแรกระบบ',
                    'คู่มือการใช้งาน', 
                    'รายงานปัญหา',
                    'ความช่วยเหลือ'
                  ].map((link, index) => (
                    <motion.li key={link}>
                      <a 
                        href="#" 
                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors group"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`กำลังเปิด${link}`);
                        }}
                      >
                        <span>{link}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* System Info */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  ข้อมูลระบบ
                </h4>
                <ul className="space-y-3">
                  <li>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">เวอร์ชัน:</span> v2.1.4
                    </div>
                  </li>
                  <li>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">อัปเดตล่าสุด:</span> 15 มี.ค. 2567
                    </div>
                  </li>
                  <li>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">สถานะระบบ:</span> 
                      <span className="inline-flex items-center space-x-1 ml-1">
                        <motion.div 
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-green-600">ปกติ</span>
                      </span>
                    </div>
                  </li>
                  <li className="pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-500 space-y-1">
                      <div className="font-medium mb-2">ผู้พัฒนาระบบ:</div>
                      <div className="flex flex-col space-y-1">
                        <span>• นายพิศลย์ อุตตาลกาญจนา</span>
                        <span>• นางสาวภัทรภร จิตต์ปราณี</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-slate-200 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-sm text-slate-600">
                <p>&copy; 2567 สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (IT KMITL)</p>
                <p className="mt-1">สงวนลิขสิทธิ์ทุกประการ</p>
              </div>
              
              {/* Social Links & Additional Info */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {[
                    { 
                      name: 'Website คณะ', 
                      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
                    },
                    { 
                      name: 'Facebook', 
                      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' 
                    },
                    { 
                      name: 'Instagram', 
                      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                    }
                  ].map((social) => (
                    <motion.a 
                      key={social.name}
                      href="#" 
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      title={social.name}
                      onClick={(e) => {
                        e.preventDefault();
                        if (social.name === 'Website คณะ') {
                          alert('กำลังเปิดเว็บไซต์คณะเทคโนโลยีสารสนเทศ KMITL');
                        } else {
                          alert(`เปิดหน้า ${social.name} ของ IT KMITL`);
                        }
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon}/>
                      </svg>
                    </motion.a>
                  ))}
                </div>
                
                {/* Additional Links */}
                <div className="flex items-center space-x-4 text-sm">
                  <a 
                    href="#" 
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('กำลังเปิดนโยบายความเป็นส่วนตัว');
                    }}
                  >
                    นโยบายความเป็นส่วนตัว
                  </a>
                  <span className="text-slate-300">|</span>
                  <a 
                    href="#" 
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('กำลังเปิดเงื่อนไขการใช้งาน');
                    }}
                  >
                    เงื่อนไขการใช้งาน
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
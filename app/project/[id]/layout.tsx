'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import ProjectSidebar from '@/components/project/ProjectSidebar';
import RoomScheduleViewer from '@/components/project/InlineTimetable';
import { Project } from '@/components/projects/ProjectCard';

// Mock project data (ในความเป็นจริงจะดึงจาก API)
const mockProjects: Project[] = [
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
      { id: '2', name: 'อ.สุดา มานะ', role: 'ที่ปรึกษา' }
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
      { id: '1', name: 'อ.สมชาย ใจดี', role: 'หัวหน้าโครงการ' }
    ],
    progress: 22,
    lastUpdated: '3 วันที่แล้ว',
    icon: 'calendar'
  }
];

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const projectId = params.id as string;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showRoomViewer, setShowRoomViewer] = useState(false);

  useEffect(() => {
    // ดึงข้อมูล project จาก ID
    const project = mockProjects.find(p => p.id === projectId);
    setCurrentProject(project || null);
  }, [projectId]);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบโครงการ</h3>
          <p className="text-gray-500">โครงการ ID: {projectId} ไม่มีในระบบ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Project Sidebar - เต็มความสูงหน้าจอ */}
        <div className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}>
          <ProjectSidebar 
            project={currentProject}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        
        {/* Main Content */}
        <motion.main 
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-80'
          }`}
          layout
        >
          <div className="p-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
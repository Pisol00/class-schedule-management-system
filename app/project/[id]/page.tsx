'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import ProjectOverview from '@/components/project/ProjectOverview';
import QuickActions from '@/components/project/QuickActions';
import ProjectStats from '@/components/project/ProjectStats';
import RecentActivity from '@/components/project/RecentActivity';
import ProgressTracking from '@/components/project/ProgressTracking';
import TeamOverview from '@/components/project/TeamOverview';
import InlineTimetable from '@/components/project/InlineTimetable';
import { Project } from '@/components/projects/ProjectCard';

// Mock data
const mockProject: Project = {
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
    { id: '4', name: 'ภัทรภร จ.', role: 'ออกแบบ' }
  ],
  progress: 77,
  lastUpdated: '2 ชั่วโมงที่แล้ว',
  icon: 'calendar'
};

const mockStats = {
  totalSubjects: 247,
  scheduledSubjects: 189,
  pendingSubjects: 58,
  conflictingSubjects: 12,
  totalInstructors: 85,
  assignedInstructors: 72,
  totalRooms: 42,
  occupiedRooms: 38,
  totalStudents: 1850,
  registeredStudents: 1742
};

const mockActivities = [
  {
    id: '1',
    type: 'schedule_updated',
    title: 'อัพเดทตารางสอน CS101',
    description: 'เปลี่ยนเวลาสอนจาก 09:00 เป็น 10:00 น.',
    user: 'อ.สมชาย ใจดี',
    timestamp: '2 ชั่วโมงที่แล้ว',
    icon: 'calendar'
  },
  {
    id: '2',
    type: 'conflict_resolved',
    title: 'แก้ไขความขัดแย้งห้อง IT-201',
    description: 'แก้ไขการจองห้องซ้อนทับระหว่างวิชา MA201 และ PH101',
    user: 'พิศลย์ อ.',
    timestamp: '4 ชั่วโมงที่แล้ว',
    icon: 'check'
  },
  {
    id: '3',
    type: 'subject_added',
    title: 'เพิ่มรายวิชาใหม่',
    description: 'เพิ่มวิชา "การพัฒนาเว็บแอปพลิเคชัน" (CS301)',
    user: 'อ.สุดา มานะ',
    timestamp: '1 วันที่แล้ว',
    icon: 'plus'
  }
];

export default function ProjectDashboard() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project>(mockProject);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ภาพรวมโครงการ</h1>
            <p className="text-gray-600 mt-1">
              ติดตามความคืบหน้าและจัดการโครงการ {project.title}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span>อัพเดทล่าสุด: {project.lastUpdated}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <QuickActions projectId={projectId} />
      </motion.div>

      {/* Timetable - แสดงเป็นหน้าแรก */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InlineTimetable />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ProjectStats stats={mockStats} />
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProgressTracking project={project} />
          </motion.div>

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProjectOverview project={project} />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Team Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TeamOverview members={project.members} />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <RecentActivity activities={mockActivities} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
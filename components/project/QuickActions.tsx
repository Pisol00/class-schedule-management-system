'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface QuickActionsProps {
  projectId: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function QuickActions({ projectId }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'create-schedule',
      title: 'สร้างตารางสอน',
      description: 'เพิ่มตารางสอนใหม่หรือแก้ไขตารางที่มี',
      icon: 'M12 4v16m8-8H4',
      href: `/project/${projectId}/schedules/builder`,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'manage-subjects',
      title: 'จัดการรายวิชา',
      description: 'เพิ่ม แก้ไข หรือลบรายวิชาในหลักสูตร',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      href: `/project/${projectId}/subjects`,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'view-conflicts',
      title: 'แก้ไขความขัดแย้ง',
      description: 'ตรวจสอบและแก้ไขตารางที่มีความขัดแย้ง',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z',
      href: `/project/${projectId}/schedules/conflicts`,
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'view-timetables',
      title: 'ดูตารางเรียน',
      description: 'แสดงตารางเรียนในรูปแบบปฏิทิน',
      icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
      href: `/project/${projectId}/timetables`,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'manage-instructors',
      title: 'จัดการอาจารย์',
      description: 'เพิ่มหรือแก้ไขข้อมูลอาจารย์ผู้สอน',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      href: `/project/${projectId}/instructors`,
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'generate-reports',
      title: 'สร้างรายงาน',
      description: 'ออกรายงานการใช้ห้องและภาระงานสอน',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      href: `/project/${projectId}/reports`,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">การดำเนินการด่วน</h2>
          <p className="text-gray-600 text-sm mt-1">เข้าถึงฟังก์ชันหลักของโครงการ</p>
        </div>
        <motion.div 
          className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
          </svg>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={action.href}>
              <motion.div
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${action.bgColor} ${action.borderColor} hover:shadow-lg`}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-3">
                  <motion.div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.bgColor} border ${action.borderColor}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className={`w-5 h-5 ${action.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon}/>
                    </svg>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm ${action.color} group-hover:text-opacity-80 transition-colors`}>
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {action.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
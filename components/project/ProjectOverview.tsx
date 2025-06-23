'use client';

import { motion } from 'framer-motion';
import { Project } from '@/components/projects/ProjectCard';

interface ProjectOverviewProps {
  project: Project;
}

interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'เริ่มโครงการ',
      date: '1 มิ.ย. 2567',
      status: 'completed',
      description: 'เริ่มต้นโครงการและวางแผนการทำงาน'
    },
    {
      id: '2',
      title: 'นำเข้าข้อมูลพื้นฐาน',
      date: '15 มิ.ย. 2567',
      status: 'completed',
      description: 'นำเข้าข้อมูลรายวิชา อาจารย์ และห้องเรียน'
    },
    {
      id: '3',
      title: 'จัดตารางเบื้องต้น',
      date: '30 มิ.ย. 2567',
      status: 'current',
      description: 'กำลังจัดตารางสอนและแก้ไขความขัดแย้ง'
    },
    {
      id: '4',
      title: 'ตรวจสอบและแก้ไข',
      date: '15 ก.ค. 2567',
      status: 'upcoming',
      description: 'ตรวจสอบตารางและแก้ไขจุดบกพร่อง'
    },
    {
      id: '5',
      title: 'อนุมัติและเผยแพร่',
      date: '1 ส.ค. 2567',
      status: 'upcoming',
      description: 'อนุมัติตารางสุดท้ายและเผยแพร่'
    }
  ];

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-600'
        };
      case 'current':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: 'text-blue-600'
        };
      case 'upcoming':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-400'
        };
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    const colors = getStatusColor(status);
    
    switch (status) {
      case 'completed':
        return (
          <svg className={`w-6 h-6 ${colors.icon}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'current':
        return (
          <motion.svg 
            className={`w-6 h-6 ${colors.icon}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </motion.svg>
        );
      case 'upcoming':
        return (
          <svg className={`w-6 h-6 ${colors.icon}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const projectInfo = [
    {
      label: 'ภาคการศึกษา',
      value: 'ภาคการศึกษาที่ 1/2567',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      label: 'จำนวนรายวิชา',
      value: `${project.subjects} วิชา`,
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      label: 'ตารางที่จัดแล้ว',
      value: `${project.schedules} จาก ${project.subjects}`,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      label: 'ความขัดแย้ง',
      value: project.conflicts > 0 ? `${project.conflicts} รายการ` : 'ไม่มี',
      icon: project.conflicts > 0 ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z' : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">ภาพรวมโครงการ</h2>
          <p className="text-gray-600 text-sm mt-1">ข้อมูลสำคัญและไทม์ไลน์การดำเนินงาน</p>
        </div>
        <motion.div 
          className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
          </svg>
        </motion.div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {projectInfo.map((info, index) => (
          <motion.div
            key={info.label}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <svg className={`w-5 h-5 ${info.value.includes('ไม่มี') ? 'text-green-600' : project.conflicts > 0 && info.label === 'ความขัดแย้ง' ? 'text-red-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={info.icon}/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">{info.label}</p>
                <p className={`font-semibold ${project.conflicts > 0 && info.label === 'ความขัดแย้ง' ? 'text-red-600' : 'text-gray-900'}`}>
                  {info.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ไทม์ไลน์โครงการ</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const colors = getStatusColor(milestone.status);
            return (
              <motion.div
                key={milestone.id}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
              >
                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    className={`w-12 h-12 rounded-full border-2 ${colors.border} ${colors.bg} flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getStatusIcon(milestone.status)}
                  </motion.div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          <span>{milestone.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      {milestone.status === 'completed' ? 'เสร็จแล้ว' :
                       milestone.status === 'current' ? 'กำลังทำ' : 'ยังไม่เริ่ม'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">ขั้นตอนต่อไป</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">จัดตารางเบื้องต้น</h5>
              <p className="text-sm text-blue-700 mb-3">
                ยังเหลือรายวิชาที่ต้องจัดตาราง {project.subjects - project.schedules} วิชา และมีความขัดแย้ง {project.conflicts} รายการที่ต้องแก้ไข
              </p>
              <div className="flex space-x-2">
                <motion.button
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('เปิดหน้าจัดตาราง')}
                >
                  จัดตารางต่อ
                </motion.button>
                <motion.button
                  className="px-3 py-1 bg-white text-blue-600 text-xs rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('ดูความขัดแย้ง')}
                >
                  ดูความขัดแย้ง
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
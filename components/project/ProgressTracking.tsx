'use client';

import { motion } from 'framer-motion';
import { Project } from '@/components/projects/ProjectCard';

interface ProgressTrackingProps {
  project: Project;
}

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  completed: number;
  total: number;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export default function ProgressTracking({ project }: ProgressTrackingProps) {
  const progressItems: ProgressItem[] = [
    {
      id: '1',
      title: 'นำเข้าข้อมูลรายวิชา',
      description: 'นำเข้าข้อมูลรายวิชาจากระบบหลักสูตร',
      completed: 247,
      total: 247,
      status: 'completed',
      priority: 'high'
    },
    {
      id: '2',
      title: 'กำหนดอาจารย์ผู้สอน',
      description: 'มอบหมายอาจารย์ผู้รับผิดชอบแต่ละรายวิชา',
      completed: 189,
      total: 247,
      status: 'in-progress',
      priority: 'high',
      dueDate: '30 มิ.ย. 2567'
    },
    {
      id: '3',
      title: 'จัดสรรห้องเรียน',
      description: 'กำหนดห้องเรียนสำหรับแต่ละรายวิชา',
      completed: 156,
      total: 247,
      status: 'in-progress',
      priority: 'medium',
      dueDate: '15 ก.ค. 2567'
    },
    {
      id: '4',
      title: 'แก้ไขความขัดแย้ง',
      description: 'ตรวจสอบและแก้ไขการชนกันของตาราง',
      completed: 0,
      total: 12,
      status: 'blocked',
      priority: 'high',
      dueDate: '20 ก.ค. 2567'
    },
    {
      id: '5',
      title: 'ตรวจสอบภาระงานสอน',
      description: 'ตรวจสอบความเหมาะสมของภาระงานอาจารย์',
      completed: 0,
      total: 85,
      status: 'pending',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: ProgressItem['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          progress: 'bg-green-500'
        };
      case 'in-progress':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          progress: 'bg-blue-500'
        };
      case 'pending':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          progress: 'bg-gray-400'
        };
      case 'blocked':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          progress: 'bg-red-500'
        };
    }
  };

  const getStatusText = (status: ProgressItem['status']) => {
    switch (status) {
      case 'completed':
        return 'เสร็จสิ้น';
      case 'in-progress':
        return 'กำลังดำเนินการ';
      case 'pending':
        return 'รอดำเนินการ';
      case 'blocked':
        return 'มีปัญหา';
    }
  };

  const getPriorityColor = (priority: ProgressItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityText = (priority: ProgressItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'สำคัญมาก';
      case 'medium':
        return 'ปานกลาง';
      case 'low':
        return 'ทั่วไป';
    }
  };

  const getStatusIcon = (status: ProgressItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
          </svg>
        );
      case 'blocked':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const overallProgress = Math.round((project.schedules / project.subjects) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">ติดตามความคืบหน้า</h2>
          <p className="text-gray-600 text-sm mt-1">ความคืบหน้าในการจัดตารางเรียนตารางสอน</p>
        </div>
        <motion.div 
          className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{overallProgress}%</div>
            <div className="text-xs text-blue-500">เสร็จแล้ว</div>
          </div>
        </motion.div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">ความคืบหน้ารวม</h3>
          <span className="text-sm font-medium text-blue-600">{project.schedules}/{project.subjects} รายวิชา</span>
        </div>
        <div className="w-full bg-white rounded-full h-3 shadow-inner">
          <motion.div 
            className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>เริ่มต้น</span>
          <span>เสร็จสิ้น</span>
        </div>
      </div>

      {/* Progress Items */}
      <div className="space-y-4">
        {progressItems.map((item, index) => {
          const statusColors = getStatusColor(item.status);
          const percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

          return (
            <motion.div
              key={item.id}
              className={`p-4 rounded-xl border-2 ${statusColors.border} ${statusColors.bg} hover:shadow-md transition-all duration-200 cursor-pointer group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => alert(`ดูรายละเอียด: ${item.title}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getStatusIcon(item.status)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {getPriorityText(item.priority)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    {item.completed} / {item.total} {item.status === 'completed' ? 'เสร็จสิ้น' : 'รายการ'}
                  </span>
                  <span className="font-semibold text-gray-900">{percentage}%</span>
                </div>
                
                <div className="w-full bg-white bg-opacity-60 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className={`h-2 rounded-full ${statusColors.progress}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  />
                </div>

                {/* Due Date */}
                {item.dueDate && (
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-2">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      <span>กำหนดส่ง: {item.dueDate}</span>
                    </div>
                    
                    {item.status === 'blocked' && (
                      <span className="text-red-600 font-medium">ต้องแก้ไขด่วน</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {progressItems.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-600">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {progressItems.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600">กำลังทำ</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">
              {progressItems.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">รอดำเนินการ</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {progressItems.filter(item => item.status === 'blocked').length}
            </div>
            <div className="text-xs text-gray-600">มีปัญหา</div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';

interface ProjectStatsProps {
  stats: {
    totalSubjects: number;
    scheduledSubjects: number;
    pendingSubjects: number;
    conflictingSubjects: number;
    totalInstructors: number;
    assignedInstructors: number;
    totalRooms: number;
    occupiedRooms: number;
    totalStudents: number;
    registeredStudents: number;
  };
}

interface StatCard {
  title: string;
  subtitle: string;
  value: number;
  total?: number;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  const statCards: StatCard[] = [
    {
      title: 'รายวิชา',
      subtitle: 'วิชาที่จัดตารางแล้ว',
      value: stats.scheduledSubjects,
      total: stats.totalSubjects,
      percentage: Math.round((stats.scheduledSubjects / stats.totalSubjects) * 100),
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      trend: 'up'
    },
    {
      title: 'อาจารย์ผู้สอน',
      subtitle: 'ได้รับมอบหมายแล้ว',
      value: stats.assignedInstructors,
      total: stats.totalInstructors,
      percentage: Math.round((stats.assignedInstructors / stats.totalInstructors) * 100),
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      trend: 'up'
    },
    {
      title: 'ห้องเรียน',
      subtitle: 'ใช้งานจริง',
      value: stats.occupiedRooms,
      total: stats.totalRooms,
      percentage: Math.round((stats.occupiedRooms / stats.totalRooms) * 100),
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      trend: 'stable'
    },
    {
      title: 'นักศึกษา',
      subtitle: 'ลงทะเบียนแล้ว',
      value: stats.registeredStudents,
      total: stats.totalStudents,
      percentage: Math.round((stats.registeredStudents / stats.totalStudents) * 100),
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      trend: 'up'
    },
    {
      title: 'รายวิชาค้าง',
      subtitle: 'ยังไม่ได้จัดตาราง',
      value: stats.pendingSubjects,
      percentage: Math.round((stats.pendingSubjects / stats.totalSubjects) * 100),
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      trend: 'down'
    },
    {
      title: 'ความขัดแย้ง',
      subtitle: 'ต้องแก้ไข',
      value: stats.conflictingSubjects,
      percentage: stats.conflictingSubjects > 0 ? Math.round((stats.conflictingSubjects / stats.totalSubjects) * 100) : 0,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      trend: stats.conflictingSubjects > 5 ? 'up' : 'down'
    }
  ];

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`bg-white rounded-2xl border-2 p-6 hover:shadow-lg transition-all duration-300 ${stat.borderColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.02,
            y: -2,
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
              <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}/>
              </svg>
            </div>
            {stat.trend && (
              <div className="flex items-center space-x-1">
                {getTrendIcon(stat.trend)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.subtitle}</p>
            
            {/* Value and Total */}
            <div className="flex items-end space-x-2">
              <motion.span 
                className={`text-3xl font-bold ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                {stat.value.toLocaleString()}
              </motion.span>
              {stat.total && (
                <span className="text-lg text-gray-400 mb-1">
                  / {stat.total.toLocaleString()}
                </span>
              )}
            </div>

            {/* Percentage and Progress Bar */}
            {stat.percentage !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ความคืบหน้า</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>
                    {stat.percentage}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className={`h-2 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>อัพเดทล่าสุด</span>
              <span>เมื่อสักครู่</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
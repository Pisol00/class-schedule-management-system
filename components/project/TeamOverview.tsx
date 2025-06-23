'use client';

import { motion } from 'framer-motion';
import { ProjectMember } from '@/components/projects/ProjectCard';

interface TeamOverviewProps {
  members: ProjectMember[];
}

interface ExtendedMember extends ProjectMember {
  status: 'online' | 'away' | 'offline';
  lastActive: string;
  tasksCount: number;
  completedTasks: number;
  avatar?: string;
  email?: string;
  department?: string;
}

export default function TeamOverview({ members }: TeamOverviewProps) {
  // Extend members with additional data (in real app, this would come from API)
  const extendedMembers: ExtendedMember[] = members.map((member, index) => ({
    ...member,
    status: index === 0 ? 'online' : index === 1 ? 'away' : 'offline',
    lastActive: index === 0 ? 'ออนไลน์' : index === 1 ? '30 นาทีที่แล้ว' : '2 ชั่วโมงที่แล้ว',
    tasksCount: Math.floor(Math.random() * 10) + 5,
    completedTasks: Math.floor(Math.random() * 8) + 2,
    email: `${member.name.split(' ')[0].toLowerCase()}@it.kmitl.ac.th`,
    department: 'คณะเทคโนโลยีสารสนเทศ'
  }));

  const getStatusColor = (status: ExtendedMember['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: ExtendedMember['status']) => {
    switch (status) {
      case 'online':
        return 'ออนไลน์';
      case 'away':
        return 'ไม่อยู่';
      case 'offline':
        return 'ออฟไลน์';
    }
  };

  const getRoleColor = (role: string) => {
    if (role.includes('หัวหน้า')) return 'bg-purple-100 text-purple-700';
    if (role.includes('ที่ปรึกษา')) return 'bg-blue-100 text-blue-700';
    if (role.includes('นักพัฒนา')) return 'bg-green-100 text-green-700';
    if (role.includes('ออกแบบ')) return 'bg-pink-100 text-pink-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2);
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">ทีมงาน</h2>
          <p className="text-gray-600 text-sm mt-1">{extendedMembers.length} สมาชิกในโครงการ</p>
        </div>
        <motion.button
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert('จัดการทีมงาน')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </motion.button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-lg font-bold text-green-600">
            {extendedMembers.filter(m => m.status === 'online').length}
          </div>
          <div className="text-xs text-green-700">ออนไลน์</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-lg font-bold text-yellow-600">
            {extendedMembers.filter(m => m.status === 'away').length}
          </div>
          <div className="text-xs text-yellow-700">ไม่อยู่</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-lg font-bold text-gray-600">
            {extendedMembers.filter(m => m.status === 'offline').length}
          </div>
          <div className="text-xs text-gray-700">ออฟไลน์</div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {extendedMembers.map((member, index) => {
          const completionRate = Math.round((member.completedTasks / member.tasksCount) * 100);
          
          return (
            <motion.div
              key={member.id}
              className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => alert(`ดูโปรไฟล์ ${member.name}`)}
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(index)}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getInitials(member.name)}
                  </motion.div>
                  {/* Status Indicator */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                          {member.role}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{getStatusText(member.status)}</span>
                      </div>
                      
                      {/* Email */}
                      <p className="text-xs text-gray-500 mt-1">{member.email}</p>
                    </div>

                    {/* Task Progress */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {member.completedTasks}/{member.tasksCount}
                      </div>
                      <div className="text-xs text-gray-500">งาน</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>ความคืบหน้า</span>
                      <span className="font-medium">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div 
                        className={`h-1.5 rounded-full ${
                          completionRate >= 80 ? 'bg-green-500' :
                          completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      />
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>กิจกรรมล่าสุด: {member.lastActive}</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Team Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
        <motion.button
          className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => alert('เพิ่มสมาชิกใหม่')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          <span>เพิ่มสมาชิกใหม่</span>
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            className="p-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-xs font-medium flex items-center justify-center space-x-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('ส่งข้อความกลุ่ม')}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span>ส่งข้อความ</span>
          </motion.button>

          <motion.button
            className="p-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-xs font-medium flex items-center justify-center space-x-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('นัดหมายประชุม')}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>นัดประชุม</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
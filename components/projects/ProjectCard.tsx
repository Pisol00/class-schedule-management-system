import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
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

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index?: number;
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'success';
      case 'แบบร่าง':
        return 'warning';
      case 'เสร็จสิ้น':
        return 'info';
      case 'เก็บถาวร':
        return 'default';
      default:
        return 'default';
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

  const getIconColor = (status: Project['status']) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'bg-green-100 text-green-600';
      case 'แบบร่าง':
        return 'bg-yellow-100 text-yellow-600';
      case 'เสร็จสิ้น':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <motion.div 
      className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={() => onClick(project)}
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
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(project.status)}`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {getIconByType(project.icon)}
          </motion.div>
          <Badge variant={getStatusVariant(project.status)}>
            {project.status}
          </Badge>
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
        <MembersSection members={project.members} />

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
        <ProgressSection progress={project.progress} lastUpdated={project.lastUpdated} index={index} />
      </div>
    </motion.div>
  );
}

// Members Section Component
function MembersSection({ members }: { members: ProjectMember[] }) {
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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
          </svg>
          <span>สมาชิก ({members.length} คน)</span>
        </span>
      </div>
      
      {/* Member Avatars */}
      <div className="flex items-center space-x-1 mb-2">
        {members.slice(0, 5).map((member, memberIndex) => {
          const initials = member.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2);
          
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
        
        {members.length > 5 && (
          <motion.div
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm"
            title={`และอีก ${members.length - 5} คน: ${members.slice(5).map(m => m.name).join(', ')}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            +{members.length - 5}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Progress Section Component
function ProgressSection({ progress, lastUpdated, index }: { progress: number; lastUpdated: string; index: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">ความคืบหน้า</span>
        <span className="text-sm font-semibold text-slate-900">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 1.2 + (index * 0.1) }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>อัปเดตล่าสุด</span>
        <span>{lastUpdated}</span>
      </div>
    </div>
  );
}
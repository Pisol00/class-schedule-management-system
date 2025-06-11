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
          <div className="text-right">
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
            <p className="text-xs text-slate-500 mt-2">{project.lastUpdated}</p>
          </div>
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

        {/* Stats Section - Redesigned */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatsItem
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z"/>
              </svg>
            }
            label="รายวิชา"
            value={project.subjects}
            color="text-blue-600 bg-blue-50"
          />
          <StatsItem
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            }
            label="ตารางสอน"
            value={project.schedules}
            color="text-green-600 bg-green-50"
          />
          <StatsItem
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            }
            label="ความขัดแย้ง"
            value={project.conflicts}
            color={project.conflicts > 0 ? "text-red-600 bg-red-50" : "text-slate-600 bg-slate-50"}
          />
        </div>

        {/* Members Section - Enhanced */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              {project.members.slice(0, 4).map((member, memberIndex) => {
                const initials = member.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2);
                const colors = [
                  'bg-blue-500 text-white',
                  'bg-green-500 text-white', 
                  'bg-purple-500 text-white',
                  'bg-orange-500 text-white'
                ];
                
                return (
                  <motion.div
                    key={member.id}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium ${colors[memberIndex % colors.length]} border-2 border-white shadow-sm relative z-${4-memberIndex}`}
                    title={`${member.name} - ${member.role}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + (memberIndex * 0.1) }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                  >
                    {initials}
                  </motion.div>
                );
              })}
              
              {project.members.length > 4 && (
                <motion.div
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm hover:bg-slate-200 transition-colors"
                  title={`และอีก ${project.members.length - 4} คน: ${project.members.slice(4).map(m => m.name).join(', ')}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 }}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                >
                  +{project.members.length - 4}
                </motion.div>
              )}
            </div>
            
            <div className="text-sm text-slate-500">
              {project.members.length} สมาชิก
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-between">
          <motion.button 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            whileHover={{ x: 3 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`เปิดรายละเอียด ${project.title}`);
            }}
          >
            ดูรายละเอียด →
          </motion.button>
          
          <motion.button 
            className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`แก้ไข ${project.title}`);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Item Component
interface StatsItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatsItem({ icon, label, value, color }: StatsItemProps) {
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${color}`}>
        {icon}
      </div>
      <div className="text-xl font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
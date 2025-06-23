'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/components/projects/ProjectCard';

interface ProjectSidebarProps {
  project: Project;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: string;
  href: string;
  badge?: number;
  subItems?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'overview',
    name: 'ภาพรวม',
    icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
    href: ''
  },
  {
    id: 'subjects',
    name: 'รายวิชา',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    href: '/subjects',
    badge: 247
  },
  {
    id: 'instructors',
    name: 'อาจารย์ผู้สอน',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    href: '/instructors',
    badge: 85
  },
  {
    id: 'rooms',
    name: 'ห้องเรียน',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    href: '/rooms',
    badge: 42
  },
  {
    id: 'students',
    name: 'นักศึกษา',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    href: '/students',
    badge: 1850
  },
  {
    id: 'schedules',
    name: 'จัดการตาราง',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    href: '/schedules',
    subItems: [
      {
        id: 'schedule-builder',
        name: 'สร้างตาราง',
        icon: 'M12 4v16m8-8H4',
        href: '/schedules/builder'
      },
      {
        id: 'conflicts',
        name: 'ความขัดแย้ง',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z',
        href: '/schedules/conflicts',
        badge: 12
      }
    ]
  },
  {
    id: 'timetables',
    name: 'ตารางเรียน',
    icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
    href: '/timetables'
  },
  {
    id: 'reports',
    name: 'รายงาน',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    href: '/reports',
    subItems: [
      {
        id: 'teaching-load',
        name: 'ภาระงานสอน',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        href: '/reports/teaching-load'
      },
      {
        id: 'room-usage',
        name: 'การใช้ห้อง',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',
        href: '/reports/room-usage'
      }
    ]
  },
  {
    id: 'settings',
    name: 'ตั้งค่า',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    href: '/settings'
  }
];

export default function ProjectSidebar({ project, collapsed, onToggleCollapse }: ProjectSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id as string;
  const [expandedItems, setExpandedItems] = useState<string[]>(['schedules', 'reports']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getFullHref = (href: string) => {
    if (href === '') return `/project/${projectId}`;
    return `/project/${projectId}${href}`;
  };

  const isActiveRoute = (href: string) => {
    const fullHref = getFullHref(href);
    if (href === '') {
      return pathname === `/project/${projectId}`;
    }
    return pathname.startsWith(fullHref);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'bg-green-500';
      case 'แบบร่าง':
        return 'bg-orange-500';
      case 'เสร็จสิ้น':
        return 'bg-blue-500';
      case 'เก็บถาวร':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-80'
      }`}
      initial={false}
      animate={{ width: collapsed ? 64 : 320 }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div 
              className="flex-1 min-w-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900 truncate">
                    {project.title}
                  </h2>
                  <p className="text-xs text-gray-500 truncate">
                    {project.progress}% เสร็จสิ้น
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <motion.div 
                  className={`h-1.5 rounded-full ${getStatusColor(project.status)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
          )}
          
          <motion.button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={isActiveRoute(item.href)}
              getFullHref={getFullHref}
              expandedItems={expandedItems}
              onToggleExpanded={toggleExpanded}
              isActiveRoute={isActiveRoute}
              index={index}
            />
          ))}
        </div>
      </nav>

      {/* Back to Projects */}
      <div className="p-4 border-t border-gray-100">
        <Link 
          href="/"
          className={`flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {!collapsed && <span className="text-sm font-medium">กลับสู่โครงการทั้งหมด</span>}
        </Link>
      </div>
    </motion.div>
  );
}

// Navigation Item Component
interface NavItemProps {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
  getFullHref: (href: string) => string;
  expandedItems: string[];
  onToggleExpanded: (itemId: string) => void;
  isActiveRoute: (href: string) => boolean;
  index: number;
}

function NavItem({ 
  item, 
  collapsed, 
  isActive, 
  getFullHref, 
  expandedItems, 
  onToggleExpanded, 
  isActiveRoute,
  index 
}: NavItemProps) {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedItems.includes(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Main Item */}
      <div className="flex items-center">
        <Link
          href={getFullHref(item.href)}
          className={`flex-1 flex items-center space-x-3 p-2 rounded-lg transition-colors group ${
            isActive 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
          </svg>
          
          {!collapsed && (
            <>
              <span className="text-sm font-medium flex-1">{item.name}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </>
          )}
        </Link>

        {/* Expand/Collapse Button for Sub Items */}
        {hasSubItems && !collapsed && (
          <motion.button
            onClick={() => onToggleExpanded(item.id)}
            className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ml-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </motion.svg>
          </motion.button>
        )}
      </div>

      {/* Sub Items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && !collapsed && (
          <motion.div
            className="ml-6 mt-1 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.subItems!.map((subItem) => (
              <Link
                key={subItem.id}
                href={getFullHref(subItem.href)}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors text-sm ${
                  isActiveRoute(subItem.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={subItem.icon}/>
                </svg>
                <span className="flex-1">{subItem.name}</span>
                {subItem.badge && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActiveRoute(subItem.href)
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {subItem.badge}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
'use client';

import { useState, useEffect, useMemo } from 'react';
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
  badge?: number | string;
  subItems?: NavItem[];
  color?: string;
  isNew?: boolean;
  isUpdated?: boolean;
  description?: string;
  shortcut?: string;
}

interface RecentItem {
  id: string;
  name: string;
  href: string;
  timestamp: Date;
  type: 'page' | 'action';
}

const navigationItems: NavItem[] = [
  {
    id: 'overview',
    name: 'ภาพรวมโครงการ',
    icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
    href: '',
    color: 'blue',
    description: 'แสดงสถิติและข้อมูลรวมของโครงการ',
    shortcut: '⌘+H'
  },
  {
    id: 'subjects',
    name: 'รายวิชา',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    href: '/subjects',
    badge: 247,
    color: 'emerald',
    description: 'จัดการรายวิชาและหลักสูตร',
    shortcut: '⌘+S'
  },
  {
    id: 'instructors',
    name: 'อาจารย์ผู้สอน',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    href: '/instructors',
    badge: 85,
    color: 'purple',
    description: 'จัดการข้อมูลอาจารย์และการมอบหมายการสอน',
    shortcut: '⌘+I'
  },
  {
    id: 'rooms',
    name: 'ห้องเรียน',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    href: '/rooms',
    badge: 42,
    color: 'orange',
    description: 'จัดการห้องเรียนและสิ่งอำนวยความสะดวก',
    shortcut: '⌘+R'
  },
  {
    id: 'students',
    name: 'นักศึกษา',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.42a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    href: '/students',
    badge: 1850,
    color: 'cyan',
    description: 'จัดการข้อมูลนักศึกษาและการลงทะเบียน'
  },
  {
    id: 'schedules',
    name: 'จัดการตาราง',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    href: '/schedules',
    color: 'rose',
    description: 'จัดทำและแก้ไขตารางเรียน-สอน',
    shortcut: '⌘+T',
    subItems: [
      {
        id: 'schedule-builder',
        name: 'สร้างตาราง',
        icon: 'M12 4v16m8-8H4',
        href: '/schedules/builder',
        color: 'rose',
        description: 'เครื่องมือสร้างตารางแบบลาก-วาง',
        isNew: true
      },
      {
        id: 'conflicts',
        name: 'ความขัดแย้ง',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z',
        href: '/schedules/conflicts',
        badge: 12,
        color: 'red',
        description: 'ตรวจสอบและแก้ไขความขัดแย้งในตาราง'
      }
    ]
  },
  {
    id: 'timetables',
    name: 'ตารางเรียน',
    icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
    href: '/timetables',
    color: 'indigo',
    description: 'ดูและส่งออกตารางเรียนที่เสร็จสิ้น'
  },
  {
    id: 'reports',
    name: 'รายงาน',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    href: '/reports',
    color: 'violet',
    description: 'สร้างรายงานและสถิติต่างๆ',
    subItems: [
      {
        id: 'teaching-load',
        name: 'ภาระงานสอน',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        href: '/reports/teaching-load',
        color: 'violet',
        description: 'รายงานภาระงานสอนของอาจารย์'
      },
      {
        id: 'room-usage',
        name: 'การใช้ห้อง',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',
        href: '/reports/room-usage',
        color: 'violet',
        description: 'รายงานการใช้งานห้องเรียน'
      }
    ]
  },
  {
    id: 'settings',
    name: 'ตั้งค่า',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    href: '/settings',
    color: 'slate',
    description: 'การตั้งค่าโครงการและระบบ',
    subItems: [
      {
        id: 'general',
        name: 'ตั้งค่าทั่วไป',
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        href: '/settings/general',
        color: 'slate',
        description: 'ข้อมูลพื้นฐานของโครงการ'
      },
      {
        id: 'schedule',
        name: 'ตั้งค่าตาราง',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        href: '/settings/schedule',
        color: 'slate',
        description: 'กำหนดเวลาและรูปแบบตาราง'
      },
      {
        id: 'notifications',
        name: 'การแจ้งเตือน',
        icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
        href: '/settings/notifications',
        badge: '3',
        color: 'slate',
        description: 'ตั้งค่าการแจ้งเตือนและอีเมล',
        isUpdated: true
      },
      {
        id: 'access',
        name: 'สิทธิ์การเข้าถึง',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        href: '/settings/access',
        color: 'slate',
        description: 'จัดการสิทธิ์ผู้ใช้งาน'
      },
      {
        id: 'export',
        name: 'นำเข้า/ส่งออก',
        icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
        href: '/settings/export',
        color: 'slate',
        description: 'ตั้งค่าการนำเข้าและส่งออกข้อมูล'
      },
      {
        id: 'advanced',
        name: 'ขั้นสูง',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        href: '/settings/advanced',
        color: 'slate',
        description: 'ตั้งค่าขั้นสูงและการดูแลระบบ'
      }
    ]
  }
];

export default function ProjectSidebar({ project, collapsed, onToggleCollapse }: ProjectSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id as string;
  const [expandedItems, setExpandedItems] = useState<string[]>(['schedules', 'reports', 'settings']);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>(['overview', 'schedule-builder']);
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Filter navigation items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return navigationItems;
    
    return navigationItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subItems?.some(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(!showSearch);
            break;
          case 'h':
            e.preventDefault();
            window.location.href = getFullHref('');
            break;
          case 's':
            e.preventDefault();
            window.location.href = getFullHref('/subjects');
            break;
          case 'i':
            e.preventDefault();
            window.location.href = getFullHref('/instructors');
            break;
          case 'r':
            e.preventDefault();
            window.location.href = getFullHref('/rooms');
            break;
          case 't':
            e.preventDefault();
            window.location.href = getFullHref('/schedules');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSearch]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleFavorite = (itemId: string) => {
    setFavoriteItems(prev => 
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
        return { bg: 'bg-emerald-500', text: 'text-emerald-600', ring: 'ring-emerald-500/20' };
      case 'แบบร่าง':
        return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-500/20' };
      case 'เสร็จสิ้น':
        return { bg: 'bg-blue-500', text: 'text-blue-600', ring: 'ring-blue-500/20' };
      case 'เก็บถาวร':
        return { bg: 'bg-slate-500', text: 'text-slate-600', ring: 'ring-slate-500/20' };
      default:
        return { bg: 'bg-slate-500', text: 'text-slate-600', ring: 'ring-slate-500/20' };
    }
  };

  const statusInfo = getStatusColor(project.status);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-r border-slate-200/60 backdrop-blur-xl">
      {/* Header Section with Glassmorphism */}
      <div className="relative p-6 border-b border-slate-200/60">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-purple-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[length:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            {!collapsed && (
              <motion.div 
                className="flex-1 min-w-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enhanced Project Status Badge */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className={`w-3 h-3 ${statusInfo.bg} rounded-full ring-4 ${statusInfo.ring} shadow-lg`} />
                    <div className={`absolute inset-0 ${statusInfo.bg} rounded-full animate-ping opacity-30`} />
                  </div>
                  <span className={`text-xs font-bold ${statusInfo.text} uppercase tracking-wider drop-shadow-sm`}>
                    {project.status}
                  </span>
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative"
                    >
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold text-white">{notifications}</span>
                      </div>
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40" />
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Project Title */}
                <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight drop-shadow-sm">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>ความคืบหน้า</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Enhanced Collapse Button */}
            <motion.button
              onClick={onToggleCollapse}
              className="relative z-10 p-2.5 bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-xl hover:bg-white hover:border-slate-300 hover:shadow-lg text-slate-600 hover:text-slate-900 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="w-4 h-4 group-hover:drop-shadow-sm" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section */}
      {!collapsed && (
        <motion.div
          className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาเมนู... (⌘+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
            />
            <svg className="absolute left-3 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 w-4 h-4 text-slate-400 hover:text-slate-600"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Enhanced Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {/* Favorites Section */}
        {!collapsed && favoriteItems.length > 0 && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              รายการโปรด
            </h3>
            <div className="space-y-1">
              {favoriteItems.map(itemId => {
                const item = navigationItems.find(nav => nav.id === itemId) || 
                           navigationItems.flatMap(nav => nav.subItems || []).find(sub => sub.id === itemId);
                if (!item) return null;
                return (
                  <FavoriteNavItem
                    key={`fav-${item.id}`}
                    item={item}
                    isActive={isActiveRoute(item.href)}
                    getFullHref={getFullHref}
                    onToggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Main Navigation */}
        <div className="space-y-2">
          {filteredItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={isActiveRoute(item.href)}
              getFullHref={getFullHref}
              expandedItems={expandedItems}
              onToggleExpanded={toggleExpanded}
              isActiveRoute={isActiveRoute}
              favoriteItems={favoriteItems}
              onToggleFavorite={toggleFavorite}
              index={index}
            />
          ))}
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-slate-200/60"
          >
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              การดำเนินการด่วน
            </h3>
            <div className="space-y-2">
              <QuickActionButton
                icon="M12 4v16m8-8H4"
                label="สร้างตารางใหม่"
                color="emerald"
                href={getFullHref('/schedules/builder')}
              />
              <QuickActionButton
                icon="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                label="ส่งออกรายงาน"
                color="blue"
                href={getFullHref('/reports')}
              />
            </div>
          </motion.div>
        )}
      </nav>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-slate-200/60 bg-gradient-to-t from-slate-50/50 to-transparent backdrop-blur-sm">
        <Link 
          href="/"
          className={`group flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-lg transition-all duration-300 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
            <svg className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          {!collapsed && (
            <motion.span 
              className="font-medium text-sm group-hover:drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              กลับสู่หน้าหลัก
            </motion.span>
          )}
        </Link>
      </div>
    </div>
  );
}

// Enhanced NavItem Component
interface NavItemProps {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
  getFullHref: (href: string) => string;
  expandedItems: string[];
  onToggleExpanded: (itemId: string) => void;
  isActiveRoute: (href: string) => boolean;
  favoriteItems: string[];
  onToggleFavorite: (itemId: string) => void;
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
  favoriteItems,
  onToggleFavorite,
  index 
}: NavItemProps) {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedItems.includes(item.id);
  const isFavorite = favoriteItems.includes(item.id);

  const getItemColors = (color: string = 'blue', active: boolean = false) => {
    if (active) {
      const colorMap = {
        blue: 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-800 border-blue-200/60 shadow-lg shadow-blue-100/50',
        emerald: 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-800 border-emerald-200/60 shadow-lg shadow-emerald-100/50',
        purple: 'bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-800 border-purple-200/60 shadow-lg shadow-purple-100/50',
        orange: 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-800 border-orange-200/60 shadow-lg shadow-orange-100/50',
        cyan: 'bg-gradient-to-r from-cyan-50 to-cyan-100/50 text-cyan-800 border-cyan-200/60 shadow-lg shadow-cyan-100/50',
        rose: 'bg-gradient-to-r from-rose-50 to-rose-100/50 text-rose-800 border-rose-200/60 shadow-lg shadow-rose-100/50',
        indigo: 'bg-gradient-to-r from-indigo-50 to-indigo-100/50 text-indigo-800 border-indigo-200/60 shadow-lg shadow-indigo-100/50',
        violet: 'bg-gradient-to-r from-violet-50 to-violet-100/50 text-violet-800 border-violet-200/60 shadow-lg shadow-violet-100/50',
        red: 'bg-gradient-to-r from-red-50 to-red-100/50 text-red-800 border-red-200/60 shadow-lg shadow-red-100/50',
        slate: 'bg-gradient-to-r from-slate-50 to-slate-100/50 text-slate-800 border-slate-200/60 shadow-lg shadow-slate-100/50'
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    }
    return 'text-slate-700 hover:text-slate-900 hover:bg-white/80 hover:shadow-md border-transparent hover:border-slate-200/60';
  };

  const getBadgeColors = (color: string = 'blue') => {
    const colorMap = {
      blue: 'bg-blue-500 text-white shadow-lg shadow-blue-200',
      emerald: 'bg-emerald-500 text-white shadow-lg shadow-emerald-200',
      purple: 'bg-purple-500 text-white shadow-lg shadow-purple-200',
      orange: 'bg-orange-500 text-white shadow-lg shadow-orange-200',
      cyan: 'bg-cyan-500 text-white shadow-lg shadow-cyan-200',
      rose: 'bg-rose-500 text-white shadow-lg shadow-rose-200',
      indigo: 'bg-indigo-500 text-white shadow-lg shadow-indigo-200',
      violet: 'bg-violet-500 text-white shadow-lg shadow-violet-200',
      red: 'bg-red-500 text-white shadow-lg shadow-red-200',
      slate: 'bg-slate-500 text-white shadow-lg shadow-slate-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group"
    >
      {/* Main Item */}
      <div className="relative">
        <Link
          href={getFullHref(item.href)}
          className={`flex items-center space-x-3 p-3.5 rounded-xl border transition-all duration-300 ${
            getItemColors(item.color, isActive)
          } ${isActive ? 'scale-[1.02] backdrop-blur-sm' : 'hover:scale-[1.01]'} ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className={`relative p-2 rounded-lg transition-all duration-300 ${
            isActive ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-slate-100 group-hover:bg-white'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
            </svg>
            
            {/* New/Updated Indicators */}
            {item.isNew && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            )}
            {item.isUpdated && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </div>
          
          {!collapsed && (
            <>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm">{item.name}</span>
                  {item.shortcut && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.shortcut}
                    </span>
                  )}
                </div>
                {item.description && !isActive && (
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-xs px-2 py-1 rounded-full font-bold ${
                      isActive ? getBadgeColors(item.color) : 'bg-slate-100 text-slate-600'
                    } transition-all duration-300`}
                  >
                    {item.badge}
                  </motion.span>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-yellow-100 rounded transition-all duration-200"
                >
                  <svg 
                    className={`w-3 h-3 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </Link>

        {/* Expand Button for Sub Items */}
        {hasSubItems && !collapsed && (
          <motion.button
            onClick={() => onToggleExpanded(item.id)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-slate-200 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg 
              className="w-4 h-4 text-slate-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
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
            className="ml-8 mt-2 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {item.subItems!.map((subItem) => (
              <motion.div
                key={subItem.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Link
                  href={getFullHref(subItem.href)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 text-sm ${
                    getItemColors(subItem.color, isActiveRoute(subItem.href))
                  } ${isActiveRoute(subItem.href) ? 'shadow-lg backdrop-blur-sm' : ''}`}
                >
                  <div className={`relative p-1.5 rounded-md transition-all duration-300 ${
                    isActiveRoute(subItem.href) ? 'bg-white/90 shadow-sm' : 'bg-slate-100 group-hover:bg-white'
                  }`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={subItem.icon}/>
                    </svg>
                    
                    {/* Indicators */}
                    {subItem.isNew && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    )}
                    {subItem.isUpdated && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span className="font-medium">{subItem.name}</span>
                    {subItem.description && !isActiveRoute(subItem.href) && (
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {subItem.description}
                      </p>
                    )}
                  </div>
                  
                  {subItem.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${
                        isActiveRoute(subItem.href) ? getBadgeColors(subItem.color) : 'bg-slate-100 text-slate-600'
                      } transition-all duration-300`}
                    >
                      {subItem.badge}
                    </motion.span>
                  )}

                  {/* Favorite Button for Sub Items */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite(subItem.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-yellow-100 rounded transition-all duration-200"
                  >
                    <svg 
                      className={`w-3 h-3 ${favoriteItems.includes(subItem.id) ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Favorite Nav Item Component
interface FavoriteNavItemProps {
  item: NavItem;
  isActive: boolean;
  getFullHref: (href: string) => string;
  onToggleFavorite: (itemId: string) => void;
}

function FavoriteNavItem({ item, isActive, getFullHref, onToggleFavorite }: FavoriteNavItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group"
    >
      <Link
        href={getFullHref(item.href)}
        className={`flex items-center space-x-3 p-2.5 rounded-lg border transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 border-yellow-200 shadow-md' 
            : 'text-slate-600 hover:bg-yellow-50 hover:border-yellow-200 border-transparent'
        }`}
      >
        <div className={`p-1.5 rounded ${isActive ? 'bg-yellow-100' : 'bg-slate-100 group-hover:bg-yellow-100'} transition-colors`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
          </svg>
        </div>
        <span className="text-sm font-medium flex-1">{item.name}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(item.id);
          }}
          className="p-1 text-yellow-500 hover:bg-yellow-100 rounded transition-all duration-200"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
        </button>
      </Link>
    </motion.div>
  );
}

// Quick Action Button Component
interface QuickActionButtonProps {
  icon: string;
  label: string;
  color: string;
  href: string;
}

function QuickActionButton({ icon, label, color, href }: QuickActionButtonProps) {
  const getButtonColors = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
      blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${getButtonColors(color)} hover:shadow-md group`}
    >
      <div className="p-1.5 bg-white rounded-md shadow-sm group-hover:shadow-md transition-shadow">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
        </svg>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
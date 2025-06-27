// app/project/[id]/settings/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface SettingsOverviewCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  status: 'configured' | 'warning' | 'default';
  badge?: string;
  color: string;
}

const settingsCards: SettingsOverviewCard[] = [
  {
    id: 'general',
    title: 'ตั้งค่าทั่วไป',
    description: 'ข้อมูลพื้นฐานของโครงการ ชื่อ คำอธิบาย และข้อมูลทั่วไป',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    href: '/settings/general',
    status: 'configured',
    color: 'blue'
  },
  {
    id: 'schedule',
    title: 'ตั้งค่าตาราง',
    description: 'กำหนดเวลาเรียน ช่วงคาบ และกฎการจัดตาราง',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    href: '/settings/schedule',
    status: 'configured',
    color: 'green'
  },
  {
    id: 'notifications',
    title: 'การแจ้งเตือน',
    description: 'ตั้งค่าการแจ้งเตือนทางอีเมล แอป และการแจ้งเตือนอื่นๆ',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    href: '/settings/notifications',
    status: 'warning',
    badge: '3',
    color: 'yellow'
  },
  {
    id: 'access',
    title: 'สิทธิ์การเข้าถึง',
    description: 'จัดการสิทธิ์ผู้ใช้งาน บทบาท และความปลอดภัย',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    href: '/settings/access',
    status: 'configured',
    color: 'purple'
  },
  {
    id: 'export',
    title: 'นำเข้า/ส่งออก',
    description: 'ตั้งค่าการนำเข้าและส่งออกข้อมูลในรูปแบบต่างๆ',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
    href: '/settings/export',
    status: 'default',
    color: 'indigo'
  },
  {
    id: 'advanced',
    title: 'ขั้นสูง',
    description: 'ตั้งค่าขั้นสูง การดูแลระบบ และการจัดการฐานข้อมูล',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    href: '/settings/advanced',
    status: 'default',
    color: 'red'
  }
];

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const getStatusColor = (status: SettingsOverviewCard['status']) => {
    switch (status) {
      case 'configured':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'default':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const getCardColor = (color: string) => {
    const colorMap = {
      blue: 'hover:bg-blue-50 hover:border-blue-200',
      green: 'hover:bg-green-50 hover:border-green-200',
      yellow: 'hover:bg-yellow-50 hover:border-yellow-200',
      purple: 'hover:bg-purple-50 hover:border-purple-200',
      indigo: 'hover:bg-indigo-50 hover:border-indigo-200',
      red: 'hover:bg-red-50 hover:border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600',
      red: 'text-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">ตั้งค่าโครงการ</h1>
          <p className="text-lg text-gray-600">จัดการการตั้งค่าและการกำหนดค่าต่างๆ ของโครงการ</p>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">การตั้งค่าที่เสร็จสิ้น</p>
              <p className="text-2xl font-bold text-gray-900">4/6</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ต้องการความสนใจ</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">การตั้งค่าที่ใช้งานได้</p>
              <p className="text-2xl font-bold text-gray-900">6/6</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card, index) => {
          const statusColors = getStatusColor(card.status);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
            >
              <Link
                href={`/project/${projectId}${card.href}`}
                className={`block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 ${getCardColor(card.color)} group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${statusColors.bg} ${statusColors.border} border transition-colors duration-200`}>
                    <svg className={`w-6 h-6 ${getIconColor(card.color)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}/>
                    </svg>
                  </div>
                  {card.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors.badge}`}>
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-4 flex items-center text-sm">
                  <span className={`font-medium ${statusColors.text}`}>
                    {card.status === 'configured' && 'ตั้งค่าแล้ว'}
                    {card.status === 'warning' && 'ต้องการความสนใจ'}
                    {card.status === 'default' && 'ค่าเริ่มต้น'}
                  </span>
                  <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">กิจกรรมล่าสุด</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">อัปเดตการตั้งค่าการแจ้งเตือน</p>
                  <p className="text-xs text-gray-500">2 ชั่วโมงที่แล้ว</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">แก้ไขข้อมูลทั่วไปของโครงการ</p>
                  <p className="text-xs text-gray-500">1 วันที่แล้ว</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">เพิ่มสิทธิ์ผู้ใช้งานใหม่</p>
                  <p className="text-xs text-gray-500">3 วันที่แล้ว</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
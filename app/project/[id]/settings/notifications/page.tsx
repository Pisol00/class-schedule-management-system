// app/project/[id]/settings/notifications/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import NotificationSettings from '@/components/project/settings/NotificationSettings';

export default function NotificationSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Settings Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>ตั้งค่า</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span className="text-gray-900 font-medium">การแจ้งเตือน</span>
          </div>
          
          {/* Badge for pending notifications */}
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              3 รายการต้องการความสนใจ
            </span>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 px-8 py-3"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions Banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900">การแจ้งเตือนของระบบ</h3>
              <p className="text-xs text-blue-700">จัดการการแจ้งเตือนทางอีเมล แอป และการแจ้งเตือนอื่นๆ</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors">
              ทดสอบการแจ้งเตือน
            </button>
            <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              ตั้งค่าด่วน
            </button>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NotificationSettings 
          projectId={projectId} 
          onUnsavedChanges={setHasUnsavedChanges} 
        />
      </motion.div>
    </div>
  );
}
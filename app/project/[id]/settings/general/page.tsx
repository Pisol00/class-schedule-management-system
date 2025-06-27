// app/project/[id]/settings/general/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import GeneralSettings from '@/components/project/settings/GeneralSettings';

export default function GeneralSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Settings Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>ตั้งค่า</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span className="text-gray-900 font-medium">ตั้งค่าทั่วไป</span>
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

      {/* Settings Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GeneralSettings 
          projectId={projectId} 
          onUnsavedChanges={setHasUnsavedChanges} 
        />
      </motion.div>
    </div>
  );
}
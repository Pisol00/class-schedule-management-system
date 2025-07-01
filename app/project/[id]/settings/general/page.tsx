// app/project/[id]/settings/general/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  ChevronRight, 
  AlertTriangle, 
  Settings,
  Save,
  Loader2
} from 'lucide-react';
import GeneralSettings from '@/components/project/settings/GeneralSettings';

// Floating Elements Component
function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/6 to-purple-400/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [180, 0, 180],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/4 to-cyan-400/4 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, -90, 0],
          x: [0, 30, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export default function GeneralSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('บันทึกการตั้งค่าสำเร็จ!');
      setHasUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        <FloatingElements />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Settings Navigation Breadcrumb */}
        {!isCalendarVisible && (
          <div className="bg-white/70 backdrop-blur-lg border-b border-white/20 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                {/* Left Section - Breadcrumb + Title */}
                <div className="space-y-2">
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button 
                      className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300 group hover:scale-105 cursor-pointer"
                      onClick={() => window.location.href = `/project/${projectId}/settings`}
                    >
                      <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                      <span className="font-medium">ตั้งค่า</span>
                    </button>
                    
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    
                    <div className="flex items-center space-x-2 text-slate-800">
                      <Settings className="w-4 h-4 text-blue-600" />
                      <span className="font-bold">ตั้งค่าทั่วไป</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      ตั้งค่าทั่วไป
                    </h1>
                    <p className="text-slate-600 text-sm">จัดการข้อมูลพื้นฐานและการตั้งค่าหลักของโครงการ</p>
                  </motion.div>
                </div>
                
                {/* Right Section - Save Button (only show when there are changes) */}
                {hasUnsavedChanges && (
                  <motion.div 
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg disabled:cursor-not-allowed flex items-center space-x-2 font-medium group cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      <span>บันทึกการตั้งค่า</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Unsaved Changes Alert */}
        {hasUnsavedChanges && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="bg-amber-50/90 backdrop-blur-lg border border-amber-200/60 rounded-2xl p-4 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-amber-900 font-medium mb-1">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</h4>
                    <p className="text-amber-700 text-sm">
                      การตั้งค่าของคุณมีการเปลี่ยนแปลง กรุณาบันทึกก่อนออกจากหน้านี้
                    </p>
                  </div>
                  <button
                    onClick={() => setHasUnsavedChanges(false)}
                    className="text-amber-500 hover:text-amber-700 hover:scale-110 hover:rotate-90 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10"
        >
          <GeneralSettings 
            projectId={projectId} 
            onUnsavedChanges={setHasUnsavedChanges}
            onCalendarVisibilityChange={setIsCalendarVisible}
          />
        </motion.div>
      </div>
    </>
  );
}
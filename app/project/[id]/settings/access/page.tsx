// app/project/[id]/settings/access/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  ChevronRight, 
  AlertTriangle, 
  Users, 
  Settings,
  Wifi,
  Shield,
  Save,
  Loader2
} from 'lucide-react';
import AccessControlSettings from '@/components/project/settings/AccessControlSettings';

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

export default function AccessSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('บันทึกการตั้งค่าสมาชิกสำเร็จ!');
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
                    className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 group"
                    onClick={() => window.location.href = `/project/${projectId}/settings`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">ตั้งค่า</span>
                  </button>
                  
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  
                  <div className="flex items-center space-x-2 text-slate-800">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">สิทธิ์การเข้าถึง</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    จัดการสมาชิกโปรเจค
                  </h1>
                  <p className="text-slate-600 text-sm">เพิ่ม ลบ และจัดการสิทธิ์ของสมาชิกในโปรเจค</p>
                </motion.div>
              </div>
              
              {/* Right Section - Status Badges + Save Button */}
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-50/80 text-green-700 px-3 py-2 rounded-xl border border-green-200/50 backdrop-blur-sm">
                    <Wifi className="w-4 h-4" />
                    <span className="font-medium text-sm">104 ผู้ใช้ออนไลน์</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-blue-50/80 text-blue-700 px-3 py-2 rounded-xl border border-blue-200/50 backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    <span className="font-medium text-sm">4 บทบาท</span>
                  </div>
                </div>

                <AnimatePresence>
                  {hasUnsavedChanges && (
                    <motion.button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center space-x-2 font-medium"
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>บันทึกการตั้งค่า</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

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
                      การตั้งค่าสมาชิกของคุณมีการเปลี่ยนแปลง กรุณาบันทึกก่อนออกจากหน้านี้
                    </p>
                  </div>
                  <button
                    onClick={() => setHasUnsavedChanges(false)}
                    className="text-amber-500 hover:text-amber-700 transition-colors duration-200"
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
          <AccessControlSettings 
            projectId={projectId} 
            onUnsavedChanges={setHasUnsavedChanges} 
          />
        </motion.div>
      </div>
    </>
  );
}
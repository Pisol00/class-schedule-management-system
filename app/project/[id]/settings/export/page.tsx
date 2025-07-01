// app/project/[id]/settings/export/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
    ChevronRight,
    AlertTriangle,
    Settings,
    Download,
    Loader2,
    FileDown
} from 'lucide-react';
import ExportSettings from '@/components/project/settings/ExportSettings';

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

export default function ExportSettingsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const [isExporting, setIsExporting] = useState(false);

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
                                        className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300 group hover:scale-105 cursor-pointer"
                                        onClick={() => window.location.href = `/project/${projectId}/settings`}
                                    >
                                        <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                        <span className="font-medium">ตั้งค่า</span>
                                    </button>

                                    <ChevronRight className="w-4 h-4 text-slate-400" />

                                    <div className="flex items-center space-x-2 text-slate-800">
                                        <FileDown className="w-4 h-4 text-blue-600" />
                                        <span className="font-bold">ส่งออกข้อมูล</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                        ส่งออกข้อมูล
                                    </h1>
                                    <p className="text-slate-600 text-sm">ส่งออกข้อมูลโปรเจคในรูปแบบต่างๆ สำหรับการใช้งานภายนอก</p>
                                </motion.div>
                            </div>

                            {/* Right Section - Status Indicator */}
                            <motion.div
                                className="flex items-center space-x-4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {isExporting && (
                                    <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50/80 rounded-xl border border-blue-200/60">
                                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                        <span className="text-sm font-medium text-blue-800">กำลังส่งออก...</span>
                                    </div>
                                )}

                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Export Progress Alert */}
                {isExporting && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-20"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-4">
                            <div className="bg-blue-50/90 backdrop-blur-lg border border-blue-200/60 rounded-2xl p-4 shadow-lg">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Download className="w-4 h-4 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-blue-900 font-medium mb-1">กำลังส่งออกข้อมูล</h4>
                                        <p className="text-blue-700 text-sm">
                                            กรุณารอสักครู่ ระบบกำลังจัดเตรียมไฟล์ส่งออกของคุณ
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Export Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative z-10"
                >
                    <ExportSettings
                        projectId={projectId}
                        onExporting={setIsExporting}
                    />
                </motion.div>
            </div>
        </>
    );
}
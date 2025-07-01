// components/project/settings/ExportSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    FileText,
    Table,
    Code,
    Database,
    Calendar,
    Settings,
    Eye,
    Check,
    X,
    Loader2,
    File,
    FileSpreadsheet,
    FileJson,
    CheckCircle,
    Clock,
    BookOpen,
    GraduationCap,
    Users,
    BarChart3
} from 'lucide-react';

interface ExportSettingsProps {
    projectId: string;
    onExporting?: (isExporting: boolean) => void;
}

interface ExportConfig {
    format: 'pdf' | 'excel' | 'json' | 'csv';
    sections: {
        curriculum: boolean; // หลักสูตร
        subjects: boolean;   // รายวิชา
        instructors: boolean; // อาจารย์
        rooms: boolean;       // ห้องเรียน
        students: boolean;    // นักศึกษา
    };
    options: {
        includeImages: boolean;
        includeComments: boolean;
        dateRange: 'all' | 'current' | 'custom';
        customStartDate: string;
        customEndDate: string;
        language: 'th' | 'en';
    };
}

export default function ExportSettings({
    projectId,
    onExporting
}: ExportSettingsProps) {
    const [config, setConfig] = useState<ExportConfig>({
        format: 'pdf',
        sections: {
            curriculum: true,
            subjects: true,
            instructors: true,
            rooms: true,
            students: true
        },
        options: {
            includeImages: true,
            includeComments: false,
            dateRange: 'all',
            customStartDate: '',
            customEndDate: '',
            language: 'th'
        }
    });

    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const handleConfigChange = (path: string, value: any) => {
        setConfig(prev => {
            const keys = path.split('.');
            const newConfig = { ...prev };
            let current: any = newConfig;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newConfig;
        });
    };

    const handleExport = async () => {
        setIsExporting(true);
        if (onExporting) onExporting(true);

        try {
            // Simulate export process with progress
            for (let i = 0; i <= 100; i += 10) {
                setExportProgress(i);
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            // Simulate file download
            const filename = `project-${projectId}-export.${config.format}`;
            alert(`ส่งออกไฟล์ ${filename} สำเร็จ!`);

        } catch (error) {
            alert('เกิดข้อผิดพลาดในการส่งออกข้อมูล');
        } finally {
            setIsExporting(false);
            setExportProgress(0);
            if (onExporting) onExporting(false);
        }
    };

    const formatOptions = [
        {
            id: 'pdf',
            name: 'PDF Document',
            description: 'เหมาะสำหรับการพิมพ์และแบ่งปัน',
            icon: FileText,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
        },
        {
            id: 'excel',
            name: 'Excel Spreadsheet',
            description: 'เหมาะสำหรับการวิเคราะห์ข้อมูล',
            icon: FileSpreadsheet,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        {
            id: 'json',
            name: 'JSON Data',
            description: 'เหมาะสำหรับการนำเข้าข้อมูลใหม่',
            icon: FileJson,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        {
            id: 'csv',
            name: 'CSV File',
            description: 'เหมาะสำหรับการนำเข้าโปรแกรมอื่น',
            icon: Table,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        }
    ];

    const sectionOptions = [
        {
            key: 'curriculum',
            name: 'หลักสูตร',
            description: 'ข้อมูลหลักสูตรในโปรเจค',
            icon: BookOpen,
            color: 'text-indigo-600'
        },
        {
            key: 'subjects',
            name: 'รายวิชา',
            description: 'รายวิชาในแต่ละหลักสูตร',
            icon: FileText,
            color: 'text-teal-600'
        },
        {
            key: 'instructors',
            name: 'อาจารย์',
            description: 'รายชื่อและบทบาทของอาจารย์',
            icon: Users,
            color: 'text-yellow-600'
        },
        {
            key: 'rooms',
            name: 'ห้องเรียน',
            description: 'ห้องเรียนที่ใช้ในการเรียนการสอน',
            icon: Table,
            color: 'text-pink-600'
        },
        {
            key: 'students',
            name: 'นักศึกษา',
            description: 'รายชื่อนักศึกษาในโปรเจค',
            icon: Users,
            color: 'text-rose-600'
        }
    ];

    const getSelectedSectionsCount = () => {
        return Object.values(config.sections).filter(Boolean).length;
    };

    const getEstimatedFileSize = () => {
        const baseSize = getSelectedSectionsCount() * 0.5; // MB per section
        const formatMultiplier = {
            pdf: 1.5,
            excel: 1.2,
            json: 0.8,
            csv: 0.5
        };
        return (baseSize * formatMultiplier[config.format]).toFixed(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Export Configuration */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Format Selection */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                                <File className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">รูปแบบไฟล์</h3>
                                <p className="text-slate-600">เลือกรูปแบบที่ต้องการส่งออก</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formatOptions.map((format) => {
                                const IconComponent = format.icon;
                                const isSelected = config.format === format.id;

                                return (
                                    <button
                                        key={format.id}
                                        onClick={() => handleConfigChange('format', format.id)}
                                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg hover:scale-[1.02] cursor-pointer backdrop-blur-sm ${
                                            isSelected
                                                ? `${format.borderColor} ${format.bgColor} shadow-md`
                                                : 'border-slate-200/60 hover:border-slate-300 hover:bg-slate-50/80'
                                        }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 rounded-xl ${format.bgColor} flex items-center justify-center transition-all duration-300 ${
                                                isSelected ? 'shadow-md' : ''
                                            }`}>
                                                <IconComponent className={`w-6 h-6 ${format.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-slate-800">{format.name}</h4>
                                                    {isSelected && (
                                                        <CheckCircle className="w-5 h-5 text-emerald-600 animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600">{format.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Data Selection */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                    <Database className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">เลือกข้อมูล</h3>
                                    <p className="text-slate-600">เลือกส่วนข้อมูลที่ต้องการส่งออก</p>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-blue-50/80 rounded-xl border border-blue-200/60">
                                <span className="text-sm font-medium text-blue-800">
                                    เลือกแล้ว {getSelectedSectionsCount()}/{sectionOptions.length} รายการ
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {sectionOptions.map((section) => {
                                const IconComponent = section.icon;
                                const isSelected = config.sections[section.key as keyof typeof config.sections];

                                return (
                                    <label
                                        key={section.key}
                                        className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] backdrop-blur-sm ${
                                            isSelected
                                                ? 'border-emerald-300 bg-emerald-50/80 shadow-md'
                                                : 'border-slate-200/60 hover:border-emerald-200 hover:bg-emerald-50/30'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => handleConfigChange(`sections.${section.key}`, e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                isSelected ? 'bg-emerald-100 shadow-md' : 'bg-slate-100 hover:bg-slate-200'
                                            }`}>
                                                <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                                                    isSelected ? 'text-emerald-600' : section.color
                                                }`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 mb-1">{section.name}</h4>
                                                <p className="text-sm text-slate-600">{section.description}</p>
                                            </div>
                                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                                isSelected 
                                                    ? 'border-emerald-500 bg-emerald-500 shadow-md' 
                                                    : 'border-slate-300 hover:border-emerald-300'
                                            }`}>
                                                {isSelected && (
                                                    <Check className="w-4 h-4 text-white animate-pulse" />
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </motion.section>
                </div>

                {/* Right Column - Preview & Export */}
                <div className="space-y-6">
                    {/* Export Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50 sticky top-24"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                                <Eye className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">สรุปการส่งออก</h3>
                        </div>

                        <div className="space-y-4">
                            {/* Format Info */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200/60">
                                <span className="text-slate-600 font-medium">รูปแบบ:</span>
                                <span className="font-bold text-slate-800">
                                    {formatOptions.find(f => f.id === config.format)?.name}
                                </span>
                            </div>

                            {/* Sections Count */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200/60">
                                <span className="text-slate-600 font-medium">หมวดข้อมูล:</span>
                                <span className="font-bold text-slate-800">
                                    {getSelectedSectionsCount()} รายการ
                                </span>
                            </div>

                            {/* Estimated Size */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200/60">
                                <span className="text-slate-600 font-medium">ขนาดโดยประมาณ:</span>
                                <span className="font-bold text-slate-800">
                                    {getEstimatedFileSize()} MB
                                </span>
                            </div>

                            {/* Processing Time */}
                            <div className="flex items-center justify-between py-3">
                                <span className="text-slate-600 font-medium">เวลาที่ใช้:</span>
                                <span className="font-bold text-slate-800">
                                    ~{Math.max(2, getSelectedSectionsCount())} นาที
                                </span>
                            </div>
                        </div>

                        {/* Export Progress */}
                        {isExporting && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/60"
                            >
                                <div className="flex items-center mb-3">
                                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin mr-2" />
                                    <span className="text-sm font-bold text-emerald-800">กำลังส่งออก...</span>
                                </div>
                                <div className="w-full bg-emerald-200/60 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                                        style={{ width: `${exportProgress}%` }}
                                    />
                                </div>
                                <div className="text-xs font-medium text-emerald-700 mt-2 text-right">
                                    {exportProgress}%
                                </div>
                            </motion.div>
                        )}

                        {/* Export Button */}
                        <button
                            onClick={handleExport}
                            disabled={isExporting || getSelectedSectionsCount() === 0}
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-xl hover:from-emerald-700 hover:to-green-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 font-bold flex items-center justify-center space-x-3 group cursor-pointer"
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>กำลังส่งออก...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span>ส่งออกข้อมูล</span>
                                </>
                            )}
                        </button>

                        {getSelectedSectionsCount() === 0 && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-amber-600 mt-3 text-center font-medium bg-amber-50/80 py-2 px-3 rounded-lg border border-amber-200/60"
                            >
                                กรุณาเลือกข้อมูลที่ต้องการส่งออก
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
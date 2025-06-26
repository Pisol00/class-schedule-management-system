// components/project/settings/ExportImportSettings.tsx
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ExportImportSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
  fileExtension: string;
  features: string[];
  isAvailable: boolean;
}

interface ImportHistory {
  id: string;
  fileName: string;
  fileSize: string;
  importDate: string;
  status: 'success' | 'failed' | 'processing';
  recordsImported: number;
  errors?: string[];
}

interface BackupConfig {
  autoBackup: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  retention: number; // days
  includeAttachments: boolean;
  compression: boolean;
  encryption: boolean;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'excel',
    name: 'Microsoft Excel',
    description: 'ส่งออกเป็นไฟล์ Excel พร้อมการจัดรูปแบบ',
    icon: '📊',
    fileExtension: '.xlsx',
    features: ['การจัดรูปแบบ', 'หลายแผ่นงาน', 'กราฟและแผนภูมิ'],
    isAvailable: true
  },
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'ส่งออกเป็นเอกสาร PDF ที่พร้อมพิมพ์',
    icon: '📄',
    fileExtension: '.pdf',
    features: ['พร้อมพิมพ์', 'รักษารูปแบบ', 'ปลอดภัย'],
    isAvailable: true
  },
  {
    id: 'csv',
    name: 'CSV File',
    description: 'ส่งออกข้อมูลดิบในรูปแบบ CSV',
    icon: '📈',
    fileExtension: '.csv',
    features: ['ขนาดเล็ก', 'เปิดได้ทุกโปรแกรม', 'เหมาะสำหรับข้อมูล'],
    isAvailable: true
  },
  {
    id: 'json',
    name: 'JSON Data',
    description: 'ส่งออกข้อมูลดิบในรูปแบบ JSON',
    icon: '🔧',
    fileExtension: '.json',
    features: ['สำหรับนักพัฒนา', 'โครงสร้างข้อมูล', 'API Ready'],
    isAvailable: true
  },
  {
    id: 'ical',
    name: 'iCalendar',
    description: 'ส่งออกปฏิทินในรูปแบบ iCal',
    icon: '📅',
    fileExtension: '.ics',
    features: ['ปฏิทิน', 'Google Calendar', 'Outlook'],
    isAvailable: true
  },
  {
    id: 'xml',
    name: 'XML Format',
    description: 'ส่งออกในรูปแบบ XML',
    icon: '📋',
    fileExtension: '.xml',
    features: ['มาตรฐาน', 'โครงสร้าง', 'ระบบอื่น'],
    isAvailable: false
  }
];

const mockImportHistory: ImportHistory[] = [
  {
    id: '1',
    fileName: 'subjects_2567_1.xlsx',
    fileSize: '2.3 MB',
    importDate: '2024-03-15 14:30',
    status: 'success',
    recordsImported: 247
  },
  {
    id: '2',
    fileName: 'instructors_data.csv',
    fileSize: '856 KB',
    importDate: '2024-03-14 09:15',
    status: 'success',
    recordsImported: 85
  },
  {
    id: '3',
    fileName: 'rooms_backup.json',
    fileSize: '125 KB',
    importDate: '2024-03-13 16:45',
    status: 'failed',
    recordsImported: 0,
    errors: ['รูปแบบไฟล์ไม่ถูกต้อง', 'ข้อมูลซ้ำกัน 5 รายการ']
  }
];

const defaultBackupConfig: BackupConfig = {
  autoBackup: true,
  frequency: 'weekly',
  retention: 30,
  includeAttachments: true,
  compression: true,
  encryption: false
};

export default function ExportImportSettings({ projectId, onUnsavedChanges }: ExportImportSettingsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [backupConfig, setBackupConfig] = useState<BackupConfig>(defaultBackupConfig);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async (format: ExportFormat) => {
    if (!format.isAvailable) {
      alert(`รูปแบบ ${format.name} ยังไม่พร้อมใช้งาน`);
      return;
    }

    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock download
      const link = document.createElement('a');
      link.href = 'data:text/plain;charset=utf-8,Mock Export Data';
      link.download = `schedule_export_${projectId}${format.fileExtension}`;
      link.click();
      
      alert(`ส่งออกข้อมูลในรูปแบบ ${format.name} สำเร็จ!`);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการส่งออกข้อมูล');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleImport = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('กรุณาเลือกไฟล์ที่ต้องการนำเข้า');
      return;
    }

    setIsImporting(true);
    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('นำเข้าข้อมูลสำเร็จ!');
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล');
    } finally {
      setIsImporting(false);
    }
  };

  const handleBackupConfigChange = (field: keyof BackupConfig, value: any) => {
    setBackupConfig(prev => ({ ...prev, [field]: value }));
    onUnsavedChanges(true);
  };

  const createBackup = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock backup download
      const link = document.createElement('a');
      link.href = 'data:text/plain;charset=utf-8,Mock Backup Data';
      link.download = `project_backup_${projectId}_${new Date().getTime()}.backup`;
      link.click();
      
      alert('สร้างไฟล์สำรองข้อมูลสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสร้างไฟล์สำรอง');
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusIcon = (status: ImportHistory['status']) => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-5 h-5 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">นำเข้า/ส่งออกข้อมูล</h2>
        <p className="text-gray-600">จัดการการนำเข้าและส่งออกข้อมูลโครงการในรูปแบบต่างๆ</p>
      </div>

      <div className="space-y-8">
        {/* Export Data Section */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
            </svg>
            ส่งออกข้อมูล
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {exportFormats.map((format, index) => (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  format.isAvailable
                    ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                    : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => format.isAvailable && handleExport(format)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{format.icon}</div>
                  <h4 className="font-medium text-gray-900 mb-1">{format.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{format.description}</p>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {format.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {!format.isAvailable && (
                    <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                      เร็วๆ นี้
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {isExporting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 font-medium">กำลังส่งออกข้อมูล...</span>
              </div>
            </motion.div>
          )}
        </section>

        {/* Import Data Section */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            นำเข้าข้อมูล
          </h3>
          
          <div className="space-y-6">
            {/* Warning */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-medium text-yellow-800">คำแนะนำสำคัญ</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    การนำเข้าข้อมูลจะเขียนทับข้อมูลเดิมที่มีอยู่ กรุณาสำรองข้อมูลก่อนการนำเข้า
                    และตรวจสอบรูปแบบไฟล์ให้ถูกต้อง
                  </p>
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              
              {selectedFiles && selectedFiles.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-900">ไฟล์ที่เลือก:</h4>
                  {Array.from(selectedFiles).map((file, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <span>{file.name}</span>
                      <span>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                  <div className="flex space-x-3 justify-center mt-4">
                    <button
                      onClick={handleImport}
                      disabled={isImporting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isImporting && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>{isImporting ? 'กำลังนำเข้า...' : 'เริ่มนำเข้าข้อมูล'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFiles(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">อัพโหลดไฟล์</h4>
                  <p className="text-gray-600 mb-4">
                    ลากและวางไฟล์ที่นี่ หรือ
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    เลือกไฟล์
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    รองรับไฟล์: .xlsx, .csv, .json (ขนาดไม่เกิน 10MB)
                  </p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".xlsx,.csv,.json"
                className="hidden"
              />
            </div>
          </div>
        </section>

        {/* Import History */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">ประวัติการนำเข้าข้อมูล</h3>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ไฟล์
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่นำเข้า
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ผลลัพธ์
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockImportHistory.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.fileName}</div>
                          <div className="text-sm text-gray-500">{item.fileSize}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.importDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className={`text-sm font-medium ${
                            item.status === 'success' ? 'text-green-600' :
                            item.status === 'failed' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {item.status === 'success' ? 'สำเร็จ' :
                             item.status === 'failed' ? 'ล้มเหลว' :
                             'กำลังประมวลผล'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.status === 'success' ? (
                          <span>{item.recordsImported.toLocaleString()} รายการ</span>
                        ) : item.status === 'failed' && item.errors ? (
                          <div className="space-y-1">
                            {item.errors.map((error, idx) => (
                              <div key={idx} className="text-red-600">{error}</div>
                            ))}
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Backup & Restore */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            สำรองข้อมูลและคืนค่า
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Backup Settings */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">การตั้งค่าการสำรองข้อมูล</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">สำรองข้อมูลอัตโนมัติ</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={backupConfig.autoBackup}
                        onChange={(e) => handleBackupConfigChange('autoBackup', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {backupConfig.autoBackup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ความถี่ในการสำรอง
                        </label>
                        <select
                          value={backupConfig.frequency}
                          onChange={(e) => handleBackupConfigChange('frequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="daily">ทุกวัน</option>
                          <option value="weekly">ทุกสัปดาห์</option>
                          <option value="monthly">ทุกเดือน</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          เก็บไฟล์สำรอง (วัน)
                        </label>
                        <input
                          type="number"
                          min="7"
                          max="365"
                          value={backupConfig.retention}
                          onChange={(e) => handleBackupConfigChange('retention', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">รวมไฟล์แนบ</span>
                      <input
                        type="checkbox"
                        checked={backupConfig.includeAttachments}
                        onChange={(e) => handleBackupConfigChange('includeAttachments', e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">บีบอัดไฟล์</span>
                      <input
                        type="checkbox"
                        checked={backupConfig.compression}
                        onChange={(e) => handleBackupConfigChange('compression', e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">เข้ารหัสไฟล์</span>
                      <input
                        type="checkbox"
                        checked={backupConfig.encryption}
                        onChange={(e) => handleBackupConfigChange('encryption', e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manual Backup/Restore */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">การสำรองข้อมูลด้วยตนเอง</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">สร้างไฟล์สำรอง</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      สร้างไฟล์สำรองข้อมูลโครงการทั้งหมด
                    </p>
                    <button
                      onClick={createBackup}
                      disabled={isExporting}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isExporting && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>{isExporting ? 'กำลังสร้าง...' : 'สร้างไฟล์สำรอง'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">คืนค่าข้อมูล</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      คืนค่าข้อมูลจากไฟล์สำรองที่สร้างไว้
                    </p>
                    <button
                      onClick={() => alert('เลือกไฟล์สำรองเพื่อคืนค่า')}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      คืนค่าข้อมูล
                    </button>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h6 className="font-medium text-yellow-800">คำเตือน</h6>
                        <p className="text-sm text-yellow-700">
                          การคืนค่าข้อมูลจะเขียนทับข้อมูลปัจจุบันทั้งหมด
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
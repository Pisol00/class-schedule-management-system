// components/project/settings/AdvancedSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdvancedSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface SystemConfig {
  maintenanceMode: boolean;
  debugLogging: boolean;
  performanceMonitoring: boolean;
  cacheEnabled: boolean;
  compressionEnabled: boolean;
  autoOptimization: boolean;
  maxConcurrentUsers: number;
  sessionCleanupInterval: number; // minutes
  databaseCleanupEnabled: boolean;
  enableExperimentalFeatures: boolean;
}

interface PerformanceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  activeUsers: number;
  responseTime: number;
  uptime: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
}

interface DatabaseStats {
  totalSize: string;
  tableCount: number;
  recordCount: number;
  indexCount: number;
  lastOptimized: string;
  fragmentationLevel: number;
}

const defaultSystemConfig: SystemConfig = {
  maintenanceMode: false,
  debugLogging: false,
  performanceMonitoring: true,
  cacheEnabled: true,
  compressionEnabled: true,
  autoOptimization: false,
  maxConcurrentUsers: 100,
  sessionCleanupInterval: 30,
  databaseCleanupEnabled: true,
  enableExperimentalFeatures: false
};

const mockPerformanceMetrics: PerformanceMetrics = {
  cpuUsage: 23,
  memoryUsage: 67,
  diskUsage: 45,
  activeUsers: 28,
  responseTime: 145,
  uptime: '15 วัน 7 ชั่วโมง 32 นาที'
};

const mockSystemLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2024-03-15 14:30:25',
    level: 'info',
    message: 'ระบบเริ่มต้นการทำงานเรียบร้อย',
    source: 'System'
  },
  {
    id: '2',
    timestamp: '2024-03-15 14:25:12',
    level: 'warning',
    message: 'การใช้งาน Memory เกิน 60%',
    source: 'Performance Monitor'
  },
  {
    id: '3',
    timestamp: '2024-03-15 14:20:45',
    level: 'error',
    message: 'การเชื่อมต่อฐานข้อมูลล้มเหลวชั่วคราว',
    source: 'Database'
  },
  {
    id: '4',
    timestamp: '2024-03-15 14:15:33',
    level: 'debug',
    message: 'Cache invalidation completed',
    source: 'Cache Manager'
  },
  {
    id: '5',
    timestamp: '2024-03-15 14:10:18',
    level: 'info',
    message: 'ทำการสำรองข้อมูลอัตโนมัติสำเร็จ',
    source: 'Backup Service'
  }
];

const mockDatabaseStats: DatabaseStats = {
  totalSize: '2.8 GB',
  tableCount: 47,
  recordCount: 245672,
  indexCount: 89,
  lastOptimized: '2024-03-10 02:30:00',
  fragmentationLevel: 12
};

export default function AdvancedSettings({ projectId, onUnsavedChanges }: AdvancedSettingsProps) {
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(defaultSystemConfig);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>(mockPerformanceMetrics);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(mockSystemLogs);
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats>(mockDatabaseStats);
  const [activeTab, setActiveTab] = useState('system');
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const hasChanges = JSON.stringify(systemConfig) !== JSON.stringify(defaultSystemConfig);
    onUnsavedChanges(hasChanges);
  }, [systemConfig, onUnsavedChanges]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        activeUsers: Math.max(0, prev.activeUsers + Math.floor((Math.random() - 0.5) * 6)),
        responseTime: Math.max(50, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleConfigChange = (field: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('บันทึกการตั้งค่าขั้นสูงสำเร็จ!');
      onUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  const optimizeDatabase = async () => {
    if (!confirm('ต้องการเพิ่มประสิทธิภาพฐานข้อมูลหรือไม่? กระบวนการนี้อาจใช้เวลาหลายนาที')) {
      return;
    }

    setIsOptimizing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setDatabaseStats(prev => ({
        ...prev,
        lastOptimized: new Date().toLocaleString('th-TH'),
        fragmentationLevel: Math.max(1, Math.floor(prev.fragmentationLevel / 2))
      }));
      alert('เพิ่มประสิทธิภาพฐานข้อมูลสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มประสิทธิภาพ');
    } finally {
      setIsOptimizing(false);
    }
  };

  const cleanupDatabase = async () => {
    if (!confirm('ต้องการทำความสะอาดฐานข้อมูลหรือไม่? กระบวนการนี้จะลบข้อมูลที่ไม่ใช้แล้ว')) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('ทำความสะอาดฐานข้อมูลสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการทำความสะอาด');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('ล้างแคชสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการล้างแคช');
    } finally {
      setIsLoading(false);
    }
  };

  const getLogLevelColor = (level: SystemLog['level']) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      case 'debug':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricColor = (value: number, threshold: number = 70) => {
    if (value > threshold) return 'text-red-600';
    if (value > threshold * 0.7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const tabs = [
    { id: 'system', label: 'ระบบ', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { id: 'performance', label: 'ประสิทธิภาพ', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'database', label: 'ฐานข้อมูล', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
    { id: 'logs', label: 'บันทึกระบบ', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'danger', label: 'เขตอันตราย', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">การตั้งค่าขั้นสูง</h2>
        <p className="text-gray-600">การตั้งค่าสำหรับผู้ดูแลระบบและการจัดการขั้นสูง</p>
      </div>

      {/* Warning */}
      <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <div>
            <h3 className="font-semibold text-red-800">คำเตือนสำคัญ</h3>
            <p className="text-red-700 mt-1">
              การเปลี่ยนแปลงการตั้งค่าในหน้านี้อาจส่งผลต่อการทำงานของระบบทั้งหมด
              กรุณาปรึกษาผู้ดูแลระบบก่อนทำการเปลี่ยนแปลง และสำรองข้อมูลก่อนใช้งาน
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'system' && (
          <div className="space-y-8">
            {/* System Status */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">สถานะระบบ</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ผู้ใช้ออนไลน์</span>
                    <span className="text-2xl font-bold text-blue-600">{performanceMetrics.activeUsers}</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">เวลาตอบสนอง</span>
                    <span className={`text-2xl font-bold ${getMetricColor(performanceMetrics.responseTime, 300)}`}>
                      {performanceMetrics.responseTime}ms
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">เวลาทำงาน</span>
                    <span className="text-sm font-medium text-green-600">{performanceMetrics.uptime}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* System Configuration */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การกำหนดค่าระบบ</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">โหมดบำรุงรักษา</h4>
                    <p className="text-sm text-gray-600">ปิดการเข้าถึงระบบชั่วคราวเพื่อบำรุงรักษา</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.maintenanceMode}
                      onChange={(e) => handleConfigChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การบันทึกการดีบัก</h4>
                    <p className="text-sm text-gray-600">เปิดใช้งานการบันทึกข้อมูลสำหรับการแก้ไขข้อผิดพลาด</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.debugLogging}
                      onChange={(e) => handleConfigChange('debugLogging', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การเฝ้าระวังประสิทธิภาพ</h4>
                    <p className="text-sm text-gray-600">ตรวจสอบและบันทึกข้อมูลประสิทธิภาพของระบบ</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.performanceMonitoring}
                      onChange={(e) => handleConfigChange('performanceMonitoring', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">ฟีเจอร์ทดลอง</h4>
                    <p className="text-sm text-gray-600">เปิดใช้งานฟีเจอร์ที่อยู่ในระหว่างการพัฒนา</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.enableExperimentalFeatures}
                      onChange={(e) => handleConfigChange('enableExperimentalFeatures', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวนผู้ใช้ออนไลน์สูงสุด
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={systemConfig.maxConcurrentUsers}
                    onChange={(e) => handleConfigChange('maxConcurrentUsers', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ความถี่ในการล้างเซสชัน (นาที)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={systemConfig.sessionCleanupInterval}
                    onChange={(e) => handleConfigChange('sessionCleanupInterval', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            {/* Real-time Metrics */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การใช้งานระบบแบบเรียลไทม์</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  { label: 'CPU', value: performanceMetrics.cpuUsage, unit: '%', color: getMetricColor(performanceMetrics.cpuUsage) },
                  { label: 'Memory', value: performanceMetrics.memoryUsage, unit: '%', color: getMetricColor(performanceMetrics.memoryUsage) },
                  { label: 'Disk', value: performanceMetrics.diskUsage, unit: '%', color: getMetricColor(performanceMetrics.diskUsage) },
                  { label: 'Response', value: performanceMetrics.responseTime, unit: 'ms', color: getMetricColor(performanceMetrics.responseTime, 300) }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <span className={`text-lg font-bold ${metric.color}`}>
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          metric.value > 70 ? 'bg-red-500' :
                          metric.value > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(metric.value, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Performance Settings */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การตั้งค่าประสิทธิภาพ</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">เปิดใช้งานแคช</h4>
                    <p className="text-sm text-gray-600">ใช้แคชเพื่อเพิ่มความเร็วในการเข้าถึงข้อมูล</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.cacheEnabled}
                      onChange={(e) => handleConfigChange('cacheEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การบีบอัดข้อมูล</h4>
                    <p className="text-sm text-gray-600">บีบอัดข้อมูลเพื่อลดการใช้แบนด์วิดธ์</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.compressionEnabled}
                      onChange={(e) => handleConfigChange('compressionEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">เพิ่มประสิทธิภาพอัตโนมัติ</h4>
                    <p className="text-sm text-gray-600">ปรับปรุงประสิทธิภาพระบบโดยอัตโนมัติ</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.autoOptimization}
                      onChange={(e) => handleConfigChange('autoOptimization', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={clearCache}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  ล้างแคช
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-8">
            {/* Database Statistics */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">สถิติฐานข้อมูล</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">ขนาดฐานข้อมูล</h4>
                  <p className="text-2xl font-bold text-blue-600">{databaseStats.totalSize}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">จำนวนตาราง</h4>
                  <p className="text-2xl font-bold text-green-600">{databaseStats.tableCount}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">จำนวนระเบียน</h4>
                  <p className="text-2xl font-bold text-purple-600">{databaseStats.recordCount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">จำนวนดัชนี</h4>
                  <p className="text-2xl font-bold text-orange-600">{databaseStats.indexCount}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">การกระจายข้อมูล</h4>
                  <p className={`text-2xl font-bold ${getMetricColor(databaseStats.fragmentationLevel, 20)}`}>
                    {databaseStats.fragmentationLevel}%
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm text-gray-600 mb-1">เพิ่มประสิทธิภาพล่าสุด</h4>
                  <p className="text-sm text-gray-900">{databaseStats.lastOptimized}</p>
                </div>
              </div>
            </section>

            {/* Database Management */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การจัดการฐานข้อมูล</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">เพิ่มประสิทธิภาพฐานข้อมูล</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    ปรับปรุงดัชนีและลดการกระจายข้อมูลเพื่อเพิ่มประสิทธิภาพ
                  </p>
                  <button
                    onClick={optimizeDatabase}
                    disabled={isOptimizing}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isOptimizing && (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{isOptimizing ? 'กำลังเพิ่มประสิทธิภาพ...' : 'เพิ่มประสิทธิภาพ'}</span>
                  </button>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">ทำความสะอาดฐานข้อมูล</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    ลบข้อมูลที่ไม่ใช้และปรับปรุงโครงสร้างฐานข้อมูล
                  </p>
                  <button
                    onClick={cleanupDatabase}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    ทำความสะอาด
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">ทำความสะอาดอัตโนมัติ</h4>
                    <p className="text-sm text-gray-600">ทำความสะอาดฐานข้อมูลโดยอัตโนมัติตามกำหนดเวลา</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.databaseCleanupEnabled}
                      onChange={(e) => handleConfigChange('databaseCleanupEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-8">
            {/* System Logs */}
            <section className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">บันทึกระบบ</h3>
                <button
                  onClick={() => alert('ล้างบันทึกระบบเก่า')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  ล้างบันทึกเก่า
                </button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  {systemLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-3">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLogLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{log.message}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{log.timestamp}</span>
                            <span>•</span>
                            <span>{log.source}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'danger' && (
          <div className="space-y-8">
            {/* Danger Zone */}
            <section className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-6">เขตอันตราย</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">รีเซ็ตการตั้งค่าระบบ</h4>
                  <p className="text-sm text-red-600 mb-4">
                    คืนค่าการตั้งค่าระบบทั้งหมดเป็นค่าเริ่มต้น (ไม่สามารถยกเลิกได้)
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('คุณแน่ใจหรือไม่ที่จะรีเซ็ตการตั้งค่าระบบ? การกระทำนี้ไม่สามารถยกเลิกได้')) {
                        setSystemConfig(defaultSystemConfig);
                        alert('รีเซ็ตการตั้งค่าระบบแล้ว');
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    รีเซ็ตการตั้งค่า
                  </button>
                </div>

                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">ล้างข้อมูลระบบ</h4>
                  <p className="text-sm text-red-600 mb-4">
                    ลบข้อมูลระบบทั้งหมดและเริ่มต้นใหม่ (ไม่สามารถกู้คืนได้)
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('คุณแน่ใจหรือไม่ที่จะล้างข้อมูลระบบ? ข้อมูลทั้งหมดจะหายไปถาวร')) {
                        if (confirm('คำเตือนสุดท้าย! การกระทำนี้จะลบข้อมูลทั้งหมดและไม่สามารถกู้คืนได้')) {
                          alert('ล้างข้อมูลระบบ (การทำงานจริงจะถูกปิดการใช้งาน)');
                        }
                      }
                    }}
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                  >
                    ล้างข้อมูลระบบ
                  </button>
                </div>

                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">ลบโครงการ</h4>
                  <p className="text-sm text-red-600 mb-4">
                    ลบโครงการนี้ออกจากระบบถาวร รวมทั้งข้อมูลและการตั้งค่าทั้งหมด
                  </p>
                  <button
                    onClick={() => {
                      if (confirm(`คุณแน่ใจหรือไม่ที่จะลบโครงการ ${projectId}? การกระทำนี้ไม่สามารถยกเลิกได้`)) {
                        if (confirm('คำเตือนสุดท้าย! โครงการและข้อมูลทั้งหมดจะถูกลบถาวร')) {
                          alert('ลบโครงการ (การทำงานจริงจะถูกปิดการใช้งาน)');
                        }
                      }
                    }}
                    className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
                  >
                    ลบโครงการ
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
        <button
          type="button"
          onClick={() => setSystemConfig(defaultSystemConfig)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          รีเซ็ต
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
        >
          {isLoading && (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>
    </div>
  );
}
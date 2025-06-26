// components/project/settings/AccessControlSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AccessControlSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
  isDefault: boolean;
}

interface SecuritySettings {
  requireTwoFactor: boolean;
  enforceStrongPasswords: boolean;
  enableActivityLogging: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  requireEmailVerification: boolean;
  allowGuestAccess: boolean;
  enableApiAccess: boolean;
  auditLogRetention: number;
}

const defaultRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'ผู้ดูแลระบบ',
    description: 'เข้าถึงและจัดการระบบทั้งหมด',
    permissions: ['system.admin', 'project.manage', 'user.manage', 'settings.modify'],
    userCount: 2,
    color: 'red',
    isDefault: true
  },
  {
    id: 'coordinator',
    name: 'ผู้ประสานงาน',
    description: 'จัดการโครงการและอนุมัติตาราง',
    permissions: ['project.manage', 'schedule.approve', 'report.view', 'user.invite'],
    userCount: 5,
    color: 'blue',
    isDefault: true
  },
  {
    id: 'instructor',
    name: 'อาจารย์ผู้สอน',
    description: 'ดูตารางและจัดการข้อมูลส่วนตัว',
    permissions: ['schedule.view', 'profile.edit', 'request.submit'],
    userCount: 85,
    color: 'green',
    isDefault: true
  },
  {
    id: 'staff',
    name: 'เจ้าหน้าที่',
    description: 'จัดการข้อมูลและดูแลระบบ',
    permissions: ['schedule.view', 'room.manage', 'data.update', 'report.view'],
    userCount: 12,
    color: 'purple',
    isDefault: false
  }
];

const defaultSecuritySettings: SecuritySettings = {
  requireTwoFactor: true,
  enforceStrongPasswords: true,
  enableActivityLogging: true,
  sessionTimeout: 480,
  maxLoginAttempts: 5,
  requireEmailVerification: true,
  allowGuestAccess: false,
  enableApiAccess: true,
  auditLogRetention: 90
};

export default function AccessControlSettings({ projectId, onUnsavedChanges }: AccessControlSettingsProps) {
  const [roles, setRoles] = useState<UserRole[]>(defaultRoles);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(defaultSecuritySettings);
  const [activeTab, setActiveTab] = useState('roles');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasChanges = (
      JSON.stringify(roles) !== JSON.stringify(defaultRoles) ||
      JSON.stringify(securitySettings) !== JSON.stringify(defaultSecuritySettings)
    );
    onUnsavedChanges(hasChanges);
  }, [roles, securitySettings, onUnsavedChanges]);

  const handleSecuritySettingChange = (field: keyof SecuritySettings, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('บันทึกการตั้งค่าสิทธิ์การเข้าถึงสำเร็จ!');
      onUnsavedChanges(false);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'roles', label: 'บทบาทและสิทธิ์', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'security', label: 'ความปลอดภัย', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">สิทธิ์การเข้าถึง</h2>
        <p className="text-gray-600">จัดการสิทธิ์ บทบาท และความปลอดภัยของผู้ใช้งาน</p>
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
        {activeTab === 'roles' && (
          <div className="space-y-8">
            {/* Roles Overview */}
            <section className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">บทบาทในระบบ</h3>
                <button
                  onClick={() => alert('เพิ่มบทบาทใหม่')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>เพิ่มบทบาท</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${role.color}-500`}></div>
                          <h4 className="font-semibold text-gray-900">{role.name}</h4>
                          {role.isDefault && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              ค่าเริ่มต้น
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{role.userCount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">ผู้ใช้</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">สิทธิ์การใช้งาน</h5>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <span
                            key={permission}
                            className={`px-2 py-1 text-xs rounded-md bg-${role.color}-100 text-${role.color}-700`}
                          >
                            {permission.split('.').pop()}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">
                            +{role.permissions.length - 3} เพิ่มเติม
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button
                        onClick={() => alert(`ดูรายละเอียดบทบาท ${role.name}`)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        ดูรายละเอียด
                      </button>
                      {!role.isDefault && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => alert(`แก้ไขบทบาท ${role.name}`)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => confirm(`ลบบทบาท ${role.name}?`) && alert('ลบบทบาท')}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Permission Matrix */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">เมทริกซ์สิทธิ์การใช้งาน</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ฟังก์ชัน
                      </th>
                      {roles.map((role) => (
                        <th key={role.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'จัดการโครงการ', permission: 'project.manage' },
                      { name: 'อนุมัติตาราง', permission: 'schedule.approve' },
                      { name: 'ดูรายงาน', permission: 'report.view' },
                      { name: 'จัดการผู้ใช้', permission: 'user.manage' },
                      { name: 'ตั้งค่าระบบ', permission: 'settings.modify' }
                    ].map((func, index) => (
                      <tr key={func.permission} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {func.name}
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="px-6 py-4 whitespace-nowrap text-center">
                            {role.permissions.includes(func.permission) ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                              </svg>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Authentication Settings */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การยืนยันตัวตน</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การยืนยันตัวตนแบบสองขั้นตอน (2FA)</h4>
                    <p className="text-sm text-gray-600">เปิดใช้งาน 2FA สำหรับผู้ใช้ที่มีสิทธิ์สูง</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireTwoFactor}
                      onChange={(e) => handleSecuritySettingChange('requireTwoFactor', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">บังคับใช้รหัสผ่านที่รัดกุม</h4>
                    <p className="text-sm text-gray-600">กำหนดให้ใช้รหัสผ่านที่มีความซับซ้อนสูง</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.enforceStrongPasswords}
                      onChange={(e) => handleSecuritySettingChange('enforceStrongPasswords', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">การบันทึกกิจกรรม</h4>
                    <p className="text-sm text-gray-600">บันทึกการเข้าถึงและการเปลี่ยนแปลงข้อมูล</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.enableActivityLogging}
                      onChange={(e) => handleSecuritySettingChange('enableActivityLogging', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Session Settings */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การจัดการเซสชัน</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เวลาหมดอายุเซสชัน (นาที)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="1440"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวนครั้งการเข้าสู่ระบบที่ผิดสูงสุด
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ระยะเวลาเก็บ Audit Log (วัน)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={securitySettings.auditLogRetention}
                    onChange={(e) => handleSecuritySettingChange('auditLogRetention', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* API Access */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">การเข้าถึง API</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">เปิดใช้งาน API Access</h4>
                    <p className="text-sm text-gray-600">อนุญาตให้เข้าถึงผ่าน REST API</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.enableApiAccess}
                      onChange={(e) => handleSecuritySettingChange('enableApiAccess', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {securitySettings.enableApiAccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <h4 className="font-medium text-blue-900 mb-2">API Keys</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <span className="font-mono text-sm">sk_live_********************</span>
                          <div className="text-xs text-gray-500">สร้างเมื่อ: 15 มี.ค. 2567</div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          เพิกถอน
                        </button>
                      </div>
                      <button
                        onClick={() => alert('สร้าง API Key ใหม่')}
                        className="w-full p-3 border-2 border-dashed border-blue-300 rounded text-blue-600 hover:border-blue-400 hover:text-blue-700"
                      >
                        + สร้าง API Key ใหม่
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
        <button
          type="button"
          onClick={() => {
            setRoles(defaultRoles);
            setSecuritySettings(defaultSecuritySettings);
          }}
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
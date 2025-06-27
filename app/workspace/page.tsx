'use client';
import React, { useState } from 'react';
import { Plus, Users, Settings, ChevronRight, Building2, GraduationCap, Calendar, Crown, Shield, User, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Header/Navigation';
import Footer from '@/components/layout/Footer';

const WorkspaceSelector = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchMember, setSearchMember] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: ''
  });

  // Mock data สำหรับ member list
  const [availableMembers] = useState([
    { id: 1, name: 'ดร.สมชาย ใจดี', email: 'somchai@kmitl.ac.th', role: 'อาจารย์', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 2, name: 'ดร.สมหญิง ใจงาม', email: 'somying@kmitl.ac.th', role: 'อาจารย์', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 3, name: 'นายพิศลย์ อุตตาลกาญจนา', email: 'pison@student.kmitl.ac.th', role: 'นักศึกษา', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 4, name: 'นางสาวภัทรภร จิตต์ปราณี', email: 'pattaraporn@student.kmitl.ac.th', role: 'นักศึกษา', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 5, name: 'ผศ.ดร.ธราวิเชษฐ์ ธิติจรูญโรจน์', email: 'tharawichet@kmitl.ac.th', role: 'อาจารย์', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 6, name: 'ดร.ภัทรภร วัฒนาชีพ', email: 'pattaraporn.w@kmitl.ac.th', role: 'อาจารย์', department: 'วิศวกรรมคอมพิวเตอร์' },
    { id: 7, name: 'นายจอห์น สมิธ', email: 'john.smith@kmitl.ac.th', role: 'เจ้าหน้าที่', department: 'ฝ่ายวิชาการ' },
    { id: 8, name: 'นางสาวเจน โดว์', email: 'jane.doe@kmitl.ac.th', role: 'เจ้าหน้าที่', department: 'ฝ่ายวิชาการ' },
  ]);

  // ข้อมูล workspace ตัวอย่าง
  const [workspaces] = useState([
    {
      id: 1,
      name: 'คณะวิศวกรรมศาสตร์',
      description: 'คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
      role: 'Owner',
      memberCount: 45,
      projectCount: 3,
      lastActive: '2 ชั่วโมงที่แล้ว',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'คณะครุศาสตร์อุตสาหกรรม',
      description: 'คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
      role: 'Admin',
      memberCount: 32,
      projectCount: 2,
      lastActive: '1 วันที่แล้ว',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'คณะวิทยาศาสตร์',
      description: 'คณะวิทยาศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
      role: 'Staff',
      memberCount: 28,
      projectCount: 4,
      lastActive: '3 วันที่แล้ว',
      color: 'bg-purple-500'
    }
  ]);

  // Filter members based on search
  const filteredMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    member.email.toLowerCase().includes(searchMember.toLowerCase()) ||
    member.department.toLowerCase().includes(searchMember.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Owner': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'Admin': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'Staff': return <User className="w-4 h-4 text-green-500" />;
      case 'Viewer': return <Eye className="w-4 h-4 text-gray-500" />;
      default: return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Owner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Staff': return 'bg-green-100 text-green-800 border-green-200';
      case 'Viewer': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateWorkspace = () => {
    if (newWorkspace.name.trim()) {
      console.log('สร้าง Workspace:', newWorkspace);
      console.log('Selected Members:', selectedMembers);
      setShowCreateModal(false);
      setCurrentStep(1);
      setNewWorkspace({ name: '', description: '' });
      setSelectedMembers([]);
      setSearchMember('');
    }
  };

  const handleMemberToggle = (member) => {
    setSelectedMembers(prev => {
      const isSelected = prev.find(m => m.id === member.id);
      if (isSelected) {
        return prev.filter(m => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setCurrentStep(1);
    setNewWorkspace({ name: '', description: '' });
    setSelectedMembers([]);
    setSearchMember('');
  };

  const handleSelectWorkspace = (workspace) => {
    console.log('เลือก Workspace:', workspace);
    // นี่คือจุดที่จะไปยังหน้า Project Selection หรือ Dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ระบบจัดตารางเรียน-สอน</h1>
                <p className="text-sm text-gray-500">เลือก Workspace เพื่อเริ่มต้นการทำงาน</p>
              </div>
            </div>
            
            {/* Navigation */}
            <Navigation />
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">นายพิศลย์ อุตตาลกาญจนา</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">เลือก Workspace</h2>
          <p className="text-gray-600">เลือก Workspace ที่คุณต้องการเข้าทำงาน หรือสร้าง Workspace ใหม่</p>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Create New Workspace Card */}
          <div
            onClick={() => setShowCreateModal(true)}
            className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[280px]"
          >
            <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 mb-2 transition-colors">
              สร้าง Workspace ใหม่
            </h3>
            <p className="text-sm text-gray-500 text-center">
              สร้าง Workspace สำหรับคณะหรือสถาบันของคุณ
            </p>
          </div>

          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              onClick={() => handleSelectWorkspace(workspace)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${workspace.color} rounded-lg flex items-center justify-center`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-md border text-xs font-medium flex items-center space-x-1 ${getRoleColor(workspace.role)}`}>
                  {getRoleIcon(workspace.role)}
                  <span>{workspace.role}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {workspace.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {workspace.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>สมาชิก</span>
                  </div>
                  <span className="font-medium text-gray-900">{workspace.memberCount} คน</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <GraduationCap className="w-4 h-4" />
                    <span>โปรเจ็กต์</span>
                  </div>
                  <span className="font-medium text-gray-900">{workspace.projectCount} ภาคเรียน</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">อัปเดตล่าสุด {workspace.lastActive}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Workspace Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-gray-900">สร้าง Workspace ใหม่</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {currentStep === 1 ? 'ขั้นตอนที่ 1: ข้อมูลพื้นฐาน' : 'ขั้นตอนที่ 2: เลือกสมาชิก'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="text-sm font-medium">ข้อมูลพื้นฐาน</span>
                </div>
                <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-medium">เลือกสมาชิก</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              {currentStep === 1 ? (
                /* Step 1: Basic Information */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ Workspace <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newWorkspace.name}
                      onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                      placeholder="เช่น คณะวิศวกรรมศาสตร์"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คำอธิบาย
                    </label>
                    <textarea
                      value={newWorkspace.description}
                      onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                      placeholder="คำอธิบายเกี่ยวกับคณะหรือสถาบัน"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              ) : (
                /* Step 2: Select Members */
                <div className="space-y-4">
                  {/* Search Box */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ค้นหาสมาชิก
                    </label>
                    <input
                      type="text"
                      value={searchMember}
                      onChange={(e) => setSearchMember(e.target.value)}
                      placeholder="ค้นหาด้วยชื่อ, อีเมล หรือหน่วยงาน..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Selected Members Count */}
                  {selectedMembers.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        เลือกแล้ว {selectedMembers.length} คน
                      </p>
                    </div>
                  )}

                  {/* Members List */}
                  <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                    {filteredMembers.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        ไม่พบสมาชิกที่ค้นหา
                      </div>
                    ) : (
                      filteredMembers.map((member) => {
                        const isSelected = selectedMembers.find(m => m.id === member.id);
                        return (
                          <div
                            key={member.id}
                            onClick={() => handleMemberToggle(member)}
                            className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                              isSelected ? 'bg-blue-50 border-blue-200' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={!!isSelected}
                                onChange={() => handleMemberToggle(member)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                                  <span className={`px-2 py-1 text-xs rounded-md ${
                                    member.role === 'อาจารย์' 
                                      ? 'bg-green-100 text-green-800' 
                                      : member.role === 'นักศึกษา'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {member.role}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">{member.email}</p>
                                <p className="text-xs text-gray-500">{member.department}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between space-x-3 p-6 border-t bg-gray-50">
              {currentStep === 1 ? (
                <>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!newWorkspace.name.trim()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    ถัดไป
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={handleCreateWorkspace}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    สร้าง Workspace
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkspaceSelector;
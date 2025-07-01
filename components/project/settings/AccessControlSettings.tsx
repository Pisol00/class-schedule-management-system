'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Users, 
  Crown, 
  Settings, 
  GraduationCap, 
  Trash2, 
  Check, 
  UserPlus, 
  Shield,
  Eye,
  Edit,
  FileText,
  BarChart3,
  UserCheck,
  Mail,
  Calendar,
  Clock,
  Wifi,
  WifiOff,
  Loader2,
  X
} from 'lucide-react';

interface AccessControlSettingsProps {
  projectId: string;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'staff' | 'instructor';
  avatar?: string;
  joinedAt: Date;
  lastActive: Date;
  isOnline: boolean;
}

interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department?: string;
}

const roleConfig = {
  owner: {
    name: 'เจ้าของโปรเจค',
    description: 'มีสิทธิ์เต็มในการจัดการโปรเจค',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
    textColor: 'text-purple-700',
    permissions: [
      { name: 'จัดการสมาชิก', icon: Users },
      { name: 'แก้ไขตั้งค่า', icon: Settings },
      { name: 'ลบโปรเจค', icon: Trash2 },
      { name: 'จัดการตาราง', icon: BarChart3 }
    ],
    icon: Crown
  },
  staff: {
    name: 'เจ้าหน้าที่',
    description: 'จัดการข้อมูลและดูแลระบบ',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50',
    textColor: 'text-blue-700',
    permissions: [
      { name: 'จัดการตาราง', icon: BarChart3 },
      { name: 'ดูรายงาน', icon: FileText },
      { name: 'แก้ไขข้อมูล', icon: Edit }
    ],
    icon: Settings
  },
  instructor: {
    name: 'อาจารย์',
    description: 'ดูตารางสอนและจัดการข้อมูลส่วนตัว',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    textColor: 'text-green-700',
    permissions: [
      { name: 'ดูตารางสอนของตนเอง', icon: Eye },
    ],
    icon: GraduationCap
  }
};

const mockMembers: ProjectMember[] = [
  {
    id: '1',
    name: 'อาจารย์สมชาย ใจดี',
    email: 'somchai@university.ac.th',
    role: 'owner',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date(),
    isOnline: true
  },
  {
    id: '2',
    name: 'คุณสมศรี รักงาน',
    email: 'somsri@university.ac.th',
    role: 'staff',
    joinedAt: new Date('2024-02-01'),
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    isOnline: false
  },
  {
    id: '3',
    name: 'อาจารย์วิชัย สอนดี',
    email: 'wichai@university.ac.th',
    role: 'instructor',
    joinedAt: new Date('2024-02-10'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isOnline: true
  },
  {
    id: '4',
    name: 'อาจารย์มาลี เก่งมาก',
    email: 'malee@university.ac.th',
    role: 'instructor',
    joinedAt: new Date('2024-02-15'),
    lastActive: new Date(Date.now() - 5 * 60 * 1000),
    isOnline: true
  }
];

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

const mockSearchResults: UserSearchResult[] = [
  {
    id: '5',
    name: 'อาจารย์ประยุทธ นักคิด',
    email: 'prayuth@university.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์'
  },
  {
    id: '6',
    name: 'คุณจิรา ช่วยงาน',
    email: 'jira@university.ac.th',
    department: 'งานทะเบียน'
  },
  {
    id: '7',
    name: 'อาจารย์สุเมธ ฉลาด',
    email: 'sumet@university.ac.th',
    department: 'วิทยาการคอมพิวเตอร์'
  }
];

// Modal Component สำหรับ Add Member
function AddMemberModal({ 
  isOpen, 
  onClose, 
  onAddMember, 
  selectedRole, 
  setSelectedRole,
  searchQuery, 
  setSearchQuery,
  searchResults,
  isSearching 
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (user: UserSearchResult) => void;
  selectedRole: 'staff' | 'instructor';
  setSelectedRole: (role: 'staff' | 'instructor') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: UserSearchResult[];
  isSearching: boolean;
}) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        style={{ 
          zIndex: 2147483647,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200"
          style={{ zIndex: 2147483647 }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">เพิ่มสมาชิกใหม่</h3>
                  <p className="text-blue-100 text-sm">เชิญสมาชิกใหม่เข้าร่วมโปรเจค</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Search Section */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  ค้นหาผู้ใช้
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อหรืออีเมล..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 border-2 border-slate-200/60 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md"
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-4">
                      <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  เลือกบทบาท
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['staff', 'instructor'] as const).map((roleKey) => {
                    const config = roleConfig[roleKey];
                    const RoleIcon = config.icon;
                    const isSelected = selectedRole === roleKey;

                    return (
                      <button
                        key={roleKey}
                        onClick={() => setSelectedRole(roleKey)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                          isSelected
                            ? 'border-blue-300 bg-blue-50/80 shadow-md'
                            : 'border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/40'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isSelected ? config.bgColor : 'bg-slate-100'
                          }`}>
                            <RoleIcon className={`w-5 h-5 ${isSelected ? config.textColor : 'text-slate-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-slate-800">{config.name}</h4>
                              {isSelected && (
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">{config.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    ผลการค้นหา ({searchResults.length} รายการ)
                  </label>
                  <div className="bg-slate-50/80 backdrop-blur-lg border border-slate-200/60 rounded-xl max-h-60 overflow-y-auto">
                    {searchResults.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="p-4 hover:bg-white/80 cursor-pointer border-b border-slate-200/50 last:border-b-0 transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onAddMember(user)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800">{user.name}</p>
                            <div className="flex items-center space-x-1 text-sm text-slate-600 mb-1">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            {user.department && (
                              <p className="text-xs text-slate-500 bg-white/80 px-2 py-1 rounded-lg inline-block">
                                {user.department}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-3 py-1 rounded-lg text-xs font-medium ${roleConfig[selectedRole].bgColor} ${roleConfig[selectedRole].textColor}`}>
                              {roleConfig[selectedRole].name}
                            </div>
                            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                              <UserPlus className="w-4 h-4 text-blue-600" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">ไม่พบผู้ใช้ที่ค้นหา</h4>
                  <p className="text-sm text-slate-600">ลองค้นหาด้วยชื่อหรืออีเมลที่แตกต่างกัน</p>
                </div>
              )}

              {/* Guide */}
              {!searchQuery && (
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">เริ่มต้นการค้นหา</h4>
                      <p className="text-sm text-blue-700">
                        พิมพ์ชื่อหรืออีเมลของผู้ใช้ที่ต้องการเชิญเข้าร่วมโปรเจค
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                เลือกบทบาท: <span className="font-medium text-slate-800">{roleConfig[selectedRole].name}</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-300 font-medium cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default function AccessControlSettings({ projectId, onUnsavedChanges }: AccessControlSettingsProps) {
  const [members, setMembers] = useState<ProjectMember[]>(mockMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'staff' | 'instructor'>('staff');
  
  // Add Member Modal states
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  useEffect(() => {
    const hasChanges = JSON.stringify(members) !== JSON.stringify(mockMembers);
    onUnsavedChanges(hasChanges);
  }, [members, onUnsavedChanges]);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filteredResults = mockSearchResults.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Modal control functions
  const openAddMemberModal = () => {
    setShowAddMemberModal(true);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedRole('staff');
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  const addMember = (user: UserSearchResult) => {
    const newMember: ProjectMember = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: selectedRole,
      joinedAt: new Date(),
      lastActive: new Date(),
      isOnline: false
    };

    setMembers(prev => [...prev, newMember]);
    closeAddMemberModal();
  };

  const removeMember = (memberId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบสมาชิกคนนี้ออกจากโปรเจค?')) {
      setMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const updateMemberRole = (memberId: string, newRole: 'staff' | 'instructor') => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    return `${days} วันที่แล้ว`;
  };

  const roleStats = members.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        <FloatingElements />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, staggerChildren: 0.1 }}
          >
            {/* Total Members */}
            <motion.div 
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">สมาชิกทั้งหมด</p>
                  <p className="text-3xl font-bold text-slate-800">{members.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Role Stats */}
            {Object.entries(roleConfig).map(([roleKey, config], index) => {
              const IconComponent = config.icon;
              return (
                <motion.div
                  key={roleKey}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <IconComponent className="w-4 h-4 text-slate-600" />
                        <p className="text-sm font-medium text-slate-600">{config.name}</p>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{roleStats[roleKey] || 0}</p>
                    </div>
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${config.color}`}>
                      <div className="w-4 h-4 bg-white/30 rounded"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Members List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl">
              <div className="p-6 border-b border-slate-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-800">รายชื่อสมาชิก</h3>
                  </div>
                  <button
                    onClick={openAddMemberModal}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg group cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>เพิ่มสมาชิกใหม่</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {members.map((member, index) => {
                  const RoleIcon = roleConfig[member.role].icon;
                  return (
                    <motion.div
                      key={member.id}
                      className="bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center text-white font-bold">
                              {member.name.charAt(0)}
                            </div>
                            {member.isOnline ? (
                              <Wifi className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full p-0.5" />
                            ) : (
                              <WifiOff className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-400 bg-white rounded-full p-0.5" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-bold text-slate-800">{member.name}</h4>
                              {member.role === 'owner' && (
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                  <Crown className="w-3 h-3" />
                                  <span>เจ้าของ</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-slate-600">
                              <Mail className="w-3 h-3" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>เข้าร่วม {member.joinedAt.toLocaleDateString('th-TH')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatLastActive(member.lastActive)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-lg text-sm font-medium ${roleConfig[member.role].bgColor} ${roleConfig[member.role].textColor} flex items-center space-x-1`}>
                            <RoleIcon className="w-3 h-3" />
                            <span>{roleConfig[member.role].name}</span>
                          </div>

                          {member.role !== 'owner' && (
                            <div className="flex items-center space-x-2">
                              <select
                                value={member.role}
                                onChange={(e) => updateMemberRole(member.id, e.target.value as 'staff' | 'instructor')}
                                className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                              >
                                <option value="instructor">อาจารย์</option>
                                <option value="staff">เจ้าหน้าที่</option>
                              </select>

                              <button
                                onClick={() => removeMember(member.id)}
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                                title="ลบสมาชิก"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Permissions Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">สิทธิ์ของแต่ละบทบาท</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(roleConfig).map(([roleKey, config], index) => {
                  const RoleIcon = config.icon;
                  return (
                    <motion.div
                      key={roleKey}
                      className="bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className={`bg-gradient-to-r ${config.color} p-4 text-white`}>
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-6 h-6" />
                          <div>
                            <h4 className="font-bold">{config.name}</h4>
                            <p className="text-white/80 text-sm">{config.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-2">
                          {config.permissions.map((permission, permIndex) => {
                            const PermissionIcon = permission.icon;
                            return (
                              <div key={permIndex} className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <PermissionIcon className="w-3 h-3 text-slate-500" />
                                <span className="text-sm text-slate-700 font-medium">{permission.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Member Modal using Portal */}
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={closeAddMemberModal}
        onAddMember={addMember}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
      />
    </div>
    </>
  );
}
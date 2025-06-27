'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Building, 
  Users, 
  Monitor, 
  Wifi,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Wrench,
  Camera,
  Volume2,
  Laptop,
  Projector
} from 'lucide-react';

// Types
interface Room {
  id: string;
  code: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium' | 'library';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  equipment: Equipment[];
  features: string[];
  description?: string;
  area: number; // square meters
  location: string;
  bookings: Booking[];
  maintenanceSchedule?: string;
  createdAt: string;
  updatedAt: string;
}

interface Equipment {
  id: string;
  name: string;
  type: 'audio' | 'visual' | 'computer' | 'furniture' | 'other';
  quantity: number;
  status: 'working' | 'broken' | 'maintenance';
}

interface Booking {
  id: string;
  subjectCode: string;
  subjectName: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  studentsCount: number;
  type: 'lecture' | 'lab' | 'exam' | 'meeting';
}

interface RoomFormData {
  code: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium' | 'library';
  area: number;
  location: string;
  description?: string;
  features: string[];
  equipment: Equipment[];
}

// Mock data
const mockRooms: Room[] = [
  {
    id: '1',
    code: 'CS-301',
    name: 'ห้องคอมพิวเตอร์ 1',
    building: 'อาคารวิทยาศาสตร์',
    floor: 3,
    capacity: 50,
    type: 'lab',
    status: 'available',
    equipment: [
      { id: '1', name: 'คอมพิวเตอร์', type: 'computer', quantity: 50, status: 'working' },
      { id: '2', name: 'โปรเจคเตอร์', type: 'visual', quantity: 1, status: 'working' },
      { id: '3', name: 'เครื่องเสียง', type: 'audio', quantity: 1, status: 'working' }
    ],
    features: ['Wi-Fi', 'เครื่องปรับอากาศ', 'กล้องวงจรปิด'],
    area: 80,
    location: 'ชั้น 3 อาคารวิทยาศาสตร์ ห้อง 301',
    bookings: [
      {
        id: '1',
        subjectCode: 'CS101',
        subjectName: 'Introduction to CS',
        instructor: 'ดร.สมชาย ใจดี',
        date: '2024-06-26',
        startTime: '09:00',
        endTime: '12:00',
        studentsCount: 45,
        type: 'lab'
      },
      {
        id: '2',
        subjectCode: 'CS201',
        subjectName: 'Data Structures',
        instructor: 'ผศ.ดร.วิชัย สมใจ',
        date: '2024-06-26',
        startTime: '13:00',
        endTime: '16:00',
        studentsCount: 38,
        type: 'lab'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20'
  },
  {
    id: '2',
    code: 'LE-201',
    name: 'ห้องบรรยาย A',
    building: 'อาคารเรียนรวม',
    floor: 2,
    capacity: 100,
    type: 'lecture',
    status: 'occupied',
    equipment: [
      { id: '4', name: 'โปรเจคเตอร์', type: 'visual', quantity: 2, status: 'working' },
      { id: '5', name: 'ไมโครโฟน', type: 'audio', quantity: 2, status: 'working' },
      { id: '6', name: 'กระดานไวท์บอร์ด', type: 'other', quantity: 2, status: 'working' }
    ],
    features: ['Wi-Fi', 'เครื่องปรับอากาศ', 'ระบบเสียง', 'กล้องวงจรปิด'],
    area: 120,
    location: 'ชั้น 2 อาคารเรียนรวม ห้อง 201',
    bookings: [
      {
        id: '3',
        subjectCode: 'MA101',
        subjectName: 'Mathematics for IT',
        instructor: 'ดร.สมชาย ใจดี',
        date: '2024-06-26',
        startTime: '08:00',
        endTime: '11:00',
        studentsCount: 85,
        type: 'lecture'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-06-25'
  },
  {
    id: '3',
    code: 'LAB-401',
    name: 'ห้องปฏิบัติการฟิสิกส์',
    building: 'อาคารวิทยาศาสตร์',
    floor: 4,
    capacity: 30,
    type: 'lab',
    status: 'maintenance',
    equipment: [
      { id: '7', name: 'อุปกรณ์ทดลอง', type: 'other', quantity: 15, status: 'working' },
      { id: '8', name: 'โปรเจคเตอร์', type: 'visual', quantity: 1, status: 'broken' },
      { id: '9', name: 'ตู้เก็บอุปกรณ์', type: 'furniture', quantity: 10, status: 'working' }
    ],
    features: ['ระบบระบายอากาศพิเศษ', 'ฝักบัวฉุกเฉิน', 'ตู้เก็บสารเคมี'],
    area: 60,
    location: 'ชั้น 4 อาคารวิทยาศาสตร์ ห้อง 401',
    bookings: [],
    maintenanceSchedule: 'ซ่อมแซมระบบไฟฟ้า คาดว่าจะเสร็จ 30 มิ.ย. 2567',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-22'
  },
  {
    id: '4',
    code: 'AUD-101',
    name: 'หอประชุมใหญ่',
    building: 'อาคารหอประชุม',
    floor: 1,
    capacity: 300,
    type: 'auditorium',
    status: 'available',
    equipment: [
      { id: '10', name: 'ระบบเสียงแบบใหญ่', type: 'audio', quantity: 1, status: 'working' },
      { id: '11', name: 'โปรเจคเตอร์ขนาดใหญ่', type: 'visual', quantity: 3, status: 'working' },
      { id: '12', name: 'ระบบไฟแสดง', type: 'other', quantity: 1, status: 'working' },
      { id: '13', name: 'กล้องถ่ายทอดสด', type: 'visual', quantity: 4, status: 'working' }
    ],
    features: ['ระบบเสียงขนาดใหญ่', 'ระบบไฟแสดง', 'ที่จอดรถ', 'ลิฟต์'],
    area: 400,
    location: 'ชั้น 1 อาคารหอประชุม',
    bookings: [
      {
        id: '4',
        subjectCode: 'EVENT',
        subjectName: 'พิธีปฐมนิเทศนักศึกษาใหม่',
        instructor: 'คณะกรรมการบริหาร',
        date: '2024-07-01',
        startTime: '09:00',
        endTime: '16:00',
        studentsCount: 250,
        type: 'meeting'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-06-15'
  }
];

const mockBuildings = [
  'อาคารวิทยาศาสตร์',
  'อาคารเรียนรวม',
  'อาคารหอประชุม',
  'อาคารเทคโนโลยี',
  'อาคารห้องสมุด'
];

const roomTypes = [
  { value: 'lecture', label: 'ห้องบรรยาย', color: 'bg-blue-100 text-blue-800', icon: Users },
  { value: 'lab', label: 'ห้องปฏิบัติการ', color: 'bg-green-100 text-green-800', icon: Monitor },
  { value: 'seminar', label: 'ห้องสัมมนา', color: 'bg-purple-100 text-purple-800', icon: Users },
  { value: 'auditorium', label: 'หอประชุม', color: 'bg-orange-100 text-orange-800', icon: Building },
  { value: 'library', label: 'ห้องสมุด', color: 'bg-indigo-100 text-indigo-800', icon: Building }
];

const equipmentTypes = [
  { value: 'audio', label: 'อุปกรณ์เสียง', icon: Volume2 },
  { value: 'visual', label: 'อุปกรณ์ภาพ', icon: Projector },
  { value: 'computer', label: 'คอมพิวเตอร์', icon: Laptop },
  { value: 'furniture', label: 'เฟอร์นิเจอร์', icon: Building },
  { value: 'other', label: 'อื่นๆ', icon: Building }
];

export default function RoomsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter and search logic
  useEffect(() => {
    let filtered = rooms;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Building filter
    if (selectedBuilding !== 'all') {
      filtered = filtered.filter(room => room.building === selectedBuilding);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(room => room.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(room => room.status === selectedStatus);
    }

    setFilteredRooms(filtered);
  }, [searchQuery, selectedBuilding, selectedType, selectedStatus, rooms]);

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setShowAddModal(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowDetailModal(true);
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบห้องนี้?')) {
      setRooms(prev => prev.filter(r => r.id !== roomId));
    }
  };

  const getRoomTypeInfo = (type: string) => {
    return roomTypes.find(t => t.value === type) || roomTypes[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'ว่าง';
      case 'occupied':
        return 'ใช้งาน';
      case 'maintenance':
        return 'ซ่อมบำรุง';
      case 'reserved':
        return 'จองแล้ว';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return CheckCircle;
      case 'occupied':
        return AlertCircle;
      case 'maintenance':
        return Wrench;
      case 'reserved':
        return XCircle;
      default:
        return CheckCircle;
    }
  };

  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const totalBookings = rooms.reduce((sum, room) => sum + room.bookings.length, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการห้องเรียน</h1>
            <p className="text-gray-600">
              จัดการข้อมูลห้องเรียน ห้องปฏิบัติการ และสถานที่จัดการเรียนการสอน
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'table' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                ตาราง
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                การ์ด
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              ตัวกรอง
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              นำเข้า CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              ส่งออก
            </button>
            <button
              onClick={handleAddRoom}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              เพิ่มห้อง
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ห้องทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ห้องว่าง</p>
                <p className="text-2xl font-bold text-gray-900">{availableRooms}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ห้องที่ใช้งาน</p>
                <p className="text-2xl font-bold text-gray-900">{occupiedRooms}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ความจุรวม</p>
                <p className="text-2xl font-bold text-gray-900">{totalCapacity.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาห้อง (รหัส, ชื่อ, อาคาร, สถานที่)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อาคาร
                  </label>
                  <select
                    value={selectedBuilding}
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {mockBuildings.map(building => (
                      <option key={building} value={building}>
                        {building}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทห้อง
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    {roomTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะ
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="available">ว่าง</option>
                    <option value="occupied">ใช้งาน</option>
                    <option value="maintenance">ซ่อมบำรุง</option>
                    <option value="reserved">จองแล้ว</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <RoomsTable 
          rooms={filteredRooms}
          onEdit={handleEditRoom}
          onView={handleViewRoom}
          onDelete={handleDeleteRoom}
          getRoomTypeInfo={getRoomTypeInfo}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getStatusIcon={getStatusIcon}
        />
      ) : (
        <RoomsGrid 
          rooms={filteredRooms}
          onEdit={handleEditRoom}
          onView={handleViewRoom}
          onDelete={handleDeleteRoom}
          getRoomTypeInfo={getRoomTypeInfo}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getStatusIcon={getStatusIcon}
        />
      )}

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ไม่พบห้อง
          </h3>
          <p className="text-gray-600 mb-4">
            ไม่พบห้องที่ตรงกับเงื่อนไขการค้นหา
          </p>
          <button
            onClick={handleAddRoom}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            เพิ่มห้องใหม่
          </button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <RoomFormModal
            room={selectedRoom}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedRoom(null);
            }}
            onSave={(roomData) => {
              if (selectedRoom) {
                // Edit existing room
                setRooms(prev => prev.map(r => 
                  r.id === selectedRoom.id 
                    ? { ...r, ...roomData, updatedAt: new Date().toISOString().split('T')[0] }
                    : r
                ));
              } else {
                // Add new room
                const newRoom: Room = {
                  ...roomData,
                  id: Date.now().toString(),
                  status: 'available',
                  bookings: [],
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0]
                };
                setRooms(prev => [...prev, newRoom]);
              }
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedRoom(null);
            }}
          />
        )}

        {showDetailModal && selectedRoom && (
          <RoomDetailModal
            room={selectedRoom}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedRoom(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Rooms Table Component
interface RoomsTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onView: (room: Room) => void;
  onDelete: (roomId: string) => void;
  getRoomTypeInfo: (type: string) => any;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  getStatusIcon: (status: string) => any;
}

function RoomsTable({ 
  rooms, onEdit, onView, onDelete, getRoomTypeInfo, 
  getStatusColor, getStatusLabel, getStatusIcon 
}: RoomsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ห้อง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ประเภท
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ความจุ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อุปกรณ์
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                การจอง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {rooms.map((room) => {
                const roomType = getRoomTypeInfo(room.type);
                const StatusIcon = getStatusIcon(room.status);
                
                return (
                  <motion.tr
                    key={room.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {room.code}
                        </div>
                        <div className="text-sm text-gray-600">
                          {room.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {room.building} ชั้น {room.floor}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roomType.color}`}>
                        <roomType.icon className="w-3 h-3" />
                        {roomType.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{room.capacity} คน</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {room.area} ตร.ม.
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Monitor className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{room.equipment.length} รายการ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{room.bookings.length} ครั้ง</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {getStatusLabel(room.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(room)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="ดูรายละเอียด"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(room)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(room.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Rooms Grid Component
function RoomsGrid({ 
  rooms, onEdit, onView, onDelete, getRoomTypeInfo, 
  getStatusColor, getStatusLabel, getStatusIcon 
}: RoomsTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {rooms.map((room) => {
          const roomType = getRoomTypeInfo(room.type);
          const StatusIcon = getStatusIcon(room.status);
          
          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{room.code}</h3>
                    <p className="text-sm text-gray-600">{room.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {room.building} ชั้น {room.floor}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    {getStatusLabel(room.status)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roomType.color}`}>
                      <roomType.icon className="w-3 h-3" />
                      {roomType.label}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {room.capacity} คน
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Monitor className="w-4 h-4" />
                      {room.equipment.length} อุปกรณ์
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {room.bookings.length} การจอง
                    </div>
                  </div>

                  {room.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {room.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{room.features.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(room)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="ดูรายละเอียด"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(room)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="แก้ไข"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(room.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Room Form Modal (simplified for brevity)
interface RoomFormModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RoomFormData) => void;
}

function RoomFormModal({ room, isOpen, onClose, onSave }: RoomFormModalProps) {
  const [formData, setFormData] = useState<RoomFormData>({
    code: '',
    name: '',
    building: 'อาคารวิทยาศาสตร์',
    floor: 1,
    capacity: 50,
    type: 'lecture',
    area: 80,
    location: '',
    description: '',
    features: [],
    equipment: []
  });

  useEffect(() => {
    if (room) {
      setFormData({
        code: room.code,
        name: room.name,
        building: room.building,
        floor: room.floor,
        capacity: room.capacity,
        type: room.type,
        area: room.area,
        location: room.location,
        description: room.description || '',
        features: room.features,
        equipment: room.equipment
      });
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {room ? 'แก้ไขห้อง' : 'เพิ่มห้องใหม่'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสห้อง *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เช่น CS-301"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อห้อง *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เช่น ห้องคอมพิวเตอร์ 1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อาคาร *
              </label>
              <select
                required
                value={formData.building}
                onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {mockBuildings.map(building => (
                  <option key={building} value={building}>
                    {building}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชั้น *
              </label>
              <input
                type="number"
                required
                min="1"
                max="20"
                value={formData.floor}
                onChange={(e) => setFormData(prev => ({ ...prev, floor: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทห้อง *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roomTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ความจุ (คน) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                พื้นที่ (ตร.ม.) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ที่ตั้ง *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="เช่น ชั้น 3 อาคารวิทยาศาสตร์ ห้อง 301"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบาย
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="คำอธิบายเพิ่มเติมเกี่ยวกับห้อง..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {room ? 'บันทึกการแก้ไข' : 'เพิ่มห้อง'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Room Detail Modal (simplified for brevity)
interface RoomDetailModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{room.code}</h2>
              <p className="text-gray-600">{room.name}</p>
              <p className="text-sm text-gray-500">{room.location}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Room Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลห้อง</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">อาคาร</p>
                  <p className="text-gray-900">{room.building}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ความจุ</p>
                  <p className="text-gray-900">{room.capacity} คน</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">อุปกรณ์</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.equipment.map((eq) => (
                <div key={eq.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{eq.name}</h4>
                      <p className="text-sm text-gray-600">จำนวน: {eq.quantity}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      eq.status === 'working' 
                        ? 'bg-green-100 text-green-800' 
                        : eq.status === 'broken'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {eq.status === 'working' ? 'ใช้งานได้' : eq.status === 'broken' ? 'เสีย' : 'ซ่อม'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สิ่งอำนวยความสะดวก</h3>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Current Bookings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">การจองปัจจุบัน</h3>
            <div className="space-y-3">
              {room.bookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.subjectCode}</h4>
                      <p className="text-sm text-gray-600">{booking.subjectName}</p>
                      <p className="text-xs text-gray-500">
                        อาจารย์: {booking.instructor} • {booking.studentsCount} คน
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString('th-TH')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
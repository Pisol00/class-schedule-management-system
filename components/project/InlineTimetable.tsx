'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClassSchedule {
  id: string;
  subject: string;
  subjectCode: string;
  instructor: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number; // 0 = Sunday, 1 = Monday, etc.
  color: string;
  type: 'lecture' | 'lab' | 'seminar';
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00'
];

const days = ['วัน', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

// Mock schedule data
const mockScheduleData: ClassSchedule[] = [
  {
    id: '1',
    subject: 'MATHEMATICS FOR IT',
    subjectCode: 'MA101',
    instructor: 'อ.สมชาย',
    room: 'M01',
    startTime: '08:00',
    endTime: '11:00',
    day: 1, // Monday
    color: 'bg-blue-500',
    type: 'lecture'
  },
  {
    id: '2',
    subject: 'DATABASE SYSTEM',
    subjectCode: 'CS301',
    instructor: 'อ.สุดา',
    room: 'M02',
    startTime: '09:00',
    endTime: '12:00',
    day: 1, // Monday
    color: 'bg-green-500',
    type: 'lab'
  },
  {
    id: '3',
    subject: 'INTRODUCTION TO GAME PROGRAMMING',
    subjectCode: 'CS401',
    instructor: 'อ.วิชัย',
    room: 'M01',
    startTime: '13:00',
    endTime: '16:00',
    day: 1, // Monday
    color: 'bg-purple-500',
    type: 'lab'
  },
  {
    id: '4',
    subject: 'DATABASE SYSTEM',
    subjectCode: 'CS301',
    instructor: 'อ.สุดา',
    room: 'M01',
    startTime: '08:00',
    endTime: '11:00',
    day: 2, // Tuesday
    color: 'bg-orange-500',
    type: 'lecture'
  },
  {
    id: '5',
    subject: 'MATHEMATICS FOR IT',
    subjectCode: 'MA101',
    instructor: 'อ.สมชาย',
    room: 'M02',
    startTime: '08:00',
    endTime: '10:00',
    day: 2, // Tuesday
    color: 'bg-blue-500',
    type: 'lecture'
  },
  {
    id: '6',
    subject: 'INFORMATION SYSTEM',
    subjectCode: 'IS201',
    instructor: 'อ.ธนา',
    room: 'M02',
    startTime: '10:00',
    endTime: '12:00',
    day: 2, // Tuesday
    color: 'bg-cyan-500',
    type: 'lecture'
  },
  {
    id: '7',
    subject: 'DATABASE LAB',
    subjectCode: 'CS301L',
    instructor: 'อ.สุดา',
    room: 'M02',
    startTime: '13:00',
    endTime: '16:00',
    day: 2, // Tuesday
    color: 'bg-orange-500',
    type: 'lab'
  },
  {
    id: '8',
    subject: 'DATABASE SYSTEM',
    subjectCode: 'CS301',
    instructor: 'อ.สุดา',
    room: 'M01',
    startTime: '08:00',
    endTime: '11:00',
    day: 4, // Thursday
    color: 'bg-green-500',
    type: 'lecture'
  }
];

export default function InlineTimetable() {
  const [selectedRoom, setSelectedRoom] = useState('M02');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getTimeSlotIndex = (time: string) => {
    return timeSlots.findIndex(slot => slot === time);
  };

  const getClassDuration = (startTime: string, endTime: string) => {
    const startIndex = getTimeSlotIndex(startTime);
    const endIndex = getTimeSlotIndex(endTime);
    return endIndex - startIndex;
  };

  const getScheduleForRoom = (room: string) => {
    return mockScheduleData.filter(schedule => schedule.room === room);
  };

  const getClassAtTimeSlot = (day: number, timeSlot: string, room: string) => {
    const roomSchedule = getScheduleForRoom(room);
    return roomSchedule.find(schedule => {
      const startIndex = getTimeSlotIndex(schedule.startTime);
      const endIndex = getTimeSlotIndex(schedule.endTime);
      const currentIndex = getTimeSlotIndex(timeSlot);
      
      return schedule.day === day && 
             currentIndex >= startIndex && 
             currentIndex < endIndex;
    });
  };

  const isClassStart = (day: number, timeSlot: string, room: string) => {
    const roomSchedule = getScheduleForRoom(room);
    return roomSchedule.some(schedule => 
      schedule.day === day && schedule.startTime === timeSlot
    );
  };

  const availableRooms = ['M01', 'M02', 'M03', 'IT-201', 'IT-301'];

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ตารางเรียน</h2>
            <p className="text-sm text-gray-600">ห้อง {selectedRoom} • {getCurrentTimeString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live</span>
          </div>
        </div>

        {/* Room Selector */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-sm font-medium text-gray-700">เลือกห้อง:</span>
          <div className="flex space-x-2">
            {availableRooms.map((room) => (
              <motion.button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedRoom === room
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {room}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">คณิตศาสตร์และวิทยาศาสตร์</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">วิชาเอก</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-600">ปฏิบัติการ</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-600">วิชาเลือก</span>
          </div>
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-8 bg-gray-50">
            {days.map((day, index) => (
              <div
                key={index}
                className={`p-3 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0 ${
                  index === 0 ? 'bg-gray-100' : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeSlot} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
              {/* Time Column */}
              <div className="p-3 bg-gray-50 border-r border-gray-200 text-center font-medium text-gray-700 text-sm">
                {timeSlot}
              </div>
              
              {/* Day Columns */}
              {[1, 2, 3, 4, 5, 6, 0].map((day) => {
                const classData = getClassAtTimeSlot(day, timeSlot, selectedRoom);
                const isStart = isClassStart(day, timeSlot, selectedRoom);
                
                if (classData && isStart) {
                  const duration = getClassDuration(classData.startTime, classData.endTime);
                  return (
                    <motion.div
                      key={`${day}-${timeSlot}`}
                      className={`relative border-r border-gray-200 last:border-r-0 ${classData.color} text-white p-3 cursor-pointer`}
                      style={{ 
                        gridRowEnd: `span ${duration}`,
                        minHeight: `${duration * 60}px`
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, brightness: 1.1 }}
                      onClick={() => alert(`รายวิชา: ${classData.subject}\nอาจารย์: ${classData.instructor}\nเวลา: ${classData.startTime} - ${classData.endTime}`)}
                    >
                      <div className="h-full flex flex-col justify-center">
                        <div className="font-semibold text-sm leading-tight mb-1">
                          {classData.subject}
                        </div>
                        <div className="text-xs opacity-90">
                          {classData.subjectCode}
                        </div>
                        <div className="text-xs opacity-80 mt-1">
                          {classData.instructor}
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {classData.startTime} - {classData.endTime}
                        </div>
                        {classData.type === 'lab' && (
                          <div className="absolute top-1 right-1">
                            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                } else if (classData && !isStart) {
                  // Skip this cell as it's part of a multi-hour class
                  return null;
                } else {
                  // Empty time slot
                  return (
                    <div
                      key={`${day}-${timeSlot}`}
                      className="p-3 border-r border-gray-200 last:border-r-0 min-h-[60px] hover:bg-gray-50 transition-colors"
                    >
                      {/* Empty slot */}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {getScheduleForRoom(selectedRoom).length}
          </div>
          <div className="text-sm text-blue-700">รายวิชาทั้งหมด</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {new Set(getScheduleForRoom(selectedRoom).map(s => s.instructor)).size}
          </div>
          <div className="text-sm text-green-700">อาจารย์ผู้สอน</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">
            {getScheduleForRoom(selectedRoom).filter(s => s.type === 'lab').length}
          </div>
          <div className="text-sm text-purple-700">ปฏิบัติการ</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {getScheduleForRoom(selectedRoom).filter(s => s.type === 'lecture').length}
          </div>
          <div className="text-sm text-orange-700">บรรยาย</div>
        </div>
      </div>
    </div>
  );
}
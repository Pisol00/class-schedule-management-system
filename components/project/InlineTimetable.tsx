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
  day: number;
  type: 'lecture' | 'lab' | 'seminar';
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00'
];

const days = [
  { id: 1, name: 'จันทร์', short: 'MON' },
  { id: 2, name: 'อังคาร', short: 'TUE' },
  { id: 3, name: 'พุธ', short: 'WED' },
  { id: 4, name: 'พฤหัสบดี', short: 'THU' },
  { id: 5, name: 'ศุกร์', short: 'FRI' },
  { id: 6, name: 'เสาร์', short: 'SAT' },
  { id: 0, name: 'อาทิตย์', short: 'SUN' }
];

const mockScheduleData: ClassSchedule[] = [
  {
    id: '1',
    subject: 'Mathematics for IT',
    subjectCode: 'MA101',
    instructor: 'Dr. Somchai',
    room: 'M01',
    startTime: '08:00',
    endTime: '11:00',
    day: 1,
    type: 'lecture'
  },
  {
    id: '2',
    subject: 'Database Systems',
    subjectCode: 'CS301',
    instructor: 'Dr. Suda',
    room: 'M02',
    startTime: '09:00',
    endTime: '12:00',
    day: 1,
    type: 'lab'
  },
  {
    id: '3',
    subject: 'Game Development',
    subjectCode: 'CS401',
    instructor: 'Prof. Wichai',
    room: 'M01',
    startTime: '13:00',
    endTime: '16:00',
    day: 1,
    type: 'lab'
  },
  {
    id: '4',
    subject: 'Database Systems',
    subjectCode: 'CS301',
    instructor: 'Dr. Suda',
    room: 'M01',
    startTime: '08:00',
    endTime: '11:00',
    day: 2,
    type: 'lecture'
  },
  {
    id: '5',
    subject: 'Mathematics for IT',
    subjectCode: 'MA101',
    instructor: 'Dr. Somchai',
    room: 'M02',
    startTime: '08:00',
    endTime: '10:00',
    day: 2,
    type: 'lecture'
  },
  {
    id: '6',
    subject: 'Information Systems',
    subjectCode: 'IS201',
    instructor: 'Prof. Thana',
    room: 'M02',
    startTime: '10:00',
    endTime: '12:00',
    day: 2,
    type: 'lecture'
  },
  {
    id: '7',
    subject: 'Database Lab',
    subjectCode: 'CS301L',
    instructor: 'Dr. Suda',
    room: 'M02',
    startTime: '13:00',
    endTime: '16:00',
    day: 2,
    type: 'lab'
  },
  {
    id: '8',
    subject: 'Web Development',
    subjectCode: 'CS302',
    instructor: 'Prof. Wichai',
    room: 'M01',
    startTime: '14:00',
    endTime: '17:00',
    day: 4,
    type: 'lab'
  }
];

export default function MinimalTimetable() {
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
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getCurrentHour = () => {
    return currentTime.getHours();
  };

  const isCurrentTime = (timeSlot: string) => {
    const hour = parseInt(timeSlot.split(':')[0]);
    return hour === getCurrentHour();
  };

  const roomStats = getScheduleForRoom(selectedRoom);

  const getTypeGradient = (type: string) => {
    switch (type) {
      case 'lab':
        return 'from-violet-500/20 to-purple-500/20 border-violet-200';
      case 'lecture':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-200';
      case 'seminar':
        return 'from-emerald-500/20 to-teal-500/20 border-emerald-200';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-200';
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Schedule Overview
                  </h1>
                  <p className="text-slate-600 mt-1">Room {selectedRoom} • Real-time schedule</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {getCurrentTimeString()}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            
            {/* Room Selector */}
            <div className="mt-6 pt-6 border-t border-slate-200/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Select Room</span>
                <div className="flex space-x-3">
                  {availableRooms.map((room) => (
                    <motion.button
                      key={room}
                      onClick={() => setSelectedRoom(room)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedRoom === room
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                          : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                      }`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {room}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timetable */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              {/* Header */}
              <thead>
                <tr className="border-b border-slate-200/60">
                  <th className="w-24 p-4 text-center">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Time</div>
                  </th>
                  {days.map((day) => {
                    const daySchedule = getScheduleForRoom(selectedRoom).filter(s => s.day === day.id);
                    return (
                      <th key={day.id} className="p-4 text-center">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-slate-900">{day.name}</div>
                          <div className="text-xs text-slate-500">{day.short}</div>
                          <div className="text-xs text-violet-600 font-medium">
                            {daySchedule.length} classes
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeSlot} className={`border-b border-slate-100/60 ${isCurrentTime(timeSlot) ? 'bg-gradient-to-r from-violet-50/50 to-purple-50/50' : ''}`}>
                    {/* Time Column */}
                    <td className="p-4 text-center">
                      <div className={`inline-flex flex-col items-center space-y-1 px-3 py-2 rounded-xl ${
                        isCurrentTime(timeSlot) 
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-50 text-slate-700'
                      }`}>
                        <span className="text-sm font-semibold">{timeSlot}</span>
                        {isCurrentTime(timeSlot) && (
                          <span className="text-xs opacity-90">Now</span>
                        )}
                      </div>
                    </td>
                    
                    {/* Day Columns */}
                    {days.map((day) => {
                      const classData = getClassAtTimeSlot(day.id, timeSlot, selectedRoom);
                      const isStart = isClassStart(day.id, timeSlot, selectedRoom);
                      
                      if (classData && isStart) {
                        const duration = getClassDuration(classData.startTime, classData.endTime);
                        return (
                          <td
                            key={`${day.id}-${timeSlot}`}
                            rowSpan={duration}
                            className="p-3 align-top"
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-br ${getTypeGradient(classData.type)} backdrop-blur-sm rounded-2xl border border-white/60 p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300`}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => alert(`${classData.subject}\n${classData.instructor}\n${classData.startTime} - ${classData.endTime}`)}
                            >
                              <div className="space-y-3">
                                {/* Type Badge */}
                                <div className="flex items-center justify-between">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                                    classData.type === 'lab' ? 'bg-violet-100 text-violet-700' :
                                    classData.type === 'lecture' ? 'bg-blue-100 text-blue-700' :
                                    'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {classData.type === 'lab' ? 'LAB' : 
                                     classData.type === 'lecture' ? 'LEC' : 'SEM'}
                                  </span>
                                  <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                                </div>
                                
                                {/* Subject */}
                                <div>
                                  <h4 className="font-semibold text-slate-900 text-sm leading-tight">
                                    {classData.subject}
                                  </h4>
                                  <p className="text-xs text-slate-600 mt-1 font-mono">
                                    {classData.subjectCode}
                                  </p>
                                </div>
                                
                                {/* Instructor */}
                                <div className="text-xs text-slate-700">
                                  {classData.instructor}
                                </div>
                                
                                {/* Time */}
                                <div className="text-xs text-slate-600 bg-white/60 rounded-lg px-2 py-1">
                                  {classData.startTime} - {classData.endTime}
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        );
                      } else if (classData && !isStart) {
                        return null;
                      } else {
                        return (
                          <td
                            key={`${day.id}-${timeSlot}`}
                            className="p-3 h-16"
                          >
                            <div className="h-full rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors border border-slate-200/40"></div>
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          className="mt-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg shadow-black/5 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Room {selectedRoom} Statistics</span>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {roomStats.length}
                </div>
                <div className="text-xs text-slate-600 mt-1">Total Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {roomStats.filter(s => s.type === 'lab').length}
                </div>
                <div className="text-xs text-slate-600 mt-1">Lab Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {new Set(roomStats.map(s => s.instructor)).size}
                </div>
                <div className="text-xs text-slate-600 mt-1">Instructors</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
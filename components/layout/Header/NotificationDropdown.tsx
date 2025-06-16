import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'conflict' | 'approval' | 'system' | 'schedule' | 'room';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// KMITL Design System Icons
const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-orange-500', 
    low: 'text-blue-500'
  };

  const iconClasses = `w-5 h-5 ${priorityColors[priority]}`;

  const icons = {
    conflict: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
      </svg>
    ),
    approval: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.035 10.48a.75.75 0 00-1.07 1.05l2.5 2.5a.75.75 0 001.142-.117l3.5-5z" clipRule="evenodd"/>
      </svg>
    ),
    schedule: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd"/>
      </svg>
    ),
    room: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M1 6a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V6zm4 1.5a2 2 0 114 0 2 2 0 01-4 0zm2 3a4 4 0 00-3.665 2.395.75.75 0 00.416 1A8.98 8.98 0 007 14.5a8.98 8.98 0 003.249-.604.75.75 0 00.416-1.001A4.001 4.001 0 007 10.5z" clipRule="evenodd"/>
      </svg>
    ),
    system: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
      </svg>
    )
  };

  return icons[type] || icons.system;
};

// Mock data following KMITL content style
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'conflict',
    title: 'ตรวจพบความขัดแย้งตาราง',
    message: 'ห้อง IT-101 มีการจองซ้อนทับกันในวันจันทร์ เวลา 13:00-15:00 น. ระหว่างวิชา CS101 และ MA201',
    time: '5 นาทีที่แล้ว',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'approval',
    title: 'ตารางรอการอนุมัติ',
    message: 'ตารางสอนภาคการศึกษา 1/2567 ส่งให้หัวหน้าภาคพิจารณาอนุมัติแล้ว',
    time: '30 นาทีที่แล้ว',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'schedule',
    title: 'มีการแก้ไขตาราง',
    message: 'อ.สมชาย ใจดี ได้ปรับเปลี่ยนเวลาสอนวิชา CS101 จากเวลา 09:00 น. เป็น 10:00 น.',
    time: '1 ชั่วโมงที่แล้ว',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'room',
    title: 'การจองห้องใหม่',
    message: 'ห้อง IT-201 ถูกจองเพิ่มเติมสำหรับการสอบกลางภาค วิชา Database Systems',
    time: '2 ชั่วโมงที่แล้ว',
    isRead: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'system',
    title: 'การบำรุงรักษาระบบ',
    message: 'จะมีการอัพเดทระบบในวันเสาร์ที่ 20 มกราคม 2568 เวลา 02:00-06:00 น.',
    time: '1 วันที่แล้ว',
    isRead: true,
    priority: 'low'
  }
];

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={dropdownRef}
          className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-[85vh] flex flex-col max-w-[calc(100vw-1rem)] overflow-x-hidden"
          style={{
            // KMITL Design System Shadow
            boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.08)'
          }}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ 
            duration: 0.15, 
            ease: [0, 0, 0.2, 1] // KMITL ease-out
          }}
        >
          {/* KMITL Header Design */}
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-slate-900" style={{ letterSpacing: '-0.025em' }}>
                    การแจ้งเตือน
                  </h3>
                  {unreadCount > 0 && (
                    <motion.div 
                      className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  {unreadCount > 0 ? `${unreadCount} รายการใหม่ที่ยังไม่ได้อ่าน` : 'คุณได้อ่านครบทุกรายการแล้ว'}
                </p>
              </div>
              {unreadCount > 0 && (
                <motion.button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-150"
                  style={{
                    // KMITL Button Radius
                    borderRadius: '0.5rem' // radius-lg
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  อ่านทั้งหมด
                </motion.button>
              )}
            </div>
          </div>

          {/* KMITL Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              <div className="p-2 space-y-1">
                {notifications.map((notification, index) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* KMITL Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <motion.button
              className="w-full text-center text-sm text-slate-700 hover:text-slate-900 font-semibold py-3 px-4 rounded-xl hover:bg-white transition-all duration-150 border border-transparent hover:border-slate-200"
              onClick={() => {
                onClose();
                alert('เปิดหน้าการแจ้งเตือนทั้งหมด');
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              ดูการแจ้งเตือนทั้งหมด
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// KMITL Design System Notification Card
interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  index: number;
}

function NotificationCard({ notification, onMarkAsRead, index }: NotificationCardProps) {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      alert(`เปิดหน้า: ${notification.actionUrl}`);
    }
  };

  const priorityConfig = {
    high: { 
      bg: 'bg-red-50', 
      border: 'border-red-200', 
      accent: 'bg-red-500',
      badge: 'bg-red-100 text-red-700'
    },
    medium: { 
      bg: 'bg-orange-50', 
      border: 'border-orange-200', 
      accent: 'bg-orange-500',
      badge: 'bg-orange-100 text-orange-700'
    },
    low: { 
      bg: 'bg-blue-50', 
      border: 'border-blue-200', 
      accent: 'bg-blue-500',
      badge: 'bg-blue-100 text-blue-700'
    }
  };

  const config = priorityConfig[notification.priority];

  return (
    <motion.div
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 group overflow-hidden relative ${
        notification.isRead 
          ? 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300' 
          : `${config.bg} ${config.border} hover:bg-white shadow-sm`
      }`}
      style={{
        // KMITL Design System properties
        borderRadius: '0.75rem', // radius-xl
        contain: 'layout style paint',
        transform: 'translateZ(0)'
      }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.25,
        ease: [0, 0, 0.2, 1] // KMITL ease-out
      }}
      whileHover={{ 
        y: -1, 
        scale: 1.005,
        transition: { duration: 0.15 }
      }}
      whileTap={{ scale: 0.995 }}
    >
      {/* KMITL Priority Accent */}
      {!notification.isRead && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.accent} rounded-r-full`} />
      )}

      <div className="flex items-start space-x-3 pl-2">
        {/* KMITL Icon Container */}
        <motion.div 
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
            notification.isRead ? 'bg-slate-100' : 'bg-white'
          }`}
          style={{
            borderRadius: '0.75rem' // radius-xl
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { duration: 0.15 }
          }}
        >
          {getNotificationIcon(notification.type, notification.priority)}
        </motion.div>
        
        {/* KMITL Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h4 className={`font-semibold text-sm leading-tight truncate pr-2 ${
              notification.isRead ? 'text-slate-700' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.025em' }}
            >
              {notification.title}
            </h4>
            
            {!notification.isRead && (
              <motion.div 
                className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.05) }}
              />
            )}
          </div>
          
          {/* Message */}
          <p className={`text-sm leading-relaxed line-clamp-2 ${
            notification.isRead ? 'text-slate-500' : 'text-slate-600'
          }`}>
            {notification.message}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs font-medium">{notification.time}</span>
            </div>
            
            {/* KMITL Priority Badge */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${config.badge}`}
                 style={{ borderRadius: '9999px' }}>
              {notification.priority === 'high' ? 'สำคัญมาก' :
               notification.priority === 'medium' ? 'ปานกลาง' : 'ทั่วไป'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// KMITL Empty State Component
function EmptyNotifications() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.25 }}
    >
      <motion.div 
        className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6"
        style={{
          borderRadius: '1rem' // radius-2xl
        }}
        whileHover={{ 
          scale: 1.05, 
          rotate: 5,
          transition: { duration: 0.15 }
        }}
      >
        <svg className="w-10 h-10 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ letterSpacing: '-0.025em' }}>
        ไม่มีการแจ้งเตือนใหม่
      </h3>
      <p className="text-sm text-slate-500 text-center leading-relaxed max-w-xs">
        ยินดีด้วย! คุณได้อ่านการแจ้งเตือนทั้งหมดแล้ว
      </p>
    </motion.div>
  );
}
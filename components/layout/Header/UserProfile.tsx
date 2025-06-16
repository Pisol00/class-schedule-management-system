import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}

export default function UserProfile({ showDropdown, setShowDropdown }: UserProfileProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      // Add event listener on the next tick to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown, setShowDropdown]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button 
        className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors relative"
        onClick={handleButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
        {/* Online Status Indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
      </motion.button>
      
      {/* Profile Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div 
            className="absolute right-0 top-full mt-2 w-64 py-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">อาจารย์สมชาย ใจดี</div>
                  <div className="text-xs text-slate-500">เจ้าหน้าที่ฝ่ายวิชาการ</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <ProfileMenuItem
                icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                label="โปรไฟล์"
                onClick={() => {
                  setShowDropdown(false);
                  alert('เปิดหน้าโปรไฟล์');
                }}
              />
              
              <ProfileMenuItem
                icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                label="ตั้งค่า"
                onClick={() => {
                  setShowDropdown(false);
                  alert('เปิดหน้าตั้งค่า');
                }}
              />
            </div>

            <div className="border-t border-slate-100 py-1">
              <ProfileMenuItem
                icon="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                label="ออกจากระบบ"
                className="text-red-600 hover:bg-red-50"
                onClick={() => {
                  setShowDropdown(false);
                  if (confirm('ต้องการออกจากระบบหรือไม่?')) {
                    alert('ออกจากระบบสำเร็จ');
                    // window.location.href = '/login';
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Profile Menu Item Component
interface ProfileMenuItemProps {
  icon: string;
  label: string;
  badge?: number;
  className?: string;
  onClick?: () => void;
}

function ProfileMenuItem({ icon, label, badge, className = "", onClick }: ProfileMenuItemProps) {
  return (
    <a 
      href="#" 
      className={`flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
      </svg>
      {label}
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
}
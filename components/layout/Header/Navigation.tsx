import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  showDataDropdown: boolean;
  setShowDataDropdown: (show: boolean) => void;
}

const dataMenuItems = [
  { 
    name: 'หลักสูตร', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', 
    desc: 'จัดการหลักสูตรการศึกษา' 
  },
  { 
    name: 'รายวิชา', 
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', 
    desc: 'จัดการรายวิชาและเนื้อหา' 
  },
  { 
    name: 'อาจารย์', 
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 
    desc: 'จัดการข้อมูลอาจารย์' 
  },
  { 
    name: 'ห้องเรียน', 
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', 
    desc: 'จัดการห้องเรียนและสถานที่' 
  },
  { 
    name: 'นักศึกษา', 
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', 
    desc: 'จัดการข้อมูลนักศึกษา' 
  }
];

export default function Navigation({ showDataDropdown, setShowDataDropdown }: NavigationProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDataDropdown(false);
      }
    };

    if (showDataDropdown) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDataDropdown, setShowDataDropdown]);

  return (
    <nav className="hidden lg:flex items-center justify-center space-x-8">
      {/* จัดการข้อมูลระบบ Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors flex items-center space-x-2 relative group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowDataDropdown(!showDataDropdown);
          }}
          whileHover={{ y: -1 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          <span>จัดการข้อมูลระบบ</span>
          <motion.svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            animate={{ rotate: showDataDropdown ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </motion.svg>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-4/5 transition-all duration-200" />
        </motion.button>

        {/* Data Management Dropdown */}
        <AnimatePresence>
          {showDataDropdown && (
            <motion.div 
              className="absolute top-full left-0 mt-2 w-64 py-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">จัดการข้อมูลระบบ</h3>
                <p className="text-xs text-slate-500">จัดการข้อมูลพื้นฐานของระบบ</p>
              </div>
              
              {dataMenuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href="#"
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDataDropdown(false);
                    alert(`เปิดหน้า${item.name}`);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start space-x-3">
                    <svg className="w-4 h-4 mt-0.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                    </svg>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Other Menu Items */}
      <NavLink href="#" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
        รายงาน
      </NavLink>

      <NavLink href="#" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z">
        ตั้งค่า
      </NavLink>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <motion.a 
      href={href} 
      className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors flex items-center space-x-2 relative group"
      whileHover={{ y: -1 }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
      </svg>
      <span>{children}</span>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-4/5 transition-all duration-200" />
    </motion.a>
  );
}
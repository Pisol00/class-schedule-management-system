import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
}

const dataMenuItems = [
  { 
    name: 'หลักสูตร', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
  },
  { 
    name: 'รายวิชา', 
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
  },
  { 
    name: 'อาจารย์', 
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
  },
  { 
    name: 'ห้องเรียน', 
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
  },
  { 
    name: 'นักศึกษา', 
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' 
  }
];

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <motion.div 
      className="lg:hidden bg-white border-t border-slate-200"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-4 py-3 space-y-1">
        {/* จัดการข้อมูลระบบ Section */}
        <div className="pb-2 mb-2 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
            จัดการข้อมูลระบบ
          </div>
          {dataMenuItems.map((item, index) => (
            <MobileMenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              delay={index * 0.05}
              onClick={() => alert(`เปิดหน้า${item.name}`)}
            />
          ))}
        </div>

        {/* Other Menu Items */}
        <MobileMenuItem
          name="รายการความขัดแย้ง"
          icon="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          delay={0.25}
          onClick={() => alert('เปิดหน้ารายการความขัดแย้ง')}
        />
      </div>
    </motion.div>
  );
}

// Mobile Menu Item Component
interface MobileMenuItemProps {
  name: string;
  icon: string;
  delay: number;
  badge?: number;
  onClick?: () => void;
}

function MobileMenuItem({ name, icon, delay, badge, onClick }: MobileMenuItemProps) {
  return (
    <motion.a 
      href="#" 
      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 5 }}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
      </svg>
      <span className="flex-1">{name}</span>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </motion.a>
  );
}
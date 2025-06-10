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
          name="รายงาน"
          icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          delay={0.25}
        />

        <MobileMenuItem
          name="ตั้งค่า"
          icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          delay={0.3}
        />

        <MobileMenuItem
          name="การแจ้งเตือน"
          icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          delay={0.35}
          badge={3}
          onClick={() => alert('แสดงการแจ้งเตือน')}
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
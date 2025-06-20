import { motion } from 'framer-motion';

interface NavigationProps {
  // เอา dropdown states ออก
}

const navMenuItems = [
  { 
    name: 'หลักสูตร', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    href: '/curriculum'
  },
  { 
    name: 'รายวิชา', 
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    href: '/subjects'
  },
  { 
    name: 'อาจารย์', 
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    href: '/instructors'
  },
  { 
    name: 'ห้องเรียน', 
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    href: '/rooms'
  },
  { 
    name: 'นักศึกษา', 
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    href: '/students'
  }
];

export default function Navigation(props: NavigationProps) {
  return (
    <nav className="hidden lg:flex items-center justify-center space-x-1">
      {navMenuItems.map((item, index) => (
        <NavLink 
          key={item.name}
          href={item.href} 
          icon={item.icon}
          onClick={() => alert(`เปิดหน้า${item.name}`)}
          index={index}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

// Navigation Link Component
function NavLink({ 
  href, 
  icon, 
  children, 
  onClick,
  index = 0
}: { 
  href: string; 
  icon: string; 
  children: React.ReactNode;
  onClick?: () => void;
  index?: number;
}) {
  return (
    <motion.a 
      href={href} 
      className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2 relative group hover:bg-slate-50"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + (index * 0.1) }}
      whileHover={{ y: -1 }}
    >
      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
      </svg>
      <span>{children}</span>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-3/4 transition-all duration-200" />
    </motion.a>
  );
}
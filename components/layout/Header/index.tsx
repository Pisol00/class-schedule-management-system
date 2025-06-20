import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../common/Logo';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import UserProfile from './UserProfile';
import NotificationBell from './NotificationBell';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  // เอา showDataDropdown ออก

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowProfileDropdown(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.header 
      className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 lg:flex lg:justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Logo size="medium" />
          </div>
          
          {/* Navigation Menu - Desktop */}
          <Navigation />
          
          {/* User Profile & Actions */}
          <div className="relative flex items-center justify-end space-x-3">
            {/* Mobile Menu Button */}
            <motion.button 
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(!showMobileMenu);
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: showMobileMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {showMobileMenu ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                ) : (
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                )}
              </motion.svg>
            </motion.button>

            {/* Notification Icon */}
            <NotificationBell />
            
            {/* User Info - Desktop */}
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-slate-900">อาจารย์สมชาย ใจดี</div>
              <div className="text-xs text-slate-500">เจ้าหน้าที่ฝ่ายวิชาการ</div>
            </div>
            
            {/* User Avatar & Dropdown */}
            <UserProfile showDropdown={showProfileDropdown} setShowDropdown={setShowProfileDropdown} />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {showMobileMenu && <MobileMenu isOpen={showMobileMenu} />}
      </AnimatePresence>
    </motion.header>
  );
}
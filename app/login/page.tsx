'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import HelpModal from '@/components/auth/modals/HelpModal';
import PrivacyModal from '@/components/auth/modals/PrivacyModal';

// Animation Variants (Optimized for Performance and No Scroll)
const ANIMATION_VARIANTS = {
  page: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -10 }
  } as Variants,
  
  card: {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.08
      }
    }
  } as Variants,
  
  item: {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  } as Variants
};

// Constants (Constrained Animations to Prevent Overflow)
const FLOATING_ELEMENTS_CONFIG = {
  element1: {
    className: "absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/6 to-purple-400/6 rounded-full blur-3xl",
    animation: {
      scale: [1, 1.05, 1],
      rotate: [0, 30, 0]
    },
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }
  },
  element2: {
    className: "absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl",
    animation: {
      scale: [1.05, 1, 1.05],
      rotate: [30, 0, 30]
    },
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Types
interface LoginState {
  showHelpModal: boolean;
  showPrivacyModal: boolean;
  isLoading: boolean;
  error: string | null;
  showSuccess: boolean;
}

// Custom Hook for Login Logic
function useLoginState() {
  const [state, setState] = useState<LoginState>({
    showHelpModal: false,
    showPrivacyModal: false,
    isLoading: false,
    error: null,
    showSuccess: false
  });

  const updateState = (updates: Partial<LoginState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleGoogleLogin = async () => {
    updateState({ isLoading: true, error: null, showSuccess: false });
    
    try {
      console.log('Google authentication initiated');
      
      // Simulate loading for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (remove this in production)
      updateState({ showSuccess: true });
      
      // Simulate redirect delay
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        // window.location.href = '/dashboard';
      }, 2000);
      
    } catch (err) {
      updateState({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง' });
    } finally {
      updateState({ isLoading: false });
    }
  };

  return {
    ...state,
    updateState,
    handleGoogleLogin
  };
}

// Custom Hook to Manage Body Scroll
function useBodyScroll() {
  useEffect(() => {
    // Prevent body scroll on mount
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restore original scroll behavior on unmount
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
}

// Floating Elements Component (Constrained to prevent scroll)
function FloatingElements() {
  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      aria-hidden="true"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={FLOATING_ELEMENTS_CONFIG.element1.className}
          animate={FLOATING_ELEMENTS_CONFIG.element1.animation}
          transition={FLOATING_ELEMENTS_CONFIG.element1.transition}
          style={{ 
            transform: 'translate3d(0,0,0)',
            willChange: 'transform'
          }}
        />
        <motion.div
          className={FLOATING_ELEMENTS_CONFIG.element2.className}
          animate={FLOATING_ELEMENTS_CONFIG.element2.animation}
          transition={FLOATING_ELEMENTS_CONFIG.element2.transition}
          style={{ 
            transform: 'translate3d(0,0,0)',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <motion.div className="flex justify-center mb-8" variants={ANIMATION_VARIANTS.item}>
      <div className="relative">
        <img 
          src="https://jlearn.it.kmitl.ac.th/_next/image/?url=%2Fit-kmitl.png&w=256&q=75" 
          alt="สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง" 
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

// Header Component
function Header() {
  return (
    <motion.div className="text-center mb-8" variants={ANIMATION_VARIANTS.item}>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          ยินดีต้อนรับ
        </h1>
        <p className="text-gray-600 leading-relaxed">
          เข้าสู่ระบบเพื่อจัดตารางการสอน
        </p>
      </div>
    </motion.div>
  );
}

// Footer Navigation Component
function FooterNavigation({ 
  onHelpClick, 
  onPrivacyClick 
}: { 
  onHelpClick: () => void;
  onPrivacyClick: () => void;
}) {
  return (
    <div className="flex justify-center">
      <nav className="flex items-center space-x-8 px-6 py-3 bg-slate-50/80 rounded-xl border border-slate-200/80 backdrop-blur-sm">
        <FooterButton
          onClick={onHelpClick}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
            </svg>
          }
          label="ช่วยเหลือ"
          ariaLabel="เปิดหน้าต่างช่วยเหลือ"
        />
        
        <div className="w-px h-4 bg-slate-300" aria-hidden="true" />
        
        <FooterButton
          onClick={onPrivacyClick}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          }
          label="ความเป็นส่วนตัว"
          ariaLabel="เปิดหน้าต่างนโยบายความเป็นส่วนตัว"
        />
      </nav>
    </div>
  );
}

// Institution Info Component
function InstitutionInfo() {
  return (
    <div className="text-center space-y-3">
      <p className="text-slate-600 font-medium leading-relaxed">
        สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
      </p>
      <div className="flex items-center justify-center space-x-3 text-slate-400 text-sm">
        <span>© 2025</span>
        <div className="w-1 h-1 bg-slate-400 rounded-full" aria-hidden="true" />
        <span>All Rights Reserved</span>
      </div>
    </div>
  );
}

// Error Alert Component
function ErrorAlert({ message }: { message: string }) {
  return (
    <motion.div 
      className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <svg 
          className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
        </svg>
        <div>
          <h4 className="font-medium text-red-900 mb-1">เกิดข้อผิดพลาด</h4>
          <p className="text-red-700 text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Success Alert Component
function SuccessAlert() {
  return (
    <motion.div 
      className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg 
            className="w-4 h-4 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-green-900 mb-1">เข้าสู่ระบบสำเร็จ!</h4>
          <div className="text-green-700 text-sm flex items-center space-x-2">
            <span>กำลังนำคุณไปยังหน้าหลัก</span>
            <LoadingDots />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Loading Dots Component (Constrained)
function LoadingDots() {
  return (
    <div className="flex space-x-1" aria-label="กำลังโหลด">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-green-600 rounded-full"
          animate={{ 
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Footer Button Component
function FooterButton({ 
  onClick, 
  icon, 
  label, 
  ariaLabel 
}: { 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  ariaLabel?: string;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer text-sm font-medium"
      aria-label={ariaLabel || label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Main Login Page Component
export default function LoginPage() {
  const {
    showHelpModal,
    showPrivacyModal,
    isLoading,
    error,
    showSuccess,
    updateState,
    handleGoogleLogin
  } = useLoginState();

  // Prevent body scroll
  useBodyScroll();

  return (
    <>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        {/* Floating Elements */}
        <FloatingElements />
      </div>

      {/* Main Content Layer */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden font-sans"
        variants={ANIMATION_VARIANTS.page}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Hide scrollbar for webkit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Content Container */}
        <div className="w-full max-w-lg mx-auto relative z-10 px-6 py-8">
          <motion.div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 md:p-10 max-h-[90vh] overflow-y-auto"
            variants={ANIMATION_VARIANTS.card}
            initial="initial"
            animate="animate"
            style={{ 
              transform: 'translate3d(0,0,0)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Logo Section */}
            <Logo />

            {/* Header Section */}
            <Header />

            {/* Error Alert */}
            <AnimatePresence mode="wait">
              {error && <ErrorAlert message={error} />}
            </AnimatePresence>

            {/* Success Alert */}
            <AnimatePresence mode="wait">
              {showSuccess && <SuccessAlert />}
            </AnimatePresence>

            {/* Authentication Section */}
            <AnimatePresence mode="wait">
              {!showSuccess && (
                <motion.div 
                  variants={ANIMATION_VARIANTS.item}
                  initial={{ opacity: 1 }}
                  exit={{ 
                    opacity: 0, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="mb-8"
                >
                  <GoogleLoginButton onClick={handleGoogleLogin} isLoading={isLoading} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Section */}
            <motion.div className="space-y-6" variants={ANIMATION_VARIANTS.item}>
              <FooterNavigation 
                onHelpClick={() => updateState({ showHelpModal: true })}
                onPrivacyClick={() => updateState({ showPrivacyModal: true })}
              />
              <InstitutionInfo />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => updateState({ showHelpModal: false })} 
      />
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => updateState({ showPrivacyModal: false })} 
      />

      {/* No JavaScript Fallback */}
      <noscript>
        <div 
          className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-800 p-3 text-center z-50 text-sm font-medium"
          role="alert"
        >
          กรุณาเปิดใช้งาน JavaScript เพื่อใช้ระบบได้อย่างสมบูรณ์
        </div>
      </noscript>
    </>
  );
}
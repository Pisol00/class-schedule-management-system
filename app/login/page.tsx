'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import HelpModal from '@/components/auth/modals/HelpModal';
import PrivacyModal from '@/components/auth/modals/PrivacyModal';
import LoginStyles from '@/components/auth/LoginStyles';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

export default function LoginPage() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setShowSuccess(false);
    
    try {
      console.log('Google authentication initiated');
      
      // Simulate loading for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (remove this in production)
      setShowSuccess(true);
      
      // Simulate redirect delay
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        // window.location.href = '/dashboard';
      }, 2000);
      
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginStyles />

      <motion.div 
        className="min-h-screen bg-slate-100 flex items-center justify-center relative overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Main Container */}
        <div className="main-container relative z-10">
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl card-shadow border border-slate-200 login-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            
            {/* Logo Section */}
            <motion.div className="flex justify-center logo-section" variants={itemVariants}>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="https://jlearn.it.kmitl.ac.th/_next/image/?url=%2Fit-kmitl.png&w=256&q=75" alt="" width={95}/>
              </motion.div>
            </motion.div>

            {/* Header Section */}
            <motion.div className="text-center header-section" variants={itemVariants}>
              <div className="space-y-4">
                <h1 className="text-3xl text-heading">ยินดีต้อนรับ</h1>
                <p className="text-body text-lg">เข้าสู่ระบบเพื่อจัดตารางการสอน</p>
              </div>
            </motion.div>

            {/* Error Alert */}
            {error && <ErrorAlert message={error} />}

            {/* Success Alert */}
            <AnimatePresence>
              {showSuccess && <SuccessAlert />}
            </AnimatePresence>

            {/* Authentication Section */}
            <motion.div variants={itemVariants}>
              <GoogleLoginButton onClick={handleGoogleLogin} isLoading={isLoading} />
            </motion.div>

            {/* Footer Section */}
            <motion.div className="footer-section" variants={itemVariants}>
              {/* Navigation Links */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-10 px-8 py-3 bg-slate-50 rounded-full border border-slate-200">
                  <FooterButton
                    onClick={() => setShowHelpModal(true)}
                    icon={
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                      </svg>
                    }
                    label="ช่วยเหลือ"
                  />
                  
                  <div className="w-px h-5 bg-slate-300" />
                  
                  <FooterButton
                    onClick={() => setShowPrivacyModal(true)}
                    icon={
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    }
                    label="ความเป็นส่วนตัว"
                  />
                </div>
              </div>
              
              {/* Institution Info */}
              <div className="text-center space-y-3">
                <p className="text-slate-500 font-medium leading-relaxed">
                  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                </p>
                <div className="flex items-center justify-center space-x-4 text-slate-400">
                  <span>© 2025</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  <span>All Rights Reserved</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Modals */}
        <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
        <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      </motion.div>

      {/* No JavaScript Fallback */}
      <noscript>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#fbbf24',
          color: '#92400e',
          padding: '1rem',
          textAlign: 'center',
          zIndex: 1000,
          fontSize: '14px'
        }}>
          กรุณาเปิดใช้งาน JavaScript เพื่อใช้ระบบได้อย่างสมบูรณ์
        </div>
      </noscript>
    </>
  );
}

// Error Alert Component
function ErrorAlert({ message }: { message: string }) {
  return (
    <motion.div 
      className="error-alert"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start space-x-3">
        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
        </svg>
        <div>
          <strong>เกิดข้อผิดพลาด</strong>
          <p className="mt-1">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Success Alert Component
function SuccessAlert() {
  return (
    <motion.div 
      className="success-alert bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        </motion.div>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-semibold text-green-900 mb-1">เข้าสู่ระบบสำเร็จ!</p>
            <p className="text-sm text-green-700 flex items-center space-x-2">
              <span>กำลังนำคุณไปยังหน้าหลัก</span>
              <LoadingDots />
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Loading Dots Component
function LoadingDots() {
  return (
    <motion.div
      className="flex space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-green-600 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay }}
        />
      ))}
    </motion.div>
  );
}

// Footer Button Component
function FooterButton({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <motion.button 
      onClick={onClick}
      className="footer-button flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}
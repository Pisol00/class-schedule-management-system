'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle modal open/close with body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowHelpModal(false);
        setShowPrivacyModal(false);
      }
    };

    if (showHelpModal || showPrivacyModal) {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showHelpModal, showPrivacyModal]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setShowSuccess(false);
    
    try {
      console.log('Google authentication initiated');
      // เพิ่ม Google OAuth logic ตรงนี้
      
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

  const handleModalBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalContentVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
        
        /* ===== BASE STYLES - DESKTOP ONLY ===== */
        body {
          font-family: 'Inter', 'Noto Sans Thai', sans-serif;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: padding-right 0.25s ease-out;
        }
        
        body.modal-open {
          overflow: hidden;
        }
        
        * {
          box-sizing: border-box;
        }
        
        button, .info-card, .contact-item {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* ===== COMPONENT STYLES ===== */
        .card-shadow {
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.08);
        }
        
        .btn-primary {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease-out;
          will-change: transform;
          transform: translateZ(0);
          min-height: 56px;
          font-size: 16px;
        }
        
        .btn-primary:hover:not(:disabled) {
          border-color: #3b82f6;
          box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.2);
          transform: translateY(-1px);
        }
        
        .btn-primary:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .footer-button {
          transition: all 0.2s ease-out;
          will-change: transform;
          transform: translateZ(0);
        }
        
        .footer-button:hover svg {
          transform: scale(1.1);
        }
        
        .text-heading {
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #111827;
        }
        
        .text-body {
          font-weight: 400;
          color: #4b5563;
          line-height: 1.6;
        }
        
        .accent-line {
          background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-alert {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          animation: slideIn 0.3s ease-out;
        }
        
        .success-alert {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* ===== BACKGROUND ELEMENTS ===== */
        .bg-element {
          position: absolute;
          border-radius: 50%;
          opacity: 0.06;
          pointer-events: none;
          filter: blur(1px);
        }
        
        .bg-element-1 {
          background: #3b82f6;
          width: 240px;
          height: 240px;
        }
        
        .bg-element-2 {
          background: #1e40af;
          width: 180px;
          height: 180px;
        }
        
        .bg-element-3 {
          background: #60a5fa;
          width: 120px;
          height: 120px;
        }
        
        .bg-element-4 {
          background: #2563eb;
          width: 100px;
          height: 100px;
        }
        
        .geometric-shape {
          position: absolute;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .shape-square {
          width: 50px;
          height: 50px;
          background: #3b82f6;
          transform: rotate(45deg);
        }
        
        .shape-triangle {
          width: 40px;
          height: 40px;
          background: #1e40af;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        /* ===== MODAL STYLES ===== */
        .modal-overlay {
          background: rgba(0, 0, 0, 0.6);
          will-change: background-color;
          transform: translateZ(0);
          contain: strict;
        }
        
        .modal-content {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          will-change: transform;
          backface-visibility: hidden;
          contain: layout style paint;
          width: 600px;
          max-width: 90vw;
        }
        
        .modal-header {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          border-radius: 24px 24px 0 0;
        }
        
        .modal-body {
          background: white;
          border-radius: 0 0 24px 24px;
        }
        
        .info-card {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          transition: all 0.2s ease-out;
          will-change: transform;
          transform: translateZ(0);
          border-radius: 12px;
        }
        
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -4px rgba(59, 130, 246, 0.1);
        }
        
        .contact-item {
          background: white;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease-out;
          will-change: transform;
          transform: translateZ(0);
          border-radius: 12px;
        }
        
        .quick-link-button {
          background: white;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease-out;
          will-change: transform;
          transform: translateZ(0);
          border-radius: 8px;
          padding: 12px 16px;
        }
        
        .quick-link-button:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 8px -2px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }
        
        /* ===== DESKTOP OPTIMIZATIONS ===== */
        .main-container {
          width: 500px;
          margin: 0 auto;
        }
        
        .login-card {
          padding: 48px;
        }
        
        .logo-section {
          margin-bottom: 32px;
        }
        
        .header-section {
          margin-bottom: 40px;
        }
        
        .footer-section {
          margin-top: 32px;
        }
      `}</style>

      <motion.div 
        className="min-h-screen bg-slate-100 flex items-center justify-center relative overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* ===== ANIMATED BACKGROUND ===== */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Elements */}
          <motion.div 
            className="bg-element bg-element-1 top-20 left-20"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div 
            className="bg-element bg-element-2 top-40 right-32"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div 
            className="bg-element bg-element-3 bottom-32 left-40"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
          <motion.div 
            className="bg-element bg-element-4 bottom-20 right-20"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 3 }}
          />
          
          {/* Geometric Shapes */}
          <motion.div 
            className="geometric-shape shape-square top-16 right-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="geometric-shape shape-triangle bottom-16 left-16"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="geometric-shape shape-square top-1/2 left-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="geometric-shape shape-triangle top-1/3 right-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* ===== MAIN CONTAINER ===== */}
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
                <div className="w-20 h-20 rounded-xl shadow-md bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  IT
                </div>
                <div className="accent-line absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Header Section */}
            <motion.div className="text-center header-section" variants={itemVariants}>
              <div className="space-y-4">
                <h1 className="text-3xl text-heading">ยินดีต้อนรับ</h1>
                <p className="text-body text-lg">เข้าสู่ระบบเพื่อจัดตารางการสอน</p>
              </div>
            </motion.div>

            {/* Error Display */}
            {error && (
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
                    <p className="mt-1">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Display */}
            <AnimatePresence>
              {showSuccess && (
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
                          <motion.div
                            className="flex space-x-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <motion.div
                              className="w-1 h-1 bg-green-600 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-1 h-1 bg-green-600 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-1 h-1 bg-green-600 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </motion.div>
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Authentication Section */}
            <motion.div variants={itemVariants}>
              <motion.button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center space-x-4 rounded-lg"
                whileHover={!isLoading ? { 
                  scale: 1.02,
                  boxShadow: "0 8px 20px -4px rgba(59, 130, 246, 0.25)"
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner" />
                    <span className="text-gray-700 font-medium">กำลังเข้าสู่ระบบ...</span>
                  </>
                ) : (
                  <>
                    {/* Google Logo */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium text-lg">เข้าสู่ระบบด้วย Google</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Footer Section */}
            <motion.div className="footer-section" variants={itemVariants}>
              {/* Navigation Links */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-10 px-8 py-3 bg-slate-50 rounded-full border border-slate-200">
                  <motion.button 
                    onClick={() => setShowHelpModal(true)}
                    className="footer-button flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">ช่วยเหลือ</span>
                  </motion.button>
                  
                  <div className="w-px h-5 bg-slate-300" />
                  
                  <motion.button 
                    onClick={() => setShowPrivacyModal(true)}
                    className="footer-button flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">ความเป็นส่วนตัว</span>
                  </motion.button>
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

        {/* ===== HELP MODAL ===== */}
        <AnimatePresence>
          {showHelpModal && (
            <motion.div 
              className="modal-overlay fixed inset-0 z-50 flex items-center justify-center"
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => handleModalBackdropClick(e, () => setShowHelpModal(false))}
            >
              <motion.div 
                className="modal-content"
                variants={modalContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Modal Header */}
                <div className="modal-header px-8 py-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">ศูนย์ช่วยเหลือ</h3>
                        <p className="text-gray-500">ข้อมูลการติดต่อและการใช้งาน</p>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => setShowHelpModal(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                {/* Modal Body */}
                <motion.div 
                  className="modal-body p-8 space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Login Help */}
                  <motion.div 
                    className="info-card p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-lg">การเข้าสู่ระบบ</h4>
                        <p className="text-gray-600 leading-relaxed">ใช้บัญชี Google ของมหาวิทยาลัยในการเข้าสู่ระบบ หากมีปัญหาให้ติดต่อเจ้าหน้าที่ IT</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center space-x-3 text-lg">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span>ติดต่อเจ้าหน้าที่</span>
                    </h4>
                    
                    <motion.div 
                      className="grid gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, staggerChildren: 0.1 }}
                    >
                      <motion.div 
                        className="contact-item p-4 flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">อีเมล์</p>
                          <p className="text-blue-600">it-support@kmitl.ac.th</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="contact-item p-4 flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">โทรศัพท์</p>
                          <p className="text-blue-600">02-329-8000 ต่อ 6900</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="contact-item p-4 flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">เวลาทำการ</p>
                          <p className="text-gray-600">จันทร์ - ศุกร์: 08:30 - 16:30 น.</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== PRIVACY MODAL ===== */}
        <AnimatePresence>
          {showPrivacyModal && (
            <motion.div 
              className="modal-overlay fixed inset-0 z-50 flex items-center justify-center"
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => handleModalBackdropClick(e, () => setShowPrivacyModal(false))}
            >
              <motion.div 
                className="modal-content max-h-[80vh] overflow-hidden flex flex-col"
                variants={modalContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Modal Header */}
                <div className="modal-header px-8 py-6 rounded-t-2xl flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">นโยบายความเป็นส่วนตัว</h3>
                        <p className="text-gray-500">การปกป้องข้อมูลส่วนบุคคล</p>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => setShowPrivacyModal(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                {/* Modal Body */}
                <motion.div 
                  className="modal-body p-8 overflow-y-auto flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.1 }}
                  >
                    {/* Data Collection */}
                    <motion.div 
                      className="info-card p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg">การเก็บรวบรวมข้อมูล</h4>
                          <p className="text-gray-600 leading-relaxed">เราเก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการระบบการเรียนการสอนเท่านั้น</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Data Usage */}
                    <motion.div 
                      className="info-card p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg">การใช้ข้อมูล</h4>
                          <p className="text-gray-600 mb-4">ข้อมูลของคุณจะถูกใช้เพื่อ:</p>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-600">การยืนยันตัวตนและการเข้าถึงระบบ</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-600">การจัดการข้อมูลการเรียนการสอน</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-600">การติดต่อสื่อสารที่เกี่ยวข้องกับการศึกษา</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Security */}
                    <motion.div 
                      className="info-card p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg">ความปลอดภัย</h4>
                          <p className="text-gray-600 leading-relaxed">เราใช้มาตรการรักษาความปลอดภัยระดับสถาบันการศึกษาในการปกป้องข้อมูลของคุณ</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* User Rights */}
                    <motion.div 
                      className="info-card p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg">สิทธิของผู้ใช้</h4>
                          <p className="text-gray-600 leading-relaxed">คุณมีสิทธิในการขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
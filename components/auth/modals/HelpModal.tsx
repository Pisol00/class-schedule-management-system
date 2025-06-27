'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// FAQ Data
const faqData = [
  {
    question: "ไม่สามารถเข้าสู่ระบบได้",
    answer: "ตรวจสอบให้แน่ใจว่าได้เปิด popup สำหรับเข้าสู่ระบบด้วย Google แล้ว และมีการเชื่อมต่ออินเทอร์เน็ตที่เสถียร"
  },
  {
    question: "Google Account ไม่ได้รับอนุญาต",
    answer: "กรุณาใช้ Google Account ที่ได้รับอนุญาตจากสถาบันหรือติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์การเข้าใช้งาน"
  },
  {
    question: "หน้าเว็บไม่โหลด",
    answer: "ลองรีเฟรชหน้าเว็บ (F5) หรือล้าง Browser Cache แล้วลองใหม่อีกครั้ง"
  },
  {
    question: "ระบบช้า",
    answer: "ปัญหาอาจเกิดจากการเชื่อมต่ออินเทอร์เน็ต ลองตรวจสอบสัญญาณและปิดแท็บอื่นๆ ที่ไม่จำเป็น"
  }
];

// Contact Data
const contactData = [
  {
    type: "อีเมล",
    value: "support@schedule.kmitl.ac.th",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    )
  },
  {
    type: "โทรศัพท์",
    value: "02-329-8000 ต่อ 6200",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    )
  },
  {
    type: "LINE Official",
    value: "@kmitl_schedule",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.628-.629.628M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    )
  }
];

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden'; // 🚫 Disable scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; // ✅ Re-enable scroll
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-modal-title"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-200/50"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="help-modal-title" className="text-xl font-semibold text-gray-900">
                  ช่วยเหลือและการสนับสนุน
                </h2>
              </div>

              <motion.button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="ปิดหน้าต่างช่วยเหลือ"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
              <div className="p-6 space-y-8">

                {/* Quick Help */}
                <motion.section variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span>เริ่มต้นใช้งาน</span>
                  </h3>
                  <div className="bg-blue-50/50 rounded-lg p-4 space-y-2">
                    <p className="text-gray-700">
                      <strong className="text-blue-700">ขั้นตอนการเข้าสู่ระบบ:</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-4">
                      <li>คลิกปุ่ม "เข้าสู่ระบบด้วย Google"</li>
                      <li>เลือก Google Account ที่ได้รับอนุญาต</li>
                      <li>อนุญาตให้ระบบเข้าถึงข้อมูลพื้นฐาน</li>
                      <li>รอสักครู่ระบบจะนำคุณเข้าสู่หน้าหลัก</li>
                    </ol>
                  </div>
                </motion.section>

                {/* FAQ */}
                <motion.section variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>คำถามที่พบบ่อย</span>
                  </h3>
                  <div className="space-y-3">
                    {faqData.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/50 rounded-lg p-4 border border-gray-200/50"
                        variants={itemVariants}
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Contact */}
                <motion.section variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                    <span>ติดต่อสอบถาม</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactData.map((contact, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/50 rounded-lg p-4 border border-gray-200/50 hover:shadow-md transition-shadow duration-200"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-500">
                            {contact.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{contact.type}</p>
                            <p className="text-sm text-gray-600">{contact.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Additional Info */}
                <motion.section variants={itemVariants}>
                  <div className="bg-yellow-50/50 rounded-lg p-4 border border-yellow-200/50">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">ข้อมูลสำคัญ</h4>
                        <p className="text-sm text-yellow-700 leading-relaxed">
                          ระบบนี้ใช้สำหรับบุคลากรของสถาบันเท่านั้น หากพบปัญหาเร่งด่วน กรุณาติดต่อฝ่าย IT โดยตรง
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

              </div>
            </div>

            {/* Footer */}
            <motion.div
              className="flex justify-end p-6 border-t border-gray-200/50 bg-gray-50/30"
              variants={itemVariants}
            >
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                เข้าใจแล้ว
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
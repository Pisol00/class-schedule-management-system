import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionHintsProps {
  selectedCount: number;
  onExport: () => void;
  onBulkDelete: () => void;
  onCreateNew: () => void;
}

export default function FloatingActionHints({
  selectedCount,
  onExport,
  onBulkDelete,
  onCreateNew
}: FloatingActionHintsProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after 3 seconds if no items selected
    const timer = setTimeout(() => {
      if (selectedCount === 0) {
        setShowHint(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedCount]);

  return (
    <>
      {/* Main FAB - Create New */}
      <motion.div 
        className="fixed bottom-8 right-8 z-40 md:hidden"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.5 }}
      >
        <motion.button
          onClick={onCreateNew}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 30px -10px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </motion.svg>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
            >
              แตะเพื่อเพิ่มหลักสูตรใหม่
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bulk Actions FAB */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div 
            className="fixed bottom-8 left-8 z-40 md:hidden flex flex-col space-y-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {/* Export Button */}
            <motion.button
              onClick={onExport}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="ส่งออกข้อมูล"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.button>

            {/* Delete Button */}
            <motion.button
              onClick={onBulkDelete}
              className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="ลบที่เลือก"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>

            {/* Counter Badge */}
            <motion.div
              className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full text-center min-w-[2rem]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {selectedCount}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
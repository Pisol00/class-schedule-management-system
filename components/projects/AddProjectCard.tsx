import { motion } from 'framer-motion';

interface AddProjectCardProps {
  onClick: () => void;
}

export default function AddProjectCard({ onClick }: AddProjectCardProps) {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group h-full min-h-[320px]"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.svg 
        className="w-16 h-16 mb-4 text-slate-400 group-hover:text-blue-500 transition-colors" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
      </motion.svg>
      <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600 mb-2 transition-colors">
        สร้างโครงการใหม่
      </h3>
      <p className="text-sm text-slate-500 group-hover:text-blue-500 transition-colors">
        เริ่มต้นภาคการศึกษาใหม่
      </p>
    </motion.div>
  );
}
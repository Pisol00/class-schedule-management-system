import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ResponsiveStatsCardProps {
  label: string;
  value: number;
  total: number;
  icon: ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  onClick?: () => void;
  index: number;
  isActive?: boolean;
}

export default function ResponsiveStatsCard({
  label,
  value,
  total,
  icon,
  color,
  bgColor,
  borderColor,
  onClick,
  index,
  isActive = false
}: ResponsiveStatsCardProps) {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
        ${isActive 
          ? `${borderColor} ${bgColor} ring-2 ring-blue-500 ring-opacity-50 shadow-lg` 
          : `${borderColor} ${bgColor} hover:shadow-lg`
        }
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + (index * 0.1) }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        />
      )}

      {/* Header with Icon and Value */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <motion.div 
          className={`text-3xl font-bold ${color}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + (index * 0.1) }}
        >
          {value}
        </motion.div>
      </div>
      
      {/* Label and Details */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">
          {label}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {percentage}% ของทั้งหมด
          </p>
          <motion.div 
            className="flex items-center text-xs text-gray-400"
            whileHover={{ x: 3 }}
          >
            <span>ดูทั้งหมด</span>
            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
        <motion.div 
          className={`h-1.5 rounded-full ${color.replace('text-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.8 + (index * 0.1), duration: 0.8 }}
        />
      </div>

      {/* Click Hint */}
      {onClick && (
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 rounded-2xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white bg-opacity-90 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            คลิกเพื่อกรอง
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
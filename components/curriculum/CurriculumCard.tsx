import { motion } from 'framer-motion';
import { Curriculum } from '@/types/curriculum';

interface CurriculumCardProps {
  curriculum: Curriculum;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (curriculum: Curriculum) => void;
  onDelete: (curriculum: Curriculum) => void;
  onDuplicate: (curriculum: Curriculum) => void;
  onDetails: (curriculum: Curriculum) => void;
  index: number;
}

export default function CurriculumCard({
  curriculum,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onDetails,
  index
}: CurriculumCardProps) {
  const getStatusColor = (status: Curriculum['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Curriculum['status']) => {
    switch (status) {
      case 'active':
        return 'ใช้งาน';
      case 'pending':
        return 'รออนุมัติ';
      case 'inactive':
        return 'ไม่ใช้งาน';
      case 'draft':
        return 'แบบร่าง';
      default:
        return 'ไม่ทราบ';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" }}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 right-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(curriculum.id)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Header with Icon */}
      <div className="flex items-start space-x-4 mb-4" onClick={() => onDetails(curriculum)}>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {curriculum.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {curriculum.description}
          </p>
        </div>
      </div>

      {/* English Title */}
      <p className="text-sm text-gray-500 mb-4 italic">
        {curriculum.englishTitle}
      </p>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">หน่วยกิต</span>
          <span className="text-sm font-semibold text-gray-900">
            {curriculum.totalCredits} หน่วยกิต
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">รายวิชา</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            {curriculum.statistics.totalSubjects} วิชา
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">สถานะ</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(curriculum.status)}`}>
            {getStatusText(curriculum.status)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          อัพเดท: {curriculum.lastUpdated}
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(curriculum);
            }}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="แก้ไข"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(curriculum);
            }}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="ทำสำเนา"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(curriculum);
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="ลบ"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
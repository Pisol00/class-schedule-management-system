import { motion } from 'framer-motion';
import { CurriculumStats as StatsType } from '@/types/curriculum';

interface CurriculumStatsProps {
  stats: StatsType;
}

export default function CurriculumStats({ stats }: CurriculumStatsProps) {
  const statItems = [
    {
      label: 'ทั้งหมด',
      value: stats.total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'ใช้งาน',
      value: stats.active,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'รออนุมัติ',
      value: stats.pending,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'แบบร่าง',
      value: stats.draft,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="hidden lg:flex items-center space-x-6">
      {statItems.map((item, index) => (
        <motion.div 
          key={item.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div 
            className={`inline-flex items-center justify-center w-12 h-12 ${item.bgColor} rounded-xl mb-2`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
          </motion.div>
          <div className="text-sm text-gray-500 font-medium">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';

interface Activity {
  id: string;
  type: 'schedule_updated' | 'conflict_resolved' | 'subject_added' | 'instructor_assigned' | 'room_booked';
  title: string;
  description: string;
  user: string;
  timestamp: string;
  icon: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    const iconClasses = "w-5 h-5";
    
    switch (type) {
      case 'schedule_updated':
        return (
          <svg className={`${iconClasses} text-blue-600`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        );
      case 'conflict_resolved':
        return (
          <svg className={`${iconClasses} text-green-600`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'subject_added':
        return (
          <svg className={`${iconClasses} text-purple-600`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        );
      case 'instructor_assigned':
        return (
          <svg className={`${iconClasses} text-orange-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        );
      case 'room_booked':
        return (
          <svg className={`${iconClasses} text-indigo-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
          </svg>
        );
      default:
        return (
          <svg className={`${iconClasses} text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const getActivityBgColor = (type: Activity['type']) => {
    switch (type) {
      case 'schedule_updated':
        return 'bg-blue-100';
      case 'conflict_resolved':
        return 'bg-green-100';
      case 'subject_added':
        return 'bg-purple-100';
      case 'instructor_assigned':
        return 'bg-orange-100';
      case 'room_booked':
        return 'bg-indigo-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
          <p className="text-gray-600 text-sm mt-1">การเปลี่ยนแปลงและอัพเดทใหม่</p>
        </div>
        <motion.button
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
          whileHover={{ x: 2 }}
          onClick={() => alert('ดูกิจกรรมทั้งหมด')}
        >
          <span>ดูทั้งหมด</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-gray-500">ยังไม่มีกิจกรรมล่าสุด</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
              onClick={() => alert(`ดูรายละเอียด: ${activity.title}`)}
            >
              {/* Icon */}
              <motion.div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityBgColor(activity.type)} flex-shrink-0`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {getActivityIcon(activity.type)}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{activities.length} กิจกรรมล่าสุด</span>
            <span>อัพเดทเมื่อ {activities[0]?.timestamp}</span>
          </div>
        </div>
      )}
    </div>
  );
}
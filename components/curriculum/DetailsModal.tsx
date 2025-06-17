import { motion } from 'framer-motion';
import { Curriculum } from '@/types/curriculum';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  curriculum: Curriculum | null;
}

export default function DetailsModal({
  isOpen,
  onClose,
  curriculum
}: DetailsModalProps) {
  if (!isOpen || !curriculum) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{curriculum.title}</h2>
                <p className="text-gray-600">{curriculum.englishTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">คณะ</label>
                <p className="text-gray-900">{curriculum.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ปริญญา</label>
                <p className="text-gray-900">{curriculum.degree}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ปี พ.ศ.</label>
                <p className="text-gray-900">{curriculum.year}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">เวอร์ชัน</label>
                <p className="text-gray-900">v{curriculum.version}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">วันที่มีผล</label>
                <p className="text-gray-900">{new Date(curriculum.effectiveDate).toLocaleDateString('th-TH')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">สถานะ</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(curriculum.status)}`}>
                  {getStatusText(curriculum.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">คำอธิบาย</h3>
            <p className="text-gray-700 leading-relaxed">{curriculum.description}</p>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติรายวิชา</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{curriculum.statistics.totalSubjects}</div>
                <div className="text-sm text-gray-600">รวมทั้งหมด</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{curriculum.statistics.coreSubjects}</div>
                <div className="text-sm text-gray-600">วิชาแกน</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{curriculum.statistics.majorSubjects}</div>
                <div className="text-sm text-gray-600">วิชาเอก</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{curriculum.statistics.electiveSubjects}</div>
                <div className="text-sm text-gray-600">วิชาเลือก</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{curriculum.statistics.generalSubjects}</div>
                <div className="text-sm text-gray-600">ศึกษาทั่วไป</div>
              </div>
            </div>
          </div>

          {/* Credits and Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">หน่วยกิตและชั่วโมง</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{curriculum.totalCredits}</div>
                <div className="text-sm font-medium text-gray-700">หน่วยกิตรวม</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{curriculum.theoryHours}</div>
                <div className="text-sm font-medium text-gray-700">ชั่วโมงทฤษฎี</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{curriculum.practicalHours}</div>
                <div className="text-sm font-medium text-gray-700">ชั่วโมงปฏิบัติ</div>
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการแก้ไข</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">สร้างเมื่อ:</span>
                <span className="text-gray-900">{new Date(curriculum.createdAt).toLocaleDateString('th-TH')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">แก้ไขล่าสุด:</span>
                <span className="text-gray-900">{curriculum.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">แก้ไขโดย:</span>
                <span className="text-gray-900">{curriculum.updatedBy}</span>
              </div>
              {curriculum.approvalDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">อนุมัติเมื่อ:</span>
                  <span className="text-gray-900">{new Date(curriculum.approvalDate).toLocaleDateString('th-TH')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
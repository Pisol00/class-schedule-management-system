import { motion } from 'framer-motion';
import Modal from '../../ui/Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const icon = (
    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
    </svg>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="นโยบายความเป็นส่วนตัว"
      subtitle="การปกป้องข้อมูลส่วนบุคคล"
      icon={icon}
      iconBgColor="bg-green-100"
    >
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Data Collection */}
        <PolicySection
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          }
          iconBg="bg-blue-500"
          title="การเก็บรวบรวมข้อมูล"
          description="เราเก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการระบบการเรียนการสอนเท่านั้น"
          delay={0.3}
        />
        
        {/* Data Usage */}
        <motion.div 
          className="p-6 bg-blue-50 border border-blue-200 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
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
                <UsageItem text="การยืนยันตัวตนและการเข้าถึงระบบ" />
                <UsageItem text="การจัดการข้อมูลการเรียนการสอน" />
                <UsageItem text="การติดต่อสื่อสารที่เกี่ยวข้องกับการศึกษา" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Security */}
        <PolicySection
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
          }
          iconBg="bg-green-500"
          title="ความปลอดภัย"
          description="เราใช้มาตรการรักษาความปลอดภัยระดับสถาบันการศึกษาในการปกป้องข้อมูลของคุณ"
          delay={0.5}
        />
        
        {/* User Rights */}
        <PolicySection
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
          }
          iconBg="bg-orange-500"
          title="สิทธิของผู้ใช้"
          description="คุณมีสิทธิในการขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้"
          delay={0.6}
        />
      </motion.div>
    </Modal>
  );
}

// Policy Section Component
function PolicySection({ icon, iconBg, title, description, delay }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div 
      className="p-6 bg-blue-50 border border-blue-200 rounded-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">{title}</h4>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Usage Item Component
function UsageItem({ text }: { text: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
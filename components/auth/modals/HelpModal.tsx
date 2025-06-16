import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const icon = (
    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
    </svg>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ศูนย์ช่วยเหลือ"
      subtitle="ข้อมูลการติดต่อและการใช้งาน"
      icon={icon}
      iconBgColor="bg-blue-100"
    >
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Login Help */}
        <motion.div 
          className="p-6 bg-blue-50 border border-blue-200 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
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
            <ContactItem
              icon={
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              }
              iconBg="bg-green-100"
              title="อีเมล์"
              value="it-support@kmitl.ac.th"
              delay={0.5}
            />
            
            <ContactItem
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              }
              iconBg="bg-orange-100"
              title="โทรศัพท์"
              value="02-329-8000 ต่อ 6900"
              delay={0.6}
            />
            
            <ContactItem
              icon={
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              }
              iconBg="bg-purple-100"
              title="เวลาทำการ"
              value="จันทร์ - ศุกร์: 08:30 - 16:30 น."
              delay={0.7}
            />
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
}

// Contact Item Component
function ContactItem({ icon, iconBg, title, value, delay }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div 
      className="p-4 bg-white border border-slate-200 rounded-lg flex items-center space-x-4 transition-all hover:shadow-md hover:translate-y-[-2px]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 5 }}
    >
      <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-blue-600">{value}</p>
      </div>
    </motion.div>
  );
}
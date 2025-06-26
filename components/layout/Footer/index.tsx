import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800 relative overflow-hidden border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* University Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">K</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">IT KMITL</h3>
                    <p className="text-sm text-gray-600">Technology Excellence</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  คณะเทคโนโลยีสารสนเทศ<br/>
                  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <ContactItem 
                    icon={<MapPin className="w-4 h-4" />}
                    text="1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520"
                  />
                  <ContactItem 
                    icon={<Phone className="w-4 h-4" />}
                    text="02-329-8000"
                  />
                  <ContactItem 
                    icon={<Mail className="w-4 h-4" />}
                    text="info@it.kmitl.ac.th"
                  />
                </div>
              </motion.div>
            </div>

            {/* Quick Links & System Status */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
                  
                  ลิงก์ด่วน
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'หน้าแรกระบบ',
                    'คู่มือการใช้งาน', 
                    'รายงานปัญหา',
                    'ความช่วยเหลือ',
                    'นโยบายความเป็นส่วนตัว',
                    'เงื่อนไขการใช้งาน'
                  ].map((link, index) => (
                    <QuickLink key={link} label={link} delay={index * 0.1} />
                  ))}
                </div>
              </motion.div>
              
              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                
                <div className="bg-white/80 rounded-xl p-6 backdrop-blur-sm border border-gray-200 shadow-lg">
                  <div className="space-y-4">
                    
                    {/* System Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">สถานะ</span>
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-green-600 font-medium">ออนไลน์</span>
                      </div>
                    </div>

                    {/* Version */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">เวอร์ชัน</span>
                      <span className="text-sm font-mono text-blue-600">v2.1.4</span>
                    </div>

                    {/* Last Update */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">อัปเดตล่าสุด</span>
                      <span className="text-sm text-gray-700">15 มี.ค. 2567</span>
                    </div>

                    {/* Developers */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">ผู้พัฒนาระบบ:</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>• นายพิศลย์ อุตตาลกาญจนา</div>
                        <div>• นางสาวภัทรภร จิตต์ปราณี</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-200 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              <p>&copy; 2567 IT KMITL - สงวนลิขสิทธิ์ทุกประการ</p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <SocialLink 
                icon={<Globe className="w-5 h-5" />}
                label="เว็บไซต์คณะ"
                delay={0.1}
              />
              <SocialLink 
                icon={<Facebook className="w-5 h-5" />}
                label="Facebook"
                delay={0.2}
              />
              <SocialLink 
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
                delay={0.3}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

// Contact Item Component
function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start space-x-3 text-sm text-gray-600">
      <div className="text-gray-500 mt-0.5 flex-shrink-0">
        {icon}
      </div>
      <span className="leading-relaxed">{text}</span>
    </div>
  );
}

// Quick Link Component
function QuickLink({ label, delay = 0 }) {
  return (
    <motion.a
      href="#"
      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 block p-2 rounded-lg hover:bg-blue-50"
      onClick={(e) => {
        e.preventDefault();
        alert(`กำลังเปิด${label}`);
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: delay + 0.3 }}
      whileHover={{ x: 4 }}
    >
      {label}
    </motion.a>
  );
}

// Social Link Component
function SocialLink({ icon, label, delay = 0 }) {
  return (
    <motion.a
      href="#"
      className="p-3 rounded-xl bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-md border border-gray-200"
      title={label}
      onClick={(e) => {
        e.preventDefault();
        if (label === 'เว็บไซต์คณะ') {
          alert('กำลังเปิดเว็บไซต์คณะเทคโนโลยีสารสนเทศ KMITL');
        } else {
          alert(`เปิดหน้า ${label} ของ IT KMITL`);
        }
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay + 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}
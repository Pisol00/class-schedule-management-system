import { motion } from 'framer-motion';
import Logo from '../../common/Logo';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-white border-t border-slate-200 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* KMITL Info */}
            <div className="lg:col-span-2">
              <Logo size="medium" />
              <p className="text-sm text-slate-600 leading-relaxed mb-4 mt-6">
                สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br/>
                คณะเทคโนโลยีสารสนเทศ
              </p>
              <ContactInfo />
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                ลิงก์ด่วน
              </h4>
              <ul className="space-y-3">
                {[
                  'หน้าแรกระบบ',
                  'คู่มือการใช้งาน', 
                  'รายงานปัญหา',
                  'ความช่วยเหลือ'
                ].map((link) => (
                  <QuickLink key={link} label={link} />
                ))}
              </ul>
            </div>
            
            {/* System Info */}
            <SystemInfo />
          </div>
        </div>
        
        {/* Bottom Footer */}
        <BottomFooter />
      </div>
    </motion.footer>
  );
}

// Contact Info Component
function ContactInfo() {
  return (
    <div className="text-sm text-slate-600 space-y-2">
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
        <span>1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
        </svg>
        <span>02-329-8000</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        <span>info@it.kmitl.ac.th</span>
      </div>
    </div>
  );
}

// Quick Link Component
function QuickLink({ label }: { label: string }) {
  return (
    <motion.li>
      <a 
        href="#" 
        className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          alert(`กำลังเปิด${label}`);
        }}
      >
        {label}
      </a>
    </motion.li>
  );
}

// System Info Component
function SystemInfo() {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
        ข้อมูลระบบ
      </h4>
      <ul className="space-y-3">
        <li>
          <div className="text-sm text-slate-600">
            <span className="font-medium">เวอร์ชัน:</span> v2.1.4
          </div>
        </li>
        <li>
          <div className="text-sm text-slate-600">
            <span className="font-medium">อัปเดตล่าสุด:</span> 15 มี.ค. 2567
          </div>
        </li>
        <li>
          <div className="text-sm text-slate-600">
            <span className="font-medium">สถานะระบบ:</span> 
            <span className="inline-flex items-center space-x-1 ml-1">
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-green-600">ปกติ</span>
            </span>
          </div>
        </li>
        <li className="pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 space-y-1">
            <div className="font-medium mb-2">ผู้พัฒนาระบบ:</div>
            <div className="flex flex-col space-y-1">
              <span>• นายพิศลย์ อุตตาลกาญจนา</span>
              <span>• นางสาวภัทรภร จิตต์ปราณี</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

// Bottom Footer Component
function BottomFooter() {
  return (
    <div className="border-t border-slate-200 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <div className="text-sm text-slate-600">
          <p>&copy; 2567 สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (IT KMITL)</p>
          <p className="mt-1">สงวนลิขสิทธิ์ทุกประการ</p>
        </div>
        
        {/* Social Links & Additional Info */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
          
          {/* Social Links */}
          <SocialLinks />
          
          {/* Additional Links */}
          <div className="flex items-center space-x-4 text-sm">
            <a 
              href="#" 
              className="text-slate-500 hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('กำลังเปิดนโยบายความเป็นส่วนตัว');
              }}
            >
              นโยบายความเป็นส่วนตัว
            </a>
            <span className="text-slate-300">|</span>
            <a 
              href="#" 
              className="text-slate-500 hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('กำลังเปิดเงื่อนไขการใช้งาน');
              }}
            >
              เงื่อนไขการใช้งาน
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Social Links Component
function SocialLinks() {
  const socialLinks = [
    { 
      name: 'Website คณะ', 
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
    },
    { 
      name: 'Facebook', 
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' 
    },
    { 
      name: 'Instagram', 
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
    }
  ];

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social) => (
        <motion.a 
          key={social.name}
          href="#" 
          className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          title={social.name}
          onClick={(e) => {
            e.preventDefault();
            if (social.name === 'Website คณะ') {
              alert('กำลังเปิดเว็บไซต์คณะเทคโนโลยีสารสนเทศ KMITL');
            } else {
              alert(`เปิดหน้า ${social.name} ของ IT KMITL`);
            }
          }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d={social.icon}/>
          </svg>
        </motion.a>
      ))}
    </div>
  );
}
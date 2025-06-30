import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Modal from '@/components/ui/Modal';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  // Memoize the static icon to prevent re-creation
  const icon = useMemo(() => (
    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
    </svg>
  ), []);

  // Memoize the introduction section
  const introductionSection = useMemo(() => (
    <div>
      <p className="text-lg text-gray-800 leading-relaxed">
        ยินดีต้อนรับสู่ระบบจัดการตารางเรียนตารางสอน สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง 
        หากคุณมีปัญหาหรือต้องการความช่วยเหลือ โปรดดูข้อมูลด้านล่างหรือติดต่อทีมงานของเรา
      </p>
    </div>
  ), []);

  // Memoize the getting started section
  const gettingStartedSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        1. การเริ่มต้นใช้งาน
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">การเข้าสู่ระบบครั้งแรก</h4>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600">
            <li>คลิกปุ่ม "เข้าสู่ระบบด้วย Google" หน้าแรกของระบบ</li>
            <li>ใช้บัญชี Google ของมหาวิทยาลัย (@kmitl.ac.th) ในการเข้าสู่ระบบ</li>
            <li>รอให้ระบบยืนยันตัวตนและสิทธิการเข้าถึง</li>
            <li>หากเป็นการใช้งานครั้งแรก ระบบจะสร้างโปรไฟล์ให้อัตโนมัติ</li>
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">การตั้งค่าเบื้องต้น</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ตรวจสอบข้อมูลส่วนตัวในหน้าโปรไฟล์</li>
            <li>ตั้งค่าการแจ้งเตือนตามความต้องการ</li>
            <li>ทำความเข้าใจกับเมนูและฟังก์ชันต่างๆ</li>
            <li>ทดลองสร้างตารางเรียนหรือตารางสอนตัวอย่าง</li>
          </ul>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the main features section
  const mainFeaturesSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        2. ฟังก์ชันหลักของระบบ
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">สำหรับนักศึกษา</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ดูตารางเรียนส่วนตัว</li>
            <li>ค้นหาและดูตารางของรายวิชาต่างๆ</li>
            <li>ตรวจสอบการเปลี่ยนแปลงตารางเรียน</li>
            <li>ส่งออกตารางเรียนเป็นไฟล์ PDF หรือรูปภาพ</li>
            <li>รับการแจ้งเตือนเมื่อมีการเปลี่ยนแปลงตารางเรียน</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">สำหรับอาจารย์และเจ้าหน้าที่</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>สร้างและจัดการตารางสอน</li>
            <li>กำหนดเวลาและสถานที่เรียน</li>
            <li>จัดการข้อมูลรายวิชาและหลักสูตร</li>
            <li>ตรวจสอบความขัดแย้งของตารางเวลา</li>
            <li>สร้างรายงานและสถิติการใช้ห้องเรียน</li>
            <li>ส่งการแจ้งเตือนไปยังนักศึกษา</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ฟีเจอร์ทั่วไป</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ค้นหาข้อมูลด้วยตัวกรองต่างๆ</li>
            <li>การซิงค์ข้อมูลแบบเรียลไทม์</li>
            <li>รองรับการใช้งานบนอุปกรณ์มือถือ</li>
            <li>ระบบสำรองข้อมูลอัตโนมัติ</li>
          </ul>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the troubleshooting section
  const troubleshootingSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        3. การแก้ไขปัญหาเบื้องต้น
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ปัญหาการเข้าสู่ระบบ</h4>
          <div className="space-y-3 ml-4">
            <div>
              <p className="font-medium text-gray-700">ไม่สามารถเข้าสู่ระบบได้</p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                <li>ตรวจสอบว่าใช้บัญชี Google ของมหาวิทยาลัย (@kmitl.ac.th)</li>
                <li>ล้างแคชและคุกกี้ของเบราว์เซอร์</li>
                <li>ปิดการใช้ Ad Blocker ชั่วคราว</li>
                <li>ลองใช้เบราว์เซอร์อื่นหรือโหมดไม่เก็บประวัติ</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-gray-700">แสดงข้อความ "Access Denied"</p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                <li>บัญชีของคุณอาจยังไม่ได้รับสิทธิ์การเข้าถึง</li>
                <li>ติดต่อเจ้าหน้าที่เพื่อขอเพิ่มสิทธิ์</li>
                <li>ตรวจสอบสถานะการเป็นนักศึกษาหรือเจ้าหน้าที่</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ปัญหาการใช้งาน</h4>
          <div className="space-y-3 ml-4">
            <div>
              <p className="font-medium text-gray-700">ข้อมูลไม่อัปเดต</p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                <li>รีเฟรชหน้าเว็บ (F5 หรือ Ctrl+R)</li>
                <li>ออกจากระบบแล้วเข้าใหม่</li>
                <li>ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-gray-700">ไม่สามารถส่งออกข้อมูลได้</p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                <li>ตรวจสอบการตั้งค่าการดาวน์โหลดของเบราว์เซอร์</li>
                <li>อนุญาตให้เว็บไซต์สามารถดาวน์โหลดไฟล์ได้</li>
                <li>ลองใช้รูปแบบไฟล์อื่น (PDF, Excel, รูปภาพ)</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">ระบบทำงานช้า</p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                <li>ปิดแท็บเบราว์เซอร์อื่นที่ไม่จำเป็น</li>
                <li>ตรวจสอบความเร็วอินเทอร์เน็ต</li>
                <li>หลีกเลี่ยงการใช้งานในช่วงเวลาที่มีผู้ใช้มาก (8:00-10:00 น.)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the system requirements section
  const systemRequirementsSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        4. ข้อกำหนดของระบบ
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">เบราว์เซอร์ที่แนะนำ</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li><strong>Google Chrome</strong> เวอร์ชัน 90 ขึ้นไป (แนะนำ)</li>
            <li><strong>Mozilla Firefox</strong> เวอร์ชัน 88 ขึ้นไป</li>
            <li><strong>Microsoft Edge</strong> เวอร์ชัน 90 ขึ้นไป</li>
            <li><strong>Safari</strong> เวอร์ชัน 14 ขึ้นไป (สำหรับ macOS)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">การตั้งค่าที่จำเป็น</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>เปิดใช้งาน JavaScript</li>
            <li>อนุญาตการใช้งานคุกกี้ (Cookies)</li>
            <li>เปิดใช้งาน Pop-ups สำหรับเว็บไซต์นี้</li>
            <li>ความละเอียดหน้าจอขั้นต่ำ 1024x768 พิกเซล</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">การเชื่อมต่ออินเทอร์เน็ต</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ความเร็วอินเทอร์เน็ตขั้นต่ำ 1 Mbps</li>
            <li>การเชื่อมต่อที่เสถียรเพื่อป้องกันการสูญหายของข้อมูล</li>
            <li>หลีกเลี่ยงการใช้ VPN หากไม่จำเป็น</li>
          </ul>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the contact information section
  const contactInformationSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        5. การติดต่อขอความช่วยเหลือ
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ช่องทางการติดต่อ</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-800 mb-2">ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>โทรศัพท์:</strong> 02-329-8000 ต่อ 6900</p>
                  <p><strong>โทรสาร:</strong> 02-329-8323</p>
                  <p><strong>อีเมล:</strong> it-support@kmitl.ac.th</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-2">ที่ตั้งสำนักงาน</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>อาคาร:</strong> อาคาร 40 ชั้น 1</p>
                  <p><strong>ห้อง:</strong> 40101-40110</p>
                  <p><strong>แผนที่:</strong> <a href="#" className="text-blue-600 hover:underline">ดูแผนที่</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">เวลาให้บริการ</h4>
          <div className="ml-4">
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li><strong>วันจันทร์ - ศุกร์:</strong> 08:30 - 12:00 น. และ 13:00 - 16:30 น.</li>
              <li><strong>วันเสาร์ - อาทิตย์:</strong> ปิดให้บริการ</li>
              <li><strong>วันหยุดนักขัตฤกษ์:</strong> ปิดให้บริการ</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              *สำหรับปัญหาเร่งด่วนนอกเวลาทำการ สามารถส่งอีเมลได้ และจะได้รับการตอบกลับในวันทำการถัดไป
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">การรายงานปัญหา</h4>
          <div className="ml-4">
            <p className="text-gray-600 mb-2">เมื่อติดต่อขอความช่วยเหลือ กรุณาแจ้งข้อมูลต่อไปนี้:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>ชื่อ-นามสกุล และรหัสประจำตัว</li>
              <li>รายละเอียดปัญหาที่เกิดขึ้น</li>
              <li>ขั้นตอนที่ทำก่อนเกิดปัญหา</li>
              <li>เบราว์เซอร์และระบบปฏิบัติการที่ใช้</li>
              <li>หน้าจอแสดงข้อผิดพลาด (Screenshot) หากมี</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the FAQ section
  const faqSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        6. คำถามที่พบบ่อย (FAQ)
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Q: ระบบใช้งานได้ตลอด 24 ชั่วโมงหรือไม่?</h4>
          <p className="text-gray-600 ml-4">A: ระบบให้บริการตลอด 24 ชั่วโมง แต่อาจมีการปิดปรับปรุงในบางช่วงเวลา โดยจะแจ้งให้ทราบล่วงหน้า</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Q: สามารถใช้งานบนมือถือได้หรือไม่?</h4>
          <p className="text-gray-600 ml-4">A: ได้ ระบบรองรับการใช้งานบนอุปกรณ์มือถือและแท็บเล็ต แต่แนะนำให้ใช้งานบนคอมพิวเตอร์เพื่อประสบการณ์ที่ดีที่สุด</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Q: หากลืมรหัสผ่าน Google จะทำอย่างไร?</h4>
          <p className="text-gray-600 ml-4">A: ระบบใช้การเข้าสู่ระบบผ่าน Google SSO หากลืมรหัสผ่านให้ติดต่อศูนย์คอมพิวเตอร์ของมหาวิทยาลัย</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Q: ข้อมูลในระบบปลอดภัยแค่ไหน?</h4>
          <p className="text-gray-600 ml-4">A: ระบบใช้การเข้ารหัสข้อมูล SSL และมีการสำรองข้อมูลสม่ำเสมอ รวมถึงมีระบบควบคุมการเข้าถึงแบบหลายระดับ</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Q: สามารถใช้งานร่วมกับปฏิทิน Google ได้หรือไม่?</h4>
          <p className="text-gray-600 ml-4">A: ปัจจุบันยังไม่รองรับการซิงค์กับ Google Calendar แต่สามารถส่งออกข้อมูลเป็น .ics file เพื่อนำไปใช้ได้</p>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the footer
  const footer = useMemo(() => (
    <div className="pt-6 border-t border-gray-200 text-center">
      <p className="text-sm text-gray-500">
        หากไม่พบคำตอบที่ต้องการ กรุณาติดต่อทีมสนับสนุนของเราโดยตรง
      </p>
      <p className="text-sm text-gray-500 mt-2">
        เราพร้อมให้ความช่วยเหลือและแก้ไขปัญหาให้คุณอย่างรวดเร็ว
      </p>
    </div>
  ), []);

  // Memoize the entire modal content - only render when modal is open
  const modalContent = useMemo(() => {
    if (!isOpen) return null;

    return (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        {introductionSection}
        {gettingStartedSection}
        {mainFeaturesSection}
        {troubleshootingSection}
        {systemRequirementsSection}
        {contactInformationSection}
        {faqSection}
        {footer}
      </div>
    );
  }, [
    isOpen,
    introductionSection,
    gettingStartedSection,
    mainFeaturesSection,
    troubleshootingSection,
    systemRequirementsSection,
    contactInformationSection,
    faqSection,
    footer
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ศูนย์ช่วยเหลือ"
      subtitle="คู่มือการใช้งานและการติดต่อ"
      icon={icon}
      iconBgColor="bg-blue-100"
    >
      {modalContent}
    </Modal>
  );
}
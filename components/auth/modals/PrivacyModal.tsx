import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Modal from '../../ui/Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  // Memoize the static icon to prevent re-creation
  const icon = useMemo(() => (
    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
    </svg>
  ), []);

  // Memoize the introduction section
  const introductionSection = useMemo(() => (
    <div>
      <p className="text-lg text-gray-800 leading-relaxed">
        สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบังให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของคุณ 
        และปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 อย่างเคร่งครัด
      </p>
    </div>
  ), []);

  // Memoize the data collection section
  const dataCollectionSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        1. การเก็บรวบรวมข้อมูล
      </h3>
      
      <p className="mb-4">
        เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณในกรณีดังต่อไปนี้:
      </p>

      <div className="space-y-4 ml-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลที่ได้รับจากบัญชี Google</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ชื่อ-นามสกุล</li>
            <li>ที่อยู่อีเมลของมหาวิทยาลัย</li>
            <li>รูปโปรไฟล์ (หากมี)</li>
            <li>รหัสผู้ใช้ที่ไม่ซ้ำกัน (Unique ID)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลการใช้งานระบบ</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>วันและเวลาในการเข้าสู่ระบบ</li>
            <li>กิจกรรมที่ดำเนินการในระบบ</li>
            <li>ข้อมูลการเข้าถึงหน้าต่างๆ ของระบบ</li>
            <li>ที่อยู่ IP และข้อมูลเทคนิคเบื้องต้น</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลทางการศึกษา</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>ข้อมูลตารางเรียนและตารางสอน</li>
            <li>รายวิชาที่เกี่ยวข้อง</li>
            <li>การจัดตารางเวลาและการใช้งานระบบ</li>
          </ul>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the purpose of use section
  const purposeOfUseSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        2. วัตถุประสงค์ในการใช้ข้อมูล
      </h3>
      
      <p className="mb-4">
        เราใช้ข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายดังต่อไปนี้:
      </p>

      <ol className="list-decimal list-inside space-y-3 ml-4">
        <li>
          <strong>การยืนยันตัวตนและการควบคุมการเข้าถึง:</strong> เพื่อให้แน่ใจว่าเฉพาะผู้ที่ได้รับอนุญาตเท่านั้นที่สามารถเข้าถึงระบบได้
        </li>
        <li>
          <strong>การจัดการระบบการเรียนการสอน:</strong> การสร้าง จัดการ และปรับปรุงตารางเรียนตารางสอน
        </li>
        <li>
          <strong>การติดต่อสื่อสาร:</strong> แจ้งข่าวสาร การเปลี่ยนแปลง หรือข้อมูลที่เกี่ยวข้องกับการใช้งานระบบ
        </li>
        <li>
          <strong>การรักษาความปลอดภัย:</strong> ตรวจสอบและป้องกันการใช้งานที่ไม่เหมาะสมหรือผิดกฎหมาย
        </li>
        <li>
          <strong>การปรับปรุงและพัฒนา:</strong> วิเคราะห์การใช้งานเพื่อปรับปรุงประสิทธิภาพและการให้บริการ
        </li>
        <li>
          <strong>การปฏิบัติตามกฎหมาย:</strong> เพื่อการปฏิบัติตามข้อกำหนดทางกฎหมายที่เกี่ยวข้อง
        </li>
      </ol>
    </section>
  ), []);

  // Memoize the data sharing section
  const dataSharingSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        3. การเปิดเผยข้อมูล
      </h3>
      
      <p className="mb-4">
        เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม ยกเว้นในกรณีดังต่อไปนี้:
      </p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>เมื่อได้รับความยินยอมจากคุณเป็นลายลักษณ์อักษร</li>
        <li>เพื่อปฏิบัติตามคำสั่งศาล หรือกฎหมายที่เกี่ยวข้อง</li>
        <li>เพื่อปกป้องสิทธิ ทรัพย์สิน หรือความปลอดภัยของสถาบัน นักศึกษา หรือบุคคลอื่น</li>
        <li>การส่งต่อข้อมูลให้แก่หน่วยงานภายในสถาบันที่เกี่ยวข้องกับการศึกษาโดยตรง</li>
      </ul>
    </section>
  ), []);

  // Memoize the data security section
  const dataSecuritySection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        4. การรักษาความปลอดภัยของข้อมูล
      </h3>
      
      <p className="mb-4">
        เราดำเนินมาตรการรักษาความปลอดภัยข้อมูลที่เหมาะสมและจำเป็น ดังนี้:
      </p>

      <div className="space-y-4 ml-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">มาตรการทางเทคนิค</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>การเข้ารหัสข้อมูลด้วยมาตรฐาน SSL/TLS ในระหว่างการส่งข้อมูล</li>
            <li>การเข้ารหัสข้อมูลในระบบฐานข้อมูล</li>
            <li>ระบบการยืนยันตัวตนแบบหลายขั้นตอน (Multi-factor Authentication)</li>
            <li>การติดตั้งและอัปเดตระบบความปลอดภัยอย่างสม่ำเสมอ</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">มาตรการทางการบริหาร</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>การกำหนดสิทธิการเข้าถึงข้อมูลตามหน้าที่และความจำเป็น</li>
            <li>การฝึกอบรมเจ้าหน้าที่เกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล</li>
            <li>การสำรองข้อมูลและแผนการกู้คืนข้อมูลในกรณีฉุกเฉิน</li>
            <li>การตรวจสอบและบันทึกการเข้าถึงระบบ</li>
          </ul>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the data retention section
  const dataRetentionSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        5. ระยะเวลาการเก็บรักษาข้อมูล
      </h3>
      
      <p className="mb-4">
        เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณเท่าที่จำเป็นเพื่อบรรลุวัตถุประสงค์ตามที่ระบุไว้ หรือตามระยะเวลาที่กฎหมายกำหนด:
      </p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>ข้อมูลการใช้งานระบบ:</strong> 1 ปีนับจากวันที่สิ้นสุดการใช้งาน</li>
        <li><strong>ข้อมูลการเรียนการสอน:</strong> ตลอดระยะเวลาการศึกษาและ 5 ปีหลังสำเร็จการศึกษา</li>
        <li><strong>บันทึกการเข้าถึงระบบ:</strong> 2 ปีเพื่อวัตถุประสงค์ด้านความปลอดภัย</li>
      </ul>

      <p className="mt-4">
        เมื่อสิ้นสุดระยะเวลาการเก็บรักษา เราจะทำลายหรือลบข้อมูลส่วนบุคคลของคุณอย่างปลอดภัย
      </p>
    </section>
  ), []);

  // Memoize the your rights section
  const yourRightsSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        6. สิทธิของเจ้าของข้อมูล
      </h3>
      
      <p className="mb-4">
        ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 คุณมีสิทธิดังต่อไปนี้:
      </p>

      <ol className="list-decimal list-inside space-y-3 ml-4">
        <li>
          <strong>สิทธิในการเข้าถึงและขอสำเนาข้อมูล:</strong> ขอดูข้อมูลส่วนบุคคลที่เราเก็บรักษาไว้เกี่ยวกับคุณ
        </li>
        <li>
          <strong>สิทธิในการขอแก้ไขข้อมูล:</strong> ขอให้แก้ไขข้อมูลที่ไม่ถูกต้อง ไม่เป็นปัจจุบัน หรือไม่สมบูรณ์
        </li>
        <li>
          <strong>สิทธิในการขอลบข้อมูล:</strong> ขอให้ลบข้อมูลส่วนบุคคลในกรณีที่เหมาะสม
        </li>
        <li>
          <strong>สิทธิในการขอระงับการใช้ข้อมูล:</strong> ขอให้หยุดการประมวลผลข้อมูลชั่วคราว
        </li>
        <li>
          <strong>สิทธิในการคัดค้านการประมวลผล:</strong> คัดค้านการประมวลผลข้อมูลในกรณีที่กฎหมายอนุญาต
        </li>
        <li>
          <strong>สิทธิในการขอให้โอนข้อมูล:</strong> ขอรับข้อมูลในรูปแบบที่สามารถอ่านได้ด้วยเครื่องจักร
        </li>
      </ol>

      <p className="mt-4 text-gray-600">
        หากคุณต้องการใช้สิทธิใดสิทธิหนึ่งข้างต้น กรุณาติดต่อเราตามช่องทางที่ระบุด้านล่าง
      </p>
    </section>
  ), []);

  // Memoize the contact information section
  const contactInformationSection = useMemo(() => (
    <section>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        7. การติดต่อ
      </h3>
      
      <p className="mb-4">
        หากคุณมีคำถาม ข้อสงสัย หรือต้องการใช้สิทธิของคุณ กรุณาติดต่อ:
      </p>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-2">
          <p><strong>หน่วยงาน:</strong> ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร</p>
          <p><strong>ที่อยู่:</strong> สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>
          <p className="ml-16">1 ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพมหานคร 10520</p>
          <p><strong>โทรศัพท์:</strong> 02-329-8000 ต่อ 6900</p>
          <p><strong>อีเมล:</strong> privacy@kmitl.ac.th</p>
          <p><strong>เวลาทำการ:</strong> จันทร์ - ศุกร์ เวลา 08:30 - 16:30 น.</p>
        </div>
      </div>
    </section>
  ), []);

  // Memoize the footer
  const footer = useMemo(() => (
    <div className="pt-6 border-t border-gray-200 text-center">
      <p className="text-sm text-gray-500">
        นโยบายความเป็นส่วนตัวฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่ <strong>1 มกราคม พ.ศ. 2568</strong>
      </p>
      <p className="text-sm text-gray-500 mt-2">
        เราขอสงวนสิทธิ์ในการปรับปรุงหรือเปลี่ยนแปลงนโยบายนี้ โดยจะแจ้งให้คุณทราบล่วงหน้าผ่านระบบหรือช่องทางการสื่อสารอื่น
      </p>
    </div>
  ), []);

  // Memoize the entire modal content - only render when modal is open
  const modalContent = useMemo(() => {
    if (!isOpen) return null;

    return (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        {introductionSection}
        {dataCollectionSection}
        {purposeOfUseSection}
        {dataSharingSection}
        {dataSecuritySection}
        {dataRetentionSection}
        {yourRightsSection}
        {contactInformationSection}
        {footer}
      </div>
    );
  }, [
    isOpen,
    introductionSection,
    dataCollectionSection,
    purposeOfUseSection,
    dataSharingSection,
    dataSecuritySection,
    dataRetentionSection,
    yourRightsSection,
    contactInformationSection,
    footer
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="นโยบายความเป็นส่วนตัว"
      subtitle="การปกป้องข้อมูลส่วนบุคคล"
      icon={icon}
      iconBgColor="bg-green-100"
    >
      {modalContent}
    </Modal>
  );
}
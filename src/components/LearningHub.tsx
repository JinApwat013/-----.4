import React, { useState } from 'react';
import {
  Lock,
  Globe,
  Search,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  BookOpen,
  Lightbulb,
  Monitor,
  Cpu,
  HardDrive,
  Keyboard,
  Mouse,
  Printer,
  Volume2,
  Laptop,
  Power,
  Eye,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Shield,
  Zap,
} from 'lucide-react';
import { sounds } from '../utils/audio';

export const LearningHub: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const topics = [
    {
      id: 1,
      icon: Lock,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-100 text-amber-800',
      title: 'การปกป้องข้อมูลส่วนตัวและการตั้งรหัสผ่านที่ปลอดภัย',
      summary: 'เรียนรู้วิธีดูแลข้อมูลสำคัญ ไม่เปิดเผยข้อมูลส่วนตัว และสร้างรหัสผ่านที่ปลอดภัยจากการถูกแฮก',
      tags: ['ข้อมูลส่วนตัว', 'รหัสผ่านปลอดภัย', 'ความเป็นส่วนตัว'],
    },
    {
      id: 2,
      icon: Globe,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-100 text-blue-800',
      title: 'คุณลักษณะและความรับผิดชอบของพลเมืองดิจิทัล',
      summary: 'เรียนรู้การใช้เทคโนโลยีอย่างรับผิดชอบ มีมารยาท เคารพสิทธิของผู้อื่น และไม่กลั่นแกล้งบนโลกออนไลน์',
      tags: ['พลเมืองดิจิทัล', 'มารยาทในเน็ต', 'เคารพสิทธิ'],
    },
    {
      id: 3,
      icon: Search,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      title: 'การรู้เท่าทันสื่อและการตรวจสอบข้อมูลบนอินเทอร์เน็ต',
      summary: 'ฝึกหยุดคิด วิเคราะห์ข้อมูล ค้นหาความจริง และตรวจสอบความน่าเชื่อถือก่อนที่จะเชื่อหรือส่งต่อ',
      tags: ['รู้เท่าทันสื่อ', 'ตรวจสอบข่าวปลอม', 'หยุด-คิด-ตรวจสอบ'],
    },
    {
      id: 4,
      icon: Monitor,
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-100 text-purple-800',
      title: 'อุปกรณ์คอมพิวเตอร์และการใช้งานอย่างถูกต้อง',
      summary: 'รู้จัก 4 หน่วยสำคัญของคอมพิวเตอร์ (รับข้อมูล, ประมวลผล, แสดงผล, จัดเก็บ) และวิธีดูแลรักษาอย่างถูกวิธี',
      tags: ['อุปกรณ์คอมพิวเตอร์', 'ฮาร์ดแวร์', 'การดูแลรักษา'],
    },
  ];

  const handleSelectTopic = (id: number) => {
    sounds.playTap();
    setSelectedTopicId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg shadow-amber-900/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" /> แหล่งเรียนรู้ดิจิทัล ป.4
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              📚 คลังความรู้: การใช้เทคโนโลยีสารสนเทศอย่างปลอดภัย
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              คลิกเลือกหัวข้อที่ต้องการเรียนรู้ เพื่อศึกษาเนื้อหา ตัวอย่างสถานการณ์จริง และข้อควรจำ
            </p>
          </div>

          {selectedTopicId !== null && (
            <button
              type="button"
              onClick={() => setSelectedTopicId(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition self-start md:self-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับไปเลือกหัวข้อ</span>
            </button>
          )}
        </div>
      </div>

      {/* Topics Grid when no specific topic is selected */}
      {selectedTopicId === null ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className="group bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${topic.badgeColor}`}>
                    หัวข้อที่ {topic.id}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 leading-snug group-hover:text-blue-700 transition">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {topic.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    เรียนรู้ →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Topic Content */
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {selectedTopicId === 1 && <TopicOneDetail />}
          {selectedTopicId === 2 && <TopicTwoDetail />}
          {selectedTopicId === 3 && <TopicThreeDetail />}
          {selectedTopicId === 4 && <TopicFourDetail />}

          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedTopicId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลักหัวข้อ</span>
            </button>

            <div className="flex gap-2">
              {selectedTopicId > 1 && (
                <button
                  type="button"
                  onClick={() => handleSelectTopic(selectedTopicId - 1)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  ← หัวข้อก่อนหน้า
                </button>
              )}
              {selectedTopicId < 4 && (
                <button
                  type="button"
                  onClick={() => handleSelectTopic(selectedTopicId + 1)}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition cursor-pointer"
                >
                  หัวข้อถัดไป →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Topic 1: การปกป้องข้อมูลส่วนตัวและการตั้งรหัสผ่าน
const TopicOneDetail: React.FC = () => {
  return (
    <article className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-lg space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          หัวข้อที่ 1
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          🔐 การปกป้องข้อมูลส่วนตัวและการตั้งรหัสผ่านที่ปลอดภัย
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          เข้าใจความหมายของข้อมูลส่วนตัว วิธีเก็บรักษาความลับ และเทคนิคการตั้งรหัสผ่านให้แข็งแกร่ง
        </p>
      </div>

      {/* Section: ข้อมูลส่วนตัวคืออะไร */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
        <h4 className="text-lg font-bold text-amber-950 flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-600" /> ข้อมูลส่วนตัว (Personal Data) คืออะไร?
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          ข้อมูลส่วนตัว คือ ข้อมูลที่สามารถใช้ <strong>ระบุตัวตนของเราได้ว่าเราเป็นใคร</strong> หรือใช้ในการติดตาม ติดต่อ หรือระบุสถานที่ที่เราอยู่ หากผู้ไม่หวังดีได้ไป อาจถูกนำไปใช้ในทางที่ผิดหรือสร้างความเดือดร้อน
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'ชื่อ–นามสกุลจริง', icon: '👤' },
            { label: 'ที่อยู่บ้าน / พิกัด GPS', icon: '🏠' },
            { label: 'เบอร์โทรศัพท์ส่วนตัว', icon: '📞' },
            { label: 'วันเดือนปีเกิด', icon: '🎂' },
            { label: 'ชื่อผู้ใช้และรหัสผ่าน', icon: '🔑' },
            { label: 'เลขประจำตัวประชาชน', icon: '🪪' },
            { label: 'รูปภาพส่วนตัว / ครอบครัว', icon: '📷' },
            { label: 'ชื่อโรงเรียนและชั้นเรียน', icon: '🏫' },
          ].map((item) => (
            <div key={item.label} className="p-3 bg-white rounded-xl border border-amber-100 text-center shadow-2xs">
              <span className="text-2xl block mb-1">{item.icon}</span>
              <span className="text-xs font-bold text-slate-800">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: 4 วิธีปกป้องข้อมูลส่วนตัว */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> 4 วิธีปฏิบัติเพื่อปกป้องข้อมูลส่วนตัว
        </h4>

        {/* Reference Educational Image */}
        <a
          href="https://www.ttbbank.com/th/fin-tips/detail/password"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4 overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group"
        >
          <img
            src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1280"
            alt="ภาพประกอบวิธีปกป้องข้อมูลส่วนตัวและรหัสผ่าน"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full max-h-64 object-cover group-hover:scale-[1.02] transition duration-300"
          />
        </a>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-sm font-bold text-blue-900 mb-1">1. ไม่บอกข้อมูลสำคัญกับคนแปลกหน้า</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              หากมีคนในเกมออนไลน์หรือโซเชียลมีเดียถามชื่อ ที่อยู่ เบอร์โทร หรือโรงเรียน ให้ปฏิเสธและแจ้งผู้ปกครองทันที
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-sm font-bold text-blue-900 mb-1">2. คิดก่อนโพสต์ (Think Before Post)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ก่อนแชร์รูปถ่ายหรือข้อความ คิดเสมอว่าปลอดภัยหรือไม่ ไม่ควรโพสต์ตั๋วเครื่องบิน บัตรประจำตัว หรือบอกว่าอยู่บ้านคนเดียว
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-sm font-bold text-blue-900 mb-1">3. ตั้งค่าความเป็นส่วนตัว (Privacy Settings)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ตรวจสอบการตั้งค่าบัญชี ให้เฉพาะเพื่อนและคนที่ไว้ใจได้เท่านั้นที่สามารถเห็นรูปหรือข้อมูลส่วนตัวของเรา
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-sm font-bold text-blue-900 mb-1">4. รหัสผ่านเป็นความลับสุดยอด</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ไม่บอกรหัสผ่านให้เพื่อนสนิท ไม่จดแปะไว้หน้าจอ และ Log out ออกจากระบบทุกครั้งเมื่อใช้คอมพิวเตอร์สาธารณะ
            </p>
          </div>
        </div>
      </div>

      {/* Section: การตั้งรหัสผ่านที่ปลอดภัย */}
      <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200">
        <h4 className="text-lg font-bold text-blue-950 mb-3">
          🔑 หลักการตั้งรหัสผ่าน (Password) ที่ปลอดภัย
        </h4>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-xs font-bold text-rose-700 block mb-1">❌ รหัสผ่านที่ 'ไม่ปลอดภัย' (ห้ามใช้!)</span>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• 123456 หรือ 12345678 (เดาง่ายมาก)</li>
              <li>• password หรือ qwerty</li>
              <li>• ชื่อเล่น, ชื่อจริง, หรือชื่อสัตว์เลี้ยง</li>
              <li>• วันเกิดของตนเอง เช่น 15082558</li>
              <li>• เบอร์โทรศัพท์มือถือ</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-700 block mb-1">✅ รหัสผ่านที่ 'ปลอดภัย' (แนะนำ)</span>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• ความยาวอย่างน้อย 8–12 ตัวอักษรขึ้นไป</li>
              <li>• ผสมตัวอักษรพิมพ์ใหญ่ (A-Z) และพิมพ์เล็ก (a-z)</li>
              <li>• มีตัวเลข (0-9) อยู่ในรหัสผ่าน</li>
              <li>• มีสัญลักษณ์พิเศษ เช่น !, @, #, $, %</li>
              <li>• ตัวอย่างสำหรับเรียนรู้: <code className="bg-emerald-200/70 px-1 py-0.5 rounded font-mono font-bold">P4!Mango7#</code></li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic">
          *หมายเหตุ: ตัวอย่างข้างต้นใช้เพื่อการศึกษาเท่านั้น นักเรียนควรคิดรหัสผ่านเฉพาะของตนเองและไม่นำตัวอย่างนี้ไปใช้จริง
        </p>
      </div>

      {/* Scenario */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-950">
        <strong>🧒 สถานการณ์ใกล้ตัว:</strong> คนแปลกหน้าทักแชตในเกมมาบอกว่า <em>"ขอที่อยู่บ้านและเบอร์โทรศัพท์หน่อย เดี๋ยวจะส่งการ์ดเกมหายากไปให้ฟรี"</em>
        <div className="mt-2 font-semibold text-emerald-800">
          👉 วิธีปฏิบัติที่ถูกต้อง: ปฏิเสธทันที ไม่ส่งข้อมูลส่วนตัว และรีบแจ้งคุณพ่อคุณแม่หรือครูให้รับทราบ
        </div>
      </div>
    </article>
  );
};

// Topic 2: คุณลักษณะและความรับผิดชอบของพลเมืองดิจิทัล
const TopicTwoDetail: React.FC = () => {
  return (
    <article className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-lg space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
          หัวข้อที่ 2
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          🌐 คุณลักษณะและความรับผิดชอบของพลเมืองดิจิทัล
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          การเป็นพลเมืองดิจิทัลที่มีคุณภาพ ไม่ใช่แค่การใช้คอมพิวเตอร์เก่ง แต่ต้องใช้อย่างมีมารยาท เคารพสิทธิ และรับผิดชอบ
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <h4 className="text-lg font-bold text-blue-950 mb-2">
          พลเมืองดิจิทัล (Digital Citizen) คืออะไร?
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          คือบุคคลที่ใช้อินเทอร์เน็ตและเทคโนโลยีดิจิทัลอย่าง <strong>ปลอดภัย มีความรับผิดชอบ มีมารยาททางสังคม เคารพกฎหมาย และเคารพสิทธิของผู้อื่น</strong> เข้าใจว่าสิ่งที่ทำในโลกออนไลน์ส่งผลกระทบต่อชีวิตจริงทั้งของตนเองและผู้อื่น
        </p>
      </div>

      {/* Image Reference */}
      <a
        href="https://image.dek-d.com/27/0887/0657/131251062"
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group"
      >
        <img
          src="https://image.dek-d.com/27/0887/0657/131251062"
          alt="คุณลักษณะและความรับผิดชอบของพลเมืองดิจิทัล"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full max-h-72 object-cover group-hover:scale-[1.01] transition duration-300"
        />
      </a>

      {/* 5 คุณลักษณะสำคัญ */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-4">
          🌟 5 คุณลักษณะของพลเมืองดิจิทัลที่ดี
        </h4>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base mb-3">
              🧠
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">1. มีความรับผิดชอบ (Responsibility)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              คิดไตร่ตรองก่อนพิมพ์หรือแชร์ และยอมรับผลการกระทำของตนเอง
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-3">
              💬
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">2. มีมารยาทในการสื่อสาร (Netiquette)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ใช้คำพูดสุภาพ ไม่พิมพ์ตัวพิมพ์ใหญ่ค้างที่แสดงถึงการตะโกน ไม่ใช้คำหยาบคายด่าทอ
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-3">
              🤝
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">3. เคารพสิทธิของผู้อื่น (Respect Rights)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ไม่คัดลอกผลงาน รูปวาด หรือบทความมาเป็นของตนเอง ขออนุญาตและให้เครดิตทุกครั้ง
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base mb-3">
              🔒
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">4. เคารพความเป็นส่วนตัว (Privacy)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ไม่นำรูปภาพหลุด ข้อมูลส่วนตัว หรือเรื่องลับของเพื่อนไปเผยแพร่ในที่สาธารณะ
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs sm:col-span-2 lg:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base mb-3">
              🛡️
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">5. ต่อต้านการกลั่นแกล้ง (Stop Cyberbullying)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ไม่ร่วมล้อเลียนปมด้อย และยื่นมือช่วยเหลือเมื่อเห็นเพื่อนตกเป็นเหยื่อ
            </p>
          </div>
        </div>
      </div>

      {/* Do and Don't comparison */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <h5 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> สิ่งที่ควรปฏิบัติ (Do)
          </h5>
          <ul className="text-xs text-slate-700 space-y-2">
            <li>• กล่าวคำทักทายและใช้ภาษาที่สุภาพในการสนทนา</li>
            <li>• ขออนุญาตก่อนถ่ายรูปหรือโพสต์รูปผู้อื่น</li>
            <li>• ให้เกียรติความคิดเห็นที่แตกต่าง</li>
            <li>• รายงานเนื้อหาที่รุนแรงหรือไม่เหมาะสมต่อผู้ดูแลระบบ</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
          <h5 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> สิ่งที่ไม่ควรปฏิบัติ (Don't)
          </h5>
          <ul className="text-xs text-slate-700 space-y-2">
            <li>• พิมพ์ด่าทอ เหยียดหยาม หรือประจานผู้อื่น</li>
            <li>• สวมรอยสร้างบัญชีปลอมเป็นผู้อื่น</li>
            <li>• ละเมิดลิขสิทธิ์ผลงานเพลง ภาพ หรือโปรแกรม</li>
            <li>• ส่งต่อข้อความลูกโซ่หรือเนื้อหาคุกคามข่มขู่</li>
          </ul>
        </div>
      </div>

      {/* Highlight Box */}
      <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-center font-semibold text-amber-950 text-sm">
        🌟 กฎทองคำ 3 ข้อของพลเมืองดิจิทัล: <br />
        <span className="font-black text-base text-amber-900">
          🧠 คิดก่อนทำ • 💬 สุภาพในการสื่อสาร • 🤝 เคารพสิทธิของผู้อื่น
        </span>
      </div>
    </article>
  );
};

// Topic 3: การรู้เท่าทันสื่อและการตรวจสอบข้อมูลบนอินเทอร์เน็ต
const TopicThreeDetail: React.FC = () => {
  return (
    <article className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-lg space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
          หัวข้อที่ 3
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          🔎 การรู้เท่าทันสื่อและการตรวจสอบข้อมูลบนอินเทอร์เน็ต
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          ในโลกอินเทอร์เน็ตมีทั้งข้อมูลจริงและข้อมูลเท็จ ฝึกทักษะการตรวจสอบความถูกต้องก่อนที่จะเชื่อหรือแชร์
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-950 leading-relaxed">
        <strong>⚠️ ข้อเท็จจริงที่ต้องรู้:</strong> ข้อมูลบนอินเทอร์เน็ตไม่ได้ถูกต้องทั้งหมด! ใครก็สามารถสร้างเว็บไซต์ ข่าว หรือวิดีโอขึ้นมาได้ บางคนสร้างข่าวปลอม (Fake News) เพื่อหลอกเอาเงิน สร้างความเกลียดชัง หรือเรียกร้องความสนใจ
      </div>

      {/* Image Reference */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <img
          src="https://www.dcy.go.th/public/mainWeb/articles/news/1707962620859-897687484.jpg"
          alt="ภาพประกอบวิธีตรวจสอบข้อมูลบนอินเทอร์เน็ต"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full max-h-72 object-cover"
        />
      </div>

      {/* สัญญาณเตือนข้อมูลที่ควรระวัง */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-4">
          🚨 6 สัญญาณเตือนของ "ข่าวปลอมหรือข้อมูลไม่น่าเชื่อถือ"
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'พาดหัวข่าวเกินจริง', desc: 'ใช้คำตกใจ เช่น "ด่วนที่สุด!", "ช็อกโลก!", "แชร์ก่อนโดนลบ"' },
            { title: 'ไม่ระบุชื่อผู้เขียน / แหล่งที่มา', desc: 'ไม่มีการบอกว่าใครเป็นผู้รายงาน หรือมาจากสำนักข่าวใด' },
            { title: 'ไม่ระบุวันที่เผยแพร่', desc: 'อาจเป็นข่าวเก่าเมื่อ 5-10 ปีก่อนที่ถูกขุดขึ้นมาแชร์ซ้ำ' },
            { title: 'สัญญาของรางวัลฟรีง่ายเกินไป', desc: 'เช่น แจกเงินสด ไอโฟน หรือทุนการศึกษา เพียงแค่แชร์ต่อ' },
            { title: 'ภาพหรือวิดีโอตัดต่อผิดสังเกต', desc: 'ภาพเบลอ สีแปลก หรือเงาไม่สอดคล้องกับความเป็นจริง' },
            { title: 'สะกดคำผิดและใช้ภาษาไม่เป็นทางการ', desc: 'มีคำผิดจำนวนมาก และใช้ภาษาที่ชักจูงอารมณ์ความกลัว' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-rose-600 block mb-1">⚠️ {item.title}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* วิธีการตรวจสอบ: หยุด - คิด - ตรวจสอบ */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
        <h4 className="text-lg font-bold text-emerald-950 mb-4 text-center">
          🛑 บัญญัติ 3 ประการ: "หยุด – คิด – ตรวจสอบ"
        </h4>

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl mx-auto flex items-center justify-center mb-3">
              🛑
            </div>
            <h5 className="font-bold text-slate-900 text-sm mb-1">1. หยุด (Stop)</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              อย่าเพิ่งรีบเชื่อ หรือกดปุ่มแชร์ทันที โดยเฉพาะข่าวที่ทำให้รู้สึกตกใจ กลัว หรือโกรธ
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 font-black text-xl mx-auto flex items-center justify-center mb-3">
              🧠
            </div>
            <h5 className="font-bold text-slate-900 text-sm mb-1">2. คิด (Think)</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              ถามตนเองว่าใครเป็นคนเผยแพร่? มีวัตถุประสงค์อะไร? มีหลักฐานหรือการอ้างอิงหรือไม่?
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-black text-xl mx-auto flex items-center justify-center mb-3">
              🔎
            </div>
            <h5 className="font-bold text-slate-900 text-sm mb-1">3. ตรวจสอบ (Check)</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              ค้นหาจากเว็บไซต์ทางการของหน่วยงานที่เกี่ยวข้อง หรือสอบถามคุณครูและผู้ปกครอง
            </p>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950">
        <strong>🏫 ตัวอย่างสถานการณ์:</strong> มีข้อความแชร์ในกลุ่มไลน์ว่า <em>"พรุ่งนี้กระทรวงศึกษาธิการประกาศปิดโรงเรียนทั่วประเทศด่วน ส่งต่อให้ครบ 10 คน!"</em>
        <div className="mt-2 font-semibold text-emerald-800">
          👉 วิธีตรวจสอบที่ถูกต้อง: เข้าไปตรวจสอบที่หน้าเว็บไซต์ทางการของโรงเรียน หรือสอบถามครูประจำชั้น อย่าเพิ่งแชร์ต่อโดยไม่แน่ใจ
        </div>
      </div>
    </article>
  );
};

// Topic 4: อุปกรณ์คอมพิวเตอร์และการใช้งานอย่างถูกต้อง
const TopicFourDetail: React.FC = () => {
  const [activeDeviceIdx, setActiveDeviceIdx] = useState<number | null>(null);

  const sampleDevices = [
    {
      name: 'แป้นพิมพ์ (Keyboard)',
      icon: '⌨️',
      unit: 'หน่วยรับข้อมูล (Input Unit)',
      unitBadge: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'ใช้พิมพ์ข้อความ ตัวเลข และป้อนคำสั่งเข้าสู่เครื่องคอมพิวเตอร์',
    },
    {
      name: 'เมาส์ (Mouse)',
      icon: '🖱️',
      unit: 'หน่วยรับข้อมูล (Input Unit)',
      unitBadge: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'ใช้เลื่อนชี้ตำแหน่งบนหน้าจอ และกดคลิกเพื่อเลือกสั่งงาน',
    },
    {
      name: 'ซีพียู (CPU)',
      icon: '🧠',
      unit: 'หน่วยประมวลผลกลาง (CPU Unit)',
      unitBadge: 'bg-blue-100 text-blue-800 border-blue-300',
      desc: 'เปรียบเสมือนสมองของคอมพิวเตอร์ คิดคำนวณและสั่งการทุกระบบ',
    },
    {
      name: 'จอภาพ (Monitor)',
      icon: '🖥️',
      unit: 'หน่วยแสดงผล (Output Unit)',
      unitBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'แสดงภาพ ตัวหนังสือ และวิดีโอให้เรามองเห็นผลลัพธ์บนหน้าจอ',
    },
    {
      name: 'ลำโพง (Speaker)',
      icon: '🔊',
      unit: 'หน่วยแสดงผล (Output Unit)',
      unitBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'ส่งสัญญาณเสียงออกมา เช่น เสียงเพลง เสียงพูด หรือเสียงแจ้งเตือน',
    },
    {
      name: 'เครื่องพิมพ์ (Printer)',
      icon: '🖨️',
      unit: 'หน่วยแสดงผล (Output Unit)',
      unitBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'พิมพ์ข้อความหรือรูปภาพจากคอมพิวเตอร์ออกมาเป็นกระดาษจริง',
    },
    {
      name: 'แฟลชไดรฟ์ (USB Drive)',
      icon: '🔌',
      unit: 'หน่วยจัดเก็บข้อมูล (Storage Unit)',
      unitBadge: 'bg-purple-100 text-purple-800 border-purple-300',
      desc: 'อุปกรณ์จัดเก็บข้อมูลขนาดเล็ก พกพาสะดวก นำไปเสียบย้ายข้อมูลได้ง่าย',
    },
    {
      name: 'ไมโครโฟน (Microphone)',
      icon: '🎙️',
      unit: 'หน่วยรับข้อมูล (Input Unit)',
      unitBadge: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'รับเสียงพูดของเราส่งเข้าไปบันทึกหรือใช้สื่อสารในคอมพิวเตอร์',
    },
  ];

  return (
    <article className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-purple-200 shadow-lg space-y-8">
      {/* Title */}
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold mb-2">
          หัวข้อที่ 4
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          💻 อุปกรณ์คอมพิวเตอร์และการใช้งานอย่างถูกต้อง
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          เรียนรู้ส่วนประกอบและหน้าที่ของ 4 หน่วยสำคัญของคอมพิวเตอร์ พร้อมวิธีดูแลรักษาเพื่อการใช้งานที่ปลอดภัยและยาวนาน
        </p>
      </div>

      {/* Hero Educational Image */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm group">
        <img
          src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1280&q=80"
          alt="ชุดอุปกรณ์คอมพิวเตอร์พร้อมจอภาพ แป้นพิมพ์ และเมาส์"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full max-h-72 object-cover group-hover:scale-[1.01] transition duration-300"
        />
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
          <span className="font-medium">🖥️ โต๊ะคอมพิวเตอร์ประกอบด้วยอุปกรณ์ฮาร์ดแวร์ทำงานประสานกันอย่างเป็นระบบ</span>
          <span className="text-[11px] text-slate-600">วิชาเทคโนโลยี (วิทยาการคำนวณ ป.4)</span>
        </div>
      </div>

      {/* Section 1: ฮาร์ดแวร์คืออะไร */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200">
        <h4 className="text-lg font-bold text-purple-950 flex items-center gap-2 mb-2">
          <Laptop className="w-5 h-5 text-purple-600" /> อุปกรณ์คอมพิวเตอร์ (Hardware) คืออะไร?
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          <strong>ฮาร์ดแวร์ (Hardware)</strong> คือ ชิ้นส่วนและอุปกรณ์ต่าง ๆ ของระบบคอมพิวเตอร์ที่ <strong>เราสามารถมองเห็นและสัมผัสจับต้องได้</strong> เช่น จอภาพ คีย์บอร์ด เมาส์ ลำโพง ตัวเครื่อง และสายเคเบิลต่าง ๆ โดยอุปกรณ์เหล่านี้จะทำงานร่วมกับ <strong>ซอฟต์แวร์ (Software หรือ โปรแกรม)</strong> เพื่อรับคำสั่ง ประมวลผล และแสดงผลงานออกมา
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-purple-200 text-xs font-bold text-purple-900 shadow-2xs">
          💡 จำง่าย ๆ: ฮาร์ดแวร์ = จับต้องได้ (กายภาพ) | ซอฟต์แวร์ = โปรแกรม/แอป (คำสั่ง)
        </div>
      </div>

      {/* Section 2: 4 หน่วยหลักของคอมพิวเตอร์ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" /> 4 หน่วยการทำงานหลักของระบบคอมพิวเตอร์
          </h4>
          <span className="text-xs text-slate-500 font-medium">กระบวนการ: รับข้อมูล ➔ ประมวลผล ➔ แสดงผล (และจัดเก็บ)</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* 1. หน่วยรับข้อมูล */}
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="overflow-hidden rounded-xl mb-3 border border-amber-200 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                  alt="แป้นพิมพ์และเมาส์เป็นหน่วยรับข้อมูล"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900 mb-1">
                📥 หน่วยที่ 1
              </div>
              <h5 className="text-base font-bold text-amber-950">หน่วยรับข้อมูล (Input Unit)</h5>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                ทำหน้าที่ <strong>รับข้อมูล ตัวอักษร เสียง รูปภาพ หรือคำสั่ง</strong> จากผู้ใช้งานส่งเข้าไปให้คอมพิวเตอร์ประมวลผล
              </p>
            </div>

            <div className="pt-2 border-t border-amber-200/70">
              <span className="text-[11px] font-bold text-amber-900 block mb-1.5">📌 อุปกรณ์ที่สำคัญ:</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                <span className="p-1.5 bg-white rounded-lg border border-amber-100 flex items-center gap-1">⌨️ แป้นพิมพ์ (Keyboard)</span>
                <span className="p-1.5 bg-white rounded-lg border border-amber-100 flex items-center gap-1">🖱️ เมาส์ (Mouse)</span>
                <span className="p-1.5 bg-white rounded-lg border border-amber-100 flex items-center gap-1">🎙️ ไมโครโฟน (Mic)</span>
                <span className="p-1.5 bg-white rounded-lg border border-amber-100 flex items-center gap-1">📷 เว็บแคม (Webcam)</span>
              </div>
            </div>
          </div>

          {/* 2. หน่วยประมวลผลกลาง */}
          <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="overflow-hidden rounded-xl mb-3 border border-blue-200 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
                  alt="ชิปซีพียูหน่วยประมวลผลกลาง"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-200 text-blue-900 mb-1">
                🧠 หน่วยที่ 2
              </div>
              <h5 className="text-base font-bold text-blue-950">หน่วยประมวลผลกลาง (CPU)</h5>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                เปรียบเสมือน <strong>"สมองของคอมพิวเตอร์"</strong> ทำหน้าที่คิดคำนวณ เปรียบเทียบข้อมูลทางตรรกะ และควบคุมการทำงานของทุกอุปกรณ์
              </p>
            </div>

            <div className="pt-2 border-t border-blue-200/70">
              <span className="text-[11px] font-bold text-blue-900 block mb-1.5">📌 อุปกรณ์ที่สำคัญ:</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                <span className="p-1.5 bg-white rounded-lg border border-blue-100 flex items-center gap-1">🧠 ซีพียู (CPU Chip)</span>
                <span className="p-1.5 bg-white rounded-lg border border-blue-100 flex items-center gap-1">🖥️ เคส (System Unit)</span>
                <span className="p-1.5 bg-white rounded-lg border border-blue-100 flex items-center gap-1">🔌 เมนบอร์ด (Mainboard)</span>
                <span className="p-1.5 bg-white rounded-lg border border-blue-100 flex items-center gap-1">❄️ พัดลมระบายความร้อน</span>
              </div>
            </div>
          </div>

          {/* 3. หน่วยแสดงผลข้อมูล */}
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="overflow-hidden rounded-xl mb-3 border border-emerald-200 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
                  alt="จอภาพและลำโพงเป็นหน่วยแสดงผล"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 mb-1">
                📤 หน่วยที่ 3
              </div>
              <h5 className="text-base font-bold text-emerald-950">หน่วยแสดงผล (Output Unit)</h5>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                ทำหน้าที่ <strong>นำผลลัพธ์ที่ประมวลผลเสร็จแล้วมาแสดง</strong> ให้มนุษย์รับรู้ได้ ทั้งในรูปแบบภาพ ตัวหนังสือ เสียง หรือกระดาษพิมพ์
              </p>
            </div>

            <div className="pt-2 border-t border-emerald-200/70">
              <span className="text-[11px] font-bold text-emerald-900 block mb-1.5">📌 อุปกรณ์ที่สำคัญ:</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                <span className="p-1.5 bg-white rounded-lg border border-emerald-100 flex items-center gap-1">🖥️ จอภาพ (Monitor)</span>
                <span className="p-1.5 bg-white rounded-lg border border-emerald-100 flex items-center gap-1">🔊 ลำโพง (Speaker)</span>
                <span className="p-1.5 bg-white rounded-lg border border-emerald-100 flex items-center gap-1">🎧 หูฟัง (Headphones)</span>
                <span className="p-1.5 bg-white rounded-lg border border-emerald-100 flex items-center gap-1">🖨️ เครื่องพิมพ์ (Printer)</span>
              </div>
            </div>
          </div>

          {/* 4. หน่วยจัดเก็บข้อมูล */}
          <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/40 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="overflow-hidden rounded-xl mb-3 border border-purple-200 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80"
                  alt="ยูเอสบีแฟลชไดรฟ์และอุปกรณ์จัดเก็บข้อมูล"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-200 text-purple-900 mb-1">
                💾 หน่วยที่ 4
              </div>
              <h5 className="text-base font-bold text-purple-950">หน่วยจัดเก็บข้อมูล (Storage Unit)</h5>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                ทำหน้าที่ <strong>บันทึกและเก็บรักษาข้อมูล ไฟล์งาน รูปภาพ และโปรแกรม</strong> ไว้อย่างถาวร เพื่อเปิดใช้งานได้ในครั้งถัดไป
              </p>
            </div>

            <div className="pt-2 border-t border-purple-200/70">
              <span className="text-[11px] font-bold text-purple-900 block mb-1.5">📌 อุปกรณ์ที่สำคัญ:</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                <span className="p-1.5 bg-white rounded-lg border border-purple-100 flex items-center gap-1">💽 ฮาร์ดดิสก์ / SSD</span>
                <span className="p-1.5 bg-white rounded-lg border border-purple-100 flex items-center gap-1">🔌 แฟลชไดรฟ์ (USB)</span>
                <span className="p-1.5 bg-white rounded-lg border border-purple-100 flex items-center gap-1">⚡ แรม (RAM ความจำชั่วคราว)</span>
                <span className="p-1.5 bg-white rounded-lg border border-purple-100 flex items-center gap-1">💿 แผ่นซีดี / ดีวีดี</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity: Device Classifier */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700">
              🎮 กิจกรรมลองคิด: อุปกรณ์นี้อยู่หน่วยไหน?
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              คลิกที่อุปกรณ์เพื่อดูหน้าที่และหมวดหมู่การทำงาน
            </h4>
          </div>
          <span className="text-xs text-slate-400">คลิกที่การ์ดเพื่อดูเฉลย 💡</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sampleDevices.map((device, idx) => {
            const isSelected = activeDeviceIdx === idx;
            return (
              <button
                key={device.name}
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setActiveDeviceIdx(isSelected ? null : idx);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600/90 border-blue-400 text-white scale-[1.02] shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                }`}
              >
                <div className="text-3xl mb-2">{device.icon}</div>
                <div className="text-xs font-bold line-clamp-1">{device.name}</div>
                <div className="text-[10px] mt-1 text-slate-400">
                  {isSelected ? 'คลิกเพื่อย่อ' : 'แตะเพื่อดูหน่วย ➔'}
                </div>
              </button>
            );
          })}
        </div>

        {activeDeviceIdx !== null && (
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-blue-400/50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{sampleDevices[activeDeviceIdx].icon}</span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="font-bold text-white text-base">
                    {sampleDevices[activeDeviceIdx].name}
                  </h5>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${sampleDevices[activeDeviceIdx].unitBadge}`}>
                    {sampleDevices[activeDeviceIdx].unit}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {sampleDevices[activeDeviceIdx].desc}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: การดูแลรักษาและใช้อุปกรณ์อย่างปลอดภัย */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> การดูแลรักษาและการใช้อุปกรณ์คอมพิวเตอร์อย่างปลอดภัย
        </h4>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* 1. การปิดเครื่องถูกวิธี */}
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-1">
              <Power className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-slate-900 text-sm">1. ปิดเครื่องด้วย Shutdown เสมอ</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              เมื่อใช้งานเสร็จ ให้คลิกบันทึกงาน ปิดโปรแกรมทั้งหมด แล้วสั่ง <strong>Shutdown</strong> ทางระบบเสมอ <strong>ห้ามถอดปลั๊กหรือดึงสายไฟออกทันที</strong> เพราะจะทำให้ฮาร์ดดิสก์และระบบปฏิบัติการเสียหาย
            </p>
          </div>

          {/* 2. ห้ามน้ำและอาหาร */}
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-1">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-slate-900 text-sm">2. ห้ามนำน้ำและขนมมาใกล้เครื่อง</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              ห้ามวางแก้วน้ำ ขนม หรือของเหลวใกล้คอมพิวเตอร์และคีย์บอร์ดเด็ดขาด เพราะหากน้ำหกใส่อาจทำให้เกิด <strong>ไฟฟ้าลัดวงจร</strong> และเศษขนมอาจทำให้มดหรือแมลงเข้าไปทำรังในอุปกรณ์
            </p>
          </div>

          {/* 3. ท่านั่งและการพักสายตา */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-1">
              <Eye className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-slate-900 text-sm">3. ท่านั่งและกฎพักสายตา 20-20-20</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              นั่งหลังตรง จอภาพห่างจากตาประมาณ 1 ช่วงแขน (50–70 ซม.) ระดับสายตาอยู่พอดีกับขอบบนจอ และพักสายตาทุก 20 นาที มองไปที่ไกล ๆ 20 ฟุต นาน 20 วินาที เพื่อถนอมสุขภาพดวงตา
            </p>
          </div>
        </div>
      </div>

      {/* Do & Don't for Hardware */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <h5 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> ข้อควรปฏิบัติในการดูแลอุปกรณ์ (Do)
          </h5>
          <ul className="text-xs text-slate-700 space-y-2">
            <li>• ใช้ผ้าแห้งเนื้อนุ่มหรือแปรงปัดฝุ่นทำความสะอาดอุปกรณ์เบา ๆ</li>
            <li>• ตั้งเครื่องในที่ที่อากาศถ่ายเทสะดวก ไม่อับชื้น และไม่ถูกแสงแดดโดยตรง</li>
            <li>• ค่อย ๆ เสียบและถอดสายยูเอสบี (USB) อย่างนุ่มนวล ไม่กระชากแรง</li>
            <li>• สวมแว่นกรองแสงหรือปรับความสว่างของหน้าจอให้พอเหมาะกับสายตา</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
          <h5 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> ข้อห้ามและสิ่งที่ควรระวัง (Don't)
          </h5>
          <ul className="text-xs text-slate-700 space-y-2">
            <li>• ห้ามดึงปลั๊กไฟออกทันทีขณะที่เครื่องคอมพิวเตอร์กำลังทำงาน</li>
            <li>• ห้ามใช้ผ้าเปียกน้ำหรือน้ำยาทำความสะอาดที่มีกรดเช็ดอุปกรณ์อิเล็กทรอนิกส์</li>
            <li>• ห้ามเคลื่อนย้ายหรือเขย่าเคสเครื่องคอมพิวเตอร์ขณะที่เครื่องกำลังเปิดใช้งาน</li>
            <li>• ห้ามซ่อมแซมหรือแกะฝาครอบอุปกรณ์ไฟฟ้าด้วยตนเองหากไม่มีผู้ใหญ่ดูแล</li>
          </ul>
        </div>
      </div>

      {/* Real-life Scenario */}
      <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-xs sm:text-sm text-purple-950">
        <strong>🧒 สถานการณ์ใกล้ตัวในห้องคอมพิวเตอร์:</strong> หลังเลิกเรียนวิชาคอมพิวเตอร์ เพื่อนในห้องรีบวิ่งไปถอดปลั๊กรางไฟออกทันทีเพราะอยากกลับบ้านเร็ว
        <div className="mt-2 font-semibold text-emerald-800">
          👉 วิธีปฏิบัติที่ถูกต้อง: เตือนเพื่อนให้หยุดก่อน! บอกเพื่อนให้คลิกสั่ง Shutdown ผ่านระบบ Windows ก่อนเสมอ เมื่อไฟดับสนิทแล้วจึงค่อยปิดสวิตช์ปลั๊กไฟ เพื่อป้องกันฮาร์ดดิสก์พังและข้อมูลสูญหาย
        </div>
      </div>
    </article>
  );
};

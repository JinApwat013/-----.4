import React, { useState } from 'react';
import { SAFE_TECH_WORKSHEET_ITEMS, DIGITAL_CITIZEN_ITEMS, PASSWORD_SAMPLES } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import {
  KeyRound,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface WorksheetsSectionProps {
  safeTechAnswers: (boolean | null)[];
  safeTechScore: number;
  worksheetAnswers: (boolean | null)[];
  worksheetScore: number;
  passwordScore: number;
  passwordMissionsCompleted: number[];
  onUpdateSafeTech: (answers: (boolean | null)[], score: number) => void;
  onUpdateDigitalCitizen: (answers: (boolean | null)[], score: number) => void;
  onUpdatePasswordMission: (score: number, completedMissions: number[]) => void;
}

type ActivityTab = 'menu' | 'password' | 'safe-tech' | 'digital-citizen';

export const WorksheetsSection: React.FC<WorksheetsSectionProps> = ({
  safeTechAnswers,
  safeTechScore,
  worksheetAnswers,
  worksheetScore,
  passwordScore,
  passwordMissionsCompleted,
  onUpdateSafeTech,
  onUpdateDigitalCitizen,
  onUpdatePasswordMission,
}) => {
  const [activeTab, setActiveTab] = useState<ActivityTab>('menu');

  return (
    <div className="space-y-6">
      {/* Activity selection menu */}
      {activeTab === 'menu' && (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> ใบงานและกิจกรรมฝึกทักษะ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              🎯 เลือกใบงานหรือกิจกรรมที่ต้องการฝึกปฏิบัติ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              ฝึกฝนทักษะการตัดสินใจ การวิเคราะห์สถานการณ์ และทดลองสร้างรหัสผ่านจริง
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Activity 1: Password Builder */}
            <div
              onClick={() => {
                sounds.playTap();
                setActiveTab('password');
              }}
              className="group bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-3xl p-6 border-2 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  <KeyRound className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                  กิจกรรมที่ 1
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1 group-hover:text-amber-700 transition">
                  🔐 โครงสร้างการสร้างรหัสผ่าน
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  (Password Builder) ทดลองผสมตัวอักษร ตัวเลข สัญลักษณ์ พิชิต 5 ภารกิจ และวิเคราะห์รหัสผ่านที่ไม่ปลอดภัย
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-800">
                  ภารกิจ {passwordMissionsCompleted.length} / 5 สำเร็จ
                </span>
                <span className="text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                  เริ่มเล่น →
                </span>
              </div>
            </div>

            {/* Activity 2: Safe Tech Worksheet */}
            <div
              onClick={() => {
                sounds.playTap();
                setActiveTab('safe-tech');
              }}
              className="group bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-3xl p-6 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-200/70 text-blue-900">
                  กิจกรรมที่ 2
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1 group-hover:text-blue-700 transition">
                  🛡️ การใช้เทคโนโลยีอย่างปลอดภัย
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  วิเคราะห์ 10 พฤติกรรมในชีวิตประจำวัน เลือกว่า ✓ ปลอดภัย หรือ ✕ ไม่ปลอดภัย พร้อมคำอธิบาย
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-800">
                  ทำแล้ว {safeTechAnswers.filter((a) => a !== null).length} / 10 (ได้ {safeTechScore} คะแนน)
                </span>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                  เริ่มทำ →
                </span>
              </div>
            </div>

            {/* Activity 3: Digital Citizen Worksheet */}
            <div
              onClick={() => {
                sounds.playTap();
                setActiveTab('digital-citizen');
              }}
              className="group bg-gradient-to-br from-emerald-50 to-teal-50/40 rounded-3xl p-6 border-2 border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  <FileCheck className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                  กิจกรรมที่ 3
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1 group-hover:text-emerald-700 transition">
                  📝 ใบงาน นักเรียนรู้ทันโลกดิจิทัล
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ใบงาน 12 ข้อ ครอบคลุม 3 หมวดหมู่ความรู้ เสริมสร้างทักษะการตัดสินใจในโลกดิจิทัล
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-800">
                  ทำแล้ว {worksheetAnswers.filter((a) => a !== null).length} / 12 (ได้ {worksheetScore} คะแนน)
                </span>
                <span className="text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                  เริ่มทำ →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Screens */}
      {activeTab === 'password' && (
        <PasswordBuilderActivity
          currentScore={passwordScore}
          completedMissions={passwordMissionsCompleted}
          onUpdate={onUpdatePasswordMission}
          onBack={() => setActiveTab('menu')}
        />
      )}

      {activeTab === 'safe-tech' && (
        <SafeTechWorksheetActivity
          answers={safeTechAnswers}
          score={safeTechScore}
          onUpdate={onUpdateSafeTech}
          onBack={() => setActiveTab('menu')}
        />
      )}

      {activeTab === 'digital-citizen' && (
        <DigitalCitizenWorksheetActivity
          answers={worksheetAnswers}
          score={worksheetScore}
          onUpdate={onUpdateDigitalCitizen}
          onBack={() => setActiveTab('menu')}
        />
      )}
    </div>
  );
};

// ==========================================
// Sub-activity 1: Password Builder
// ==========================================
interface PasswordBuilderProps {
  currentScore: number;
  completedMissions: number[];
  onUpdate: (score: number, completedMissions: number[]) => void;
  onBack: () => void;
}

const PasswordBuilderActivity: React.FC<PasswordBuilderProps> = ({
  currentScore,
  completedMissions,
  onUpdate,
  onBack,
}) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [selectedSampleOpt, setSelectedSampleOpt] = useState<number | null>(null);

  const checkStrength = (val: string) => {
    const hasLetter = /[a-zA-Zก-๙]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSymbol = /[^a-zA-Z0-9ก-๙\s]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasMinLength = val.length >= 8;
    const noEasyWords = !/(123456|password|qwerty|admin|0101|dekdee)/i.test(val);

    let score = 0;
    if (hasLetter) score += 2;
    if (hasNumber) score += 2;
    if (hasSymbol) score += 2;
    if (hasUpper) score += 1;
    if (hasMinLength) score += 2;
    if (noEasyWords && val.length > 0) score += 1;

    score = Math.min(10, score);

    return {
      score,
      hasLetter,
      hasNumber,
      hasSymbol,
      hasUpper,
      hasMinLength,
      noEasyWords,
    };
  };

  const strength = checkStrength(passwordValue);

  // Missions definition
  const missions = [
    {
      id: 0,
      title: 'ภารกิจที่ 1: ผสมตัวอักษรและตัวเลข',
      isPassed: strength.hasLetter && strength.hasNumber,
    },
    {
      id: 1,
      title: 'ภารกิจที่ 2: เพิ่มสัญลักษณ์พิเศษ (@, #, !, $)',
      isPassed: strength.hasSymbol,
    },
    {
      id: 2,
      title: 'ภารกิจที่ 3: เพิ่มความยาวให้ถึงอย่างน้อย 8 ตัวอักษร',
      isPassed: strength.hasMinLength,
    },
    {
      id: 3,
      title: 'ภารกิจที่ 4: เติมตัวอักษรพิมพ์ใหญ่ (A-Z)',
      isPassed: strength.hasUpper,
    },
    {
      id: 4,
      title: 'ภารกิจที่ 5: รหัสผ่านแข็งแกร่งระดับสูงสุด (10 / 10)',
      isPassed: strength.score === 10,
    },
  ];

  const handleAppend = (chunk: string) => {
    sounds.playTap();
    const nextVal = passwordValue + chunk;
    setPasswordValue(nextVal);
    evaluateNewPassword(nextVal);
  };

  const evaluateNewPassword = (val: string) => {
    const res = checkStrength(val);
    const newCompleted = [...completedMissions];

    if (res.hasLetter && res.hasNumber && !newCompleted.includes(0)) newCompleted.push(0);
    if (res.hasSymbol && !newCompleted.includes(1)) newCompleted.push(1);
    if (res.hasMinLength && !newCompleted.includes(2)) newCompleted.push(2);
    if (res.hasUpper && !newCompleted.includes(3)) newCompleted.push(3);
    if (res.score === 10 && !newCompleted.includes(4)) newCompleted.push(4);

    if (newCompleted.length > completedMissions.length) {
      sounds.playCorrect();
    }

    const newScore = Math.max(currentScore, res.score);
    onUpdate(newScore, newCompleted);
  };

  const handleResetPassword = () => {
    sounds.playTap();
    setPasswordValue('');
  };

  const getLevelBadge = (score: number) => {
    if (score >= 9) return { text: '🔵 ปลอดภัยมากเป็นพิเศษ', color: 'bg-blue-100 text-blue-800' };
    if (score >= 7) return { text: '🟢 ปลอดภัยดี (แนะนำ)', color: 'bg-emerald-100 text-emerald-800' };
    if (score >= 4) return { text: '🟡 ระดับปานกลาง', color: 'bg-amber-100 text-amber-800' };
    return { text: '🔴 อ่อนแอมาก (เดาง่าย)', color: 'bg-rose-100 text-rose-800' };
  };

  const currentLevel = getLevelBadge(strength.score);
  const currentSample = PASSWORD_SAMPLES[sampleIndex];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> กลับไปเลือกใบงาน
          </button>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            🔐 โครงสร้างการสร้างรหัสผ่าน (Password Builder)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ฝึกทักษะการสร้างและตรวจสอบรหัสผ่านอย่างปลอดภัยในสภาพแวดล้อมจำลอง
          </p>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 p-1.5 rounded-2xl border border-amber-200">
          {['ด่าน 1: ผสมรหัส', 'ด่าน 2: พิชิตภารกิจ', 'ด่าน 3: คลินิกรหัสผ่าน'].map((title, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeStage === idx
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Stage 0: Interactive Builder */}
      {activeStage === 0 && (
        <div className="space-y-6">
          {/* Password Visual Display */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white text-center shadow-inner relative overflow-hidden">
            <div className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider">
              ช่องแสดงผลรหัสผ่านจำลอง (ความยาว: {passwordValue.length} ตัวอักษร)
            </div>
            <div className="text-2xl sm:text-4xl font-mono font-bold tracking-widest break-all min-h-[48px] flex items-center justify-center">
              {passwordValue ? passwordValue : <span className="text-slate-600 tracking-normal text-base font-sans font-normal">กดปุ่มด้านล่างเพื่อผสมรหัสผ่าน...</span>}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentLevel.color}`}>
                {currentLevel.text}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                คะแนน: {strength.score} / 10
              </span>
            </div>
          </div>

          {/* Strength Meter Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
              <span>มาตรวัดความแข็งแกร่ง (Strength Meter)</span>
              <span>{strength.score * 10}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  strength.score >= 8
                    ? 'bg-emerald-500'
                    : strength.score >= 5
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${strength.score * 10}%` }}
              />
            </div>
          </div>

          {/* Tools / Building blocks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              คลิกบล็อกเพื่อเพิ่มองค์ประกอบลงในรหัสผ่าน:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => handleAppend('mango')}
                className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 font-bold text-sm text-center shadow-2xs hover:shadow transition active:scale-95 cursor-pointer"
              >
                🔤 ตัวพิมพ์เล็ก <span className="block text-xs font-normal text-slate-400 mt-0.5">mango</span>
              </button>
              <button
                type="button"
                onClick={() => handleAppend('7')}
                className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 font-bold text-sm text-center shadow-2xs hover:shadow transition active:scale-95 cursor-pointer"
              >
                🔢 ตัวเลข <span className="block text-xs font-normal text-slate-400 mt-0.5">+ 7</span>
              </button>
              <button
                type="button"
                onClick={() => handleAppend('!')}
                className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 font-bold text-sm text-center shadow-2xs hover:shadow transition active:scale-95 cursor-pointer"
              >
                🔣 สัญลักษณ์ <span className="block text-xs font-normal text-slate-400 mt-0.5">+ !</span>
              </button>
              <button
                type="button"
                onClick={() => handleAppend('P')}
                className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 font-bold text-sm text-center shadow-2xs hover:shadow transition active:scale-95 cursor-pointer"
              >
                🔠 พิมพ์ใหญ่ <span className="block text-xs font-normal text-slate-400 mt-0.5">+ P</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5">
              <button
                type="button"
                onClick={() => handleAppend('#')}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + # (ชาร์ป)
              </button>
              <button
                type="button"
                onClick={() => handleAppend('Star')}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Star
              </button>
              <button
                type="button"
                onClick={() => handleAppend('99')}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + 99
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-xs font-bold text-rose-700 transition cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> ล้างรหัสผ่าน
              </button>
            </div>
          </div>

          {/* Checklist criteria */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">
              เกณฑ์ความปลอดภัยของรหัสผ่าน:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className={`flex items-center gap-1.5 ${strength.hasLetter ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.hasLetter ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>มีตัวอักษร</span>
              </div>
              <div className={`flex items-center gap-1.5 ${strength.hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.hasNumber ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>มีตัวเลข</span>
              </div>
              <div className={`flex items-center gap-1.5 ${strength.hasSymbol ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.hasSymbol ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>มีสัญลักษณ์พิเศษ</span>
              </div>
              <div className={`flex items-center gap-1.5 ${strength.hasUpper ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.hasUpper ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>มีตัวพิมพ์ใหญ่</span>
              </div>
              <div className={`flex items-center gap-1.5 ${strength.hasMinLength ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.hasMinLength ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>ความยาว ≥ 8 ตัว</span>
              </div>
              <div className={`flex items-center gap-1.5 ${strength.noEasyWords && passwordValue.length > 0 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                {strength.noEasyWords && passwordValue.length > 0 ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                <span>ไม่ใช้คำเดาง่าย</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStage(1)}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <span>ไปดูภารกิจที่ต้องพิชิต →</span>
            </button>
          </div>
        </div>
      )}

      {/* Stage 1: Missions */}
      {activeStage === 1 && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-950 mb-1">
              🏆 5 ภารกิจนักสร้างรหัสผ่านมือโปร
            </h4>
            <p className="text-xs text-slate-600">
              สร้างรหัสผ่านในด่านที่ 1 ให้มีคุณสมบัติตรงตามภารกิจเหล่านี้เพื่อปลดล็อกเหรียญตราความสำเร็จ!
            </p>
          </div>

          <div className="grid gap-3">
            {missions.map((m) => {
              const isDone = completedMissions.includes(m.id);
              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                    isDone
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isDone ? '✓' : m.id + 1}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{m.title}</div>
                      <div className="text-xs text-slate-500">
                        {isDone ? '🎉 ภารกิจสำเร็จแล้ว!' : 'ยังไม่ผ่าน กลับไปผสมรหัสเพิ่มเติม'}
                      </div>
                    </div>
                  </div>

                  {isDone && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900">
                      สำเร็จ ⭐
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setActiveStage(0)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
            >
              ← กลับไปหน้าผสมรหัส
            </button>
            <button
              type="button"
              onClick={() => setActiveStage(2)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold"
            >
              ไปคลินิกรหัสผ่าน →
            </button>
          </div>
        </div>
      )}

      {/* Stage 2: Password Clinic (Analyze bad passwords) */}
      {activeStage === 2 && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <h4 className="text-sm font-bold text-indigo-950 mb-1">
              🧪 คลินิกหมอรหัสผ่าน: วิเคราะห์และแก้ไขรหัสผ่านที่ไม่ปลอดภัย
            </h4>
            <p className="text-xs text-slate-600">
              ตัวอย่างที่ {sampleIndex + 1} จาก {PASSWORD_SAMPLES.length}: อ่านตัวอย่างแล้วเลือกแนวทางการปรับปรุงให้ปลอดภัยที่สุด
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
            <span className="text-xs font-bold text-rose-600 block mb-1">
              รหัสผ่านที่มีช่องโหว่ความปลอดภัย:
            </span>
            <div className="text-3xl font-mono font-bold text-slate-900 bg-rose-50 py-3 px-6 rounded-2xl inline-block border border-rose-200">
              {currentSample.value}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-700 mb-1">
              คำถาม: รหัสผ่านนี้ควรแก้ไขอย่างไรจึงจะปลอดภัยที่สุด?
            </div>
            {currentSample.options.map((option, idx) => {
              const isSelected = selectedSampleOpt === idx;
              const isCorrect = idx === currentSample.correctIndex;
              let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

              if (selectedSampleOpt !== null) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-900';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={selectedSampleOpt !== null}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedSampleOpt(idx);
                    if (idx === currentSample.correctIndex) {
                      sounds.playCorrect();
                    } else {
                      sounds.playIncorrect();
                    }
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm transition cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span>{idx + 1}. {option}</span>
                  {selectedSampleOpt !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {selectedSampleOpt !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedSampleOpt !== null && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 font-semibold">
                {selectedSampleOpt === currentSample.correctIndex ? '✅ ยอดเยี่ยม! ถูกต้อง' : '💡 ยังไม่ถูก ลองสังเกตข้อที่ถูกต้อง'}
              </span>

              <button
                type="button"
                onClick={() => {
                  setSelectedSampleOpt(null);
                  setSampleIndex((prev) => (prev + 1) % PASSWORD_SAMPLES.length);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
              >
                ดูตัวอย่างถัดไป →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// Sub-activity 2: Safe Tech Worksheet
// ==========================================
interface SafeTechProps {
  answers: (boolean | null)[];
  score: number;
  onUpdate: (answers: (boolean | null)[], score: number) => void;
  onBack: () => void;
}

const SafeTechWorksheetActivity: React.FC<SafeTechProps> = ({
  answers,
  score,
  onUpdate,
  onBack,
}) => {
  const items = SAFE_TECH_WORKSHEET_ITEMS;
  const answeredCount = answers.filter((a) => a !== null).length;

  const handleAnswer = (index: number, chosenIsSafe: boolean) => {
    if (answers[index] !== null) return; // already answered
    const currentItem = items[index];
    const isCorrect = chosenIsSafe === currentItem.isSafe;

    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }

    const nextAnswers = [...answers];
    nextAnswers[index] = chosenIsSafe;
    const nextScore = isCorrect ? score + 1 : score;
    onUpdate(nextAnswers, nextScore);
  };

  const handleReset = () => {
    sounds.playTap();
    onUpdate(Array(10).fill(null), 0);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> กลับไปเลือกใบงาน
          </button>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            🛡️ ใบงาน: การใช้เทคโนโลยีสารสนเทศอย่างปลอดภัย
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            วิเคราะห์และพิจารณาการกระทำ แล้วเขียนเครื่องหมาย ✓ (ปลอดภัย) หรือ ✕ (ไม่ปลอดภัย) ลงในช่อง
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">ความคืบหน้า</span>
            <span className="text-sm font-black text-blue-700">
              ทำแล้ว {answeredCount} / {items.length} ข้อ
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xs">
            ⭐ {score} / 10 คะแนน
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          const userChoice = answers[idx];
          const hasAnswered = userChoice !== null;
          const isCorrect = hasAnswered && userChoice === item.isSafe;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-rose-50/70 border-rose-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {item.scenario}
                  </p>

                  {/* Actions: Safe vs Unsafe buttons */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <button
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(idx, true)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        userChoice === true
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                            : 'bg-rose-600 text-white'
                          : hasAnswered
                          ? 'bg-slate-100 text-slate-400 opacity-60'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 active:scale-95'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>✓ ปลอดภัย</span>
                    </button>

                    <button
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(idx, false)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        userChoice === false
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                            : 'bg-rose-600 text-white'
                          : hasAnswered
                          ? 'bg-slate-100 text-slate-400 opacity-60'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 active:scale-95'
                      }`}
                    >
                      <span className="font-mono font-bold">✕</span>
                      <span>✕ ไม่ปลอดภัย</span>
                    </button>
                  </div>

                  {/* Immediate feedback explanation */}
                  {hasAnswered && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs leading-relaxed text-slate-700">
                      <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                        {isCorrect ? 'คำตอบถูกต้อง! ✓' : 'ยังไม่ถูกต้องนะ ✕'} (เฉลย: {item.isSafe ? 'ปลอดภัย' : 'ไม่ปลอดภัย'})
                      </strong>
                      <p className="mt-0.5 text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {answeredCount === items.length && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <div className="text-3xl">🎉</div>
          <h4 className="text-lg font-bold text-emerald-950">
            ยินดีด้วย! ทำใบงานการใช้เทคโนโลยีครบ 10 ข้อแล้ว
          </h4>
          <p className="text-sm text-emerald-800">
            คุณได้คะแนนรวม <strong>{score} / 10 คะแนน</strong> ({Math.round((score / 10) * 100)}%)
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition"
          >
            🔄 ทำใบงานใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Sub-activity 3: Digital Citizen Worksheet
// ==========================================
interface DigitalCitizenProps {
  answers: (boolean | null)[];
  score: number;
  onUpdate: (answers: (boolean | null)[], score: number) => void;
  onBack: () => void;
}

const DigitalCitizenWorksheetActivity: React.FC<DigitalCitizenProps> = ({
  answers,
  score,
  onUpdate,
  onBack,
}) => {
  const items = DIGITAL_CITIZEN_ITEMS;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const categories = [
    { name: '🔐 การปกป้องข้อมูลส่วนตัวและรหัสผ่าน', range: [0, 4] },
    { name: '🌐 คุณลักษณะและความรับผิดชอบของพลเมืองดิจิทัล', range: [4, 8] },
    { name: '🔎 การรู้เท่าทันสื่อและการตรวจสอบข้อมูล', range: [8, 12] },
  ];

  const handleAnswer = (index: number, chosenIsSafe: boolean) => {
    if (answers[index] !== null) return;
    const currentItem = items[index];
    const isCorrect = chosenIsSafe === currentItem.isSafe;

    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }

    const nextAnswers = [...answers];
    nextAnswers[index] = chosenIsSafe;
    const nextScore = isCorrect ? score + 1 : score;
    onUpdate(nextAnswers, nextScore);
  };

  const handleReset = () => {
    sounds.playTap();
    onUpdate(Array(12).fill(null), 0);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> กลับไปเลือกใบงาน
          </button>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            📝 ใบงาน: นักเรียนรู้ทันโลกดิจิทัล (12 ข้อ)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            อ่านสถานการณ์ แล้วเลือกว่าการกระทำนั้น "ปลอดภัย" หรือ "ไม่ปลอดภัย"
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">ความคืบหน้ารวม</span>
            <span className="text-sm font-black text-emerald-700">
              ทำแล้ว {answers.filter((a) => a !== null).length} / 12 ข้อ
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs">
            ⭐ {score} / 12 คะแนน
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategoryIndex(null)}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeCategoryIndex === null
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ทั้งหมด (12 ข้อ)
        </button>
        {categories.map((cat, idx) => {
          const catAnswers = answers.slice(cat.range[0], cat.range[1]);
          const catDone = catAnswers.filter((a) => a !== null).length;
          const isSelected = activeCategoryIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name} ({catDone}/4)
            </button>
          );
        })}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          if (
            activeCategoryIndex !== null &&
            (idx < categories[activeCategoryIndex].range[0] ||
              idx >= categories[activeCategoryIndex].range[1])
          ) {
            return null;
          }

          const userChoice = answers[idx];
          const hasAnswered = userChoice !== null;
          const isCorrect = hasAnswered && userChoice === item.isSafe;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-rose-50/70 border-rose-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {item.category}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {item.statement}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <button
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(idx, true)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        userChoice === true
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                            : 'bg-rose-600 text-white'
                          : hasAnswered
                          ? 'bg-slate-100 text-slate-400 opacity-60'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 active:scale-95'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>✓ ปลอดภัย</span>
                    </button>

                    <button
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(idx, false)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        userChoice === false
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                            : 'bg-rose-600 text-white'
                          : hasAnswered
                          ? 'bg-slate-100 text-slate-400 opacity-60'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 active:scale-95'
                      }`}
                    >
                      <span className="font-mono font-bold">✕</span>
                      <span>✕ ไม่ปลอดภัย</span>
                    </button>
                  </div>

                  {/* Immediate feedback explanation */}
                  {hasAnswered && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs leading-relaxed text-slate-700">
                      <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                        {isCorrect ? 'คำตอบถูกต้อง! ✓' : 'ยังไม่ถูกต้องนะ ✕'} (เฉลย: {item.isSafe ? 'ปลอดภัย' : 'ไม่ปลอดภัย'})
                      </strong>
                      <p className="mt-0.5 text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {answers.filter((a) => a !== null).length === 12 && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <div className="text-3xl">🌟</div>
          <h4 className="text-lg font-bold text-emerald-950">
            ยินดีด้วย! ทำใบงานพลเมืองดิจิทัลครบทั้ง 12 ข้อแล้ว
          </h4>
          <p className="text-sm text-emerald-800">
            คะแนนรวมของคุณคือ <strong>{score} / 12 คะแนน</strong>
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition"
          >
            🔄 ทำใบงานใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
};

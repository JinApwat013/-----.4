import React, { useState } from 'react';
import { SAFE_TECH_WORKSHEET_ITEMS, DIGITAL_CITIZEN_ITEMS, PASSWORD_SAMPLES } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import { sendWorksheetScoresToGoogleSheets } from '../services/googleSheets';
import { AppsScriptModal } from './AppsScriptModal';
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
  HelpCircle,
  Send,
  Loader2,
  FileSpreadsheet,
  Code2,
  Eye,
  EyeOff
} from 'lucide-react';

interface WorksheetsSectionProps {
  studentName: string;
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
  studentName,
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
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const safeTechAnsweredCount = safeTechAnswers.filter((a) => a !== null).length;
  const worksheetAnsweredCount = worksheetAnswers.filter((a) => a !== null).length;

  const totalWorksheetsScore = passwordScore + safeTechScore + worksheetScore;

  const handleSendAllWorksheetScores = async () => {
    sounds.playTap();
    setIsSendingAll(true);
    setSyncMessage('กำลังส่งข้อมูลคะแนนใบงานไปยัง Google Sheets (แผ่นงานที่ 2: ใบงาน)...');

    const res = await sendWorksheetScoresToGoogleSheets({
      name: studentName,
      scores: [passwordScore, safeTechScore, worksheetScore],
      totalScore: totalWorksheetsScore,
    });

    setIsSendingAll(false);
    if (res.success) {
      sounds.playCorrect();
      setSyncMessage(
        `✅ บันทึกคะแนนใบงานลง Google Sheets (แผ่นงานที่ 2) เรียบร้อยแล้ว! [ใบงานที่ 1: ${passwordScore}, ใบงานที่ 2: ${safeTechScore}, ใบงานที่ 3: ${worksheetScore}] คะแนนรวม: ${totalWorksheetsScore} คะแนน`
      );
    } else {
      sounds.playIncorrect();
      setSyncMessage(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity selection menu */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
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
                    🔐 การตั้งรหัสผ่านที่ปลอดภัย
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ฝึกทักษะการตั้งรหัสผ่านที่รัดกุม พิมพ์และทดสอบความแข็งแกร่งตามเกณฑ์ความปลอดภัยไซเบอร์ (10 คะแนน)
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-amber-800">
                    คะแนนรหัสผ่าน: {passwordScore} / 10 คะแนน
                  </span>
                  <span className="text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    ตั้งรหัสผ่าน →
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
                    ทำแล้ว {safeTechAnsweredCount} / 10 (ได้ {safeTechScore} คะแนน)
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
                    ทำแล้ว {worksheetAnsweredCount} / 12 (ได้ {worksheetScore} คะแนน)
                  </span>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    เริ่มทำ →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Sheets Sync Card for Worksheets (Sheet 2) */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 border border-slate-800">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  ส่งคะแนนใบงานเข้า Google Sheets (แผ่นงานที่ 2: "ใบงาน")
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80">
                  Sheet 2
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                บันทึกเฉพาะคะแนนของนักเรียน (<strong>{studentName}</strong>) ตามโครงสร้าง: <em>[วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, คะแนนรวมใบงานทั้งหมด]</em>
              </p>

              {/* Score Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                  <span className="text-amber-400 font-medium">ใบงานที่ 1 (รหัสผ่าน):</span>{' '}
                  <strong className="text-white">{passwordScore}</strong>
                  <span className="text-slate-400 text-[10px]">/10</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                  <span className="text-blue-400 font-medium">ใบงานที่ 2 (ความปลอดภัย):</span>{' '}
                  <strong className="text-white">{safeTechScore}</strong>
                  <span className="text-slate-400 text-[10px]">/10</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                  <span className="text-emerald-400 font-medium">ใบงานที่ 3 (รู้ทันดิจิทัล):</span>{' '}
                  <strong className="text-white">{worksheetScore}</strong>
                  <span className="text-slate-400 text-[10px]">/12</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-xs font-bold text-emerald-300">
                  คะแนนรวม: {totalWorksheetsScore} / 32 คะแนน
                </div>
              </div>

              {syncMessage && (
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 animate-in fade-in">
                  {syncMessage}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setIsScriptModalOpen(true);
                }}
                className="px-3.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                title="ดูโค้ด Google Apps Script (doPost) สำหรับอัปเดต"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>โค้ด Apps Script</span>
              </button>

              <button
                type="button"
                disabled={isSendingAll}
                onClick={handleSendAllWorksheetScores}
                className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center gap-2"
              >
                {isSendingAll ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSendingAll ? 'กำลังส่งข้อมูล...' : '📤 ส่งคะแนนใบงานเข้า Sheet 2'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Screens */}
      {activeTab === 'password' && (
        <PasswordBuilderActivity
          studentName={studentName}
          currentScore={passwordScore}
          safeTechScore={safeTechScore}
          worksheetScore={worksheetScore}
          completedMissions={passwordMissionsCompleted}
          onUpdate={onUpdatePasswordMission}
          onBack={() => setActiveTab('menu')}
        />
      )}

      {activeTab === 'safe-tech' && (
        <SafeTechWorksheetActivity
          studentName={studentName}
          answers={safeTechAnswers}
          score={safeTechScore}
          passwordScore={passwordScore}
          worksheetScore={worksheetScore}
          onUpdate={onUpdateSafeTech}
          onBack={() => setActiveTab('menu')}
        />
      )}

      {activeTab === 'digital-citizen' && (
        <DigitalCitizenWorksheetActivity
          studentName={studentName}
          answers={worksheetAnswers}
          score={worksheetScore}
          passwordScore={passwordScore}
          safeTechScore={safeTechScore}
          onUpdate={onUpdateDigitalCitizen}
          onBack={() => setActiveTab('menu')}
        />
      )}

      {/* Google Apps Script Modal */}
      <AppsScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  );
};

// ==========================================
// Sub-activity 1: Password Builder
// ==========================================
interface PasswordBuilderProps {
  studentName: string;
  currentScore: number;
  safeTechScore: number;
  worksheetScore: number;
  completedMissions: number[];
  onUpdate: (score: number, completedMissions: number[]) => void;
  onBack: () => void;
}

const PasswordBuilderActivity: React.FC<PasswordBuilderProps> = ({
  studentName,
  currentScore,
  safeTechScore,
  worksheetScore,
  completedMissions,
  onUpdate,
  onBack,
}) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<{ success: boolean; text: string } | null>(null);

  const checkStrength = (val: string) => {
    const hasLetter = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(val);
    const hasMinLength = val.length >= 8;
    const noEasyWords = !/(123456|password|qwerty|admin|0101|dekdee|1111|1234)/i.test(val);

    let score = 0;
    if (hasLetter) score += 2;
    if (hasUpper) score += 2;
    if (hasNumber) score += 2;
    if (hasSymbol) score += 2;
    if (hasMinLength) score += 2;

    if (val.length > 0 && !noEasyWords) {
      score = Math.max(1, score - 3);
    }

    score = Math.min(10, score);

    return {
      score: val.trim() ? score : 0,
      hasLetter,
      hasUpper,
      hasNumber,
      hasSymbol,
      hasMinLength,
      noEasyWords: val.length > 0 && noEasyWords,
    };
  };

  const strength = checkStrength(passwordValue);

  const handlePasswordChange = (val: string) => {
    setPasswordValue(val);
    const res = checkStrength(val);
    const passedList: number[] = [];
    if (res.hasLetter && res.hasNumber) passedList.push(0);
    if (res.hasSymbol) passedList.push(1);
    if (res.hasMinLength) passedList.push(2);
    if (res.hasUpper) passedList.push(3);
    if (res.score === 10) passedList.push(4);

    onUpdate(res.score, passedList);
  };

  const handleAppend = (chunk: string) => {
    sounds.playTap();
    const nextVal = passwordValue + chunk;
    handlePasswordChange(nextVal);
  };

  const handleGenerateSample = () => {
    sounds.playTap();
    const samples = [
      'Cyber#Sec2026!',
      'Safe@School99$',
      'KruTech#Smart7',
      'Pass!Word2026#',
      'Digi@Citizen88*'
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    handlePasswordChange(picked);
  };

  const handleResetPassword = () => {
    sounds.playTap();
    setPasswordValue('');
    onUpdate(0, []);
  };

  const handleSendToSheets = async () => {
    sounds.playTap();
    setIsSending(true);
    setSendFeedback({ success: true, text: 'กำลังส่งคะแนนไปยัง Google Sheets (แผ่นงานที่ 2: ใบงาน)...' });

    const total = currentScore + safeTechScore + worksheetScore;
    const res = await sendWorksheetScoresToGoogleSheets({
      name: studentName,
      scores: [currentScore, safeTechScore, worksheetScore],
      totalScore: total,
    });

    setIsSending(false);
    if (res.success) {
      sounds.playCorrect();
      setSendFeedback({
        success: true,
        text: `✅ บันทึกคะแนนใบงานลง Google Sheets (แผ่นงานที่ 2) เรียบร้อยแล้ว! (ใบงานที่ 1: ${currentScore}, ใบงานที่ 2: ${safeTechScore}, ใบงานที่ 3: ${worksheetScore} | รวม: ${total} คะแนน)`,
      });
    } else {
      sounds.playIncorrect();
      setSendFeedback({
        success: false,
        text: res.message,
      });
    }
  };

  const getLevelBadge = (score: number, len: number) => {
    if (len === 0) return { text: 'ยังไม่ได้ระบุรหัสผ่าน', color: 'bg-slate-100 text-slate-500' };
    if (score >= 9) return { text: '🔵 ปลอดภัยมากเป็นพิเศษ (ยอดเยี่ยม)', color: 'bg-blue-100 text-blue-800' };
    if (score >= 7) return { text: '🟢 ปลอดภัยดี (แนะนำสำหรับการใช้งานจริง)', color: 'bg-emerald-100 text-emerald-800' };
    if (score >= 4) return { text: '🟡 ระดับปานกลาง (ควรเพิ่มความปลอดภัย)', color: 'bg-amber-100 text-amber-800' };
    return { text: '🔴 อ่อนแอมาก (เดาง่าย เสี่ยงถูกโจรกรรม)', color: 'bg-rose-100 text-rose-800' };
  };

  const levelBadge = getLevelBadge(strength.score, passwordValue.length);

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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            🔐 กิจกรรมที่ 1: การตั้งรหัสผ่านที่ปลอดภัย (Password Security)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ฝึกทักษะการตั้งรหัสผ่านที่รัดกุม พิมพ์หรือทดลองสร้างรหัสผ่านเพื่อตรวจสอบคะแนนความปลอดภัย (คะแนนเต็ม 10)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSending}
            onClick={handleSendToSheets}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1.5"
            title="บันทึกคะแนนใบงานทั้ง 3 กิจกรรมเข้า Sheet 2 พร้อมกัน"
          >
            {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSending ? 'กำลังส่ง...' : '💾 บันทึกคะแนนใบงานทั้งหมดพร้อมกัน (Sheet 2)'}</span>
          </button>
        </div>
      </div>

      {/* Feedback banner if sent */}
      {sendFeedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 border ${
            sendFeedback.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <span>{sendFeedback.text}</span>
          <button
            type="button"
            onClick={() => setSendFeedback(null)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Password Input Box */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>พิมพ์ตั้งรหัสผ่านของคุณในช่องนี้:</span>
            <span>ความยาว: {passwordValue.length} ตัวอักษร</span>
          </div>

          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordValue}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="พิมพ์รหัสผ่านที่นี่ เช่น S@fePass#2026..."
              className="w-full bg-slate-800/90 border-2 border-slate-700 focus:border-amber-400 rounded-2xl py-3.5 pl-4 pr-24 text-lg sm:text-2xl font-mono text-white placeholder:text-slate-500 outline-none transition"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/60 transition cursor-pointer"
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {passwordValue && (
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition cursor-pointer"
                  title="ล้างรหัสผ่าน"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Strength status and score */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${levelBadge.color}`}>
                {levelBadge.text}
              </span>
            </div>
            <div className="text-sm font-bold text-amber-400 font-mono">
              คะแนนความแข็งแรง: {strength.score} / 10 คะแนน
            </div>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span>มาตรวัดความแข็งแกร่งของรหัสผ่าน (Password Strength Meter)</span>
            <span>{strength.score * 10}%</span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                strength.score >= 8
                  ? 'bg-emerald-500'
                  : strength.score >= 5
                  ? 'bg-amber-500'
                  : strength.score > 0
                  ? 'bg-rose-500'
                  : 'bg-transparent'
              }`}
              style={{ width: `${strength.score * 10}%` }}
            />
          </div>
        </div>

        {/* Quick elements / suggestion blocks */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950">
              ⚡ ตัวช่วยผสมรหัสผ่านอย่างปลอดภัย (คลิกเพื่อเพิ่มลงในรหัสผ่าน):
            </span>
            <button
              type="button"
              onClick={handleGenerateSample}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
            >
              🎲 สุ่มตัวอย่างรหัสผ่านปลอดภัย
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleAppend('safe')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs font-bold text-slate-700 shadow-2xs hover:bg-amber-50/50 transition cursor-pointer text-left"
            >
              + ตัวพิมพ์เล็ก <span className="block text-[11px] font-normal text-slate-400 font-mono">safe</span>
            </button>
            <button
              type="button"
              onClick={() => handleAppend('PASS')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs font-bold text-slate-700 shadow-2xs hover:bg-amber-50/50 transition cursor-pointer text-left"
            >
              + ตัวพิมพ์ใหญ่ <span className="block text-[11px] font-normal text-slate-400 font-mono">PASS</span>
            </button>
            <button
              type="button"
              onClick={() => handleAppend('2026')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs font-bold text-slate-700 shadow-2xs hover:bg-amber-50/50 transition cursor-pointer text-left"
            >
              + ตัวเลข <span className="block text-[11px] font-normal text-slate-400 font-mono">2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleAppend('@#$')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs font-bold text-slate-700 shadow-2xs hover:bg-amber-50/50 transition cursor-pointer text-left"
            >
              + สัญลักษณ์ <span className="block text-[11px] font-normal text-slate-400 font-mono">@#$</span>
            </button>
          </div>
        </div>

        {/* Security Checklist Criteria */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              📋 เกณฑ์การประเมินความปลอดภัยของรหัสผ่าน:
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              ผ่าน {Object.values(strength).filter((v) => v === true).length} จาก 6 ข้อ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.hasMinLength
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.hasMinLength ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>1. ความยาวตั้งแต่ 8 ตัวอักษรขึ้นไป</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">+2 คะแนน</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.hasLetter
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.hasLetter ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>2. มีตัวอักษรพิมพ์เล็ก (a-z)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">+2 คะแนน</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.hasUpper
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.hasUpper ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>3. มีตัวอักษรพิมพ์ใหญ่ (A-Z)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">+2 คะแนน</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.hasNumber
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.hasNumber ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>4. มีตัวเลขอารบิก (0-9)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">+2 คะแนน</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.hasSymbol
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.hasSymbol ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>5. มีสัญลักษณ์พิเศษ (@, #, $, !, %)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">+2 คะแนน</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                strength.noEasyWords
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {strength.noEasyWords ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span>6. ไม่ใช้คำเดาง่าย เช่น 123456, password</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">เกณฑ์ความปลอดภัย</span>
            </div>
          </div>
        </div>

        {/* Dynamic Tip */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <span className="font-bold">คำแนะนำในการตั้งรหัสผ่าน: </span>
            {strength.score === 10 ? (
              <span className="text-emerald-800 font-semibold">
                🎉 ยอดเยี่ยมมาก! รหัสผ่านของคุณผ่านเกณฑ์ความปลอดภัยไซเบอร์ครบทุกข้อ ได้รับ 10/10 คะแนนเต็ม
              </span>
            ) : passwordValue.length === 0 ? (
              <span>
                ลองเริ่มพิมพ์รหัสผ่านที่มีทั้งตัวอักษรพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ เพื่อให้ได้คะแนนสูงสุด
              </span>
            ) : (
              <span>
                {!strength.hasMinLength && '• เพิ่มความยาวให้ได้อย่างน้อย 8 ตัวอักษร '}
                {!strength.hasUpper && '• เติมตัวอักษรพิมพ์ใหญ่ (A-Z) '}
                {!strength.hasSymbol && '• เพิ่มสัญลักษณ์พิเศษ เช่น @, #, $, ! '}
                {!strength.hasNumber && '• เติมตัวเลข (0-9) '}
                {!strength.noEasyWords && '• หลีกเลี่ยงคำว่า password, 123456 หรือคำเดาง่าย '}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Sub-activity 2: Safe Tech Worksheet
// ==========================================
interface SafeTechProps {
  studentName: string;
  answers: (boolean | null)[];
  score: number;
  passwordScore: number;
  worksheetScore: number;
  onUpdate: (answers: (boolean | null)[], score: number) => void;
  onBack: () => void;
}

const SafeTechWorksheetActivity: React.FC<SafeTechProps> = ({
  studentName,
  answers,
  score,
  passwordScore,
  worksheetScore,
  onUpdate,
  onBack,
}) => {
  const items = SAFE_TECH_WORKSHEET_ITEMS;
  const answeredCount = answers.filter((a) => a !== null).length;
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<{ success: boolean; text: string } | null>(null);

  const handleSendToSheets = async () => {
    sounds.playTap();
    setIsSending(true);
    setSendFeedback({ success: true, text: 'กำลังส่งคะแนนไปยัง Google Sheets (แผ่นงานที่ 2: ใบงาน)...' });

    const total = passwordScore + score + worksheetScore;
    const res = await sendWorksheetScoresToGoogleSheets({
      name: studentName,
      scores: [passwordScore, score, worksheetScore],
      totalScore: total,
    });

    setIsSending(false);
    if (res.success) {
      sounds.playCorrect();
      setSendFeedback({
        success: true,
        text: `✅ บันทึกคะแนนใบงานลง Google Sheets (แผ่นงานที่ 2) เรียบร้อยแล้ว! (ใบงานที่ 1: ${passwordScore}, ใบงานที่ 2: ${score}, ใบงานที่ 3: ${worksheetScore} | รวม: ${total} คะแนน)`,
      });
    } else {
      sounds.playIncorrect();
      setSendFeedback({
        success: false,
        text: res.message,
      });
    }
  };

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

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSending || answeredCount === 0}
            onClick={handleSendToSheets}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
            title="ส่งข้อมูลใบงานนี้ไปยัง Google Sheets (Sheet 2)"
          >
            {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSending ? 'กำลังส่ง...' : 'ส่งใบงานเข้า Sheet 2'}</span>
          </button>

          <div className="text-right bg-blue-50 px-4 py-2 rounded-2xl border border-blue-200">
            <span className="text-xs text-blue-700 font-semibold block">คะแนนปัจจุบัน</span>
            <span className="text-lg font-bold text-blue-950">
              {score} <span className="text-xs font-normal text-slate-500">/ 10</span>
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {sendFeedback && (
        <div
          className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 border ${
            sendFeedback.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <span>{sendFeedback.text}</span>
          <button
            type="button"
            onClick={() => setSendFeedback(null)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Progress & Summary strip */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs">
        <span className="font-semibold text-blue-900">
          ความคืบหน้า: ทำแล้ว {answeredCount} / {items.length} ข้อ
        </span>
        <span className="font-bold text-blue-950">
          คะแนนที่ได้: {score} / 10 คะแนน ({Math.round((score / 10) * 100)}%)
        </span>
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
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendToSheets}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isSending ? 'กำลังส่งข้อมูล...' : '📤 บันทึกคะแนนใบงานนี้ไปยัง Google Sheets (Sheet 2)'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition cursor-pointer"
            >
              🔄 ทำใบงานใหม่อีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Sub-activity 3: Digital Citizen Worksheet
// ==========================================
interface DigitalCitizenProps {
  studentName: string;
  answers: (boolean | null)[];
  score: number;
  passwordScore: number;
  safeTechScore: number;
  onUpdate: (answers: (boolean | null)[], score: number) => void;
  onBack: () => void;
}

const DigitalCitizenWorksheetActivity: React.FC<DigitalCitizenProps> = ({
  studentName,
  answers,
  score,
  passwordScore,
  safeTechScore,
  onUpdate,
  onBack,
}) => {
  const items = DIGITAL_CITIZEN_ITEMS;
  const answeredCount = answers.filter((a) => a !== null).length;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<{ success: boolean; text: string } | null>(null);

  const handleSendToSheets = async () => {
    sounds.playTap();
    setIsSending(true);
    setSendFeedback({ success: true, text: 'กำลังส่งคะแนนไปยัง Google Sheets (แผ่นงานที่ 2: ใบงาน)...' });

    const total = passwordScore + safeTechScore + score;
    const res = await sendWorksheetScoresToGoogleSheets({
      name: studentName,
      scores: [passwordScore, safeTechScore, score],
      totalScore: total,
    });

    setIsSending(false);
    if (res.success) {
      sounds.playCorrect();
      setSendFeedback({
        success: true,
        text: `✅ บันทึกคะแนนใบงานลง Google Sheets (แผ่นงานที่ 2) เรียบร้อยแล้ว! (ใบงานที่ 1: ${passwordScore}, ใบงานที่ 2: ${safeTechScore}, ใบงานที่ 3: ${score} | รวม: ${total} คะแนน)`,
      });
    } else {
      sounds.playIncorrect();
      setSendFeedback({
        success: false,
        text: res.message,
      });
    }
  };

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

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSending || answeredCount === 0}
            onClick={handleSendToSheets}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
            title="ส่งข้อมูลใบงานนี้ไปยัง Google Sheets (Sheet 2)"
          >
            {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSending ? 'กำลังส่ง...' : 'ส่งใบงานเข้า Sheet 2'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-semibold block">ความคืบหน้ารวม</span>
              <span className="text-sm font-black text-emerald-700">
                ทำแล้ว {answeredCount} / 12 ข้อ
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs">
              ⭐ {score} / 12 คะแนน
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {sendFeedback && (
        <div
          className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 border ${
            sendFeedback.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <span>{sendFeedback.text}</span>
          <button
            type="button"
            onClick={() => setSendFeedback(null)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

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
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendToSheets}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isSending ? 'กำลังส่งข้อมูล...' : '📤 บันทึกคะแนนใบงานนี้ไปยัง Google Sheets (Sheet 2)'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition cursor-pointer"
            >
              🔄 ทำใบงานใหม่อีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

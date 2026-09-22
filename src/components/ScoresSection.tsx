import React, { useState } from 'react';
import { Award, TrendingUp, CheckCircle, FileCheck, KeyRound, Send, Printer, Sparkles, AlertCircle, Code2, Layers, Heart, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { sendQuizScoresToGoogleSheets, sendWorksheetScoresToGoogleSheets } from '../services/googleSheets';
import { AppsScriptModal } from './AppsScriptModal';

interface ScoresSectionProps {
  studentName: string;
  preScore: number | null;
  postScore: number | null;
  safeTechScore: number;
  safeTechAnsweredCount: number;
  worksheetScore: number;
  worksheetAnsweredCount: number;
  passwordScore: number;
  passwordMissionsCount: number;
  postAnswers: { questionId: string; selectedAnswerId: string | null; isCorrect: boolean }[];
  surveyDone?: boolean;
  onNavigateToSurvey?: () => void;
}

const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzpHHR4hN0A1nQaVAIGYytJdqbE0cbw3UVETNTzVgKEZDlvmEKt02gN9kAexRgvt6pGZA/exec';

export const ScoresSection: React.FC<ScoresSectionProps> = ({
  studentName,
  preScore,
  postScore,
  safeTechScore,
  safeTechAnsweredCount,
  worksheetScore,
  worksheetAnsweredCount,
  passwordScore,
  passwordMissionsCount,
  postAnswers,
  surveyDone = false,
  onNavigateToSurvey,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);

  // Growth calculations
  const hasBothScores = preScore !== null && postScore !== null;
  const improvement = hasBothScores ? postScore! - preScore! : null;

  const getQualityLevel = (score: number) => {
    if (score >= 17) return { label: 'ดีเยี่ยม', color: 'text-emerald-700 bg-emerald-100', stars: '⭐⭐⭐' };
    if (score >= 14) return { label: 'ดี', color: 'text-blue-700 bg-blue-100', stars: '⭐⭐' };
    if (score >= 10) return { label: 'พอใช้', color: 'text-amber-700 bg-amber-100', stars: '⭐' };
    return { label: 'ควรทบทวน', color: 'text-rose-700 bg-rose-100', stars: '📖' };
  };

  const quality = postScore !== null ? getQualityLevel(postScore) : null;

  const saveScoresToSystem = async () => {
    setIsSaving(true);
    setSaveStatus('กำลังส่งข้อมูลคะแนนทั้งหมดไปยังระบบ (Google Sheets)...');
    sounds.playTap();

    try {
      const results: string[] = [];
      const totalWorksheetScore = passwordScore + safeTechScore + worksheetScore;

      // 1. บันทึกคะแนนใบงานลง Sheet 2 เสมอ
      const sheet2Res = await sendWorksheetScoresToGoogleSheets({
        name: studentName,
        scores: [passwordScore, safeTechScore, worksheetScore],
        totalScore: totalWorksheetScore,
      });

      if (sheet2Res.success) {
        results.push('Sheet 2: บันทึกคะแนนใบงานทั้ง 3 กิจกรรมสำเร็จ');
      } else {
        results.push(`Sheet 2: ${sheet2Res.message}`);
      }

      // 2. ถ้ามีผลคะแนนแบบทดสอบ (หรืออย่างน้อยมีคะแนนใดคะแนนหนึ่ง) ส่งไปยัง Sheet 1
      if (hasBothScores) {
        const answers: (number | string)[] = Array.from({ length: 20 }, (_, idx) => {
          const qId = `q${idx + 1}`;
          const ans = postAnswers.find((a) => a && a.questionId === qId) || postAnswers[idx];
          if (!ans || !ans.selectedAnswerId) return '-';

          const raw = String(ans.selectedAnswerId).trim();
          const letterMatch = raw.match(/([A-D])$/i);
          if (letterMatch) {
            const letter = letterMatch[1].toUpperCase();
            if (letter === 'A') return 1;
            if (letter === 'B') return 2;
            if (letter === 'C') return 3;
            if (letter === 'D') return 4;
          }

          const numMatch = raw.match(/([1-4])$/);
          if (numMatch) {
            return Number(numMatch[1]);
          }

          return '-';
        });

        const sheet1Res = await sendQuizScoresToGoogleSheets({
          name: studentName,
          preScore: preScore,
          postScore: postScore,
          improvement: improvement,
          quality: quality?.label || '-',
          safeTechScore: safeTechScore,
          worksheetScore: worksheetScore,
          passwordScore: passwordScore,
          answers: answers,
        });

        if (sheet1Res.success) {
          results.push('Sheet 1: บันทึกคะแนนแบบทดสอบสำเร็จ');
        } else {
          results.push(`Sheet 1: ${sheet1Res.message}`);
        }
      } else {
        results.push('(Sheet 1: ยังทำแบบทดสอบไม่ครบทั้ง 2 ชุด)');
      }

      const allOk = sheet2Res.success && (!hasBothScores || results.some(r => r.includes('Sheet 1: บันทึก')));
      if (allOk) {
        sounds.playCorrect();
        setSaveStatus(`✅ ${results.join(' | ')}`);
      } else {
        sounds.playIncorrect();
        setSaveStatus(`⚠️ ${results.join(' | ')}`);
      }
    } catch (err) {
      setSaveStatus('⚠️ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveToSystem = saveScoresToSystem;

  const handlePrintCertificate = () => {
    sounds.playTap();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> รายงานผลการเรียนรู้รายบุคคล
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              📈 สรุปคะแนนและการพัฒนาการเรียนรู้
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              ผู้เรียน: <strong className="text-slate-900">{studentName}</strong> • ชั้นประถมศึกษาปีที่ 4
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์รายงานผล</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Score Cards (Pre, Post, and 3 Worksheets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Card 1: Pre-test */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              คะแนนก่อนเรียน (Pre-test)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-800">
              {preScore !== null ? (
                <>
                  {preScore} <span className="text-base font-semibold text-slate-400">/ 20</span>
                </>
              ) : (
                <span className="text-xl text-slate-400 font-normal">ยังไม่ได้ทำ</span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-500 rounded-full transition-all"
                style={{ width: `${preScore ? (preScore / 20) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {preScore !== null ? `คิดเป็น ${Math.round((preScore / 20) * 100)}%` : 'รอดำเนินการ'}
            </span>
          </div>
        </div>

        {/* Card 2: Post-test */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-2 border-blue-200 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-700 block mb-1">
              คะแนนหลังเรียน (Post-test)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-blue-700">
              {postScore !== null ? (
                <>
                  {postScore} <span className="text-base font-semibold text-slate-400">/ 20</span>
                </>
              ) : (
                <span className="text-xl text-slate-400 font-normal">ยังไม่ได้ทำ</span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${postScore ? (postScore / 20) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
              {postScore !== null ? `คิดเป็น ${Math.round((postScore / 20) * 100)}%` : 'ยังไม่ทำแบบทดสอบ'}
            </span>
          </div>
        </div>

        {/* Card 3: Worksheet 1 - Password Setting */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 block mb-1">
              ใบงานที่ 1: การตั้งรหัสผ่าน
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-600">
              {passwordScore > 0 ? (
                <>
                  {passwordScore} <span className="text-base font-semibold text-slate-400">/ 10</span>
                </>
              ) : (
                <>
                  0 <span className="text-base font-semibold text-slate-400">/ 10</span>
                </>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${(passwordScore / 10) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
              {passwordScore >= 9
                ? '🔵 ปลอดภัยมากเป็นพิเศษ'
                : passwordScore >= 7
                ? '🟢 ปลอดภัยดี'
                : passwordScore >= 4
                ? '🟡 ระดับปานกลาง'
                : passwordScore > 0
                ? '🔴 อ่อนแอ'
                : 'ยังไม่ได้ระบุรหัส'}
            </span>
          </div>
        </div>

        {/* Card 4: Worksheet 2 - Safe Tech Worksheet */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              ใบงานที่ 2: ใช้เทคโนโลยีปลอดภัย
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700">
              {safeTechAnsweredCount > 0 ? (
                <>
                  {safeTechScore} <span className="text-base font-semibold text-slate-400">/ 10</span>
                </>
              ) : (
                <span className="text-xl text-slate-400 font-normal">ยังไม่เริ่ม</span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(safeTechScore / 10) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              ทำแล้ว {safeTechAnsweredCount} / 10 ข้อ
            </span>
          </div>
        </div>

        {/* Card 5: Worksheet 3 - Digital Citizen Worksheet */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              ใบงานที่ 3: นักเรียนรู้ทันดิจิทัล
            </span>
            <div className="text-3xl sm:text-4xl font-black text-indigo-700">
              {worksheetAnsweredCount > 0 ? (
                <>
                  {worksheetScore} <span className="text-base font-semibold text-slate-400">/ 12</span>
                </>
              ) : (
                <span className="text-xl text-slate-400 font-normal">ยังไม่เริ่ม</span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${(worksheetScore / 12) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              ทำแล้ว {worksheetAnsweredCount} / 12 ข้อ
            </span>
          </div>
        </div>
      </div>

      {/* Summary Banner for Worksheets */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <KeyRound className="w-4 h-4 text-amber-600" />
          <span>สรุปคะแนนใบงานทั้ง 3 กิจกรรม (บันทึกเข้า Sheet 2):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-medium text-slate-700">
          <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200">
            ใบงาน 1 (รหัสผ่าน): <strong className="text-amber-700">{passwordScore}/10</strong>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200">
            ใบงาน 2 (Safe Tech): <strong className="text-emerald-700">{safeTechScore}/10</strong>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-200">
            ใบงาน 3 (รู้ทันดิจิทัล): <strong className="text-indigo-700">{worksheetScore}/12</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-200/80 text-amber-950 font-bold">
            รวมคะแนนใบงานทั้งหมด: {passwordScore + safeTechScore + worksheetScore} / 32 คะแนน
          </span>
        </div>
      </div>

      {/* Comparison & Development Box */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Development outcome */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-950 mb-2">
            <TrendingUp className="w-5 h-5 text-amber-600" /> ผลการเปรียบเทียบและการพัฒนา
          </div>

          {hasBothScores ? (
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {improvement! > 0 ? `+${improvement} คะแนน` : improvement === 0 ? 'คะแนนคงที่' : `${improvement} คะแนน`}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  (ก่อนเรียน: {preScore} → หลังเรียน: {postScore})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {improvement! > 0
                  ? `🎉 ยอดเยี่ยมมาก! นักเรียนมีความรู้ความเข้าใจเพิ่มขึ้นอย่างเห็นได้ชัด (+${improvement} คะแนน) ขอชื่นชมในความตั้งใจเรียนรู้`
                  : improvement === 0
                  ? '🌟 นักเรียนมีความรู้พื้นฐานในระดับเดิม สามารถกลับไปทบทวนเนื้อหาในส่วนที่ยังไม่มั่นใจเพื่อเพิ่มพูนความเข้าใจ'
                  : '💪 ไม่เป็นไรนะ ลองกลับไปทบทวนหัวข้อต่าง ๆ ในคลังความรู้ และลองทำแบบทดสอบอีกครั้งเพื่อความเข้าใจที่ดียิ่งขึ้น'}
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-600">
              💡 กรุณาทำแบบทดสอบหลังเรียนให้เสร็จสิ้น เพื่อดูผลการพัฒนาเปรียบเทียบก่อนและหลังเรียน
            </p>
          )}
        </div>

        {/* Quality assessment level */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-950 mb-2">
            <Award className="w-5 h-5 text-blue-600" /> ระดับคุณภาพผลการเรียนรู้ (หลังเรียน)
          </div>

          {quality ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${quality.color}`}>
                  {quality.label}
                </span>
                <span className="text-sm">{quality.stars}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                การประเมินตามเกณฑ์มาตรฐานกลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี (วิทยาการคำนวณ) ระดับชั้น ป.4
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-600">
              💡 ระดับคุณภาพจะปรากฏหลังจากทำแบบทดสอบหลังเรียนเสร็จสิ้น
            </p>
          )}
        </div>
      </div>

      {/* Password Builder mini badge */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              สถานะกิจกรรมที่ 1: การตั้งรหัสผ่านที่ปลอดภัย
            </div>
            <div className="text-xs text-slate-500">
              คะแนนความแข็งแกร่งรหัสผ่าน: <strong className="text-amber-700">{passwordScore} / 10 คะแนน</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            {passwordScore >= 9
              ? '🔵 ปลอดภัยมากเป็นพิเศษ'
              : passwordScore >= 7
              ? '🟢 ปลอดภัยดี'
              : passwordScore >= 4
              ? '🟡 ระดับปานกลาง'
              : passwordScore > 0
              ? '🔴 อ่อนแอ'
              : 'ยังไม่ได้ตั้งรหัส'}
          </span>
        </div>
      </div>

      {/* Satisfaction Survey Invitation Banner */}
      <div className={`p-6 rounded-3xl border-2 transition-all ${
        surveyDone
          ? 'bg-emerald-50/90 border-emerald-300'
          : 'bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 border-rose-300 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>{surveyDone ? 'ทำแบบประเมินความพึงพอใจแล้ว ✓' : 'ขั้นตอนสุดท้าย: แบบประเมินความพึงพอใจ'}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {surveyDone
                ? '💖 บันทึกแบบประเมินความพึงพอใจต่อบทเรียนแล้ว (Sheet 3)'
                : '💖 แบบประเมินความพึงพอใจต่อบทเรียนคอมพิวเตอร์ช่วยสอน (12 ข้อ)'}
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              {surveyDone
                ? 'ข้อมูลระดับความพึงพอใจของนักเรียนถูกส่งไปยังแผ่นงาน "ความพึงพอใจ" ใน Google Sheets เรียบร้อยแล้ว สามารถคลิกเข้าไปดูหรือแก้ไขคำตอบได้ตลอดเวลา'
                : 'ขอเชิญนักเรียนร่วมประเมินความพึงพอใจต่อบทเรียน CAI ด้านเนื้อหา ด้านการออกแบบ และด้านกิจกรรม เพื่อนำไปพัฒนาการเรียนการสอน (บันทึกข้อมูลเข้า Sheet 3: "ความพึงพอใจ")'}
            </p>
          </div>

          {onNavigateToSurvey && (
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onNavigateToSurvey();
              }}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 ${
                surveyDone
                  ? 'bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-300'
                  : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-900/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${surveyDone ? 'text-emerald-600 fill-emerald-600' : 'text-white fill-white'}`} />
              <span>{surveyDone ? 'ดูผลการประเมินความพึงพอใจ' : 'ทำแบบประเมินความพึงพอใจ (12 ข้อ)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Save to System Button / Google Sheets sync (Sheet 1 & Sheet 2) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> บันทึกผลการเรียนรู้และคะแนนใบงานทั้งหมด
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80">
              Sheet 1 & Sheet 2
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            ส่งข้อมูลคะแนนแบบทดสอบ (ก่อนเรียน–หลังเรียน) ไปยัง Sheet 1 และบันทึกคะแนนใบงานทั้ง 3 กิจกรรมไปยัง Sheet 2 ของครูผู้สอนพร้อมกันในคลิกเดียว
          </p>
          {saveStatus && (
            <p id="scores-save-status" className="text-xs font-semibold text-amber-300 mt-2">
              {saveStatus}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
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
            id="scores-save-button"
            type="button"
            disabled={isSaving}
            onClick={saveScoresToSystem}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-sm shadow-md transition active:scale-95 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกคะแนนทั้งหมดไปยังระบบ'}</span>
          </button>
        </div>
      </div>

      {/* Apps Script Modal */}
      <AppsScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  );
};

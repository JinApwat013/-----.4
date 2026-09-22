import React, { useState } from 'react';
import { X, Copy, Check, FileSpreadsheet, Code2, AlertCircle, ExternalLink } from 'lucide-react';
import { APPS_SCRIPT_CODE } from '../data/appsScriptCode';
import { sounds } from '../utils/audio';

interface AppsScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppsScriptModal: React.FC<AppsScriptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    sounds.playTap();
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                โค้ด Google Apps Script (doPost)
              </h3>
              <p className="text-xs text-slate-500">
                รองรับการแยกบันทึกข้อมูลใบงานไปที่แผ่นงานที่ 2 (Sheet 2: ใบงาน)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Explanation Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="font-bold text-blue-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" /> โครงสร้างการทำงานของระบบ:
            </div>
            <ul className="text-xs text-blue-800 space-y-1.5 list-disc list-inside">
              <li>
                <strong>แผ่นงานที่ 1 (Sheet 1):</strong> บันทึกคะแนนแบบทดสอบก่อนเรียน-หลังเรียน และคะแนนสรุปตามระบบเดิม
              </li>
              <li>
                <strong>แผ่นงานที่ 2 (Sheet 2: ชื่อ "ใบงาน"):</strong> เมื่อได้รับ Payload <code>type: "worksheet_scores"</code> จะบันทึกเฉพาะคะแนน: <em>[วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, ..., คะแนนรวมใบงานทั้งหมด]</em>
              </li>
              <li>
                <strong>แผ่นงานที่ 3 (Sheet 3: ชื่อ "ความพึงพอใจ"):</strong> เมื่อได้รับ Payload <code>type: "satisfaction_survey"</code> จะบันทึก: <em>[วันเวลา, ชื่อ-นามสกุล, ข้อ 1 - ข้อ 12, เฉลี่ยด้านเนื้อหา, เฉลี่ยด้านการออกแบบ, เฉลี่ยด้านกิจกรรม, เฉลี่ยรวมทั้งหมด]</em>
              </li>
              <li>
                <strong>รูปแบบวันเวลา:</strong> บันทึกเป็น <em>วันที่/เดือน/ปี, เวลา</em> (เช่น 22/09/2026, 14:05:10)
              </li>
              <li>
                ระบบจะสร้างหัวตารางในแผ่นงานให้อัตโนมัติหากยังไม่มีข้อมูล
              </li>
            </ul>
          </div>

          {/* Quick steps */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              ขั้นตอนการติดตั้งใน Google Sheets:
            </h4>
            <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <li>เปิด Google Sheets ของคุณ แล้วไปที่เมนู <strong>ส่วนขยาย (Extensions) &gt; Apps Script</strong></li>
              <li>ลบโค้ดเดิมออกทั้งหมด แล้ววางโค้ดด้านล่างนี้ลงไปแทน</li>
              <li>กด <strong>ทำให้ใช้งานได้ (Deploy) &gt; การทำให้ใช้งานได้ใหม่ (New deployment)</strong></li>
              <li>เลือกประเภท <strong>เว็บแอป (Web app)</strong>, กำหนด ผู้มีสิทธิ์เข้าถึง เป็น <strong>"ทุกคน (Anyone)"</strong> แล้วกด Deploy</li>
            </ol>
          </div>

          {/* Code block */}
          <div className="relative">
            <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-xl text-slate-300 text-xs font-mono">
              <span>Code.gs (doPost)</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>คัดลอกสำเร็จ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอกโค้ด</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-b-xl overflow-x-auto max-h-72 leading-relaxed selection:bg-emerald-900">
              {APPS_SCRIPT_CODE}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            ระบบใช้ mode: <code>no-cors</code> และ Content-Type: <code>text/plain;charset=utf-8</code>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

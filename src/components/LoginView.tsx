import React, { useState } from 'react';
import { Shield, Sparkles, BookCheck, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LoginViewProps {
  onLogin: (name: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('กรุณากรอกชื่อ–นามสกุลของผู้เรียนก่อนเริ่มเรียน');
      return;
    }
    sounds.playTap();
    onLogin(trimmed);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-amber-200 shadow-2xl shadow-amber-900/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        {/* Soft decorative background glows */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/30 mb-5">
            <Shield className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> วิทยาการคำนวณ ชั้นประถมศึกษาปีที่ 4
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
            บทเรียนออนไลน์
          </h1>
          <p className="text-base sm:text-lg font-semibold text-blue-700 mt-1">
            การใช้เทคโนโลยีสารสนเทศอย่างปลอดภัย
          </p>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            เรียนรู้การปกป้องข้อมูลส่วนตัว การสร้างรหัสผ่านที่รัดกุม การเป็นพลเมืองดิจิทัลที่ดี และการรู้เท่าทันสื่อ
          </p>

          <form onSubmit={handleSubmit} className="mt-8 text-left max-w-md mx-auto space-y-4">
            <div>
              <label htmlFor="student-name-input" className="block text-sm font-bold text-slate-800 mb-2">
                ชื่อ–นามสกุล ของนักเรียน
              </label>
              <input
                id="student-name-input"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="เช่น เด็กชายรักเรียน สดใส (ป.4/1 เลขที่ 1)"
                className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-amber-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 font-medium transition shadow-sm"
              />
              {error && (
                <p className="text-sm text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                  ⚠️ {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>เข้าสู่บทเรียน 🚀</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-500 font-medium">
            <div className="p-2 rounded-xl bg-slate-50">
              <BookCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span>ทำแบบทดสอบ</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <Shield className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <span>ศึกษาเนื้อหา</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-500" />
              <span>ใบงานฝึกทักษะ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

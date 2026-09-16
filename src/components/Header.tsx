import React from 'react';
import { Shield, Volume2, VolumeX, LogOut, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  studentName: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  soundEnabled,
  onToggleSound,
  onOpenLogout
}) => {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-amber-200/80 shadow-lg shadow-amber-900/5 p-5 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-md flex items-center justify-center text-3xl shrink-0">
            <Shield className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                <Sparkles className="w-3 h-3" /> วิทยาการคำนวณ ป.4
              </span>
              <span className="text-xs font-medium text-slate-500">บทเรียนออนไลน์</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mt-1">
              การใช้เทคโนโลยีสารสนเทศอย่างปลอดภัย
            </h1>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-100/70 border border-amber-200 text-slate-800 font-semibold text-sm">
            <User className="w-4 h-4 text-amber-700" />
            <span className="max-w-[140px] md:max-w-[200px] truncate">{studentName}</span>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'ปิดเสียงเอฟเฟกต์' : 'เปิดเสียงเอฟเฟกต์'}
            title={soundEnabled ? 'ปิดเสียงเอฟเฟกต์' : 'เปิดเสียงเอฟเฟกต์'}
            className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition text-slate-700 shadow-sm cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            type="button"
            onClick={onOpenLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-sm font-medium transition active:scale-95 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </header>
  );
};

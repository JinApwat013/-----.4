import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              ต้องการออกจากระบบใช่หรือไม่?
            </h3>
            <p className="text-xs text-slate-500">
              การออกจากระบบจะล้างข้อมูลในเซสชันนี้
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80 mb-6">
          หากยืนยัน คะแนน ผลการทำแบบทดสอบ และสถานะกิจกรรมจะถูกล้างออกจากเครื่องนี้ เพื่อให้นักเรียนคนอื่นสามารถเริ่มเรียนใหม่ได้
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-sm font-semibold shadow-md shadow-rose-600/20 transition cursor-pointer"
          >
            ยืนยันออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
};

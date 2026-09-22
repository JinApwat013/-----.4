import React from 'react';
import { BookOpen, Award, CheckCircle2, Lock, FileText, BarChart3, HelpCircle, Heart } from 'lucide-react';
import { ActiveScreen } from '../types';

interface NavigationProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  preDone: boolean;
  postDone: boolean;
  surveyDone?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  onSelectScreen,
  preDone,
  postDone,
  surveyDone = false,
}) => {
  const tabs = [
    {
      id: 'pretest' as ActiveScreen,
      label: 'แบบทดสอบก่อนเรียน',
      icon: HelpCircle,
      badge: preDone ? 'ทำแล้ว ✓' : '20 ข้อ',
      locked: false,
    },
    {
      id: 'lesson' as ActiveScreen,
      label: 'เนื้อหาความรู้',
      icon: BookOpen,
      badge: '3 หมวดหมู่',
      locked: !preDone,
    },
    {
      id: 'game' as ActiveScreen,
      label: 'ใบงานและกิจกรรม',
      icon: FileText,
      badge: '3 กิจกรรม',
      locked: !preDone,
    },
    {
      id: 'posttest' as ActiveScreen,
      label: 'แบบทดสอบหลังเรียน',
      icon: Award,
      badge: postDone ? 'ทำแล้ว ✓' : '20 ข้อ',
      locked: !preDone,
    },
    {
      id: 'scores' as ActiveScreen,
      label: 'คะแนนและการพัฒนา',
      icon: BarChart3,
      badge: null,
      locked: !preDone,
    },
    {
      id: 'survey' as ActiveScreen,
      label: 'แบบประเมินความพึงพอใจ',
      icon: Heart,
      badge: surveyDone ? 'ประเมินแล้ว ✓' : '12 ข้อ',
      locked: !postDone,
    },
  ];

  return (
    <nav aria-label="เมนูบทเรียน" className="mb-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-2.5 border border-amber-200/80 shadow-md shadow-amber-900/5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.id;
            const isLocked = tab.locked;

            return (
              <button
                key={tab.id}
                type="button"
                disabled={isLocked}
                onClick={() => onSelectScreen(tab.id)}
                className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all font-semibold text-sm cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : isLocked
                    ? 'bg-slate-50/70 text-slate-400 opacity-65 cursor-not-allowed border border-dashed border-slate-200'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:text-blue-700 hover:shadow-sm border border-slate-200/70 active:scale-95'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  )}
                  <span className="text-center">{tab.label}</span>
                </div>

                {tab.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isLocked
                        ? 'bg-slate-200/60 text-slate-500'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!preDone && (
          <div className="mt-3 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs md:text-sm font-medium text-amber-800">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              กรุณาทำ <strong>แบบทดสอบก่อนเรียน (20 ข้อ)</strong> ให้เสร็จสิ้นเพื่อปลดล็อกเนื้อหา ใบงาน และแบบทดสอบหลังเรียน
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

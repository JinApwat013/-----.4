import React, { useState, useMemo } from 'react';
import {
  Heart,
  Send,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Layout,
  Star,
  Check,
  Loader2,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  SURVEY_QUESTIONS,
  SURVEY_CATEGORIES,
  RATING_LEVELS,
  getInterpretation,
  SurveyQuestionItem,
} from '../data/surveyQuestions';
import { sendSatisfactionSurveyToGoogleSheets } from '../services/googleSheets';
import { sounds } from '../utils/audio';

interface SatisfactionSurveySectionProps {
  studentName: string;
  savedRatings?: (number | null)[];
  isAlreadySubmitted?: boolean;
  onSurveyCompleted?: (ratings: number[], means: { content: number; design: number; activity: number; total: number }) => void;
  onNavigateToScores?: () => void;
}

export const SatisfactionSurveySection: React.FC<SatisfactionSurveySectionProps> = ({
  studentName,
  savedRatings,
  isAlreadySubmitted = false,
  onSurveyCompleted,
  onNavigateToScores,
}) => {
  // 12 answers (indexes 0 to 11)
  const [ratings, setRatings] = useState<(number | null)[]>(() => {
    if (savedRatings && savedRatings.length === 12) {
      return savedRatings;
    }
    return Array(12).fill(null);
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(isAlreadySubmitted);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Count answered
  const answeredCount = useMemo(() => {
    return ratings.filter((r) => r !== null && r !== undefined).length;
  }, [ratings]);

  const isComplete = answeredCount === 12;

  // Real-time calculated means
  const { meanContent, meanDesign, meanActivity, totalMean } = useMemo(() => {
    const calcCategoryMean = (startIdx: number, endIdx: number) => {
      const slice = ratings.slice(startIdx, endIdx).filter((v): v is number => v !== null && v !== undefined);
      if (slice.length === 0) return 0;
      const sum = slice.reduce((acc, curr) => acc + curr, 0);
      return sum / slice.length;
    };

    const cMean = calcCategoryMean(0, 4); // Items 1-4
    const dMean = calcCategoryMean(4, 8); // Items 5-8
    const aMean = calcCategoryMean(8, 12); // Items 9-12

    const allAnswered = ratings.filter((v): v is number => v !== null && v !== undefined);
    const tMean = allAnswered.length > 0 ? allAnswered.reduce((acc, curr) => acc + curr, 0) / allAnswered.length : 0;

    return {
      meanContent: cMean,
      meanDesign: dMean,
      meanActivity: aMean,
      totalMean: tMean,
    };
  }, [ratings]);

  // Handle selecting a rating for a specific question
  const handleSelectRating = (questionIndex: number, value: number) => {
    sounds.playTap();
    setRatings((prev) => {
      const updated = [...prev];
      updated[questionIndex] = value;
      return updated;
    });
  };

  // Quick fill preset (e.g. all 5) for quick teacher testing
  const handleQuickFill = (val: number) => {
    sounds.playTap();
    setRatings(Array(12).fill(val));
  };

  // Clear answers
  const handleReset = () => {
    sounds.playTap();
    if (window.confirm('ต้องการล้างคำตอบแบบประเมินทั้งหมดเพื่อเริ่มเลือกใหม่หรือไม่?')) {
      setRatings(Array(12).fill(null));
      setSubmitted(false);
      setFeedback(null);
    }
  };

  // Submit survey
  const handleSubmit = async () => {
    if (!isComplete) return;

    sounds.playTap();
    setIsSubmitting(true);
    setFeedback(null);

    const validRatings = ratings.map((r) => r ?? 5);

    try {
      const res = await sendSatisfactionSurveyToGoogleSheets({
        name: studentName,
        ratings: validRatings,
        meanContent,
        meanDesign,
        meanActivity,
        totalMean,
      });

      if (res.success) {
        sounds.playCorrect();
        setSubmitted(true);
        setFeedback({
          success: true,
          message: res.message,
        });

        if (onSurveyCompleted) {
          onSurveyCompleted(validRatings, {
            content: meanContent,
            design: meanDesign,
            activity: meanActivity,
            total: totalMean,
          });
        }
      } else {
        sounds.playIncorrect();
        setFeedback({
          success: false,
          message: res.message,
        });
      }
    } catch {
      sounds.playIncorrect();
      setFeedback({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Questions filtered by category
  const contentQuestions = SURVEY_QUESTIONS.filter((q) => q.category === 'content');
  const designQuestions = SURVEY_QUESTIONS.filter((q) => q.category === 'design');
  const activityQuestions = SURVEY_QUESTIONS.filter((q) => q.category === 'activity');

  const progressPercent = Math.round((answeredCount / 12) * 100);
  const totalInterpretation = getInterpretation(totalMean);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>แบบประเมินความพึงพอใจต่อบทเรียน (CAI)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              💖 แบบประเมินความพึงพอใจของนักเรียน
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              บทเรียนคอมพิวเตอร์ช่วยสอน เรื่อง การใช้เทคโนโลยีสารสนเทศอย่างปลอดภัย • ชั้นประถมศึกษาปีที่ 4
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ผู้ประเมิน: <strong className="text-slate-800">{studentName}</strong> • ทั้งหมด 12 ข้อ (แบ่งเป็น 3 ด้าน)
            </p>
          </div>

          {/* Quick status counter badge */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3.5 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              {answeredCount}
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900">
                {isComplete ? 'ตอบครบ 12 ข้อแล้ว 🎉' : `ตอบแล้ว ${answeredCount} / 12 ข้อ`}
              </div>
              <div className="text-[11px] text-emerald-700">
                {isComplete ? 'สามารถกดส่งแบบประเมินได้' : `เหลืออีก ${12 - answeredCount} ข้อ`}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600">ความคืบหน้าการตอบแบบประเมิน</span>
            <span className="text-emerald-700">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Likert Scale Explanation Guide (เกณฑ์การประเมิน 1-5 สำหรับเด็ก ป.4) */}
      <div className="bg-white/95 rounded-3xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-800">เกณฑ์ระดับคะแนนความพึงพอใจ (เลือกระดับ 1 ถึง 5):</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {RATING_LEVELS.map((level) => (
            <div
              key={level.value}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition ${level.badgeClass}`}
            >
              <div className="text-2xl mb-1">{level.emoji}</div>
              <div className="text-base font-black">
                {level.value} คะแนน
              </div>
              <div className="text-xs font-bold mt-0.5">{level.label}</div>
              <div className="text-[10px] text-amber-500 mt-0.5">{level.stars}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories of questions */}
      <div className="space-y-6">
        {/* Category 1: ด้านเนื้อหา (Content) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  ตอนที่ 1: ด้านเนื้อหาบทเรียน
                </h3>
                <p className="text-xs text-slate-500">
                  ความเข้าใจ ความน่าสนใจ และประโยชน์ของบทเรียน (ข้อ 1 - 4)
                </p>
              </div>
            </div>

            {/* Sub-average indicator */}
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 self-start sm:self-center">
              เฉลี่ยด้านเนื้อหา: <span className="text-amber-700">{meanContent.toFixed(2)} / 5.00</span>
            </div>
          </div>

          <div className="space-y-4">
            {contentQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                item={q}
                currentRating={ratings[q.id - 1]}
                onSelect={(val) => handleSelectRating(q.id - 1, val)}
              />
            ))}
          </div>
        </div>

        {/* Category 2: ด้านการออกแบบและระบบ CAI (Design & Usability) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-blue-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  ตอนที่ 2: ด้านการออกแบบและระบบ CAI (Design & Usability)
                </h3>
                <p className="text-xs text-slate-500">
                  ความสะดวกในการใช้งาน ลำดับขั้นตอน สีสัน และการแนะนำของครู (ข้อ 5 - 8)
                </p>
              </div>
            </div>

            {/* Sub-average indicator */}
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 self-start sm:self-center">
              เฉลี่ยด้านการออกแบบ: <span className="text-blue-700">{meanDesign.toFixed(2)} / 5.00</span>
            </div>
          </div>

          <div className="space-y-4">
            {designQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                item={q}
                currentRating={ratings[q.id - 1]}
                onSelect={(val) => handleSelectRating(q.id - 1, val)}
              />
            ))}
          </div>
        </div>

        {/* Category 3: ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-emerald-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  ตอนที่ 3: ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)
                </h3>
                <p className="text-xs text-slate-500">
                  ความสนุกของกิจกรรมจำลอง ใบงาน และการเรียนรู้ด้วยตนเอง (ข้อ 9 - 12)
                </p>
              </div>
            </div>

            {/* Sub-average indicator */}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 self-start sm:self-center">
              เฉลี่ยด้านกิจกรรม: <span className="text-emerald-700">{meanActivity.toFixed(2)} / 5.00</span>
            </div>
          </div>

          <div className="space-y-4">
            {activityQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                item={q}
                currentRating={ratings[q.id - 1]}
                onSelect={(val) => handleSelectRating(q.id - 1, val)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Score Summary Dashboard */}
      <div className="bg-white/95 rounded-3xl p-6 border-2 border-emerald-200 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            📊 สรุปผลคะแนนเฉลี่ยความพึงพอใจแบบเรียลไทม์:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
            <span className="text-xs font-bold text-amber-900 block mb-1">1. ด้านเนื้อหา (ข้อ 1-4)</span>
            <span className="text-2xl font-black text-amber-700">{meanContent.toFixed(2)}</span>
            <span className="text-xs text-slate-500 block mt-0.5">เต็ม 5.00 ({getInterpretation(meanContent).label})</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
            <span className="text-xs font-bold text-blue-900 block mb-1">2. ด้านการออกแบบ (ข้อ 5-8)</span>
            <span className="text-2xl font-black text-blue-700">{meanDesign.toFixed(2)}</span>
            <span className="text-xs text-slate-500 block mt-0.5">เต็ม 5.00 ({getInterpretation(meanDesign).label})</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-xs font-bold text-emerald-900 block mb-1">3. ด้านกิจกรรม (ข้อ 9-12)</span>
            <span className="text-2xl font-black text-emerald-700">{meanActivity.toFixed(2)}</span>
            <span className="text-xs text-slate-500 block mt-0.5">เต็ม 5.00 ({getInterpretation(meanActivity).label})</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center shadow-md">
            <span className="text-xs font-bold text-emerald-100 block mb-1">⭐ เฉลี่ยรวมทั้งหมด (12 ข้อ)</span>
            <span className="text-3xl font-black text-white">{totalMean.toFixed(2)}</span>
            <span className="text-xs text-emerald-100 block mt-0.5">ระดับความพึงพอใจ: {totalInterpretation.label}</span>
          </div>
        </div>

        {/* Helper quick actions for convenience */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>ตัวช่วยเลือกด่วน:</span>
            <button
              type="button"
              onClick={() => handleQuickFill(5)}
              className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold transition cursor-pointer"
            >
              😍 มากที่สุดทั้งหมด (5)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill(4)}
              className="px-2.5 py-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold transition cursor-pointer"
            >
              😊 มากทั้งหมด (4)
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-slate-400 hover:text-rose-600 transition flex items-center gap-1 cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ล้างคำตอบเพื่อเลือกใหม่</span>
          </button>
        </div>
      </div>

      {/* Submission Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-sm font-semibold flex items-center justify-between gap-3 border ${
            feedback.success
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <RotateCcw className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>

          {feedback.success && onNavigateToScores && (
            <button
              type="button"
              onClick={onNavigateToScores}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition cursor-pointer shrink-0 flex items-center gap-1"
            >
              <span>ดูคะแนนและการพัฒนา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Bottom Actions Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" /> บันทึกแบบประเมินความพึงพอใจเข้า Google Sheets
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            บันทึกคะแนนรายข้อทั้ง 12 ข้อ พร้อมค่าเฉลี่ย 3 ด้าน และค่าเฉลี่ยรวมทั้งหมดไปยังแผ่นงานที่ 3 (ชื่อ "ความพึงพอใจ") ในระบบ Google Sheets ของคุณครู
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isComplete || isSubmitting}
            onClick={handleSubmit}
            className={`px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer ${
              !isComplete
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : submitted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังส่งแบบประเมิน...</span>
              </>
            ) : submitted ? (
              <>
                <Check className="w-4 h-4" />
                <span>ส่งอีกครั้ง (อัปเดตข้อมูล)</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>ส่งแบบประเมิน (Sheet 3)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface QuestionCardProps {
  item: SurveyQuestionItem;
  currentRating: number | null | undefined;
  onSelect: (val: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ item, currentRating, onSelect }) => {
  const hasAnswered = currentRating !== null && currentRating !== undefined;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        hasAnswered
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-slate-50/60 border-dashed border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span
          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
            hasAnswered
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          {item.questionNumber}
        </span>
        <div className="flex-1">
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
            {item.text}
          </p>
        </div>
        {hasAnswered && (
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            <Check className="w-3 h-3" />
            <span>ระดับ {currentRating}</span>
          </span>
        )}
      </div>

      {/* 5 Rating Buttons (1 to 5) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-2">
        {RATING_LEVELS.map((level) => {
          const isSelected = currentRating === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onSelect(level.value)}
              className={`py-2.5 sm:py-3 px-1.5 rounded-xl border flex flex-col items-center justify-center transition active:scale-95 cursor-pointer select-none min-h-[50px] ${
                isSelected
                  ? level.selectedBg
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-base sm:text-lg mb-0.5">{level.emoji}</span>
              <span className="text-xs sm:text-sm font-black">{level.value}</span>
              <span className="text-[10px] sm:text-xs font-semibold truncate max-w-full hidden sm:block">
                {level.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

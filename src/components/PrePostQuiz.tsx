import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion, QuizAnswerRecord } from '../types';
import { ALL_QUIZ_QUESTIONS } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import { CheckCircle2, XCircle, Clock, Award, ArrowRight, RotateCcw, Check, Sparkles, BookOpen } from 'lucide-react';

interface PrePostQuizProps {
  type: 'pre' | 'post';
  isCompleted: boolean;
  savedScore: number | null;
  savedAnswers: QuizAnswerRecord[];
  onComplete: (score: number, answers: QuizAnswerRecord[]) => void;
  onNavigateNext: () => void;
}

export const PrePostQuiz: React.FC<PrePostQuizProps> = ({
  type,
  isCompleted,
  savedScore,
  savedAnswers,
  onComplete,
  onNavigateNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswers, setUserAnswers] = useState<QuizAnswerRecord[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isPre = type === 'pre';
  const title = isPre ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน';

  // Helper to initialize questions:
  // แบบทดสอบก่อนเรียน: สุ่มสลับข้อ
  // แบบทดสอบหลังเรียน: ให้อิงตามเฉลย ข้อ 1-20
  const getQuizQuestions = () => {
    if (isPre) {
      const arr = [...ALL_QUIZ_QUESTIONS];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    return [...ALL_QUIZ_QUESTIONS];
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>(getQuizQuestions);
  const currentQuestion = questions[currentIndex] || questions[0];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(20);
    setUserAnswers([]);
    setIsReviewMode(false);
    setQuestions(getQuizQuestions());
  }, [type]);

  const displayedChoices = currentQuestion ? currentQuestion.choices : [];

  // Initialize or reset
  const handleStartRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(20);
    setUserAnswers([]);
    setIsReviewMode(false);
    setQuestions(getQuizQuestions());
  };

  // Timer countdown
  useEffect(() => {
    if (isCompleted && !isReviewMode && userAnswers.length === 0) return;
    if (isAnswerSubmitted) return;

    setTimeLeft(20);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswerSubmitted, isCompleted]);

  const handleTimeOut = () => {
    if (isAnswerSubmitted) return;
    if (isPre) {
      sounds.playTap();
    } else {
      sounds.playIncorrect();
    }
    setIsAnswerSubmitted(true);
    const newRecord: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      selectedAnswerId: null,
      isCorrect: false,
    };
    setUserAnswers((prev) => [...prev, newRecord]);
  };

  const handleSelectChoice = (answerId: string) => {
    if (isAnswerSubmitted) return;
    sounds.playTap();
    setSelectedAnswerId(answerId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswerId || isAnswerSubmitted) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = selectedAnswerId === currentQuestion.correctAnswerId;
    if (isPre) {
      sounds.playTap();
    } else {
      if (isCorrect) {
        sounds.playCorrect();
      } else {
        sounds.playIncorrect();
      }
    }

    setIsAnswerSubmitted(true);
    const newRecord: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      selectedAnswerId,
      isCorrect,
    };
    setUserAnswers((prev) => [...prev, newRecord]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswerId(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(20);
    } else {
      // Finished all 20 questions!
      const finalAnswers = [...userAnswers];
      const finalScore = finalAnswers.filter((a) => a.isCorrect).length;
      sounds.playFanfare();
      onComplete(finalScore, finalAnswers);
    }
  };

  // If already completed and user is not currently in review mode
  if (isCompleted && userAnswers.length === 0) {
    const score = savedScore ?? 0;
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-xl shadow-blue-900/5 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-inner">
          <Award className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
          {isPre ? 'ทำแบบทดสอบก่อนเรียนเรียบร้อยแล้ว' : 'ยินดีด้วย! ทำแบบทดสอบหลังเรียนสำเร็จ'}
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          {isPre
            ? 'บันทึกคะแนนเพื่อประเมินความรู้พื้นฐานแล้ว สามารถเข้าสู่เนื้อหาบทเรียนได้ทันที'
            : 'บันทึกคะแนนเสร็จสิ้น เข้าไปดูการเปรียบเทียบและการพัฒนาการเรียนรู้ของคุณได้เลย'}
        </p>

        <div className="inline-block px-8 py-4 rounded-3xl bg-blue-50 border-2 border-blue-200 mb-6">
          <div className="text-xs uppercase font-bold tracking-wider text-blue-600 mb-1">
            คะแนนของคุณ ({title})
          </div>
          <div className="text-4xl sm:text-5xl font-black text-blue-700">
            {score} <span className="text-xl font-bold text-slate-500">/ {questions.length}</span>
          </div>
          <div className="text-xs font-semibold text-slate-600 mt-1">
            คิดเป็น {percentage}% • ตอบถูก {score} ข้อ • ผิด {questions.length - score} ข้อ
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNavigateNext}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>{isPre ? 'ไปที่เนื้อหาความรู้ 📖' : 'ดูคะแนนและการพัฒนา 📈'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isPre && (
            <button
              type="button"
              onClick={() => setIsReviewMode((prev) => !prev)}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>{isReviewMode ? 'ซ่อนเฉลย' : 'ดูเฉลยและทบทวนข้อสอบ'}</span>
            </button>
          )}
        </div>

        {/* Review list when toggled (available only in post-test) */}
        {!isPre && isReviewMode && (
          <div className="mt-8 text-left border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                เฉลยและคำอธิบายละเอียด (20 ข้อ)
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewMode(false)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                ปิดเฉลย
              </button>
            </div>

            <div className="grid gap-3">
              {questions.map((q, idx) => {
                const userAns = savedAnswers[idx];
                const isCorrect = userAns?.isCorrect;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border text-sm ${
                      isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-rose-50/70 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold text-slate-900">
                          ข้อ {idx + 1}. {q.q}
                        </p>
                        <p className="text-xs font-semibold text-emerald-800 mt-1">
                          เฉลยที่ถูกต้อง: {q.choices.find((c) => c.answerId === q.correctAnswerId)?.text}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          💡 {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active quiz in progress
  const answeredCount = userAnswers.length;
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const wrongCount = answeredCount - correctCount;
  const progressPercent = Math.round((currentIndex / questions.length) * 100);

  // Timer ring calculation
  const ringPercent = (timeLeft / 20) * 100;

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-blue-200 shadow-xl shadow-blue-900/5">
      {/* Top bar with progress and timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <Sparkles className="w-3 h-3" /> {title}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            คำถามข้อที่ {currentIndex + 1} จาก {questions.length}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Live score counter */}
          {isPre ? (
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <span>ตอบแล้ว {answeredCount} / {questions.length} ข้อ</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <span className="text-emerald-600">✓ ถูก {correctCount}</span>
              <span className="text-slate-300">|</span>
              <span className="text-rose-600">✕ ผิด {wrongCount}</span>
            </div>
          )}

          {/* 20s Countdown timer */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-blue-600'}`} />
            <div className="text-right">
              <span className={`text-base font-black ${timeLeft <= 5 ? 'text-rose-600' : 'text-slate-800'}`}>
                {timeLeft}
              </span>
              <span className="text-[10px] text-slate-500 ml-1">วินาที</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-100 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentIndex + 1}. {currentQuestion.q}
        </h3>
      </div>

      {/* Choices grid */}
      <div className="grid gap-3 mb-6">
        {displayedChoices.map((choice, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswerId === choice.answerId;
          const isCorrectChoice = choice.answerId === currentQuestion.correctAnswerId;

          let btnStyles = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-400';

          if (isAnswerSubmitted) {
            if (isPre) {
              // ในแบบทดสอบก่อนเรียน ไม่เฉลยข้อคำตอบ แสดงเฉพาะตัวเลือกที่นักเรียนเลือกไว้
              if (isSelected) {
                btnStyles = 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/30 font-bold';
              } else {
                btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else {
              if (isCorrectChoice) {
                btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/40 font-bold';
              } else if (isSelected && !isCorrectChoice) {
                btnStyles = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300/40 font-bold';
              } else {
                btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }
          } else if (isSelected) {
            btnStyles = 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/30 font-bold';
          }

          return (
            <button
              key={choice.answerId}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => handleSelectChoice(choice.answerId)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyles}`}
            >
              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  !isPre && isAnswerSubmitted && isCorrectChoice
                    ? 'bg-emerald-600 text-white'
                    : !isPre && isAnswerSubmitted && isSelected && !isCorrectChoice
                    ? 'bg-rose-600 text-white'
                    : isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {index + 1}
                </span>
                <span className="text-[11px] font-medium text-slate-400">({letter})</span>
              </div>
              <span className="text-sm sm:text-base font-medium flex-1 pt-0.5 leading-snug">
                {choice.text}
              </span>
              {!isPre && isAnswerSubmitted && isCorrectChoice && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {!isPre && isAnswerSubmitted && isSelected && !isCorrectChoice && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate feedback explanation when answered */}
      {isAnswerSubmitted && (
        isPre ? (
          <div className="p-4 sm:p-5 rounded-2xl border mb-6 bg-blue-50/80 border-blue-200 text-blue-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm sm:text-base text-blue-900">
                  {selectedAnswerId ? 'บันทึกคำตอบข้อนี้เรียบร้อยแล้ว' : 'หมดเวลา! บันทึกว่าไม่ได้เลือกคำตอบ'}
                </div>
                <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                  แบบทดสอบก่อนเรียนไม่มีการเฉลยคำตอบ เพื่อประเมินความรู้พื้นฐานก่อนเข้าสู่บทเรียน กรุณากดปุ่ม <strong>"ไปข้อถัดไป"</strong> ด้านล่าง
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`p-4 sm:p-5 rounded-2xl border mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              selectedAnswerId === currentQuestion.correctAnswerId
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/90 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {selectedAnswerId === currentQuestion.correctAnswerId ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-sm sm:text-base">
                  {selectedAnswerId === currentQuestion.correctAnswerId
                    ? 'ยอดเยี่ยม! คำตอบถูกต้อง ✓'
                    : selectedAnswerId === null
                    ? 'หมดเวลา! ตอบไม่ทันใน 20 วินาที'
                    : 'ยังไม่ถูกต้องนะ ✕'}
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed text-slate-700">
                  <strong>คำอธิบาย:</strong> {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {/* Actions footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500">
          ความคืบหน้า: ข้อ {currentIndex + 1} จาก {questions.length}
        </div>

        {!isAnswerSubmitted ? (
          <button
            type="button"
            disabled={!selectedAnswerId}
            onClick={handleSubmitAnswer}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition cursor-pointer disabled:cursor-not-allowed active:scale-95"
          >
            ส่งคำตอบ
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>{currentIndex === questions.length - 1 ? 'ดูผลคะแนนสอบ 🎉' : 'ไปข้อถัดไป'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

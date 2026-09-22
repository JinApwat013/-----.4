import React, { useState, useEffect } from 'react';
import { StudentProgress, ActiveScreen, QuizAnswerRecord } from './types';
import { sounds } from './utils/audio';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LoginView } from './components/LoginView';
import { PrePostQuiz } from './components/PrePostQuiz';
import { LearningHub } from './components/LearningHub';
import { WorksheetsSection } from './components/WorksheetsSection';
import { ScoresSection } from './components/ScoresSection';
import { SatisfactionSurveySection } from './components/SatisfactionSurveySection';
import { LogoutModal } from './components/LogoutModal';
import { ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'safeTechLessonP4_react';
const LEGACY_STORAGE_KEY = 'safeTechLessonP4';

const initialProgress: StudentProgress = {
  name: '',
  preDone: false,
  preScore: null,
  preAnswers: [],
  postDone: false,
  postScore: null,
  postAnswers: [],
  safeTechAnswers: Array(10).fill(null),
  safeTechScore: 0,
  worksheetAnswers: Array(12).fill(null),
  worksheetScore: 0,
  passwordScore: 0,
  passwordMissionsCompleted: [],
  surveyDone: false,
  surveyRatings: Array(12).fill(null),
  soundEnabled: true,
};

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      // Check modern key
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialProgress, ...JSON.parse(saved) };
      }

      // Check legacy fallback
      const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacySaved) {
        const parsed = JSON.parse(legacySaved);
        const legacyPre = localStorage.getItem('safeTechLessonP4_preScore');
        const legacyPost = localStorage.getItem('safeTechLessonP4_postScore');

        return {
          ...initialProgress,
          name: parsed.name || '',
          preDone: parsed.preDone || legacyPre !== null,
          preScore: legacyPre !== null ? Number(legacyPre) : parsed.preScore ?? null,
          postDone: parsed.postDone || legacyPost !== null,
          postScore: legacyPost !== null ? Number(legacyPost) : parsed.postScore ?? null,
        };
      }
    } catch {
      // Ignore
    }
    return initialProgress;
  });

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('pretest');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync sound settings
  useEffect(() => {
    sounds.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // LocalStorage error fallback
    }
  }, [progress]);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When user logs in
  const handleLogin = (name: string) => {
    setProgress((prev) => ({ ...prev, name }));
    setActiveScreen(progress.preDone ? 'lesson' : 'pretest');
  };

  // Toggle Sound
  const handleToggleSound = () => {
    sounds.playTap();
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Quiz completed
  const handlePreTestComplete = (score: number, answers: QuizAnswerRecord[]) => {
    setProgress((prev) => ({
      ...prev,
      preDone: true,
      preScore: score,
      preAnswers: answers,
    }));
  };

  const handlePostTestComplete = (score: number, answers: QuizAnswerRecord[]) => {
    setProgress((prev) => ({
      ...prev,
      postDone: true,
      postScore: score,
      postAnswers: answers,
    }));
  };

  // Worksheet updates
  const handleUpdateSafeTech = (answers: (boolean | null)[], score: number) => {
    setProgress((prev) => ({
      ...prev,
      safeTechAnswers: answers,
      safeTechScore: score,
    }));
  };

  const handleUpdateDigitalCitizen = (answers: (boolean | null)[], score: number) => {
    setProgress((prev) => ({
      ...prev,
      worksheetAnswers: answers,
      worksheetScore: score,
    }));
  };

  const handleUpdatePasswordMission = (score: number, completedMissions: number[]) => {
    setProgress((prev) => ({
      ...prev,
      passwordScore: score,
      passwordMissionsCompleted: completedMissions,
    }));
  };

  const handleSurveyComplete = (ratings: number[], means: { content: number; design: number; activity: number; total: number }) => {
    setProgress((prev) => ({
      ...prev,
      surveyDone: true,
      surveyRatings: ratings,
      surveySubmittedAt: new Date().toISOString(),
    }));
  };

  // Reset/Logout
  const handleConfirmLogout = () => {
    sounds.playTap();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    localStorage.removeItem('safeTechLessonP4_preScore');
    localStorage.removeItem('safeTechLessonP4_postScore');

    setProgress({ ...initialProgress });
    setActiveScreen('pretest');
    setIsLogoutModalOpen(false);
  };

  const scrollToTop = () => {
    sounds.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If no student name yet, display friendly login screen
  if (!progress.name) {
    return (
      <div className="min-h-screen bg-[#fff4b9] relative overflow-hidden text-slate-800">
        {/* Playful floating clouds */}
        <div className="fixed top-8 left-6 text-6xl opacity-30 select-none pointer-events-none animate-pulse">☁️</div>
        <div className="fixed top-1/4 right-8 text-7xl opacity-35 select-none pointer-events-none">☁️</div>
        <div className="fixed bottom-12 left-12 text-6xl opacity-30 select-none pointer-events-none">☁️</div>

        <LoginView onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff4b9] text-slate-800 relative pb-16 selection:bg-amber-200">
      {/* Background clouds */}
      <div className="fixed top-6 left-6 text-6xl opacity-25 select-none pointer-events-none">☁️</div>
      <div className="fixed top-1/3 right-8 text-7xl opacity-30 select-none pointer-events-none">☁️</div>
      <div className="fixed bottom-10 left-10 text-6xl opacity-25 select-none pointer-events-none">☁️</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
        {/* App Header */}
        <Header
          studentName={progress.name}
          soundEnabled={progress.soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenLogout={() => setIsLogoutModalOpen(true)}
        />

        {/* Navigation Tabs */}
        <Navigation
          activeScreen={activeScreen}
          onSelectScreen={(screen) => {
            sounds.playTap();
            setActiveScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          preDone={progress.preDone}
          postDone={progress.postDone}
          surveyDone={progress.surveyDone}
        />

        {/* Screens */}
        <main>
          {activeScreen === 'pretest' && (
            <PrePostQuiz
              type="pre"
              isCompleted={progress.preDone}
              savedScore={progress.preScore}
              savedAnswers={progress.preAnswers}
              onComplete={handlePreTestComplete}
              onNavigateNext={() => {
                setActiveScreen('lesson');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeScreen === 'lesson' && <LearningHub />}

          {activeScreen === 'game' && (
            <WorksheetsSection
              studentName={progress.name}
              safeTechAnswers={progress.safeTechAnswers}
              safeTechScore={progress.safeTechScore}
              worksheetAnswers={progress.worksheetAnswers}
              worksheetScore={progress.worksheetScore}
              passwordScore={progress.passwordScore}
              passwordMissionsCompleted={progress.passwordMissionsCompleted}
              onUpdateSafeTech={handleUpdateSafeTech}
              onUpdateDigitalCitizen={handleUpdateDigitalCitizen}
              onUpdatePasswordMission={handleUpdatePasswordMission}
            />
          )}

          {activeScreen === 'posttest' && (
            <PrePostQuiz
              type="post"
              isCompleted={progress.postDone}
              savedScore={progress.postScore}
              savedAnswers={progress.postAnswers}
              onComplete={handlePostTestComplete}
              onNavigateNext={() => {
                setActiveScreen('scores');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToSurvey={() => {
                setActiveScreen('survey');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeScreen === 'scores' && (
            <ScoresSection
              studentName={progress.name}
              preScore={progress.preScore}
              postScore={progress.postScore}
              safeTechScore={progress.safeTechScore}
              safeTechAnsweredCount={progress.safeTechAnswers.filter((a) => a !== null).length}
              worksheetScore={progress.worksheetScore}
              worksheetAnsweredCount={progress.worksheetAnswers.filter((a) => a !== null).length}
              passwordScore={progress.passwordScore}
              passwordMissionsCount={progress.passwordMissionsCompleted.length}
              postAnswers={progress.postAnswers}
              surveyDone={progress.surveyDone}
              onNavigateToSurvey={() => {
                setActiveScreen('survey');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeScreen === 'survey' && (
            <SatisfactionSurveySection
              studentName={progress.name}
              savedRatings={progress.surveyRatings}
              isAlreadySubmitted={progress.surveyDone}
              onSurveyCompleted={handleSurveyComplete}
              onNavigateToScores={() => {
                setActiveScreen('scores');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>
      </div>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="กลับขึ้นด้านบน"
          className="fixed bottom-6 right-6 p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 active:scale-95 transition z-40 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Logout confirmation modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

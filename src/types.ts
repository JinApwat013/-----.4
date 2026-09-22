export interface Choice {
  answerId: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  q: string;
  choices: Choice[];
  correctAnswerId: string;
  explanation: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  selectedAnswerId: string | null;
  isCorrect: boolean;
}

export interface SafeTechItem {
  id: number;
  scenario: string;
  isSafe: boolean;
  explanation: string;
}

export interface DigitalCitizenItem {
  id: number;
  category: string;
  statement: string;
  isSafe: boolean;
  explanation: string;
}

export interface PasswordMission {
  id: number;
  title: string;
  description: string;
  test: (val: string, checks: { letter: boolean; number: boolean; symbol: boolean; upper: boolean; length: boolean; personal: boolean }) => boolean;
}

export interface PasswordSample {
  value: string;
  options: string[];
  correctIndex: number;
}

export interface StudentProgress {
  name: string;
  preDone: boolean;
  preScore: number | null;
  preAnswers: QuizAnswerRecord[];
  postDone: boolean;
  postScore: number | null;
  postAnswers: QuizAnswerRecord[];
  safeTechAnswers: (boolean | null)[];
  safeTechScore: number;
  worksheetAnswers: (boolean | null)[];
  worksheetScore: number;
  passwordScore: number;
  passwordMissionsCompleted: number[];
  surveyDone?: boolean;
  surveyRatings?: (number | null)[];
  surveySubmittedAt?: string;
  soundEnabled: boolean;
}

export type ActiveScreen = 'pretest' | 'lesson' | 'game' | 'posttest' | 'scores' | 'survey';

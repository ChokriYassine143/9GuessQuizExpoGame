// Application type definitions

export type Team = {
  id: string;
  name: string;
  color: string;
  score: number;
  jokers: Joker[];
};

export type Joker = {
  id: string;
  name: string;
  description: string;
  icon: string;
  used: boolean;
};

export type GameCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  questionCount: number;
};

export type Question = {
  id: string;
  text: string;
  category: string;
  answers: Answer[];
  trapAnswers?: Answer[];
  difficulty: 'easy' | 'medium' | 'hard';
};

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
  isTrap?: boolean;
  difficulty?: 1 | 2 | 3; // 1: Easy, 2: Medium, 3: Hard
};

export type GameSettings = {
  teams: Team[];
  categories: string[];
  timePerQuestion: number;
  enableJokers: boolean;
  enableTrapAnswers: boolean;
  questionsPerRound: number;
  numberOfRounds: number;
};

export type GameState = {
  settings: GameSettings;
  currentRound: number;
  currentQuestion: number;
  currentTeamIndex: number;
  questions: Question[];
  isGameOver: boolean;
  roundResults: RoundResult[];
  usedQuestions: Map<string, string>; // Maps questionId to teamId
};

export type RoundResult = {
  teamId: string;
  questionId: string;
  answersGuessed: number;
  timeRemaining: number;
  usedJokers: string[];
  score: number;
  penalties: number;
};

export type GameHistory = {
  id: string;
  date: Date;
  teams: Team[];
  winner: string;
  categories: string[];
  roundCount: number;
};
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameSettings, Question, RoundResult, Team } from '../types';
import { getRandomQuestions } from '../data/questions';
import { getDefaultJokers } from '../data/jokers';

// Default game settings
const defaultGameSettings: GameSettings = {
  teams: [],
  categories: [],
  timePerQuestion: 60,
  enableJokers: true,
  enableTrapAnswers: true,
  questionsPerRound: 5,
  numberOfRounds: 3,
};

// Initial game state
const initialGameState: GameState = {
  settings: defaultGameSettings,
  currentRound: 0,
  currentQuestion: 0,
  currentTeamIndex: 0,
  questions: [],
  isGameOver: false,
  roundResults: [],
  usedQuestions: new Map(), // Track which questions have been used by which teams
};

// Action types
type GameAction =
  | { type: 'INIT_GAME'; payload: GameSettings }
  | { type: 'START_GAME' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SET_ROUND_RESULT'; payload: RoundResult }
  | { type: 'UPDATE_TEAM_SCORE'; payload: { teamId: string; score: number } }
  | { type: 'USE_JOKER'; payload: { teamId: string; jokerId: string } }
  | { type: 'RESET_JOKER'; payload: { teamId: string; jokerId: string } }
  | { type: 'MARK_QUESTION_USED'; payload: { teamId: string; questionId: string } }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

// Reducer function to handle state updates
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT_GAME':
      return {
        ...initialGameState,
        settings: {
          ...action.payload,
          teams: action.payload.teams.map(team => ({
            ...team,
            score: 0,
            jokers: getDefaultJokers(),
          })),
        },
      };
    
    case 'START_GAME':
      return {
        ...state,
        questions: getRandomQuestions(
          state.settings.questionsPerRound * state.settings.teams.length * state.settings.numberOfRounds,
          state.settings.categories
        ),
        currentRound: 1,
        currentQuestion: 0,
        currentTeamIndex: 0,
        isGameOver: false,
        roundResults: [],
      };
    
    case 'NEXT_QUESTION':
      const newQuestionIndex = state.currentQuestion + 1;
      const totalQuestions = state.questions.length;
      
      // Check if we've reached the end of all rounds
      if (state.currentRound > state.settings.numberOfRounds) {
        return {
          ...state,
          isGameOver: true,
        };
      }
      
      if (newQuestionIndex >= totalQuestions) {
        return {
          ...state,
          isGameOver: true,
        };
      }
      
      return {
        ...state,
        currentQuestion: newQuestionIndex,
      };
    
    case 'NEXT_TEAM':
      const newTeamIndex = (state.currentTeamIndex + 1) % state.settings.teams.length;
      const newRound = newTeamIndex === 0 ? state.currentRound + 1 : state.currentRound;
      
      return {
        ...state,
        currentTeamIndex: newTeamIndex,
        currentRound: newRound,
      };
    
    case 'SET_ROUND_RESULT':
      return {
        ...state,
        roundResults: [...state.roundResults, action.payload],
      };
    
    case 'UPDATE_TEAM_SCORE':
      return {
        ...state,
        settings: {
          ...state.settings,
          teams: state.settings.teams.map(team => 
            team.id === action.payload.teamId
              ? { ...team, score: team.score + action.payload.score }
              : team
          ),
        },
      };
    
    case 'USE_JOKER':
      return {
        ...state,
        settings: {
          ...state.settings,
          teams: state.settings.teams.map(team => 
            team.id === action.payload.teamId
              ? {
                  ...team,
                  jokers: team.jokers.map(joker =>
                    joker.id === action.payload.jokerId
                      ? { ...joker, used: true }
                      : joker
                  ),
                }
              : team
          ),
        },
      };
    
    case 'RESET_JOKER':
      return {
        ...state,
        settings: {
          ...state.settings,
          teams: state.settings.teams.map(team => 
            team.id === action.payload.teamId
              ? {
                  ...team,
                  jokers: team.jokers.map(joker =>
                    joker.id === action.payload.jokerId
                      ? { ...joker, used: false }
                      : joker
                  ),
                }
              : team
          ),
        },
      };
    
    case 'MARK_QUESTION_USED':
      const newUsedQuestions = new Map(state.usedQuestions);
      newUsedQuestions.set(action.payload.questionId, action.payload.teamId);
      return {
        ...state,
        usedQuestions: newUsedQuestions,
      };
    
    case 'END_GAME':
      return {
        ...state,
        isGameOver: true,
      };
    
    case 'RESET_GAME':
      return initialGameState;
    
    default:
      return state;
  }
}

// Create context
type GameContextType = {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  currentQuestion: Question | null;
  currentTeam: Team | null;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  
  // Helper to get the current question
  const currentQuestion = gameState.questions.length > 0 && gameState.currentQuestion < gameState.questions.length
    ? gameState.questions[gameState.currentQuestion]
    : null;
  
  // Helper to get the current team
  const currentTeam = gameState.settings.teams.length > 0
    ? gameState.settings.teams[gameState.currentTeamIndex]
    : null;
  
  return (
    <GameContext.Provider value={{ gameState, dispatch, currentQuestion, currentTeam }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
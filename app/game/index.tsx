import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { useGame } from '@/contexts/GameContext';
import { Theme } from '@/constants/Colors';
import Button from '@/components/Button';
import TeamCard from '@/components/TeamCard';
import QuestionCard from '@/components/QuestionCard';
import AnswerList from '@/components/AnswerList';
import JokerButton from '@/components/JokerButton';
import { ArrowLeft, Clock, Trophy } from 'lucide-react-native';
import { RoundResult } from '@/types';

export default function GameScreen() {
  const { gameState, dispatch, currentQuestion, currentTeam } = useGame();
  const [timeRemaining, setTimeRemaining] = useState(gameState.settings.timePerQuestion);
  const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);
  const [trapRevealed, setTrapRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [penalties, setPenalties] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isFinished) return;
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished]);
  
  useEffect(() => {
    setTimeRemaining(gameState.settings.timePerQuestion);
    setRevealedAnswers([]);
    setTrapRevealed(false);
    setIsFinished(false);
  }, [gameState.currentQuestion, gameState.currentTeamIndex]);
  
  const handleTimeUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
  };
  
  const handleToggleAnswer = (answerId: string) => {
    if (isFinished) return;
    
    const answer = [...(currentQuestion?.answers || []), ...(currentQuestion?.trapAnswers || [])]
      .find(a => a.id === answerId);
    
    if (!answer) return;
    
    if (revealedAnswers.includes(answerId)) return;
    
    if (answer.isCorrect) {
      setRevealedAnswers(prev => [...prev, answerId]);
      
      let bonus = 0;
      if (answer.difficulty === 2) bonus = 5;
      if (answer.difficulty === 3) bonus = 10;
      
      
      const baseScore = 10 + bonus;
      
      const doublePointsActive = currentTeam?.jokers.find(
        j => j.id === 'double-points' && j.used
      );
      
      const finalScore = doublePointsActive ? baseScore * 2 : baseScore;
      
      dispatch({
        type: 'UPDATE_TEAM_SCORE',
        payload: { teamId: currentTeam?.id || '', score: finalScore }
      });
      
      if (revealedAnswers.length + 1 >= (currentQuestion?.answers.length || 0)) {
        handleTimeUp();
      }
    } else {
      const penalty = -5;
      setPenalties(prev => prev + Math.abs(penalty));
      dispatch({
        type: 'UPDATE_TEAM_SCORE',
        payload: { teamId: currentTeam?.id || '', score: penalty }
      });
      
      if (answer.isTrap) {
        const trapPenalty = -10;
        setPenalties(prev => prev + Math.abs(trapPenalty));
        dispatch({
          type: 'UPDATE_TEAM_SCORE',
          payload: { teamId: currentTeam?.id || '', score: trapPenalty }
        });
      }
      
      setRevealedAnswers(prev => [...prev, answerId]);
    }
  };
  
  const handleUseJoker = (jokerId: string) => {
    if (!currentTeam) return;
    
    dispatch({ type: 'USE_JOKER', payload: { teamId: currentTeam.id, jokerId } });
    
    switch (jokerId) {
      case 'extra-time':
        setTimeRemaining(prev => prev + 30);
        break;
      case 'double-points':
        break;
      case 'reveal-trap':
        setTrapRevealed(true);
        break;
    }
  };
  
  const handleEndTurn = () => {
    const baseScore = revealedAnswers.length * 10;
    const timeBonus = Math.floor(timeRemaining / 5) * 5;
    
    const difficultyBonuses = revealedAnswers.reduce((total, answerId) => {
      const answer = currentQuestion?.answers.find(a => a.id === answerId);
      if (answer?.difficulty === 2) return total + 5;
      if (answer?.difficulty === 3) return total + 10;
      return total;
    }, 0);
    
    let finalScore = baseScore + timeBonus + difficultyBonuses - penalties;
    
    const roundResult: RoundResult = {
      teamId: currentTeam?.id || '',
      questionId: currentQuestion?.id || '',
      answersGuessed: revealedAnswers.length,
      timeRemaining,
      usedJokers: currentTeam?.jokers
        .filter(j => j.used)
        .map(j => j.id) || [],
      score: finalScore,
      penalties: penalties,
    };
    
    dispatch({ type: 'SET_ROUND_RESULT', payload: roundResult });
    
    setPenalties(0);
    
    if (currentQuestion && currentTeam) {
      dispatch({ 
        type: 'MARK_QUESTION_USED', 
        payload: { 
          teamId: currentTeam.id, 
          questionId: currentQuestion.id 
        } 
      });
    }
    
    dispatch({ type: 'NEXT_TEAM' });
    if (gameState.currentTeamIndex === gameState.settings.teams.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
    }
    
    if (gameState.isGameOver) {
      router.replace('/game/results');
    }
  };
  
  if (!currentQuestion || !currentTeam) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading game...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Theme.colors.neutral[800]} />
        </TouchableOpacity>
        
        <View style={styles.roundInfo}>
          <Text style={styles.roundText}>
            Round {gameState.currentRound} • Question {gameState.currentQuestion + 1}/{gameState.questions.length}
          </Text>
        </View>
      </View>
      
      <TeamCard team={currentTeam} isActive />
      
      <QuestionCard 
        question={currentQuestion} 
        timeRemaining={timeRemaining}
        maxTime={gameState.settings.timePerQuestion}
        trapRevealed={trapRevealed}
      />
      
      <ScrollView style={styles.answersContainer}>
        <AnswerList 
          answers={[...currentQuestion.answers, ...(currentQuestion.trapAnswers || [])]}
          revealedAnswers={revealedAnswers}
          onToggleAnswer={handleToggleAnswer}
          trapAnswerRevealed={trapRevealed}
        />
      </ScrollView>
      
      {gameState.settings.enableJokers && (
        <View style={styles.jokersContainer}>
          {currentTeam.jokers.map(joker => (
            <JokerButton 
              key={joker.id} 
              joker={joker} 
              onUse={handleUseJoker} 
            />
          ))}
        </View>
      )}
      
      {isFinished ? (
        <View style={styles.resultContainer}>
          <View style={styles.scoreContainer}>
            <Trophy size={24} color={Theme.colors.accent[500]} />
            <Text style={styles.scoreText}>
              {revealedAnswers.length} out of {currentQuestion.answers.length} correct
            </Text>
            {penalties > 0 && (
              <Text style={styles.penaltyText}>
                Penalties: -{penalties} points
              </Text>
            )}
          </View>
          
          <Button 
            title="Continue"
            onPress={handleEndTurn}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.timeUpButton} onPress={handleTimeUp}>
          <Clock size={20} color={Theme.colors.white} />
          <Text style={styles.timeUpText}>Finish Turn</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
    padding: Theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[50],
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[700],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  roundInfo: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    alignItems: 'center',
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  roundText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[700],
  },
  answersContainer: {
    flex: 1,
  },
  jokersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Theme.spacing.md,
  },
  timeUpButton: {
    backgroundColor: Theme.colors.secondary[500],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  timeUpText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.sm,
  },
  resultContainer: {
    marginTop: Theme.spacing.md,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[800],
    marginLeft: Theme.spacing.sm,
  },
  penaltyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.error[500],
    marginTop: Theme.spacing.xs,
  },
});
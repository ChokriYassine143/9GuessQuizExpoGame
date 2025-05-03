import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Question } from '../types';
import { Theme } from '../constants/Colors';
import { getCategory } from '../data/categories';
import { CircleHelp as HelpCircle } from 'lucide-react-native';

type QuestionCardProps = {
  question: Question;
  timeRemaining?: number;
  maxTime?: number;
  trapRevealed?: boolean;
};

const QuestionCard = ({
  question,
  timeRemaining = 60,
  maxTime = 60,
  trapRevealed = false,
}: QuestionCardProps) => {
  const timeProgress = timeRemaining / maxTime;
  const category = getCategory(question.category);
  
  // Calculate progress bar width
  const progressWidth = `${timeProgress * 100}%`;
  
  // Determine time color based on remaining time
  let timeColor = Theme.colors.success[500];
  if (timeProgress < 0.5) timeColor = Theme.colors.warning[500];
  if (timeProgress < 0.25) timeColor = Theme.colors.error[500];
  
  return (
    <View style={styles.container}>
      {/* Category Badge */}
      <View style={[styles.categoryBadge, { backgroundColor: category?.color || Theme.colors.primary[500] }]}>
        <HelpCircle size={16} color="#FFF" />
        <Text style={styles.categoryText}>{category?.name || question.category}</Text>
      </View>
      
      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>
      
      {/* Trap Answer (if revealed) */}
      {trapRevealed && question.trapAnswers && question.trapAnswers.length > 0 && (
        <View style={styles.trapContainer}>
          <Text style={styles.trapLabel}>Trap Answer:</Text>
          <Text style={styles.trapText}>{question.trapAnswers[0].text}</Text>
        </View>
      )}
      
      {/* Timer */}
      <View style={styles.timerContainer}>
        <View style={styles.timerTrack}>
          <View 
            style={[
              styles.timerProgress, 
              { width: progressWidth, backgroundColor: timeColor }
            ]} 
          />
        </View>
        <Text style={[styles.timerText, { color: timeColor }]}>
          {timeRemaining}s
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  categoryBadge: {
    position: 'absolute',
    top: -10,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  categoryText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.medium,
    marginLeft: Theme.spacing.xs,
  },
  questionContainer: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  questionText: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.neutral[800],
    textAlign: 'center',
    lineHeight: 32,
  },
  trapContainer: {
    backgroundColor: Theme.colors.error[100],
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginVertical: Theme.spacing.md,
  },
  trapLabel: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.error[700],
    marginBottom: Theme.spacing.xs,
  },
  trapText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.error[600],
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  timerTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.neutral[200],
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginRight: Theme.spacing.sm,
  },
  timerProgress: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  timerText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    width: 50,
    textAlign: 'right',
  },
});

export default QuestionCard;
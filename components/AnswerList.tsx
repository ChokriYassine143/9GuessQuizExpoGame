import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Answer } from '../types';
import { Theme } from '../constants/Colors';
import { Check, X } from 'lucide-react-native';

type AnswerListProps = {
  answers: Answer[];
  revealedAnswers: string[];
  onToggleAnswer: (answerId: string) => void;
  trapAnswerRevealed?: boolean;
};

const AnswerList = ({
  answers,
  revealedAnswers,
  onToggleAnswer,
  trapAnswerRevealed = false,
}: AnswerListProps) => {
  return (
    <ScrollView style={styles.container}>
      {answers.map(answer => {
        const isRevealed = revealedAnswers.includes(answer.id);
        const isTrap = answer.isTrap && trapAnswerRevealed;
        
        return (
          <TouchableOpacity
            key={answer.id}
            style={[
              styles.answerItem,
              isRevealed && styles.answeredItem,
              isTrap && styles.trapItem,
            ]}
            onPress={() => onToggleAnswer(answer.id)}
            disabled={isRevealed || isTrap}
          >
            <Text style={[
              styles.answerText,
              isRevealed && styles.answeredText,
              isTrap && styles.trapText,
            ]}>
              {answer.text}
            </Text>
            
            {isRevealed && (
              <View style={styles.iconContainer}>
                <Check size={20} color={Theme.colors.white} />
              </View>
            )}
            
            {isTrap && (
              <View style={[styles.iconContainer, styles.trapIcon]}>
                <X size={20} color={Theme.colors.white} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Theme.spacing.md,
  },
  answerItem: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginVertical: Theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  answeredItem: {
    backgroundColor: Theme.colors.success[500],
    borderColor: Theme.colors.success[600],
  },
  trapItem: {
    backgroundColor: Theme.colors.error[500],
    borderColor: Theme.colors.error[600],
  },
  answerText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.neutral[800],
    flex: 1,
  },
  answeredText: {
    color: Theme.colors.white,
  },
  trapText: {
    color: Theme.colors.white,
    textDecorationLine: 'line-through',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
  },
  trapIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default AnswerList;
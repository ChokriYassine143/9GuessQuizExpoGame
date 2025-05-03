import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Theme } from '@/constants/Colors';
import { Calendar, Trophy, Trash } from 'lucide-react-native';
import { Storage, GameHistory } from '@/utils/storage';
import { format } from 'date-fns';

export default function HistoryScreen() {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const history = await Storage.getGameHistory();
    setGameHistory(history);
  };

  const handleClearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all game history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await Storage.clearGameHistory();
            loadHistory();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: GameHistory }) => {
    const formattedDate = format(new Date(item.date), 'MMM dd, yyyy HH:mm');
    const scorePercentage = Math.round((item.score / item.totalQuestions) * 100);
    
    return (
      <View style={styles.historyCard}>
        <View style={styles.dateRow}>
          <Calendar size={16} color={Theme.colors.neutral[600]} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        <View style={[styles.scoreBadge, { backgroundColor: Theme.colors.primary[500] }]}>
          <Trophy size={14} color="#FFF" />
          <Text style={styles.scoreText}>{scorePercentage}%</Text>
        </View>
        
        <View style={styles.gameDetails}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.detailsText}>
            Score: {item.score}/{item.totalQuestions}
          </Text>
          <Text style={styles.detailsText}>
            Time: {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
          </Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Game History</Text>
        {gameHistory.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Trash size={20} color={Theme.colors.error[500]} />
          </TouchableOpacity>
        )}
      </View>
      
      {gameHistory.length > 0 ? (
        <FlatList
          data={gameHistory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Calendar size={48} color={Theme.colors.neutral[400]} />
          <Text style={styles.emptyStateText}>No game history yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Play a game to see your history here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
    padding: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.xxl,
    color: Theme.colors.neutral[800],
  },
  clearButton: {
    padding: Theme.spacing.xs,
  },
  listContainer: {
    paddingBottom: Theme.spacing.xxl,
  },
  historyCard: {
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginLeft: Theme.spacing.xs,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  scoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.xs,
  },
  gameDetails: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
    paddingTop: Theme.spacing.sm,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  detailsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[700],
    marginTop: Theme.spacing.md,
  },
  emptyStateSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[500],
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
});
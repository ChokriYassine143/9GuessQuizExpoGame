import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useGame } from '@/contexts/GameContext';
import { Theme } from '@/constants/Colors';
import Button from '@/components/Button';
import TeamCard from '@/components/TeamCard';
import { Trophy, Award, Chrome as Home, RefreshCw } from 'lucide-react-native';

export default function ResultsScreen() {
  const { gameState, dispatch } = useGame();
  
  // Sort teams by score (highest first)
  const sortedTeams = [...gameState.settings.teams].sort((a, b) => b.score - a.score);
  
  // Get winner (first team after sorting)
  const winnerTeam = sortedTeams[0];
  
  // Check for tie
  const isTie = sortedTeams.length > 1 && sortedTeams[0].score === sortedTeams[1].score;
  
  const handlePlayAgain = () => {
    // Reset the game but keep the same settings
    dispatch({ type: 'START_GAME' });
    router.replace('/game/');
  };
  
  const handleMainMenu = () => {
    // Reset the entire game state
    dispatch({ type: 'RESET_GAME' });
    router.replace('/');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Trophy size={48} color={Theme.colors.accent[500]} />
        <Text style={styles.title}>Game Results</Text>
      </View>
      
      {isTie ? (
        <View style={styles.tieContainer}>
          <Text style={styles.tieText}>It's a Tie!</Text>
          <Text style={styles.tieDescription}>
            Multiple teams have the same score
          </Text>
        </View>
      ) : (
        <View style={styles.winnerContainer}>
          <View style={[styles.winnerBadge, { backgroundColor: winnerTeam.color }]}>
            <Trophy size={20} color="#FFF" />
            <Text style={styles.winnerText}>Winner</Text>
          </View>
          <TeamCard 
            team={winnerTeam} 
            isWinner 
            isActive
          />
        </View>
      )}
      
      <Text style={styles.sectionTitle}>Final Standings</Text>
      <FlatList
        data={sortedTeams}
        renderItem={({ item, index }) => (
          <View style={styles.standingRow}>
            <Text style={styles.standingPosition}>{index + 1}</Text>
            <View style={[styles.standingColorDot, { backgroundColor: item.color }]} />
            <Text style={styles.standingName}>{item.name}</Text>
            <View style={styles.pointsContainer}>
              <Award size={16} color={Theme.colors.neutral[600]} />
              <Text style={styles.pointsText}>{item.score}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.standingsList}
      />
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{gameState.currentRound}</Text>
          <Text style={styles.statLabel}>Rounds</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{gameState.questions.length}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{gameState.settings.teams.length}</Text>
          <Text style={styles.statLabel}>Teams</Text>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Play Again"
          onPress={handlePlayAgain}
          variant="primary"
          size="large"
          fullWidth
          icon={<RefreshCw size={20} color={Theme.colors.white} />}
        />
        
        <Button
          title="Main Menu"
          onPress={handleMainMenu}
          variant="outline"
          size="large"
          fullWidth
          icon={<Home size={20} color={Theme.colors.primary[500]} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
    padding: Theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginVertical: Theme.spacing.lg,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.fontSize.xxxl,
    color: Theme.colors.neutral[800],
    marginTop: Theme.spacing.sm,
  },
  tieContainer: {
    backgroundColor: Theme.colors.neutral[200],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  tieText: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.fontSize.xxl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  tieDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
  },
  winnerContainer: {
    marginBottom: Theme.spacing.lg,
    position: 'relative',
  },
  winnerBadge: {
    position: 'absolute',
    top: -10,
    left: 16,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  winnerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.xs,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.xl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  standingsList: {
    flex: 1,
  },
  standingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  standingPosition: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[700],
    width: 30,
    textAlign: 'center',
  },
  standingColorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: Theme.spacing.sm,
  },
  standingName: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    flex: 1,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[100],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  pointsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginLeft: Theme.spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Theme.spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.xs,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.fontSize.xxl,
    color: Theme.colors.primary[500],
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  buttonsContainer: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Team } from '../types';
import { Theme } from '../constants/Colors';
import { Award, Crown, X } from 'lucide-react-native';

type TeamCardProps = {
  team: Team;
  isActive?: boolean;
  isWinner?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  showScore?: boolean;
};

const TeamCard = ({
  team,
  isActive = false,
  isWinner = false,
  onPress,
  onRemove,
  showScore = true,
}: TeamCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: team.color },
        isActive && styles.activeContainer,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.content}>
        {isWinner && (
          <View style={styles.winnerBadge}>
            <Crown size={16} color="#FFF" />
          </View>
        )}
        
        <View style={styles.nameContainer}>
          <Text style={styles.teamName}>{team.name}</Text>
          {showScore && (
            <View style={styles.scoreContainer}>
              <Award size={16} color="#FFF" />
              <Text style={styles.scoreText}>{team.score}</Text>
            </View>
          )}
        </View>
        
        {onRemove && (
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <X size={16} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.md,
    marginVertical: Theme.spacing.xs,
    overflow: 'hidden',
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.02 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    position: 'relative',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamName: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  scoreText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.xs,
  },
  removeButton: {
    marginLeft: Theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.xs,
  },
  winnerBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    backgroundColor: Theme.colors.accent[500],
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.xs,
    zIndex: 1,
  },
});

export default TeamCard;
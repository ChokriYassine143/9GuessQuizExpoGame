import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Theme } from '@/constants/Colors';
import Button from '@/components/Button';
import TeamCard from '@/components/TeamCard';
import CategoryCard from '@/components/CategoryCard';
import { useGame } from '@/contexts/GameContext';
import { Team, GameSettings } from '@/types';
import { categories } from '@/data/categories';
import { Plus, Minus, Clock, Settings as SettingsIcon } from 'lucide-react-native';

export default function PlayScreen() {
  const { dispatch } = useGame();
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [questionsPerRound, setQuestionsPerRound] = useState(5);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [enableJokers, setEnableJokers] = useState(true);
  const [enableTrapAnswers, setEnableTrapAnswers] = useState(true);
  
  const teamColors = [
    Theme.colors.primary[500],
    Theme.colors.secondary[400],
    Theme.colors.accent[500],
    Theme.colors.error[500],
    Theme.colors.success[500],
    Theme.colors.warning[500],
  ];
  
  const addTeam = () => {
    if (teamName.trim() && teams.length < 4) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamName.trim(),
        color: teamColors[teams.length % teamColors.length],
        score: 0,
        jokers: [],
      };
      
      setTeams([...teams, newTeam]);
      setTeamName('');
    }
  };
  
  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const adjustTime = (amount: number) => {
    const newTime = Math.max(30, Math.min(120, timePerQuestion + amount));
    setTimePerQuestion(newTime);
  };
  
  const adjustQuestions = (amount: number) => {
    const newCount = Math.max(1, Math.min(10, questionsPerRound + amount));
    setQuestionsPerRound(newCount);
  };
  
  const adjustRounds = (amount: number) => {
    const newCount = Math.max(1, Math.min(10, numberOfRounds + amount));
    setNumberOfRounds(newCount);
  };
  
  const startGame = () => {
    // Need at least one team and one category to start
    if (teams.length === 0 || selectedCategories.length === 0) {
      return;
    }
    
    const gameSettings: GameSettings = {
      teams,
      categories: selectedCategories,
      timePerQuestion,
      enableJokers,
      enableTrapAnswers,
      questionsPerRound,
      numberOfRounds,
    };
    
    // Initialize the game with these settings
    dispatch({ type: 'INIT_GAME', payload: gameSettings });
    dispatch({ type: 'START_GAME' });
    
    // Navigate to the game screen
    router.push('/game');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Teams</Text>
      <Text style={styles.sectionDescription}>Add 1-4 teams to play with</Text>
      
      <View style={styles.teamInputContainer}>
        <TextInput
          style={styles.teamInput}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Enter team name"
          placeholderTextColor={Theme.colors.neutral[400]}
          onSubmitEditing={addTeam}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTeam} disabled={!teamName.trim() || teams.length >= 4}>
          <Plus size={20} color={Theme.colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.teamsContainer}>
        {teams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onRemove={() => removeTeam(team.id)}
            showScore={false}
          />
        ))}
        
        {teams.length === 0 && (
          <Text style={styles.emptyStateText}>No teams added yet</Text>
        )}
      </View>
      
      <Text style={styles.sectionTitle}>Categories</Text>
      <Text style={styles.sectionDescription}>Select categories for your game</Text>
      
      <View style={styles.categoriesContainer}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selectedCategories.includes(category.id)}
            onPress={() => toggleCategory(category.id)}
          />
        ))}
      </View>
      
      <View style={styles.timerContainer}>
        <View style={styles.timerHeader}>
          <Clock size={20} color={Theme.colors.neutral[800]} />
          <Text style={styles.timerTitle}>Time per Question: {timePerQuestion}s</Text>
        </View>
        
        <View style={styles.timerControls}>
          <TouchableOpacity 
            style={styles.timerButton} 
            onPress={() => adjustTime(-10)}
            disabled={timePerQuestion <= 30}
          >
            <Minus size={16} color={Theme.colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.timerTrack}>
            <View style={[styles.timerProgress, { width: `${(timePerQuestion - 30) / 90 * 100}%` }]} />
          </View>
          
          <TouchableOpacity 
            style={styles.timerButton} 
            onPress={() => adjustTime(10)}
            disabled={timePerQuestion >= 120}
          >
            <Plus size={16} color={Theme.colors.neutral[800]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.timerContainer}>
        <View style={styles.timerHeader}>
          <SettingsIcon size={20} color={Theme.colors.neutral[800]} />
          <Text style={styles.timerTitle}>Number of Rounds: {numberOfRounds}</Text>
        </View>
        
        <View style={styles.timerControls}>
          <TouchableOpacity 
            style={styles.timerButton} 
            onPress={() => adjustRounds(-1)}
            disabled={numberOfRounds <= 1}
          >
            <Minus size={16} color={Theme.colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.timerTrack}>
            <View style={[styles.timerProgress, { width: `${(numberOfRounds - 1) / 9 * 100}%` }]} />
          </View>
          
          <TouchableOpacity 
            style={styles.timerButton} 
            onPress={() => adjustRounds(1)}
            disabled={numberOfRounds >= 10}
          >
            <Plus size={16} color={Theme.colors.neutral[800]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.advancedToggle}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <SettingsIcon size={16} color={Theme.colors.neutral[600]} />
        <Text style={styles.advancedToggleText}>
          {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </Text>
      </TouchableOpacity>
      
      {showAdvanced && (
        <View style={styles.advancedSettings}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable Jokers</Text>
            <TouchableOpacity 
              style={[styles.toggle, enableJokers && styles.toggleActive]}
              onPress={() => setEnableJokers(!enableJokers)}
            >
              <View style={[styles.toggleHandle, enableJokers && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable Trap Answers</Text>
            <TouchableOpacity 
              style={[styles.toggle, enableTrapAnswers && styles.toggleActive]}
              onPress={() => setEnableTrapAnswers(!enableTrapAnswers)}
            >
              <View style={[styles.toggleHandle, enableTrapAnswers && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Questions per Round</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity 
                style={styles.counterButton} 
                onPress={() => adjustQuestions(-1)}
                disabled={questionsPerRound <= 1}
              >
                <Minus size={14} color={Theme.colors.neutral[800]} />
              </TouchableOpacity>
              
              <Text style={styles.counterText}>{questionsPerRound}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton} 
                onPress={() => adjustQuestions(1)}
                disabled={questionsPerRound >= 10}
              >
                <Plus size={14} color={Theme.colors.neutral[800]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      <Button 
        title="Start Game" 
        onPress={startGame} 
        variant="primary" 
        size="large" 
        fullWidth
        disabled={teams.length === 0 || selectedCategories.length === 0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  content: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.xl,
    color: Theme.colors.neutral[800],
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xs,
  },
  sectionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing.md,
  },
  teamInputContainer: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  teamInput: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.fontSize.md,
    fontFamily: 'Poppins-Regular',
    color: Theme.colors.neutral[800],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
    height: 48,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Theme.spacing.sm,
  },
  teamsContainer: {
    marginBottom: Theme.spacing.lg,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[500],
    textAlign: 'center',
    marginVertical: Theme.spacing.md,
    fontStyle: 'italic',
  },
  categoriesContainer: {
    marginBottom: Theme.spacing.lg,
  },
  timerContainer: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  timerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginLeft: Theme.spacing.sm,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.neutral[200],
    borderRadius: Theme.borderRadius.full,
    marginHorizontal: Theme.spacing.md,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.full,
  },
  timerButton: {
    width: 32,
    height: 32,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
  },
  advancedToggleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginLeft: Theme.spacing.xs,
  },
  advancedSettings: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Theme.spacing.sm,
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.neutral[300],
    padding: 2,
  },
  toggleActive: {
    backgroundColor: Theme.colors.primary[500],
  },
  toggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.colors.white,
  },
  toggleHandleActive: {
    transform: [{ translateX: 22 }],
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginHorizontal: Theme.spacing.md,
    width: 24,
    textAlign: 'center',
  },
});
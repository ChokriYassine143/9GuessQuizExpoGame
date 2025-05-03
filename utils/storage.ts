import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameHistory {
  id: string;
  date: string;
  category: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
}

const HISTORY_KEY = '@game_history';
const SETTINGS_KEY = '@app_settings';

export const Storage = {
  // Game History
  async saveGameHistory(game: GameHistory): Promise<void> {
    try {
      const existingHistory = await this.getGameHistory();
      const newHistory = [game, ...existingHistory];
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving game history:', error);
    }
  },

  async getGameHistory(): Promise<GameHistory[]> {
    try {
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting game history:', error);
      return [];
    }
  },

  async clearGameHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing game history:', error);
    }
  },

  // Settings
  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async getSettings(): Promise<AppSettings> {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settings) {
        return JSON.parse(settings);
      }
      // Default settings
      return {
        soundEnabled: true,
        musicEnabled: true,
        vibrationEnabled: true,
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        soundEnabled: true,
        musicEnabled: true,
        vibrationEnabled: true,
      };
    }
  },

  // Clear all app data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },
}; 
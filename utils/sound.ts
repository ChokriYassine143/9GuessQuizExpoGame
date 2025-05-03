import { Audio } from 'expo-av';
import { Storage } from './storage';

// Import sound file
import defaultSound from '../assets/sounds/heating-sun-327239.mp3';

class SoundManager {
  private static instance: SoundManager;
  private soundEnabled: boolean = true;
  private sounds: { [key: string]: Audio.Sound } = {};

  private constructor() {
    this.loadSettings();
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async loadSettings() {
    const settings = await Storage.getSettings();
    this.soundEnabled = settings.soundEnabled;
  }

  async playSound(soundName: string) {
    if (!this.soundEnabled) return;

    try {
      if (!this.sounds[soundName]) {
        const { sound } = await Audio.Sound.createAsync(defaultSound);
        this.sounds[soundName] = sound;
      }

      await this.sounds[soundName].replayAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  async setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    const settings = await Storage.getSettings();
    await Storage.saveSettings({ ...settings, soundEnabled: enabled });
  }

  async unloadSounds() {
    for (const sound of Object.values(this.sounds)) {
      await sound.unloadAsync();
    }
    this.sounds = {};
  }
}

export const soundManager = SoundManager.getInstance();

// Sound effects
export const SOUNDS = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  COMPLETE: 'complete',
  CLICK: 'click',
  BACKGROUND: 'background',
} as const; 
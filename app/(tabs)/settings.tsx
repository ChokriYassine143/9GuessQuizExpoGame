import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Theme } from '@/constants/Colors';
import { Volume2, Volume1, VolumeX, Bell, Moon, Info, Trash, CircleHelp as HelpCircle } from 'lucide-react-native';
import { Storage } from '@/utils/storage';
import { soundManager } from '@/utils/sound';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    soundVolume: 2,
    notificationsEnabled: true,
    darkModeEnabled: false,
  });
  
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await Storage.getSettings();
    setSettings(prev => ({
      ...prev,
      soundEnabled: savedSettings.soundEnabled,
      notificationsEnabled: savedSettings.vibrationEnabled,
    }));
  };

  const toggleSound = async () => {
    const newValue = !settings.soundEnabled;
    setSettings(prev => ({ ...prev, soundEnabled: newValue }));
    await soundManager.setSoundEnabled(newValue);
  };

  const toggleNotifications = async () => {
    const newValue = !settings.notificationsEnabled;
    setSettings(prev => ({ ...prev, notificationsEnabled: newValue }));
    const currentSettings = await Storage.getSettings();
    await Storage.saveSettings({
      ...currentSettings,
      vibrationEnabled: newValue,
    });
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkModeEnabled: !prev.darkModeEnabled }));
  };
  
  const adjustVolume = () => {
    const newVolume = (settings.soundVolume + 1) % 3;
    setSettings(prev => ({ ...prev, soundVolume: newVolume }));
    if (newVolume === 0) {
      toggleSound();
    }
  };
  
  const getVolumeIcon = () => {
    if (settings.soundVolume === 0 || !settings.soundEnabled) return <VolumeX size={24} color={Theme.colors.neutral[600]} />;
    if (settings.soundVolume === 1) return <Volume1 size={24} color={Theme.colors.neutral[600]} />;
    return <Volume2 size={24} color={Theme.colors.neutral[600]} />;
  };
  
  const clearData = async () => {
    Alert.alert(
      'Clear App Data',
      'Are you sure you want to clear all app data including game history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Data', 
          style: 'destructive',
          onPress: async () => {
            await Storage.clearAllData();
            await soundManager.unloadSounds();
            loadSettings();
            Alert.alert('Data Cleared', 'All app data has been cleared successfully.');
          } 
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sound & Notifications</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            {getVolumeIcon()}
            <Text style={styles.settingLabel}>Game Sounds</Text>
          </View>
          <Switch
            value={settings.soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: Theme.colors.neutral[300], true: Theme.colors.primary[400] }}
            thumbColor={settings.soundEnabled ? Theme.colors.primary[600] : Theme.colors.neutral[100]}
          />
        </View>
        
        {settings.soundEnabled && (
          <TouchableOpacity style={styles.volumeControl} onPress={adjustVolume}>
            <Text style={styles.volumeLabel}>Volume Level</Text>
            <View style={styles.volumeBars}>
              <View style={[styles.volumeBar, settings.soundVolume >= 1 && styles.volumeBarActive]} />
              <View style={[styles.volumeBar, settings.soundVolume >= 2 && styles.volumeBarActive]} />
              <View style={[styles.volumeBar, settings.soundVolume >= 3 && styles.volumeBarActive]} />
            </View>
          </TouchableOpacity>
        )}
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Bell size={24} color={Theme.colors.neutral[600]} />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: Theme.colors.neutral[300], true: Theme.colors.primary[400] }}
            thumbColor={settings.notificationsEnabled ? Theme.colors.primary[600] : Theme.colors.neutral[100]}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Moon size={24} color={Theme.colors.neutral[600]} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={settings.darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: Theme.colors.neutral[300], true: Theme.colors.primary[400] }}
            thumbColor={settings.darkModeEnabled ? Theme.colors.primary[600] : Theme.colors.neutral[100]}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Info size={24} color={Theme.colors.neutral[600]} />
            <Text style={styles.settingLabel}>App Version</Text>
          </View>
          <Text style={styles.versionText}>1.0.0</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <HelpCircle size={24} color={Theme.colors.neutral[600]} />
            <Text style={styles.settingLabel}>Help & Support</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        
        <TouchableOpacity style={styles.settingRow} onPress={clearData}>
          <View style={styles.settingLabelContainer}>
            <Trash size={24} color={Theme.colors.error[500]} />
            <Text style={[styles.settingLabel, { color: Theme.colors.error[500] }]}>
              Clear App Data
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.xxl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  section: {
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
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginLeft: Theme.spacing.md,
  },
  volumeControl: {
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    marginVertical: Theme.spacing.xs,
    marginLeft: Theme.spacing.xl * 2,
    marginBottom: Theme.spacing.md,
  },
  volumeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[700],
    marginBottom: Theme.spacing.xs,
  },
  volumeBars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeBar: {
    width: 24,
    height: 8,
    borderRadius: Theme.borderRadius.xs,
    backgroundColor: Theme.colors.neutral[300],
    marginRight: Theme.spacing.xs,
  },
  volumeBarActive: {
    backgroundColor: Theme.colors.primary[500],
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
  },
});
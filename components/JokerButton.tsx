import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Joker } from '../types';
import { Theme } from '../constants/Colors';
import { Clock, TriangleAlert as AlertTriangle, Star, Divide } from 'lucide-react-native';

type JokerButtonProps = {
  joker: Joker;
  onUse: (jokerId: string) => void;
};

const JokerButton = ({ joker, onUse }: JokerButtonProps) => {
  const renderIcon = () => {
    switch (joker.id) {
      case 'extra-time':
        return <Clock size={20} color={Theme.colors.white} />;
      case 'reveal-trap':
        return <AlertTriangle size={20} color={Theme.colors.white} />;
      case 'double-points':
        return <Star size={20} color={Theme.colors.white} />;
    
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, joker.used && styles.usedButton]}
      onPress={() => onUse(joker.id)}
      disabled={joker.used}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <Text style={styles.name}>{joker.name}</Text>
      {joker.used && <View style={styles.usedOverlay} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.secondary[500],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    margin: Theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  usedButton: {
    backgroundColor: Theme.colors.neutral[400],
    opacity: 0.7,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xs,
  },
  name: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.medium,
    textAlign: 'center',
  },
  usedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: Theme.borderRadius.md,
  },
});

export default JokerButton;
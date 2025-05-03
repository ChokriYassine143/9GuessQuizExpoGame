import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Theme } from '../constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return Theme.colors.neutral[300];
    
    switch (variant) {
      case 'primary':
        return Theme.colors.primary[500];
      case 'secondary':
        return Theme.colors.secondary[500];
      case 'danger':
        return Theme.colors.error[500];
      case 'outline':
        return 'transparent';
      default:
        return Theme.colors.primary[500];
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return Theme.colors.neutral[300];
    
    switch (variant) {
      case 'outline':
        return Theme.colors.primary[500];
      default:
        return 'transparent';
    }
  };
  
  const getTextColor = () => {
    if (disabled) return Theme.colors.neutral[500];
    
    switch (variant) {
      case 'outline':
        return Theme.colors.primary[500];
      default:
        return Theme.colors.white;
    }
  };
  
  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 36;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        return 48;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          height: getButtonHeight(),
          width: fullWidth ? '100%' : undefined,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    borderWidth: 2,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
  },
  iconContainer: {
    marginRight: Theme.spacing.sm,
  },
});

export default Button;
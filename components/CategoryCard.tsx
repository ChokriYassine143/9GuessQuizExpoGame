import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameCategory } from '../types';
import { Theme } from '../constants/Colors';
import { Check, CircleHelp as HelpCircle } from 'lucide-react-native';

type CategoryCardProps = {
  category: GameCategory;
  selected?: boolean;
  onPress?: () => void;
};

const CategoryCard = ({
  category,
  selected = false,
  onPress,
}: CategoryCardProps) => {
  const icon = getIconForCategory(category.icon);
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: category.color },
        selected && { backgroundColor: `${category.color}20` },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        {icon}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {category.description}
        </Text>
        <Text style={styles.count}>
          {category.questionCount} questions
        </Text>
      </View>
      
      {selected && (
        <View style={[styles.selectedBadge, { backgroundColor: category.color }]}>
          <Check size={16} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const getIconForCategory = (iconName: string) => {
  // This is a simplified icon renderer - in a real app, we would map the icon name to the actual icon component
  return <HelpCircle size={24} color="#FFF" />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: Theme.borderRadius.md,
    marginVertical: Theme.spacing.sm,
    padding: Theme.spacing.sm,
    borderWidth: 2,
    backgroundColor: Theme.colors.white,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    marginBottom: Theme.spacing.xs,
    color: Theme.colors.neutral[800],
  },
  description: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  count: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.neutral[500],
    fontWeight: Theme.fontWeight.medium,
  },
  selectedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryCard;
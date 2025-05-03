import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { Theme } from '@/constants/Colors';
import { Play, Info, Users, Brain } from 'lucide-react-native';
import Button from '@/components/Button';
import { categories } from '@/data/categories';

export default function HomeScreen() {
  // Select a few featured categories to show
  const featuredCategories = categories.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>9Guess</Text>
          <Text style={styles.subtitle}>The Ultimate Trivia Challenge</Text>
        </View>
      </View>

      {/* Quick Start */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>

        <Link href="/play" asChild>
          <TouchableOpacity>
            <Button 
              title="Play Now" 
              onPress={() => {
                router.push('/play');
              }} 
              variant="primary" 
              size="large" 
              fullWidth 
              icon={<Play size={20} color={Theme.colors.white} />}
            />
          </TouchableOpacity>
        </Link>
      </View>

      {/* How to Play */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Play</Text>
        <View style={styles.infoCard}>
          <Info size={24} color={Theme.colors.primary[500]} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            9Guess challenges you to name the 9 answers to each question. Play with friends,
            avoid trap answers, and use jokers strategically!
          </Text>
        </View>
        
        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Users size={24} color={Theme.colors.secondary[500]} />
            <Text style={styles.featureTitle}>Multiplayer</Text>
            <Text style={styles.featureText}>Play in teams</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Brain size={24} color={Theme.colors.accent[500]} />
            <Text style={styles.featureTitle}>Categories</Text>
            <Text style={styles.featureText}>Various topics</Text>
          </View>
        </View>
      </View>

      {/* Featured Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Categories</Text>
        <View style={styles.categoriesContainer}>
          {featuredCategories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryButton, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  header: {
    position: 'relative',
    height: 200,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.lg,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.fontSize.xxxl,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.white,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.fontSize.xl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  infoCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
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
  infoIcon: {
    marginRight: Theme.spacing.md,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[700],
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
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
  featureTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[800],
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  featureText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '32%',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
    minHeight: 80,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.white,
    textAlign: 'center',
  },
});
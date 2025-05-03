import { GameCategory } from '../types';
import Colors from '../constants/Colors';

export const categories: GameCategory[] = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: 'brain',
    description: 'Test your knowledge on a variety of general topics.',
    color: Colors.primary[500],
    questionCount: 50,
  },
  {
    id: 'history',
    name: 'History',
    icon: 'landmark',
    description: 'Questions about historical events, figures, and time periods.',
    color: Colors.neutral[700],
    questionCount: 30,
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'flask-conical',
    description: 'Explore topics in biology, chemistry, physics, and more.',
    color: Colors.secondary[400],
    questionCount: 35,
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: 'globe',
    description: 'Questions about countries, capitals, landmarks, and more.',
    color: Colors.accent[400],
    questionCount: 25,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'film',
    description: 'Test your knowledge of movies, TV shows, music, and celebrities.',
    color: Colors.error[400],
    questionCount: 40,
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'trophy',
    description: 'Questions about various sports, athletes, and competitions.',
    color: Colors.success[500],
    questionCount: 30,
  },
  {
    id: 'football',
    name: 'Football',
    icon: 'dribbble',
    description: 'Special mode dedicated to football (soccer) questions.',
    color: Colors.warning[400],
    questionCount: 45,
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: 'utensils',
    description: 'Questions about cuisine, cooking, and beverages from around the world.',
    color: '#E91E63',
    questionCount: 20,
  },
];

export const getCategory = (id: string): GameCategory | undefined => {
  return categories.find(category => category.id === id);
};

export const getRandomCategories = (count: number): GameCategory[] => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default categories;
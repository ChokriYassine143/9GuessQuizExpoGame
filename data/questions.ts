import { Question } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    text: 'Name a country in Europe',
    category: 'geography',
    answers: [
      { id: '1a', text: 'France', isCorrect: true, difficulty: 1 },
      { id: '1b', text: 'Germany', isCorrect: true, difficulty: 1 },
      { id: '1c', text: 'Italy', isCorrect: true, difficulty: 1 },
      { id: '1d', text: 'Spain', isCorrect: true, difficulty: 1 },
      { id: '1e', text: 'United Kingdom', isCorrect: true, difficulty: 1 },
      { id: '1f', text: 'Portugal', isCorrect: true, difficulty: 2 },
      { id: '1g', text: 'Switzerland', isCorrect: true, difficulty: 2 },
      { id: '1h', text: 'Netherlands', isCorrect: true, difficulty: 2 },
      { id: '1i', text: 'Belgium', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '1t1', text: 'Russia', isCorrect: false, isTrap: true },
      { id: '1t2', text: 'Turkey', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '2',
    text: 'Name a planet in our solar system',
    category: 'science',
    answers: [
      { id: '2a', text: 'Mercury', isCorrect: true, difficulty: 2 },
      { id: '2b', text: 'Venus', isCorrect: true, difficulty: 2 },
      { id: '2c', text: 'Earth', isCorrect: true, difficulty: 1 },
      { id: '2d', text: 'Mars', isCorrect: true, difficulty: 1 },
      { id: '2e', text: 'Jupiter', isCorrect: true, difficulty: 1 },
      { id: '2f', text: 'Saturn', isCorrect: true, difficulty: 1 },
      { id: '2g', text: 'Uranus', isCorrect: true, difficulty: 3 },
      { id: '2h', text: 'Neptune', isCorrect: true, difficulty: 3 },
      { id: '2i', text: 'Pluto', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '2t1', text: 'Moon', isCorrect: false, isTrap: true },
      { id: '2t2', text: 'Sun', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '3',
    text: 'Name a team that has won the FIFA World Cup',
    category: 'football',
    answers: [
      { id: '3a', text: 'Brazil', isCorrect: true, difficulty: 1 },
      { id: '3b', text: 'Germany', isCorrect: true, difficulty: 1 },
      { id: '3c', text: 'Italy', isCorrect: true, difficulty: 1 },
      { id: '3d', text: 'Argentina', isCorrect: true, difficulty: 1 },
      { id: '3e', text: 'France', isCorrect: true, difficulty: 1 },
      { id: '3f', text: 'Spain', isCorrect: true, difficulty: 2 },
      { id: '3g', text: 'England', isCorrect: true, difficulty: 2 },
      { id: '3h', text: 'Uruguay', isCorrect: true, difficulty: 3 },
      { id: '3i', text: 'Croatia', isCorrect: true, difficulty: 3 },
    ],
    trapAnswers: [
      { id: '3t1', text: 'Portugal', isCorrect: false, isTrap: true },
      { id: '3t2', text: 'Netherlands', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '4',
    text: 'Name a fruit beginning with the letter A',
    category: 'food',
    answers: [
      { id: '4a', text: 'Apple', isCorrect: true, difficulty: 1 },
      { id: '4b', text: 'Apricot', isCorrect: true, difficulty: 2 },
      { id: '4c', text: 'Avocado', isCorrect: true, difficulty: 2 },
      { id: '4d', text: 'Acai', isCorrect: true, difficulty: 3 },
      { id: '4e', text: 'Ackee', isCorrect: true, difficulty: 3 },
      { id: '4f', text: 'Amanatsu', isCorrect: true, difficulty: 3 },
      { id: '4g', text: 'Ambarella', isCorrect: true, difficulty: 3 },
      { id: '4h', text: 'Araza', isCorrect: true, difficulty: 3 },
      { id: '4i', text: 'Arhat', isCorrect: true, difficulty: 3 },
    ],
    trapAnswers: [
      { id: '4t1', text: 'Almond', isCorrect: false, isTrap: true },
      { id: '4t2', text: 'Asparagus', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '5',
    text: 'Name a famous actor who has won an Oscar',
    category: 'entertainment',
    answers: [
      { id: '5a', text: 'Leonardo DiCaprio', isCorrect: true, difficulty: 1 },
      { id: '5b', text: 'Meryl Streep', isCorrect: true, difficulty: 1 },
      { id: '5c', text: 'Tom Hanks', isCorrect: true, difficulty: 1 },
      { id: '5d', text: 'Anthony Hopkins', isCorrect: true, difficulty: 2 },
      { id: '5e', text: 'Kate Winslet', isCorrect: true, difficulty: 2 },
      { id: '5f', text: 'Joaquin Phoenix', isCorrect: true, difficulty: 2 },
      { id: '5g', text: 'Jennifer Lawrence', isCorrect: true, difficulty: 2 },
      { id: '5h', text: 'Denzel Washington', isCorrect: true, difficulty: 2 },
      { id: '5i', text: 'Emma Stone', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '5t1', text: 'Jim Carrey', isCorrect: false, isTrap: true },
      { id: '5t2', text: 'Johnny Depp', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '6',
    text: 'Name a programming language',
    category: 'technology',
    answers: [
      { id: '6a', text: 'Python', isCorrect: true, difficulty: 1 },
      { id: '6b', text: 'JavaScript', isCorrect: true, difficulty: 1 },
      { id: '6c', text: 'Java', isCorrect: true, difficulty: 1 },
      { id: '6d', text: 'C++', isCorrect: true, difficulty: 2 },
      { id: '6e', text: 'Ruby', isCorrect: true, difficulty: 2 },
      { id: '6f', text: 'Swift', isCorrect: true, difficulty: 2 },
      { id: '6g', text: 'Kotlin', isCorrect: true, difficulty: 3 },
      { id: '6h', text: 'Rust', isCorrect: true, difficulty: 3 },
      { id: '6i', text: 'Go', isCorrect: true, difficulty: 3 },
    ],
    trapAnswers: [
      { id: '6t1', text: 'HTML', isCorrect: false, isTrap: true },
      { id: '6t2', text: 'CSS', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '7',
    text: 'Name a famous scientist',
    category: 'science',
    answers: [
      { id: '7a', text: 'Albert Einstein', isCorrect: true, difficulty: 1 },
      { id: '7b', text: 'Isaac Newton', isCorrect: true, difficulty: 1 },
      { id: '7c', text: 'Charles Darwin', isCorrect: true, difficulty: 1 },
      { id: '7d', text: 'Marie Curie', isCorrect: true, difficulty: 2 },
      { id: '7e', text: 'Nikola Tesla', isCorrect: true, difficulty: 2 },
      { id: '7f', text: 'Stephen Hawking', isCorrect: true, difficulty: 2 },
      { id: '7g', text: 'Galileo Galilei', isCorrect: true, difficulty: 2 },
      { id: '7h', text: 'Max Planck', isCorrect: true, difficulty: 3 },
      { id: '7i', text: 'Richard Feynman', isCorrect: true, difficulty: 3 },
    ],
    trapAnswers: [
      { id: '7t1', text: 'Bill Gates', isCorrect: false, isTrap: true },
      { id: '7t2', text: 'Mark Zuckerberg', isCorrect: false, isTrap: true },
    ],
    difficulty: 'hard',
  },
  {
    id: '8',
    text: 'Name a famous painting',
    category: 'art',
    answers: [
      { id: '8a', text: 'Mona Lisa', isCorrect: true, difficulty: 1 },
      { id: '8b', text: 'The Starry Night', isCorrect: true, difficulty: 1 },
      { id: '8c', text: 'The Last Supper', isCorrect: true, difficulty: 1 },
      { id: '8d', text: 'The Scream', isCorrect: true, difficulty: 2 },
      { id: '8e', text: 'Girl with a Pearl Earring', isCorrect: true, difficulty: 2 },
      { id: '8f', text: 'The Persistence of Memory', isCorrect: true, difficulty: 2 },
      { id: '8g', text: 'The Night Watch', isCorrect: true, difficulty: 3 },
      { id: '8h', text: 'Las Meninas', isCorrect: true, difficulty: 3 },
      { id: '8i', text: 'The Birth of Venus', isCorrect: true, difficulty: 3 },
    ],
    trapAnswers: [
      { id: '8t1', text: 'The Thinker', isCorrect: false, isTrap: true },
      { id: '8t2', text: 'David', isCorrect: false, isTrap: true },
    ],
    difficulty: 'hard',
  },
  {
    id: '9',
    text: 'Name a capital city in Europe',
    category: 'general',
    answers: [
      { id: '9a', text: 'London', isCorrect: true, difficulty: 1 },
      { id: '9b', text: 'Paris', isCorrect: true, difficulty: 1 },
      { id: '9c', text: 'Berlin', isCorrect: true, difficulty: 1 },
      { id: '9d', text: 'Rome', isCorrect: true, difficulty: 1 },
      { id: '9e', text: 'Madrid', isCorrect: true, difficulty: 1 },
      { id: '9f', text: 'Vienna', isCorrect: true, difficulty: 2 },
      { id: '9g', text: 'Amsterdam', isCorrect: true, difficulty: 2 },
      { id: '9h', text: 'Brussels', isCorrect: true, difficulty: 2 },
      { id: '9i', text: 'Lisbon', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '9t1', text: 'New York', isCorrect: false, isTrap: true },
      { id: '9t2', text: 'Sydney', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '10',
    text: 'Name a famous landmark',
    category: 'general',
    answers: [
      { id: '10a', text: 'Eiffel Tower', isCorrect: true, difficulty: 1 },
      { id: '10b', text: 'Statue of Liberty', isCorrect: true, difficulty: 1 },
      { id: '10c', text: 'Great Wall of China', isCorrect: true, difficulty: 1 },
      { id: '10d', text: 'Taj Mahal', isCorrect: true, difficulty: 1 },
      { id: '10e', text: 'Pyramids of Giza', isCorrect: true, difficulty: 1 },
      { id: '10f', text: 'Colosseum', isCorrect: true, difficulty: 2 },
      { id: '10g', text: 'Machu Picchu', isCorrect: true, difficulty: 2 },
      { id: '10h', text: 'Christ the Redeemer', isCorrect: true, difficulty: 2 },
      { id: '10i', text: 'Sydney Opera House', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '10t1', text: 'Burj Khalifa', isCorrect: false, isTrap: true },
      { id: '10t2', text: 'Empire State Building', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '11',
    text: 'Name a famous book',
    category: 'general',
    answers: [
      { id: '11a', text: 'To Kill a Mockingbird', isCorrect: true, difficulty: 1 },
      { id: '11b', text: '1984', isCorrect: true, difficulty: 1 },
      { id: '11c', text: 'Pride and Prejudice', isCorrect: true, difficulty: 1 },
      { id: '11d', text: 'The Great Gatsby', isCorrect: true, difficulty: 1 },
      { id: '11e', text: 'Harry Potter', isCorrect: true, difficulty: 1 },
      { id: '11f', text: 'The Catcher in the Rye', isCorrect: true, difficulty: 2 },
      { id: '11g', text: 'Moby Dick', isCorrect: true, difficulty: 2 },
      { id: '11h', text: 'War and Peace', isCorrect: true, difficulty: 2 },
      { id: '11i', text: 'Ulysses', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '11t1', text: 'The Bible', isCorrect: false, isTrap: true },
      { id: '11t2', text: 'The Dictionary', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '12',
    text: 'Name a musical instrument',
    category: 'general',
    answers: [
      { id: '12a', text: 'Piano', isCorrect: true, difficulty: 1 },
      { id: '12b', text: 'Guitar', isCorrect: true, difficulty: 1 },
      { id: '12c', text: 'Violin', isCorrect: true, difficulty: 1 },
      { id: '12d', text: 'Drums', isCorrect: true, difficulty: 1 },
      { id: '12e', text: 'Flute', isCorrect: true, difficulty: 1 },
      { id: '12f', text: 'Trumpet', isCorrect: true, difficulty: 2 },
      { id: '12g', text: 'Saxophone', isCorrect: true, difficulty: 2 },
      { id: '12h', text: 'Cello', isCorrect: true, difficulty: 2 },
      { id: '12i', text: 'Clarinet', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '12t1', text: 'Microphone', isCorrect: false, isTrap: true },
      { id: '12t2', text: 'Speaker', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '13',
    text: 'Name a type of tree',
    category: 'general',
    answers: [
      { id: '13a', text: 'Oak', isCorrect: true, difficulty: 1 },
      { id: '13b', text: 'Maple', isCorrect: true, difficulty: 1 },
      { id: '13c', text: 'Pine', isCorrect: true, difficulty: 1 },
      { id: '13d', text: 'Birch', isCorrect: true, difficulty: 1 },
      { id: '13e', text: 'Willow', isCorrect: true, difficulty: 1 },
      { id: '13f', text: 'Redwood', isCorrect: true, difficulty: 2 },
      { id: '13g', text: 'Sequoia', isCorrect: true, difficulty: 2 },
      { id: '13h', text: 'Baobab', isCorrect: true, difficulty: 2 },
      { id: '13i', text: 'Banyan', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '13t1', text: 'Bush', isCorrect: false, isTrap: true },
      { id: '13t2', text: 'Shrub', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '14',
    text: 'Name a famous scientist',
    category: 'general',
    answers: [
      { id: '14a', text: 'Albert Einstein', isCorrect: true, difficulty: 1 },
      { id: '14b', text: 'Isaac Newton', isCorrect: true, difficulty: 1 },
      { id: '14c', text: 'Marie Curie', isCorrect: true, difficulty: 1 },
      { id: '14d', text: 'Charles Darwin', isCorrect: true, difficulty: 1 },
      { id: '14e', text: 'Galileo Galilei', isCorrect: true, difficulty: 1 },
      { id: '14f', text: 'Nikola Tesla', isCorrect: true, difficulty: 2 },
      { id: '14g', text: 'Stephen Hawking', isCorrect: true, difficulty: 2 },
      { id: '14h', text: 'Rosalind Franklin', isCorrect: true, difficulty: 2 },
      { id: '14i', text: 'Richard Feynman', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '14t1', text: 'Bill Gates', isCorrect: false, isTrap: true },
      { id: '14t2', text: 'Steve Jobs', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '15',
    text: 'Name a type of flower',
    category: 'general',
    answers: [
      { id: '15a', text: 'Rose', isCorrect: true, difficulty: 1 },
      { id: '15b', text: 'Tulip', isCorrect: true, difficulty: 1 },
      { id: '15c', text: 'Daisy', isCorrect: true, difficulty: 1 },
      { id: '15d', text: 'Sunflower', isCorrect: true, difficulty: 1 },
      { id: '15e', text: 'Lily', isCorrect: true, difficulty: 1 },
      { id: '15f', text: 'Orchid', isCorrect: true, difficulty: 2 },
      { id: '15g', text: 'Peony', isCorrect: true, difficulty: 2 },
      { id: '15h', text: 'Hydrangea', isCorrect: true, difficulty: 2 },
      { id: '15i', text: 'Lotus', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '15t1', text: 'Grass', isCorrect: false, isTrap: true },
      { id: '15t2', text: 'Weed', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '16',
    text: 'Name a famous painting',
    category: 'general',
    answers: [
      { id: '16a', text: 'Mona Lisa', isCorrect: true, difficulty: 1 },
      { id: '16b', text: 'The Starry Night', isCorrect: true, difficulty: 1 },
      { id: '16c', text: 'The Last Supper', isCorrect: true, difficulty: 1 },
      { id: '16d', text: 'The Scream', isCorrect: true, difficulty: 1 },
      { id: '16e', text: 'Girl with a Pearl Earring', isCorrect: true, difficulty: 1 },
      { id: '16f', text: 'The Persistence of Memory', isCorrect: true, difficulty: 2 },
      { id: '16g', text: 'The Night Watch', isCorrect: true, difficulty: 2 },
      { id: '16h', text: 'Las Meninas', isCorrect: true, difficulty: 2 },
      { id: '16i', text: 'The Birth of Venus', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '16t1', text: 'The Thinker', isCorrect: false, isTrap: true },
      { id: '16t2', text: 'David', isCorrect: false, isTrap: true },
    ],
    difficulty: 'medium',
  },
  {
    id: '17',
    text: 'Name a type of sport',
    category: 'general',
    answers: [
      { id: '17a', text: 'Football', isCorrect: true, difficulty: 1 },
      { id: '17b', text: 'Basketball', isCorrect: true, difficulty: 1 },
      { id: '17c', text: 'Tennis', isCorrect: true, difficulty: 1 },
      { id: '17d', text: 'Swimming', isCorrect: true, difficulty: 1 },
      { id: '17e', text: 'Running', isCorrect: true, difficulty: 1 },
      { id: '17f', text: 'Golf', isCorrect: true, difficulty: 2 },
      { id: '17g', text: 'Cricket', isCorrect: true, difficulty: 2 },
      { id: '17h', text: 'Rugby', isCorrect: true, difficulty: 2 },
      { id: '17i', text: 'Baseball', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '17t1', text: 'Walking', isCorrect: false, isTrap: true },
      { id: '17t2', text: 'Standing', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
  {
    id: '18',
    text: 'Name a type of animal',
    category: 'general',
    answers: [
      { id: '18a', text: 'Dog', isCorrect: true, difficulty: 1 },
      { id: '18b', text: 'Cat', isCorrect: true, difficulty: 1 },
      { id: '18c', text: 'Lion', isCorrect: true, difficulty: 1 },
      { id: '18d', text: 'Elephant', isCorrect: true, difficulty: 1 },
      { id: '18e', text: 'Tiger', isCorrect: true, difficulty: 1 },
      { id: '18f', text: 'Giraffe', isCorrect: true, difficulty: 2 },
      { id: '18g', text: 'Kangaroo', isCorrect: true, difficulty: 2 },
      { id: '18h', text: 'Panda', isCorrect: true, difficulty: 2 },
      { id: '18i', text: 'Penguin', isCorrect: true, difficulty: 2 },
    ],
    trapAnswers: [
      { id: '18t1', text: 'Dinosaur', isCorrect: false, isTrap: true },
      { id: '18t2', text: 'Dragon', isCorrect: false, isTrap: true },
    ],
    difficulty: 'easy',
  },
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number, categories?: string[]): Question[] => {
  let filteredQuestions = questions;
  
  if (categories && categories.length > 0) {
    filteredQuestions = questions.filter(q => categories.includes(q.category));
  }

  // If we don't have enough questions, repeat questions to meet the count
  if (filteredQuestions.length === 0) {
    throw new Error('No questions available for the selected categories');
  }

  let result: Question[] = [];
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
  
  // Keep adding questions until we reach the desired count
  while (result.length < count) {
    const remainingNeeded = count - result.length;
    const nextBatch = shuffled.slice(0, remainingNeeded);
    result = [...result, ...nextBatch];
    
    // If we've used all questions and still need more, reshuffle
    if (result.length < count) {
      shuffled.sort(() => 0.5 - Math.random());
    }
  }
  
  return result;
};

export default questions;
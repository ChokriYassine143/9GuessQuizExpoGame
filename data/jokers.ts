import { Joker } from '../types';

export const jokers: Joker[] = [
  {
    id: 'extra-time',
    name: 'Extra Time',
    description: 'Adds 30 extra seconds to the current question',
    icon: 'clock',
    used: false,
  },
  {
    id: 'double-points',
    name: 'Double Points',
    description: 'Doubles the points earned for the current question',
    icon: 'star',
    used: false,
  },
  {
    id: 'reveal-trap',
    name: 'Reveal Trap',
    description: 'Reveals the trap answer to avoid',
    icon: 'alert-triangle',
    used: false,
  },
];

export const getJoker = (id: string): Joker | undefined => {
  return jokers.find(joker => joker.id === id);
};

export const getDefaultJokers = (): Joker[] => {
  return jokers.map(joker => ({ ...joker, used: false }));
};

export default jokers;
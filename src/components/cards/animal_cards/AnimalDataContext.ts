import { createContext } from 'react';

import { AnimalsData } from '@/data/Animals';
import { PrehistoricAnimalsData } from '@/data/prehistoric/Animals';
import { AnimalCard } from '@/types/AnimalCard';

export const getAnimalsData = (includeFanMade: boolean): AnimalCard[] => {
  if (includeFanMade) {
    return [...AnimalsData, ...PrehistoricAnimalsData];
  }
  return AnimalsData;
};

export const AnimalDataContext = createContext(AnimalsData);

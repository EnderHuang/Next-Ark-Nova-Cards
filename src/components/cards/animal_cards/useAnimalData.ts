import { useContext } from 'react';

import { AnimalDataContext, getAnimalsData } from './AnimalDataContext';

export function useAnimalData(includeFanMade = false) {
  const contextData = useContext(AnimalDataContext);
  if (includeFanMade) {
    return getAnimalsData(true);
  }
  return contextData;
}

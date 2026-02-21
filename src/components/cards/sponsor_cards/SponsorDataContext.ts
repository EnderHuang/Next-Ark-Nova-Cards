import { createContext } from 'react';
import { PrehistoricSponsorsData } from '@/data/prehistoric/Sponsors';
import { SponsorsData } from '@/data/Sponsors';
import { SponsorCard } from '@/types/SponsorCard';

export const getSponsorsData = (includeFanMade: boolean): SponsorCard[] => {
  if (includeFanMade) {
    return [...SponsorsData, ...PrehistoricSponsorsData];
  }
  return SponsorsData;
};

export const SponsorDataContext = createContext(SponsorsData);

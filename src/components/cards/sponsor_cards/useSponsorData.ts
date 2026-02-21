import { useContext } from 'react';

import { getSponsorsData, SponsorDataContext } from './SponsorDataContext';

export function useSponsorData(includeFanMade = false) {
  const contextData = useContext(SponsorDataContext);
  if (includeFanMade) {
    return getSponsorsData(true);
  }
  return contextData;
}

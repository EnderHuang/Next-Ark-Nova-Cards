import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchCardRatings } from '@/services/card';

// Global state to ensure only one trigger
let hasTriggeredGlobally = false;

export const useRatingTrigger = () => {
  const queryClient = useQueryClient();
  const isFetchingRatings = useIsFetching({ queryKey: ['cardRatings'] });

  const triggerRatingFetch = useCallback(async () => {
    if (hasTriggeredGlobally) {
      return; // Already triggered, return
    }

    hasTriggeredGlobally = true;

    // Trigger rating data fetch
    await queryClient.prefetchQuery({
      queryKey: ['cardRatings'],
      queryFn: fetchCardRatings,
    });
  }, [queryClient]);

  const isRatingLoading =
    isFetchingRatings > 0 ||
    (!hasTriggeredGlobally && !queryClient.getQueryData(['cardRatings']));

  return { triggerRatingFetch, isRatingLoading };
};

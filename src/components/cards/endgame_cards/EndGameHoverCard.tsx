import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ClientRating as Rating } from '@/components/ui/ClientRating';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { EndGameCard } from '@/types/EndGameCard';

interface HoverCardProps {
  id: string;
  card: EndGameCard;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
  isRatingLoading?: boolean;
}

export const EndGameHoverCard: React.FC<HoverCardProps> = ({
  id,
  card,
  showLink,
  rating,
  ratingCount,
  isRatingLoading,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-2 text-xs'>
      {card.originalArray && (
        <div>
          <span className='font-bold text-muted-foreground'>
            {t('This card has been changed')}
          </span>
          <table className='score-map mt-1.5 w-full p-0 text-center text-xs text-muted-foreground'>
            <tbody>
              <tr>
                <th></th>
                {card.originalArray.map((obj) => (
                  <td key={obj.requirement} className='p-0 text-xs'>
                    {obj.requirement}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <table className='score-map mt-1 w-full p-0 text-center text-xs'>
            <tbody>
              <tr>
                <th></th>
                {card.scoreArray.map((obj, idx) => (
                  <td
                    key={obj.requirement}
                    className={cn(
                      'p-0 text-xs',
                      card.originalArray &&
                        obj.requirement < card.originalArray[idx].requirement &&
                        'text-lime-600',
                      card.originalArray &&
                        obj.requirement > card.originalArray[idx].requirement &&
                        'text-red-700',
                    )}
                  >
                    {obj.requirement}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {rating ? (
        <div className='flex items-center gap-1.5'>
          <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }}
            readonly={true}
            initialValue={rating}
            allowFraction={true}
            size={16}
          />
          <span className='text-muted-foreground'>
            {rating.toFixed(1)} ({ratingCount} {t('users')})
          </span>
        </div>
      ) : (
        isRatingLoading && (
          <div className='flex items-center gap-1.5'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-3 w-16' />
          </div>
        )
      )}
      {showLink && (
        <div className='flex flex-col items-center'>
          <Separator className='my-1.5' />
          <Link
            href={'/card/' + id}
            rel='card-detail'
            target='_blank'
            className='inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 dark:text-primary-400 dark:hover:bg-primary/15'
          >
            {t('View More')}
          </Link>
        </div>
      )}
    </div>
  );
};

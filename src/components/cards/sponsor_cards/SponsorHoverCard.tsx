/*
 * @Author: Ender-Wiggin
 * @Date: 2024-06-27 23:56:37
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-21 01:35:23
 * @Description:
 */
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ClientRating as Rating } from '@/components/ui/ClientRating';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface HoverCardProps {
  id: string;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
  isPeopleSponsor?: boolean;
  isRatingLoading?: boolean;
}

export const SponsorHoverCard: React.FC<HoverCardProps> = ({
  id,
  showLink,
  rating,
  ratingCount,
  isPeopleSponsor,
  isRatingLoading,
}) => {
  // const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div className='flex flex-col gap-2 text-xs'>
      {isPeopleSponsor && (
        <div className='text-sm font-bold text-lime-800 dark:text-lime-400'>
          {t("Hi, I'm a People Sponsor!")}
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

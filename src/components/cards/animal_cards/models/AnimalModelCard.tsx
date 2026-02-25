import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';
import { ClientRating as Rating } from '@/components/ui/ClientRating';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { AnimalCardModel } from '@/types/AnimalCardModel';

interface ModelCardProps {
  id: string;
  model: AnimalCardModel;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
  readonly?: boolean;
  isRatingLoading?: boolean;
}

export const AnimalModelCard: React.FC<ModelCardProps> = ({
  id,
  model,
  showLink,
  rating,
  ratingCount,
  readonly,
  isRatingLoading,
}) => {
  // const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-1 text-xs'>
      <div className='font-bold'>
        {t('Animal Value')}
        <span className='mx-1 text-muted-foreground'>·</span>
        <span
          className={cn(
            'font-bold',
            model.diff >= 0 ? 'text-lime-600' : 'text-red-600',
          )}
        >
          {model.diff}
        </span>
      </div>
      {model.diff !== model.diffWithSpecialEnclosure && (
        <div className='font-bold'>
          {t('With SE')}
          <span className='mx-1 text-muted-foreground'>·</span>
          <span
            className={cn(
              'font-bold',
              model.diffWithSpecialEnclosure >= 0
                ? 'text-lime-600'
                : 'text-red-600',
            )}
          >
            {model.diffWithSpecialEnclosure}
          </span>
        </div>
      )}
      {rating ? (
        <div className='flex items-center gap-1.5'>
          <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }}
            readonly={readonly ?? true}
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
      <Separator className='my-1.5' />

      <div className='flex flex-col gap-0.5'>
        {model.appeal > 0 && (
          <div className='flex items-center gap-1.5'>
            <div className='w-5 shrink-0'>
              <AppealIcon value='' />
            </div>
            <MoneyIcon value={model.appeal} />
          </div>
        )}
        {model.reputation > 0 && (
          <div className='flex items-center gap-1.5'>
            <div className='w-5 shrink-0'>
              <ReputationIcon value='' />
            </div>
            <MoneyIcon value={model.reputation} />
          </div>
        )}
        {model.conservationPoint > 0 && (
          <div className='flex items-center gap-1.5'>
            <div className='w-5 shrink-0'>
              <ConservationIcon value='' />
            </div>
            <MoneyIcon value={model.conservationPoint} />
          </div>
        )}

        {model.abilities &&
          model.abilities.map((abilityModel, index) => {
            if (abilityModel.value > 0) {
              const ability = abilityModel.ability;

              // FIXME: it's a temporary solution, need to be refactored
              const keyWord =
                ability.value.toString().length > 1
                  ? t(ability.keyword.name) + ':' + t(ability.value.toString())
                  : ability.value.toString().length === 1
                    ? t(ability.keyword.name) +
                      ' ' +
                      t(ability.value.toString())
                    : t(ability.keyword.name);
              return (
                <div key={index} className='flex items-center gap-1.5'>
                  <span className='text-muted-foreground'>{keyWord}</span>
                  <MoneyIcon value={abilityModel.value} />
                </div>
              );
            }
          })}
      </div>

      <Separator className='my-1.5' />
      <div className='flex items-center gap-1.5'>
        <span className='text-muted-foreground'>{t('Cost')}</span>
        <MoneyIcon value={'-' + model.cost} color='text-red-400' />
      </div>
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

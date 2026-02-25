/*
 * @Author: Ender-Wiggin
 * @Date: 2025-03-05 09:57:52
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-08-07 15:50:58
 * @Description:
 */
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { GameConfigCard } from '@/components/quiz/game/GameConfigCard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { IQuizData } from '@/types/quiz';

export const QuizInfo: React.FC<IQuizData & { idx: number; day: number }> = (
  props,
) => {
  const { t } = useTranslation('common');

  return (
    <a href={`/daily-quiz?seed=${props.seed}`} className='block'>
      <Card className='flex items-center justify-between px-4 py-3 transition-colors hover:bg-accent/50'>
        <div className='flex items-center gap-3'>
          <div>
            <div className='font-bold leading-tight'>
              {'Day ' +
                (dayjs(props.createdat || '').diff(dayjs('2024-07-02'), 'day') +
                  1)}
            </div>
            <div className='text-xs text-muted-foreground'>
              {dayjs(props.createdat).format('DD/MM/YYYY')}
            </div>
          </div>

          {props.gameconfig?.mode !== 'default' && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge>{t(props.gameconfig?.mode)}</Badge>
              </HoverCardTrigger>
              <HoverCardContent className='w-full'>
                <GameConfigCard gameConfig={props.gameconfig} />
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <div className='flex items-center gap-3'>
          {props.idx !== 0 && (
            <a
              href={`/daily-quiz?seed=${props.seed}&result=true`}
              className='inline-block'
            >
              <Badge className='bg-lime-500 hover:bg-lime-600'>
                {t('View Result')}
              </Badge>
            </a>
          )}
          <span className='text-sm font-semibold text-muted-foreground'>
            {t('quiz.total') + ': ' + props.total}
          </span>
        </div>
      </Card>
    </a>
  );
};

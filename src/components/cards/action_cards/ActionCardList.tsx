import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import TextButton from '@/components/buttons/TextButton';
import { ActionCardPopover } from '@/components/cards/action_cards/ActionCardPopover';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ACTION_CARDS,
  ActionCard,
  ActionCategory,
  BASE_ACTION_CARDS,
  getGroupedCards,
  getLocalizedActionImagePath,
} from '@/data/ActionCards';
import { cn } from '@/lib/utils';

type LevelFilter = 1 | 2 | 'all';

const CATEGORY_ORDER: ActionCategory[] = [
  'animals',
  'association',
  'build',
  'cards',
  'sponsors',
];

const ActionCardItem: React.FC<{ card: ActionCard }> = ({ card }) => {
  const { i18n } = useTranslation();
  const hasDetails = !card.isBase;
  const imagePath = getLocalizedActionImagePath(
    card.image,
    i18n.language,
    card.isBase,
  );

  const content = (
    <div
      className={cn(
        'group flex flex-col items-center transition-transform',
        hasDetails ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default',
      )}
    >
      <div
        className={cn(
          'relative h-[232px] w-[166px] overflow-hidden rounded-xl bg-gradient-to-b from-white/30 to-sage-50/10 p-1 shadow-lg ring-1 ring-border/60 transition-all sm:h-[250px] sm:w-[178px] lg:h-[264px] lg:w-[188px]',
          hasDetails && 'group-hover:ring-primary/30 group-hover:shadow-xl',
        )}
      >
        <Image
          src={imagePath}
          alt={card.name}
          fill
          className='object-contain'
          sizes='(max-width: 640px) 166px, (max-width: 1024px) 178px, 188px'
        />
      </div>
    </div>
  );

  if (!hasDetails) return content;

  return <ActionCardPopover cardId={card.id}>{content}</ActionCardPopover>;
};

const ActionCardGroup: React.FC<{
  cards: ActionCard[];
  levelFilter: LevelFilter;
}> = ({ cards, levelFilter }) => {
  const displayCards =
    levelFilter === 'all'
      ? cards
      : cards.filter((c) => c.level === levelFilter);

  if (displayCards.length === 0) return null;

  return (
    <div className='flex w-full items-start justify-center gap-3 sm:w-auto sm:justify-start'>
      {displayCards.map((card) => (
        <ActionCardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

const CategorySection: React.FC<{
  category: ActionCategory;
  label: string;
  cards: ActionCard[];
  levelFilter: LevelFilter;
}> = ({ category, label, cards, levelFilter }) => {
  const groupedCards = useMemo(() => {
    return getGroupedCards(cards);
  }, [cards]);

  const sortedGroupKeys = useMemo(() => {
    return Object.keys(groupedCards)
      .filter((key) => key.startsWith(`${category}_`))
      .sort((a, b) => {
        const varA = parseInt(a.split('_')[1]);
        const varB = parseInt(b.split('_')[1]);
        return varA - varB;
      });
  }, [groupedCards, category]);

  if (sortedGroupKeys.length === 0) return null;

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='border-b border-border/50 pb-2 text-lg font-semibold text-foreground/90'>
        {label}
      </h2>
      <div className='flex flex-wrap justify-center gap-x-4 gap-y-5 sm:justify-start'>
        {sortedGroupKeys.map((groupKey) => (
          <ActionCardGroup
            key={groupKey}
            cards={groupedCards[groupKey]}
            levelFilter={levelFilter}
          />
        ))}
      </div>
    </div>
  );
};

export const ActionCardList: React.FC = () => {
  const { t } = useTranslation('common');
  const pageTitle = t('actions.title');
  const [selectedCategory, setSelectedCategory] = useState<
    ActionCategory | 'all'
  >('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [cardSet, setCardSet] = useState<'upgrade' | 'base'>('upgrade');

  const categoryLabels: Record<ActionCategory | 'all', string> = useMemo(
    () => ({
      all: t('actions.all'),
      animals: t('actions.animals'),
      association: t('actions.association'),
      build: t('actions.build'),
      cards: t('actions.cards'),
      sponsors: t('actions.sponsors'),
    }),
    [t],
  );

  const levelLabels = useMemo(
    () => ({
      all: t('actions.level_all'),
      1: t('actions.level_1'),
      2: t('actions.level_2'),
    }),
    [t],
  );

  const filteredCards = useMemo(() => {
    let cards: ActionCard[] =
      cardSet === 'upgrade' ? ACTION_CARDS : BASE_ACTION_CARDS;
    if (selectedCategory !== 'all') {
      cards = cards.filter((card) => card.category === selectedCategory);
    }
    return cards;
  }, [cardSet, selectedCategory]);

  const categoriesToDisplay =
    selectedCategory === 'all' ? CATEGORY_ORDER : [selectedCategory];

  return (
    <Layout>
      <Seo templateTitle={pageTitle} />

      <div className='flex flex-col gap-6 px-3 py-3 md:px-5'>
        <h1 className='text-2xl font-bold text-foreground'>{pageTitle}</h1>

        <div className='rounded-2xl border border-border/40 bg-gradient-to-br from-background via-sage-50/20 to-forest-50/10 p-4 shadow-sm'>
          <div className='mb-4 flex flex-col gap-2'>
            <span className='text-xs font-semibold tracking-[0.12em] text-foreground/60'>
              {t('actions.card_set_label')}
            </span>
            <div
              className='inline-flex w-fit rounded-2xl border border-primary/20 bg-gradient-to-r from-sage-100/50 via-white to-forest-100/40 p-1 shadow-inner'
              role='radiogroup'
              aria-label={t('actions.card_set_label')}
            >
              <button
                type='button'
                onClick={() => setCardSet('upgrade')}
                role='radio'
                aria-checked={cardSet === 'upgrade'}
                className={cn(
                  'h-9 rounded-xl px-4 text-xs font-semibold transition-all md:px-5 md:text-sm',
                  cardSet === 'upgrade'
                    ? 'bg-white text-primary shadow-md ring-1 ring-primary/25'
                    : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {t('actions.upgraded_cards_toggle')}
              </button>
              <button
                type='button'
                onClick={() => setCardSet('base')}
                role='radio'
                aria-checked={cardSet === 'base'}
                className={cn(
                  'h-9 rounded-xl px-4 text-xs font-semibold transition-all md:px-5 md:text-sm',
                  cardSet === 'base'
                    ? 'bg-white text-primary shadow-md ring-1 ring-primary/25'
                    : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {t('actions.base_cards_toggle')}
              </button>
            </div>
          </div>

          <div className='mb-2 text-xs font-semibold tracking-[0.12em] text-foreground/60'>
            {t('actions.category_label')}
          </div>
          <div className='mb-3 flex flex-wrap gap-2'>
            {(['all', ...CATEGORY_ORDER] as const).map((cat) => (
              <TextButton
                key={cat}
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className='h-9 min-w-[60px] px-3 text-xs'
                selectClassName='bg-primary/20 ring-2 ring-primary/70'
              >
                {categoryLabels[cat]}
              </TextButton>
            ))}
          </div>

          <div className='mb-2 text-xs font-semibold tracking-[0.12em] text-foreground/60'>
            {t('actions.level_label')}
          </div>
          <div className='flex flex-wrap gap-2'>
            {(['all', 1, 2] as const).map((level) => (
              <TextButton
                key={level}
                selected={levelFilter === level}
                onClick={() => setLevelFilter(level)}
                className='h-9 min-w-[60px] px-3 text-xs'
                selectClassName='bg-primary/20 ring-2 ring-primary/70'
              >
                {levelLabels[level]}
              </TextButton>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          {filteredCards.length === 0 && (
            <Alert className='border-primary/20 bg-primary/5'>
              <AlertDescription>{t('actions.empty_card_set')}</AlertDescription>
            </Alert>
          )}
          {categoriesToDisplay.map((category) => (
            <CategorySection
              key={category}
              category={category}
              label={categoryLabels[category]}
              cards={filteredCards}
              levelFilter={levelFilter}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

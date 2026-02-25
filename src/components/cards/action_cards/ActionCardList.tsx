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
  getGroupedCards,
} from '@/data/ActionCards';

type LevelFilter = 1 | 2 | 'all';

const CATEGORY_ORDER: ActionCategory[] = [
  'animals',
  'association',
  'build',
  'cards',
  'sponsors',
];

const ActionCardItem: React.FC<{ card: ActionCard }> = ({ card }) => {
  return (
    <ActionCardPopover cardId={card.id}>
      <div className='flex cursor-pointer flex-col items-center transition-transform hover:scale-[1.02]'>
        <div className='relative h-[280px] w-[200px] overflow-hidden rounded-lg shadow-lg ring-1 ring-border/50 transition-all hover:ring-primary/30 hover:shadow-xl'>
          <Image
            src={card.image}
            alt={card.name}
            fill
            className='object-contain'
            sizes='(max-width: 768px) 200px, 250px'
          />
        </div>
      </div>
    </ActionCardPopover>
  );
};

const ActionCardGroup: React.FC<{
  cards: ActionCard[];
  levelFilter: LevelFilter;
  isLastInCategory?: boolean;
}> = ({ cards, levelFilter, isLastInCategory }) => {
  const displayCards =
    levelFilter === 'all'
      ? cards
      : cards.filter((c) => c.level === levelFilter);

  if (displayCards.length === 0) return null;

  return (
    <div className={`flex items-start gap-3 ${isLastInCategory ? '' : ''}`}>
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
      <h2 className='text-lg font-semibold text-foreground/90 border-b border-border/50 pb-2'>
        {label}
      </h2>
      <div className='flex flex-wrap gap-x-5 gap-y-6'>
        {sortedGroupKeys.map((groupKey, index) => (
          <ActionCardGroup
            key={groupKey}
            cards={groupedCards[groupKey]}
            levelFilter={levelFilter}
            isLastInCategory={index === sortedGroupKeys.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export const ActionCardList: React.FC = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<
    ActionCategory | 'all'
  >('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const categoryLabels: Record<ActionCategory | 'all', string> = useMemo(
    () => ({
      all: t('actions.all', '全部'),
      animals: t('actions.animals', '动物'),
      association: t('actions.association', '协会'),
      build: t('actions.build', '建造'),
      cards: t('actions.cards', '卡牌'),
      sponsors: t('actions.sponsors', '赞助'),
    }),
    [t],
  );

  const levelLabels = useMemo(
    () => ({
      all: t('actions.level_all', '全部'),
      1: t('actions.level_1', 'I级'),
      2: t('actions.level_2', 'II级'),
    }),
    [t],
  );

  const filteredCards = useMemo(() => {
    let cards = ACTION_CARDS;
    if (selectedCategory !== 'all') {
      cards = cards.filter((card) => card.category === selectedCategory);
    }
    return cards;
  }, [selectedCategory]);

  const categoriesToDisplay =
    selectedCategory === 'all' ? CATEGORY_ORDER : [selectedCategory];

  return (
    <Layout>
      <Seo templateTitle='行动卡牌' />

      <div className='flex flex-col gap-6 px-3 py-3 md:px-5'>
        <h1 className='text-2xl font-bold text-foreground'>
          {t('actions.title', '海洋扩变体行动卡')}
        </h1>

        <Alert className='bg-primary/5 border-primary/20'>
          <AlertDescription>
            {t(
              'actions.beta_notice',
              'This page is in beta testing. Features are under active development and will support multiple languages in the future.',
            )}
          </AlertDescription>
        </Alert>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-wrap gap-2'>
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

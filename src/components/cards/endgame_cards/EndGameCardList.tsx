import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { RatedEndGameCard } from '@/components/cards/endgame_cards/RatedEndGameCard';
import CardList from '@/components/cards/shared/CardList';
import { EndGameData } from '@/data/EndGames';

import { fetchCardRatings } from '@/services/card';

import { CardSource } from '@/types/CardSource';
import { EndGameCard, IEndGameCard } from '@/types/EndGameCard';
import type { IRating } from '@/types/IRating';
import { SortOrder } from '@/types/Order';

interface EndGameCardListProps {
  selectedCardSources?: CardSource[];
  textFilter?: string;
  sortOrder?: SortOrder;
  onCardCountChange: (count: number) => void;
}

const filterCards = (
  cards: EndGameCard[],
  selectedCardSources: CardSource[] = [],
  textFilter = '',
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return cards.filter(
    (card) =>
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => card.source === src)) &&
      (textFilter === '' ||
        card.id.toLowerCase().includes(lowercaseFilter) ||
        card.name.toLowerCase().includes(lowercaseFilter)),
  );
};

export const EndGameCardList: React.FC<EndGameCardListProps> = ({
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
  sortOrder = SortOrder.ID_ASC,
}) => {
  // 监听评分数据，但不主动获取（由点击触发）
  const { data: cardRatings } = useQuery(['cardRatings'], fetchCardRatings, {
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  const filteredEndGames = useMemo(
    () => filterCards(EndGameData, selectedCardSources, textFilter),
    [selectedCardSources, textFilter],
  );

  const ratedEndGameCards = useMemo(() => {
    const cards: IEndGameCard[] = cardRatings
      ? filteredEndGames.map((card) => {
          const rating = cardRatings.find((r: IRating) => r.cardid === card.id);
          return {
            id: card.id,
            endGameCard: card,
            rating: rating ? rating._avg.rating : null,
            ratingCount: rating ? rating._count : null,
          };
        })
      : filteredEndGames.map((card) => ({
          id: card.id,
          endGameCard: card,
          rating: null,
          ratingCount: null,
        }));

    switch (sortOrder) {
      case SortOrder.ID_ASC:
        cards.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case SortOrder.ID_DESC:
        cards.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case SortOrder.RATING_DESC:
        cards.sort((a, b) => {
          if ((b.rating ?? -1) !== (a.rating ?? -1)) {
            return (b.rating ?? -1) - (a.rating ?? -1);
          }
          return (b.ratingCount ?? -1) - (a.ratingCount ?? -1);
        });
        break;
    }

    return cards;
  }, [filteredEndGames, cardRatings, sortOrder]);

  useEffect(() => {
    onCardCountChange(filteredEndGames.length);
  }, [filteredEndGames.length, onCardCountChange]);

  return (
    <CardList>
      {ratedEndGameCards.map((ratedEndGameCard: IEndGameCard) => (
        <div
          key={ratedEndGameCard.id}
          className='-mb-8 -ml-6 scale-75 md:scale-100 lg:mb-2 lg:ml-8 xl:ml-0'
        >
          <RatedEndGameCard
            key={ratedEndGameCard.id}
            cardData={ratedEndGameCard}
            showLink={true}
          />
        </div>
      ))}
    </CardList>
  );
};

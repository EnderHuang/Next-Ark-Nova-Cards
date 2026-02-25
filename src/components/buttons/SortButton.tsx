import {
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp01,
  ArrowUpAZ,
  StarHalf,
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import TextButton from '@/components/buttons/TextButton';

import { SortOrder } from '@/types/Order';

interface SortButtonProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

export const SortButton: React.FC<SortButtonProps> = ({
  sortOrder,
  setSortOrder,
}) => {
  const { t } = useTranslation('common');

  const getSortOrderText = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case SortOrder.ID_ASC:
        return t('sort.ID_ASC');
      case SortOrder.ID_DESC:
        return t('sort.ID_DESC');
      case SortOrder.DIFF_ASC:
        return t('sort.DIFF_ASC');
      case SortOrder.DIFF_DESC:
        return t('sort.DIFF_DESC');
      // case SortOrder.RATING_ASC:
      //   return t('Rating');
      case SortOrder.RATING_DESC:
        return t('sort.RATING_DESC');
      default:
        return '';
    }
  };

  const getSortIcon = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case SortOrder.ID_ASC:
        return <ArrowUp01 className='h-4 w-4' />;
      case SortOrder.DIFF_ASC:
        return <ArrowUpAZ className='h-4 w-4' />;
      case SortOrder.ID_DESC:
        return <ArrowDown01 className='h-4 w-4' />;
      case SortOrder.DIFF_DESC:
        return <ArrowDownAZ className='h-4 w-4' />;
      case SortOrder.RATING_DESC:
        return <StarHalf className='h-4 w-4' />;
      default:
        return null;
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder((oldSortOrder) => {
      let newSortOrder = oldSortOrder + 1;
      if (newSortOrder > Object.keys(SortOrder).length / 2 - 1) {
        // enum will be compiled to an object with both keys and values
        newSortOrder = SortOrder.ID_ASC;
      }
      return newSortOrder;
    });
  };

  return (
    <TextButton
      selected={false}
      className='hover:text-muted-foreground'
      selectClassName='text-foreground ring-foreground/80 ring-2'
      onClick={handleSortOrderChange}
    >
      {getSortIcon(sortOrder)}
      {getSortOrderText(sortOrder)}
    </TextButton>
  );
};

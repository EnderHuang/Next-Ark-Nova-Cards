import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { getActionCardDescription } from '@/data/ActionCardDescriptions';
import {
  ActionCard,
  ALL_ACTION_CARDS,
  getLocalizedActionImagePath,
} from '@/data/ActionCards';

interface ActionCardModalProps {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
}

const getInitialLevel = (cardId: string): 1 | 2 => {
  const level = Number(cardId.split('_').at(-1));
  return level === 2 ? 2 : 1;
};

const ActionCardModal: React.FC<ActionCardModalProps> = ({
  cardId,
  isOpen,
  onClose,
}) => {
  const { t, i18n } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2>(() =>
    getInitialLevel(cardId),
  );
  const description = getActionCardDescription(cardId);

  const level1Card = ALL_ACTION_CARDS.find(
    (c) => c.id === `${cardId.replace(/_\d$/, '_1')}`,
  );
  const level2Card = ALL_ACTION_CARDS.find(
    (c) => c.id === `${cardId.replace(/_\d$/, '_2')}`,
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setSelectedLevel(getInitialLevel(cardId));
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [cardId, isOpen, handleKeyDown]);

  if (!mounted || !description || !level1Card) return null;

  const cardName = t(description.nameKey);
  const selectableLevels: Array<{
    level: 1 | 2;
    card: ActionCard;
    descriptionKeys: string[];
  }> = [
    { level: 1, card: level1Card, descriptionKeys: description.level1Keys },
  ];

  if (level2Card) {
    selectableLevels.push({
      level: 2,
      card: level2Card,
      descriptionKeys: description.level2Keys,
    });
  }

  const activeLevelData =
    selectableLevels.find((item) => item.level === selectedLevel) ??
    selectableLevels[0];
  const activeLevelLabel =
    activeLevelData.level === 1 ? t('actions.level_1') : t('actions.level_2');

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-sage-50/80 to-forest-50/80 px-6 py-4 dark:from-sage-900/30 dark:to-forest-900/30'>
              <h3 className='text-xl font-bold text-foreground'>{cardName}</h3>
              <button
                type='button'
                onClick={onClose}
                className='rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div
              className='space-y-5 overflow-y-auto p-6'
              style={{ maxHeight: 'calc(85vh - 80px)' }}
            >
              <div className='flex flex-wrap justify-center gap-3'>
                {selectableLevels.map((item) => (
                  <button
                    key={item.level}
                    type='button'
                    onClick={() => setSelectedLevel(item.level)}
                    className='rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2'
                    aria-pressed={selectedLevel === item.level}
                    aria-label={
                      item.level === 1
                        ? t('actions.level_1')
                        : t('actions.level_2')
                    }
                  >
                    <div
                      className={`relative h-[232px] w-[166px] overflow-hidden rounded-xl bg-gradient-to-b from-white/30 to-sage-50/10 p-1 shadow-lg ring-1 transition-all sm:h-[250px] sm:w-[178px] lg:h-[264px] lg:w-[188px] ${
                        selectedLevel === item.level
                          ? 'ring-primary/90 shadow-xl'
                          : 'ring-border/60 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={getLocalizedActionImagePath(
                          item.card.image,
                          i18n.language,
                          item.card.isBase,
                        )}
                        alt={item.card.name}
                        fill
                        className='object-contain'
                        sizes='(max-width: 640px) 166px, (max-width: 1024px) 178px, 188px'
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                <div className='mb-2 text-sm font-semibold text-foreground'>
                  {activeLevelLabel}
                </div>
                <ul className='space-y-1.5 text-xs leading-relaxed text-foreground/70 sm:text-sm'>
                  {activeLevelData.descriptionKeys.map((key, index) => (
                    <li
                      key={index}
                      className='relative pl-3 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary/60'
                    >
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

interface ActionCardPopoverProps {
  cardId: string;
  children: React.ReactNode;
}

export const ActionCardPopover: React.FC<ActionCardPopoverProps> = ({
  cardId,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className='cursor-pointer'>
        {children}
      </div>
      <ActionCardModal cardId={cardId} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

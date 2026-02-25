import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { getActionCardDescription } from '@/data/ActionCardDescriptions';
import { ACTION_CARDS, ActionCard } from '@/data/ActionCards';

interface ActionCardModalProps {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ActionCardLevelSection: React.FC<{
  card: ActionCard;
  descriptionKeys: string[];
  t: (key: string) => string;
}> = ({ card, descriptionKeys, t }) => (
  <div className='flex gap-4'>
    <div className='relative h-[260px] w-[185px] flex-shrink-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-border/50'>
      <Image
        src={card.image}
        alt={card.name}
        fill
        className='object-contain'
        sizes='185px'
      />
    </div>
    <div className='flex-1 space-y-1.5'>
      <ul className='space-y-1.5 text-xs leading-relaxed text-foreground/70'>
        {descriptionKeys.map((key, index) => (
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
);

const ActionCardModal: React.FC<ActionCardModalProps> = ({
  cardId,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const description = getActionCardDescription(cardId);

  const level1Card = ACTION_CARDS.find(
    (c) => c.id === `${cardId.replace(/_\d$/, '_1')}`,
  );
  const level2Card = ACTION_CARDS.find(
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
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted || !description || !level1Card) return null;

  const cardName = t(description.nameKey);

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
              className='overflow-y-auto p-6 space-y-8'
              style={{ maxHeight: 'calc(85vh - 80px)' }}
            >
              <ActionCardLevelSection
                card={level1Card}
                descriptionKeys={description.level1Keys}
                t={t}
              />

              {level2Card && (
                <ActionCardLevelSection
                  card={level2Card}
                  descriptionKeys={description.level2Keys}
                  t={t}
                />
              )}
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

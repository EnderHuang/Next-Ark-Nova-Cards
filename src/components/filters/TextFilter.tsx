import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type TTextFilterProps = {
  onTextChange: (newText: string) => void;
  reset: boolean;
};

const DEBOUNCE_MS = 250;

export const TextFilter: React.FC<TTextFilterProps> = ({
  onTextChange,
  reset,
}) => {
  const { t } = useTranslation('common');
  const [text, setText] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const debouncedTextChange = useCallback(
    (value: string) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onTextChange(value), DEBOUNCE_MS);
    },
    [onTextChange],
  );

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setText(value);
      debouncedTextChange(value);
    },
    [debouncedTextChange],
  );

  useEffect(() => {
    if (reset) {
      setText('');
    }
  }, [reset]);

  return (
    <div className='group relative flex w-full rounded-xl bg-gradient-to-b from-zinc-50/50 to-white/70 p-2 pb-6 shadow-xl shadow-zinc-500/10 ring-2 ring-zinc-200/30 dark:from-zinc-900/70 dark:to-zinc-800/60 dark:shadow-zinc-700/10 dark:ring-zinc-700/30 md:p-4 lg:w-1/2'>
      <div className='z-10 ml-2 flex-1 shrink-0 md:ml-4'>
        <input
          className='block w-full shrink-0 resize-none border-0 bg-transparent p-0 text-sm leading-6 text-zinc-800 placeholder-zinc-400 outline-none focus:outline-none focus:ring-0 dark:text-zinc-200 dark:placeholder-zinc-500'
          value={text}
          placeholder={t('Filter text') + '...'}
          onChange={(event) => handleChange(event.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
};

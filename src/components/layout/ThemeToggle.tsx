'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type='button'
        className='group h-10 w-10 rounded-full bg-gradient-to-b from-sage-50/50 to-white/90 shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur dark:from-sage-900/50 dark:to-sage-950/90 dark:ring-white/10'
        aria-label='Toggle theme'
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type='button'
      className='group relative h-10 w-10 rounded-full bg-gradient-to-b from-sage-50/50 to-white/90 shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur transition hover:ring-sage-900/10 dark:from-sage-900/50 dark:to-sage-950/90 dark:ring-white/10 dark:hover:ring-white/20'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.svg
            key='moon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.75}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='absolute inset-0 m-auto h-5 w-5 text-sage-300'
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
          </motion.svg>
        ) : (
          <motion.svg
            key='sun'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.75}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='absolute inset-0 m-auto h-5 w-5 text-sage-700'
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx='12' cy='12' r='4' />
            <path d='M12 2v2' />
            <path d='M12 20v2' />
            <path d='m4.93 4.93 1.41 1.41' />
            <path d='m17.66 17.66 1.41 1.41' />
            <path d='M2 12h2' />
            <path d='M20 12h2' />
            <path d='m6.34 17.66-1.41 1.41' />
            <path d='m19.07 4.93-1.41 1.41' />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

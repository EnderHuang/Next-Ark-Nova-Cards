import * as React from 'react';

const TextButtonVariant = ['primary', 'basic'] as const;

import { cn } from '@/lib/utils';

type TextButtonProps = {
  selected: boolean;
  selectClassName?: string;
  variant?: (typeof TextButtonVariant)[number];
} & React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      children,
      className,
      selected,
      selectClassName,
      variant = 'basic',
      disabled: buttonDisabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={cn(
          'group mt-1 flex w-auto min-w-[7rem] items-center justify-center space-x-2 rounded-full bg-gradient-to-b from-sage-50/20 to-white/80 px-4 py-2 text-sm font-medium text-foreground shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-sage-900/30 dark:to-sage-950/80 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-primary/80',
          variant === 'primary' && [
            'text-primary-500 hover:text-primary-600 active:text-primary-700',
            'disabled:text-primary-200',
          ],
          variant === 'basic' && [
            'text-foreground hover:text-muted-foreground active:text-foreground',
            'disabled:text-muted-foreground/50',
          ],
          'disabled:cursor-not-allowed disabled:brightness-105 disabled:hover:underline',
          className,
          selected && selectClassName === undefined && 'ring-2 ring-primary/70',
          selected && selectClassName !== undefined && selectClassName,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default TextButton;

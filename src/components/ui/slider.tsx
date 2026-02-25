'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    color?: string;
  }
>(({ className, color = 'amber', ...props }, ref) => {
  const colorClasses = {
    bg: 'bg-amber-800',
    border: 'border-amber-800',
  };

  switch (color) {
    case 'blue':
      colorClasses.bg = 'bg-blue-500';
      colorClasses.border = 'border-blue-500';
      break;
    case 'sage':
      colorClasses.bg = 'bg-sage-700';
      colorClasses.border = 'border-sage-700';
      break;
    default:
      break;
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-sage-500/30 dark:bg-sage-800'>
        <SliderPrimitive.Range
          className={`absolute h-full ${colorClasses.bg} dark:bg-sage-100`}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={`block h-5 w-5 rounded-full border-2 ${colorClasses.border} bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

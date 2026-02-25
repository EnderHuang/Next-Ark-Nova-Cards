import React, { useEffect, useState } from 'react';
import { SiSquareenix } from 'react-icons/si';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type StrengthFilterProps = React.ComponentProps<typeof Slider> & {
  onFilterChange: (strength: number[]) => void;
  reset: boolean;
};

export function StrengthFilter({
  className,
  onFilterChange,
  reset,
  ...props
}: StrengthFilterProps) {
  const [strength, setStrength] = useState([0]);

  const handleStrengthChange = (value: number[]) => {
    setStrength(value);
  };

  useEffect(() => {
    onFilterChange(strength);
  }, [strength]);

  useEffect(() => {
    if (reset) {
      setStrength([0]);
    }
  }, [reset]);

  return (
    <div className='group flex w-48 items-center gap-2 rounded-full bg-gradient-to-b from-sage-50/20 to-white/80 px-4 py-2 text-sm font-medium text-blue-500 shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur-md dark:from-sage-900/30 dark:to-sage-950/80 dark:text-blue-300 dark:ring-white/10'>
      <div className='flex w-10 items-center gap-1.5'>
        <SiSquareenix className='h-3 w-3 shrink-0' />
        <span>{strength[0] <= 2 ? 'All' : strength[0]}</span>
      </div>
      <Slider
        value={strength}
        min={2}
        max={6}
        step={1}
        onValueChange={handleStrengthChange}
        className={cn('w-[60%]', className)}
        color='blue'
        {...props}
      />
    </div>
  );
}

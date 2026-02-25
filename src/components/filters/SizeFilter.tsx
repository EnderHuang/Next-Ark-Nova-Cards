import React, { useEffect, useState } from 'react';
import { FiHexagon } from 'react-icons/fi';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type SizeFilterProps = React.ComponentProps<typeof Slider> & {
  onFilterChange: (size: number[]) => void;
  reset: boolean;
};

export function SizeFilter({
  className,
  onFilterChange,
  reset,
  ...props
}: SizeFilterProps) {
  const [size, setSize] = useState([0]);

  const handleSizeChange = (value: number[]) => {
    setSize(value);
  };

  useEffect(() => {
    onFilterChange(size);
  }, [onFilterChange, size]);

  useEffect(() => {
    if (reset) {
      setSize([0]);
    }
  }, [reset]);

  return (
    <div className='group flex w-48 items-center gap-2 rounded-full bg-gradient-to-b from-sage-50/20 to-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur-md dark:from-sage-900/30 dark:to-sage-950/80 dark:text-amber-300 dark:ring-white/10'>
      <div className='flex w-10 items-center gap-1.5'>
        <FiHexagon className='h-4 w-4 shrink-0' />
        <span>{size[0] === 0 ? 'All' : size[0]}</span>
      </div>
      <Slider
        value={size}
        min={0}
        max={5}
        step={1}
        onValueChange={handleSizeChange}
        className={cn('w-[60%]', className)}
        color='amber'
        {...props}
      />
    </div>
  );
}

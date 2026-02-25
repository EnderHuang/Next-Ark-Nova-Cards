import dynamic from 'next/dynamic';
import React from 'react';

const Odometer = dynamic(() => import('react-odometerjs'), {
  ssr: false,
  loading: () => <div>0</div>,
});

type CardOdometerProps = {
  className?: string;
  name: string;
  value: number;
};

export const CardOdometer: React.FC<CardOdometerProps> = ({
  className,
  name,
  value,
}) => {
  return (
    <div className='flex w-40 items-center justify-between rounded-full bg-gradient-to-b from-sage-50/20 to-white/80 px-4 py-2 text-sm font-medium shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur-md dark:from-sage-900/30 dark:to-sage-950/80 dark:ring-white/10'>
      <span className={className}>{name}</span>
      <Odometer value={value} format='d'>
        duration={500}
      </Odometer>
    </div>
  );
};

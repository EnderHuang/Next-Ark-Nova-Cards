// TagDiv.tsx
import * as React from 'react';
import TagComponent from '@/components/icons/Tag';
import { cn } from '@/lib/utils';

import { Tag } from '@/types/Tags';

type TagDivProps = {
  isLoading?: boolean;
  tag: Tag;
  selected: boolean;
} & React.ComponentPropsWithRef<'div'>;

const TagDiv = React.forwardRef<HTMLDivElement, TagDivProps>(
  ({ className, isLoading, tag, selected, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'filter-button group h-auto rounded-full bg-gradient-to-b from-sage-50/50 to-white/90 p-2 text-sm shadow-lg shadow-sage-800/5 ring-1 ring-sage-900/5 backdrop-blur transition dark:from-sage-900/50 dark:to-sage-950/90 dark:ring-white/10 dark:hover:ring-white/20',
          selected &&
            'bg-gradient-radial scale-90 from-lime-700/90 to-lime-600/70 ring-2 ring-lime-500/50 dark:from-lime-500/90 dark:to-lime-400/80 dark:ring-lime-300/60',
          !selected && 'scale-90 hover:scale-110',
        )}
        {...rest}
      >
        <TagComponent type={tag} />
      </div>
    );
  },
);

export default TagDiv;

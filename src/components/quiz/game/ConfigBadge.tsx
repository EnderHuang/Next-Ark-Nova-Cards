import { useTranslation } from 'next-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { CardSource } from '@/types/CardSource';

export type Props = {
  source: CardSource;
};
export const ConfigBadge: React.FC<Props> = ({ source }) => {
  const { t } = useTranslation('common');

  return (
    <Badge
      className={cn(
        source === CardSource.MARINE_WORLD && 'bg-blue-600 hover:bg-blue-500',
        source === CardSource.PROMO && 'bg-sage-600 hover:bg-sage-500',
        source === CardSource.ALTERNATIVE && 'bg-amber-600 hover:bg-amber-500',
      )}
    >
      {t(source)}
    </Badge>
  );
};

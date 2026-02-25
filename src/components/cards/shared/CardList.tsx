import { useWindowVirtualizer } from '@tanstack/react-virtual';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ICardListProps<T> {
  items?: T[];
  children?: React.ReactNode;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemKey?: (item: T, index: number) => string | number;
  virtualized?: boolean;
  estimateSize?: number;
  columns?: {
    base: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  overscan?: number;
  className?: string;
}

type TColumnsConfig = {
  base: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

const DEFAULT_COLUMNS: TColumnsConfig = {
  base: 2,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

function getColumns(
  columns: TColumnsConfig,
  isXl: boolean,
  isLg: boolean,
  isMd: boolean,
  isSm: boolean,
): number {
  if (isXl) return columns.xl;
  if (isLg) return columns.lg;
  if (isMd) return columns.md;
  if (isSm) return columns.sm;
  return columns.base;
}

function mergeColumns(
  columns?: ICardListProps<unknown>['columns'],
): TColumnsConfig {
  if (!columns) return DEFAULT_COLUMNS;
  return {
    base: columns.base,
    sm: columns.sm ?? columns.base,
    md: columns.md ?? columns.base,
    lg: columns.lg ?? columns.md ?? columns.base,
    xl: columns.xl ?? columns.lg ?? columns.md ?? columns.base,
  };
}

function VirtualizedGrid<T>({
  items,
  renderItem,
  itemKey,
  estimateSize = 380,
  columns,
  gap = 16,
  overscan = 10,
  className = '',
}: Omit<ICardListProps<T>, 'children' | 'virtualized'> & {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemKey: (item: T, index: number) => string | number;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const mergedColumns = useMemo(() => mergeColumns(columns), [columns]);

  const isXl = useMediaQuery('(min-width: 1280px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isSm = useMediaQuery('(min-width: 640px)');

  const columnCount = getColumns(mergedColumns, isXl, isLg, isMd, isSm);
  const rowCount = Math.ceil(items.length / columnCount);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => estimateSize,
    overscan,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const renderRow = useCallback(
    (startIndex: number) => {
      const rowItems = items.slice(startIndex, startIndex + columnCount);
      return rowItems.map((item, idx) => {
        const globalIndex = startIndex + idx;
        return (
          <div key={itemKey(item, globalIndex)} className='flex justify-center'>
            {renderItem(item, globalIndex)}
          </div>
        );
      });
    },
    [items, columnCount, itemKey, renderItem],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div ref={listRef} className={`w-full ${className}`}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
              }}
            >
              <div
                className='grid justify-items-center px-1 lg:px-2'
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                  gap: `${gap}px`,
                }}
              >
                {renderRow(startIndex)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaticGrid({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`-pt-1 grid w-full grid-cols-2 justify-items-center gap-2 px-1 lg:grid-cols-3 lg:px-2 xl:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}

function CardList<T>({
  items,
  children,
  renderItem,
  itemKey,
  virtualized = false,
  estimateSize = 380,
  columns = DEFAULT_COLUMNS,
  gap = 16,
  overscan = 10,
  className = '',
}: ICardListProps<T>) {
  if (virtualized && items && renderItem && itemKey) {
    return (
      <VirtualizedGrid
        items={items}
        renderItem={renderItem}
        itemKey={itemKey}
        estimateSize={estimateSize}
        columns={columns}
        gap={gap}
        overscan={overscan}
        className={className}
      />
    );
  }

  return <StaticGrid className={className}>{children}</StaticGrid>;
}

export default CardList;

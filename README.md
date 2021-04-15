# UsePagination

A simple hook for paginating data

## Example

```tsx
import React, {FC} from 'react';
import clsx from 'clsx';
import {usePagination} from '@you-got-bud/use-pagination';

interface AppProps {
  data: string[];
}

const App: FC<AppProps> = ({data}) => {
  const {
    data: paginatedData,
    currentPage,
    maxPage,
    hasMore,
    hasLess,
    first,
    last,
    next,
    prev,
    jump,
  } = usePagination({
    data,
    perPage: 30,
    scrollToTop: true,
  });
  return (
    <div>
      {paginatedData.map(text => (
        <span>{text}</span>
      ))}
      <div>
        <button disabled={!hasLess} onClick={first}>
          Jump to first page
        </button>
        <button disabled={!hasLess} onClick={prev}>
          Jump back a page
        </button>
        {[...Array(maxPage).keys()].map(page => (
          <button
            className={clsx(page === currentPage && 'highlight')}
            onClick={() => {
              jump(page);
            }}
          >
            {page}
          </button>
        ))}
        <button disabled={!hasMore} onClick={next}>
          Jump forward a page
        </button>
        <button disabled={!hasMore} onClick={last}>
          Jump to last page
        </button>
      </div>
    </div>
  );
};
```

## API

```typescript
export interface UsePaginationReturn<T> {
  currentPage: number;
  maxPage: number;
  hasMore: boolean;
  hasLess: boolean;
  data: T[];
  first: () => void;
  last: () => void;
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
}

export interface UsePaginationProps<T> {
  /**
   * The data to paginate
   */
  data: T[];
  /**
   * The number of items per page
   * @default 30
   */
  perPage?: number;
  /**
   * Weather or not to scroll to the top on page change
   * @default true
   */
  scrollToTop?: boolean;
  /**
   * The page to start on
   * @default 1
   */
  initialPage?: number;
}
```

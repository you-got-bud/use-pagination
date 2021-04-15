import {useState} from 'react';

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

export type UsePagnination = <T>(
  props: UsePaginationProps<T>
) => UsePaginationReturn<T>;

export const usePagination: UsePagnination = ({
  data,
  perPage = 30,
  scrollToTop = true,
  initialPage = 1,
}) => {
  const maxPage = Math.ceil((data?.length ?? 0) / perPage);
  const [page, setPage] = useState(Math.min(maxPage, Math.max(1, initialPage)));
  const begin = (page - 1) * perPage;
  const end = begin + perPage;
  const resetScroll = () => {
    if (scrollToTop) {
      scrollTo(0, 0);
    }
  };
  return {
    hasLess: page !== 1,
    currentPage: page,
    maxPage,
    hasMore: page !== maxPage,
    data: data?.slice(begin, end),
    first: () => {
      setPage(1);
      resetScroll();
    },
    last: () => {
      setPage(maxPage);
      resetScroll();
    },
    next: () => {
      setPage(currentPage => Math.min(currentPage + 1, maxPage));
      resetScroll();
    },
    prev: () => {
      setPage(currentPage => Math.max(currentPage - 1, 1));
      resetScroll();
    },
    jump: (page: number) => {
      const pageNumber = Math.max(1, page);
      setPage(Math.min(pageNumber, maxPage));
      resetScroll();
    },
  };
};

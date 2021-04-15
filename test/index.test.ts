import {act, cleanup, renderHook} from '@testing-library/react-hooks/native';
import {usePagination, UsePaginationProps} from '../src/index';

const props: UsePaginationProps<number> = {
  data: [...Array(100).keys()],
  perPage: 50,
  scrollToTop: false,
};

afterEach(cleanup);
describe('usePagination', () => {
  it('jumps to next page', () => {
    const {result} = renderHook(() => usePagination(props));
    act(() => {
      result.current.next();
    });
    expect(result.current.data[0]).toBe(50);
  });
  it('jumps to the last page', () => {
    const {result} = renderHook(() => usePagination(props));
    act(() => {
      result.current.last();
    });
    expect(result.current.data[0]).toBe(50);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.hasLess).toBe(true);
  });
  it('jumps to the first page', () => {
    const {result} = renderHook(() => usePagination(props));
    act(() => {
      result.current.first();
    });
    expect(result.current.data[0]).toBe(0);
    expect(result.current.hasLess).toBe(false);
    expect(result.current.hasMore).toBe(true);
  });
  it('Sets the inital page', () => {
    const {result} = renderHook(() =>
      usePagination({...props, initialPage: 2})
    );
    expect(result.current.data[0]).toBe(50);
  });
  it('Handles out of bounds pages', () => {
    const {result} = renderHook(() =>
      usePagination({...props, initialPage: -1})
    );
    expect(result.current.data[0]).toBe(0);
    act(() => {
      result.current.jump(100);
    });
    expect(result.current.data[0]).toBe(50);
  });
});

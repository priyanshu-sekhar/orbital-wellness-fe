import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import useSort, {SortCriteria} from '@/hooks/useSort';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useSort', () => {
  it('initializes with the provided sort criteria', () => {
    const initialSortCriteria: SortCriteria[] = [{ field: 'timestamp', order: 'asc' }];
    (useRouter as jest.Mock).mockReturnValue({
      query: { sort: 'asc', field: 'timestamp' },
    });
    const { result } = renderHook(() => useSort(initialSortCriteria));

    expect(result.current.sortCriteria).toEqual(initialSortCriteria);
  });

  it('updates sort criteria when router query changes', () => {
    const initialSortCriteria: SortCriteria[] = [{ field: 'timestamp', order: 'asc' }];
    (useRouter as jest.Mock).mockReturnValue({
      query: { sort: 'desc', field: 'timestamp' },
    });

    const { result } = renderHook(() => useSort(initialSortCriteria));

    expect(result.current.sortCriteria).toEqual([{ field: 'timestamp', order: 'desc' }]);
  });

  it('updates sort criteria and router query when handleSort is called', async () => {
    const initialSortCriteria: SortCriteria[] = [{ field: 'timestamp', order: 'asc' }];
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        field: 'timestamp,report_name',
        sort: 'desc,none'
      },
      push,
    });

    const { result } = renderHook(() => useSort(initialSortCriteria));

    act(() => {
      result.current.handleSort('timestamp');
    });

    expect(result.current.sortCriteria).toEqual([
        { field: 'timestamp', order: 'desc' },
        { field: 'report_name', order: 'none' }
    ]);
  });
});
// `useSort` is a custom hook that manages the sorting criteria for a table of usage data.
// It takes an array of initial sort criteria as a parameter, where each criterion includes a field and an order ('asc', 'desc', or 'none').
// The hook uses the Next.js router to read and update the sort criteria in the URL query parameters.
// The current sort criteria are stored in a state variable and updated whenever the router query changes.
// The hook returns the current sort criteria and a function to handle sorting.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UsageData } from '@/interface/usage.interface';

type SortOrder = 'asc' | 'desc' | 'none';

export interface SortCriteria {
    field: keyof UsageData;
    order: SortOrder;
}

const useSort = (initialSortCriteria: SortCriteria[]) => {
    const router = useRouter();
    const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>(initialSortCriteria);

    // Update the sort criteria state when the router query changes.
    useEffect(() => {
        if (!router.query.sort || !router.query.field) {
            return;
        }
        const sort = router.query.sort as string;
        const field = router.query.field as string;
        if (sort && field) {
            const newSortCriteria: SortCriteria[] = field.split(',').map((field, index) => ({
                field: field as keyof UsageData,
                order: sort.split(',')[index] as SortOrder,
            }));
            setSortCriteria(newSortCriteria);
        }
    }, [router.query]);

    // `handleSort` is a function that updates the sort criteria state and the router query.
    // It takes a field as a parameter and toggles the sort order for that field in the sort criteria.
    const handleSort = async (field: keyof UsageData) => {
        const newSortCriteria = sortCriteria.map(criteria => {
            if (criteria.field === field) {
                const newOrder = criteria.order === 'asc' ? 'desc' : criteria.order === 'desc' ? 'none' : 'asc';
                return { field, order: newOrder };
            }
            return criteria;
        });

        const searchParams = new URLSearchParams();
        searchParams.set('sort', newSortCriteria.map(criteria => criteria.order).join(','));
        searchParams.set('field', newSortCriteria.map(criteria => criteria.field).join(','));
        await router.push({ search: searchParams.toString() });
    };

    return { sortCriteria, handleSort };
};

export default useSort;
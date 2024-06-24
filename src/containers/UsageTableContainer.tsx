import React, {useEffect, useState} from 'react';
import { UsageData } from '@/interface/usage.interface';
import {useRouter} from "next/router";
import Table from '@/components/Table';

type SortOrder = 'asc' | 'desc' | 'none';

interface SortCriteria {
    field: keyof UsageData;
    order: SortOrder;
}

const UsageTableContainer: React.FC<{ rows: UsageData[] }> = ({ rows }) => {
    const router = useRouter();

    const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([
        { field: 'report_name', order: 'none' },
        { field: 'credits_used', order: 'none' },
    ]);

    useEffect(() => {
        const sort = router.query.sort as string;
        const field = router.query.field as string;
        if (sort && field) {
            const sortCriteria: SortCriteria[] = field.split(',').map((field, index) => ({
                field: field as keyof UsageData,
                order: sort.split(',')[index] as SortOrder,
            }));
            setSortCriteria(sortCriteria);
        }
    }, [router.query]);

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

    return (
        <Table
            rows={rows}
            headers={[
                { field: 'message_id', displayName: 'Message ID' },
                { field: 'timestamp', displayName: 'Timestamp' },
                { field: 'report_name', displayName: 'Report Name' },
                { field: 'credits_used', displayName: 'Credits Used' },
            ]}
            sortCriteria={sortCriteria}
            onSort={(field) => handleSort(field as keyof UsageData)}
        />
    );
};

export default UsageTableContainer;
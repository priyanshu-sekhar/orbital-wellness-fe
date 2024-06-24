import React, {useCallback, useEffect, useState} from 'react';
import { UsageData } from '@/interface/usage.interface';
import {format, parseISO} from "date-fns";
import {useRouter} from "next/router";

type SortOrder = 'asc' | 'desc' | 'none';

interface SortableTableProps {
    rows: UsageData[];
}

interface SortCriteria {
    field: keyof UsageData;
    order: SortOrder;
}

const SortableUsageTable: React.FC<SortableTableProps> = ({ rows }) => {
    const router = useRouter();

    useEffect(() => {
        // url would look like https://localhost:3000?sort=asc,desc&field=report_name,credits_used
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

    const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([
        { field: 'report_name', order: 'none' },
        { field: 'credits_used', order: 'none' },
    ]);
    const [sortedRows, setSortedRows] = useState<UsageData[]>([]);

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

    useEffect(() => {
        const sorted = [...rows].sort((a, b) => {
            for (const criteria of sortCriteria) {
                if (criteria.order !== 'none') {
                    if (a[criteria.field] < b[criteria.field]) {
                        return criteria.order === 'asc' ? -1 : 1;
                    } else if (a[criteria.field] > b[criteria.field]) {
                        return criteria.order === 'asc' ? 1 : -1;
                    }
                }
            }
            return 0;
        });

        setSortedRows(sorted);
    }, [sortCriteria, rows]);

    const formatTimestamp = (timestamp: string): string => {
        return format(parseISO(timestamp), 'yyyy-MM-dd HH:mm');
    };

    const renderSortableHeader = useCallback((field: keyof UsageData, displayName: string) => {
        const order = sortCriteria.find(criteria => criteria.field === field)?.order;
        let icon;
        switch (order) {
            case 'asc':
                icon = '🔼';
                break;
            case 'desc':
                icon = '🔽';
                break;
            default:
                icon = '⏺️';
        }
        return (
            <th className="px-4 py-2 cursor-pointer" data-tip={`Sort by ${displayName}`} onClick={() => handleSort(field)}>
                {displayName} <span className="ml-2">{icon}</span>
            </th>
        );
    }, [sortCriteria]);

    return (
        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Message ID</th>
                        <th className="px-4 py-2">Timestamp</th>
                        {renderSortableHeader('report_name', 'Report Name')}
                        {renderSortableHeader('credits_used', 'Credits Used')}
                    </tr>
                </thead>
                <tbody>
                {sortedRows.map((row, index) => {
                    const roundedCredits = Math.round(row.credits_used * 100) / 100;
                    const formattedTimestamp = formatTimestamp(row.timestamp);

                    return (
                        <tr key={index}>
                            <td className="border px-4 py-2">{row.message_id}</td>
                            <td className="border px-4 py-2">{formattedTimestamp}</td>
                            <td className="border px-4 py-2">{row.report_name}</td>
                            <td className="border px-4 py-2">{roundedCredits}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SortableUsageTable;
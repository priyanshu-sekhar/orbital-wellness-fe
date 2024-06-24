// `UsageTableContainer` is a container component that displays a table of usage data.
// It uses the `useSort` hook to handle sorting of the table data.
// The table displays several fields of the usage data, and each field can be sorted in ascending, descending, or no order.
// The initial sort criteria is set for 'report_name' and 'credits_used' fields to 'none'.
// The `handleSort` function from `useSort` is used as the callback when a sort action is performed on the table.
import React, {useEffect, useState} from 'react';
import { UsageData } from '@/interface/usage.interface';
import Table from '@/components/Table';
import useSort from "@/hooks/useSort";

type SortOrder = 'asc' | 'desc' | 'none';

interface SortCriteria {
    field: keyof UsageData;
    order: SortOrder;
}

const UsageTableContainer: React.FC<{ rows: UsageData[] }> = ({ rows }) => {
    const [sortedRows, setSortedRows] = useState<UsageData[]>(rows);
    const initialSortCriteria: SortCriteria[] = [
        { field: 'report_name', order: 'none' },
        { field: 'credits_used', order: 'none' },
    ];
    const { sortCriteria, handleSort } = useSort(initialSortCriteria);

    useEffect(() => {
        const sortedRows = [...rows].sort((a, b) => {
            for (const { field, order } of sortCriteria) {
                if (order === 'asc') {
                    if (a[field] < b[field]) return -1;
                    if (a[field] > b[field]) return 1;
                } else if (order === 'desc') {
                    if (a[field] > b[field]) return -1;
                    if (a[field] < b[field]) return 1;
                }
            }
            return 0;
        });
        setSortedRows(sortedRows);
    }, [rows, sortCriteria]);

    return (
        <Table
            rows={sortedRows}
            headers={[
                { field: 'message_id', displayName: 'Message ID', sortable: false },
                { field: 'timestamp', displayName: 'Timestamp', sortable: false },
                { field: 'report_name', displayName: 'Report Name', sortable: true },
                { field: 'credits_used', displayName: 'Credits Used', sortable: true },
            ]}
            sortCriteria={sortCriteria}
            onSort={(field) => handleSort(field as keyof UsageData)}
        />
    );
};

export default UsageTableContainer;
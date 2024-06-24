import React, {useCallback, useEffect, useState} from 'react';

type SortOrder = 'asc' | 'desc' | 'none';

interface TableProps {
    rows: any[];
    headers: { field: string, displayName: string, sortable?: boolean }[];
    sortCriteria: { field: string, order: SortOrder }[];
    onSort: (field: string) => void;
}

const Table: React.FC<TableProps> = ({ rows, headers, sortCriteria, onSort }) => {
    const renderSortableHeader = useCallback((field: string, displayName: string, sortable: boolean) => {
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
            <th key={field} className="px-4 py-2 cursor-pointer" data-tip={`Sort by ${displayName}`} onClick={() => onSort(field)}>
                {displayName} {sortable && <span className="ml-2">{icon}</span>}
            </th>
        );
    }, [sortCriteria, onSort]);

    return (
        <div className={"overflow-auto max-h-[50vh]"}>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {headers.map(header => renderSortableHeader(
                            header.field, header.displayName, header.sortable || false
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {headers.map((header, index) => (
                                <td key={header.field} className="border px-4 py-2">
                                    {row[header.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
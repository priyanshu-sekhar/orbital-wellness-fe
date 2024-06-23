import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {UsageData} from "@/interface/usage.interface";

interface UsageTableProps {
    rows: UsageData[];
}

const columns = [
    { field: 'message_id', headerName: 'Message ID', flex: 1, sortable: false},
    { field: 'timestamp', headerName: 'Timestamp', flex: 1 },
    { field: 'report_name', headerName: 'Report Name', flex: 1 },
    { field: 'credits_used', headerName: 'Credits Used', flex: 1, sortable: false },
];

const UsageTable: React.FC<UsageTableProps> = ({ rows }) => {
    return (
        <div style={{ height: '40vh', width: '100%' }}>
            <DataGrid
                rows={rows.map((row, index) => ({ id: index, ...row }))}
                columns={columns}
                autoPageSize
                sortModel={[
                    {
                        field: 'timestamp',
                        sort: 'asc',
                    },
                    {
                        field: 'report_name',
                        sort: 'asc',
                    },
                ]}
            />
        </div>
    );
};

export default UsageTable;
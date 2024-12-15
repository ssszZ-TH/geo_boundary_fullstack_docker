import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface DataTableProps {
  columns: GridColDef[]; // ประเภทของ columns
  rows: any[]; // ประเภทของ rows (สามารถกำหนดประเภทให้ชัดเจนได้)
}
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ columns, rows }: DataTableProps) {

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

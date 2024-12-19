import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface DataTableProps {
  columns: GridColDef[]; // ประเภทของ columns
  rows: any[]; // ประเภทของ rows (สามารถกำหนดประเภทให้ชัดเจนได้)
  getRowId?: (row: any) => string | number; // เพิ่ม getRowId ที่นี่
}
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ columns, rows, getRowId }: DataTableProps) {
  return (
    <Paper sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        // checkboxSelection
        sx={{ border: 0 }}
        getRowId={getRowId}
      />
    </Paper>
  );
}

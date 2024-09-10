import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/admin";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "phone", headerName: "Phone", width: 130 },
  {
    field: "totalTasks",
    headerName: "Total tasks",
    width: 130,
    valueGetter: (value, row) => row?.orders?.length,
  },
  { field: "balance", headerName: "Balance", width: 130 },
  { field: "password", headerName: "Password", width: 130 },
  {
    field: "withdrawalPassword",
    headerName: "Withdrawal Password",
    width: 180,
  },
  {
    field: "connectionCode",
    headerName: "Connection Code",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => row.invitationCode,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Users() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  const { users } = useSelector((state) => state.admin);

  const rows = users.map((element, index) => ({
    id: index + 1,
    ...element,
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

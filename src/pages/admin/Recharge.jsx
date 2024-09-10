import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ApproveRecharge from "./Dialogs/ApproveRecharge";
import RejectRecharge from "./Dialogs/RejectRecharge";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Recharge() {
  const [requestId, setRequestId] = React.useState("");

  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);

  const handleToggleApprove = () => {
    setOpenApprove((prev) => !prev);
  };
  const handleToggleReject = () => {
    setOpenReject((prev) => !prev);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
    },
    {
      field: "approve",
      headerName: "Approve",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setRequestId(params.row._id);
            handleToggleApprove();
          }}
          fullWidth
        >
          Approve
        </Button>
      ),
    },
    {
      field: "reject",
      headerName: "Reject",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setRequestId(params.row._id);
            handleToggleReject();
          }}
          fullWidth
        >
          Reject
        </Button>
      ),
    },
  ];

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
      {openApprove && (
        <ApproveRecharge
          open={openApprove}
          handleClose={handleToggleApprove}
          requestId={requestId}
        />
      )}
      {openReject && (
        <RejectRecharge
          open={openReject}
          handleClose={handleToggleReject}
          requestId={requestId}
        />
      )}
    </Paper>
  );
}

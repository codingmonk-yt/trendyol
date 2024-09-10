import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack } from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import TaskForm from "./TaskForm";
import ApproveTaskCompletion from "./Dialogs/ApproveTaskCompletion";

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

export default function Tasks() {
  const [taskId, setTaskId] = React.useState("");
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const handleToggleForm = () => {
    setOpenForm((p) => !p);
  };

  const handleToggleApprove = () => {
    setOpenApprove((p) => !p);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "assignedTo", headerName: "Assigned To", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "purchaseTime",
      headerName: "Purchase Time",
      type: "number",
      width: 150,
    },
    {
      field: "purchaseNumber",
      headerName: "Purchase Number",
      type: "number",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      width: 150,
    },
    {
      field: "pricePerUnit",
      headerName: "Price per unit",
      type: "number",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: "number",
      width: 150,
    },
    {
      field: "commission",
      headerName: "Commission",
      type: "number",
      width: 150,
    },
    {
      field: "commissionReturn",
      headerName: "Commission Return",
      type: "number",
      width: 180,
    },
    {
      field: "approve",
      headerName: "Approve",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,

      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setTaskId(params.row._id);
            handleToggleApprove();
          }}
          fullWidth
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box></Box>
        <Button
          onClick={handleToggleForm}
          startIcon={<Plus />}
          variant="contained"
        >
          Add Task
        </Button>
      </Stack>

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

      {openForm && <TaskForm open={openForm} handleClose={handleToggleForm} />}
      {openApprove && (
        <ApproveTaskCompletion
          open={openApprove}
          handleClose={handleToggleApprove}
          taskId={taskId}
        />
      )}
    </Stack>
  );
}

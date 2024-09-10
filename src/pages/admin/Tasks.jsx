import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Chip, Stack } from "@mui/material";
import { CheckCircle, Plus } from "@phosphor-icons/react";
import TaskForm from "./TaskForm";
import ApproveTaskCompletion from "./Dialogs/ApproveTaskCompletion";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllTasks } from "../../redux/slices/admin";

const paginationModel = { page: 0, pageSize: 5 };

export default function Tasks() {
  const dispatch = useDispatch();

  const [taskId, setTaskId] = React.useState("");
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const handleToggleForm = () => {
    setOpenForm((p) => !p);
  };

  const handleToggleApprove = () => {
    setOpenApprove((p) => !p);
  };

  React.useEffect(() => {
    dispatch(FetchAllTasks());
  }, []);

  const { tasks } = useSelector((state) => state.admin);

  const rows = tasks.map((element, index) => ({
    id: index + 1,
    ...element,
  }));

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

      renderCell: (params) =>
        params.row.approvedByAdmin ? (
          <Chip
            sx={{ width: 1 }}
            label="Approved"
            icon={<CheckCircle />}
            variant="outlined"
            color="success"
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
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

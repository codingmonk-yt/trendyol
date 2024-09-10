import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ApproveRecharge from "./Dialogs/ApproveRecharge";
import RejectRecharge from "./Dialogs/RejectRecharge";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllRechargeRequests } from "../../redux/slices/admin";

const paginationModel = { page: 0, pageSize: 5 };

export default function Recharge() {
  const dispatch = useDispatch();
  const { rechargeReuests } = useSelector((state) => state.admin);
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
    {
      field: "phone",
      headerName: "Phone",
      width: 130,

      valueGetter: (value, row) => row?.user?.phone,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 180,
      valueGetter: (value, row) => `$${row?.amount}`,
    },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "approve",
      headerName: "Approve",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <Button
          disabled={
            params.row.status === "approved" || params.row.status === "rejected"
          }
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
          disabled={
            params.row.status === "approved" || params.row.status === "rejected"
          }
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

  React.useEffect(() => {
    dispatch(FetchAllRechargeRequests());
  }, []);

  const rows = rechargeReuests.map((element, index) => ({
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

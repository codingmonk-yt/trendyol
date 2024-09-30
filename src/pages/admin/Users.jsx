import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/admin";
import DeleteConfirmation from "./Dialogs/DeleteConfirmation";
import { Button } from "@mui/material";

const paginationModel = { page: 0, pageSize: 5 };

export default function Users() {
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState("");

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleToggleDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  React.useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  const { users } = useSelector((state) => state.admin);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "phone", headerName: "Telefon", width: 130 },
    {
      field: "totalTasks",
      headerName: "Toplam Görev",
      width: 130,
      valueGetter: (value, row) => row?.orders?.length,
    },
    { 
      field: "balance", 
      headerName: "Bakiye", 
      width: 130, 
      valueGetter: (value, row) => `TL ${(row.balance * 1).toFixed(2)}`, 
    },
    { field: "password", headerName: "Şifre", width: 130 },
    {
      field: "withdrawalPassword",
      headerName: "Çekim Şifresi",
      width: 180,
    },
    {
      field: "connectionCode",
      headerName: "Bağlantı Kodu",
      description: "Bu sütun bir değer alıcıya sahiptir ve sıralanamaz.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => row.invitationCode,
    },
    {
      field: "delete",
      headerName: "Kullanıcıyı Kaldır",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setUserId(params.row._id);
            handleToggleDelete();
          }}
          fullWidth
        >
          Sil 
        </Button>
      ),
    },
  ];

  const rows = users.map((element, index) => ({
    id: index + 1,
    ...element,
  }));

  return (
    <>
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
      <DeleteConfirmation open={openDelete} handleClose={handleToggleDelete} userId={userId} />
    </>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../../../redux/slices/admin";

export default function DeleteConfirmation({ open, handleClose, userId }) {
  const dispatch = useDispatch();

  const handleApprove = () => {
    //
    dispatch(DeleteUser(userId));
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Kullanıcı Silme Onayını Doğrulayın"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu kullanıcıyı silmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={handleApprove} autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

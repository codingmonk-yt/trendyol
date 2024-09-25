import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { ReviewWithdrawRequest } from "../../../redux/slices/admin";

export default function ApproveWithdrawal({ open, handleClose, requestId }) {
  const dispatch = useDispatch();

  const handleApprove = () => {
    //
    dispatch(
      ReviewWithdrawRequest({
        requestId,
        verdict: "approve",
      })
    );
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
        scroll="body"
      >
        <DialogTitle id="alert-dialog-title">
          {"Çekim Onayını Doğrulayın"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu çekim talebini onaylamak istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={handleApprove} autoFocus>
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

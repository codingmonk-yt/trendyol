import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { ReviewRechargeRequest } from "../../../redux/slices/admin";

export default function RejectRecharge({ open, handleClose, requestId }) {
  const dispatch = useDispatch();

  const handleReject = () => {
    //
    dispatch(
      ReviewRechargeRequest({
        requestId,
        verdict: "reject",
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
          {"Yeniden Yükleme Reddini Doğrulayın"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu yeniden yükleme talebini reddetmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={handleReject} autoFocus>
            Evet, Reddet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

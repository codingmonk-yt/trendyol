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
          {"Withdrawal Approval Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are your sure you want to approve this Withdrawal request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleApprove} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

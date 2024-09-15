import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function AccountDetails({ open, handleClose }) {
  const [show, setShow] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(false); // To show error for invalid password

  const { withdrawalPassword, phone, balance, password, invitationCode } =
    useSelector((state) => state.app.user);

  const handleViewDetails = () => {
    // Check if entered password matches the withdrawal password
    if (enteredPassword === withdrawalPassword) {
      setShow(true);
      setError(false); // Clear error if password matches
    } else {
      setError(true); // Show error if password doesn't match
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Account Details</DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        {!show ? (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography textAlign="center" color="error">
                  This page is encrypted
                </Typography>

                <TextField
                  type="password"
                  variant="standard"
                  label="Withdrawal password"
                  placeholder="Please enter the withdrawal password"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  error={error}
                  helperText={error ? "Password is incorrect" : ""}
                  required // Makes the input required
                />

                <Divider />

                <Button
                  onClick={handleViewDetails}
                  variant="contained"
                  fullWidth
                  disabled={!enteredPassword} // Disable button if password is not entered
                >
                  View Details
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Phone</Typography>
                  <Typography>{phone}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Password</Typography>
                  <Typography>{password}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Connection Code</Typography>
                  <Typography>{invitationCode}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Withdrawal Password</Typography>
                  <Typography>{withdrawalPassword}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Balance</Typography>
                  <Typography>${(balance * 1).toFixed(2)}</Typography>
                </Stack>
                <Divider />
                <Button
                  variant="contained"
                  onClick={() => {
                    setShow(false);
                    handleClose();
                  }}
                  fullWidth
                >
                  Close
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

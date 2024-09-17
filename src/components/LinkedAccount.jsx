import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkAccount, UpdateLinkAccountDialog } from "../redux/slices/user";

export default function LinkedAccount({ open }) {
  const dispatch = useDispatch();
  const { invitationCode } = useSelector((state) => state.app.user);

  const handleClose = () => {
    dispatch(UpdateLinkAccountDialog(false));
  }

  // Controlled input state for the connection code
  const [connectionCode, setConnectionCode] = useState("");
  const [errors, setErrors] = useState({ connectionCode: false });

  const handleLinkAccounts = () => {
    if (connectionCode.trim() === "") {
      // Set the error for connection code if it's empty
      setErrors((prev) => ({ ...prev, connectionCode: true }));
    } else {
      // Proceed with linking accounts logic
      setErrors((prev) => ({ ...prev, connectionCode: false }));
      // Add dispatch or further logic here
      console.log("Linking accounts with code:", connectionCode);
      dispatch(LinkAccount({ invitationCode: connectionCode }));
      handleClose();
    }
  };

  const handleConnectionCodeChange = (e) => {
    setConnectionCode(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrors((prev) => ({ ...prev, connectionCode: false }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>I want to Connect</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography textAlign="center" color="error">
                Account data will be reset after connecting
              </Typography>

              <Box
                sx={{
                  bgcolor: (theme) => theme.palette.primary.main,
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography textAlign="center" variant="body2">
                  Connection Code: {invitationCode}
                </Typography>
              </Box>

              <TextField
                type="text"
                variant="standard"
                label="Connection code"
                placeholder="Enter the other party's connection code"
                value={connectionCode}
                onChange={handleConnectionCodeChange}
                required
                error={errors.connectionCode}
                helperText={
                  errors.connectionCode ? "Connection code is required" : ""
                }
              />

              <Divider />

              <Button
                variant="contained"
                fullWidth
                onClick={handleLinkAccounts}
              >
                Link Accounts
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

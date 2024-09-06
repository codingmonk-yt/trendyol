import {
  Button,
  Card,
  CardContent,
  Chip,
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

export default function Withdraw({ open, handleClose }) {
  const [amount, setAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>Withdraw funds</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="overline">Current balance</Typography>
                <Typography variant="subtitle1">$0.46</Typography>

                <Divider />

                <Typography variant="overline">
                  Withdrawal application in progress
                </Typography>
                <Typography variant="subtitle1">$0</Typography>
              </Stack>
            </CardContent>
          </Card>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            placeholder="Enter withdrawal Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            required
          />

          <Button variant="outlined" fullWidth>
            Withdraw all
          </Button>

          <Divider />

          <TextField
            fullWidth
            type="text"
            label="USDT address"
            placeholder="Enter USDT address"
            required
            value={usdtAddress}
            onChange={(e) => {
              setUsdtAddress(e.target.value);
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Transaction password"
            placeholder="Enter Transaction Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant="contained" color="primary">
          Withdraw now
        </Button>
        <Button fullWidth variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

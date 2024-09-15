import {
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
import { RequestWithdraw, UpdateWithdrawDialog } from "../redux/slices/user";
import { toast } from "react-toastify";

export default function Withdraw({ open }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(UpdateWithdrawDialog(false));
  };

  const { balance, withdrawalPassword } = useSelector(
    (state) => state.app.user
  );
  const { withdrawalInProgress } = useSelector((state) => state.user);

  const [amount, setAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    amount: false,
    usdtAddress: false,
    password: false,
  });

  const handleWithdraw = (e) => {
    e.preventDefault();

    // Basic form validation
    const errors = {
      amount: amount === "",
      usdtAddress: usdtAddress === "",
      password: password === "",
    };
    setFormErrors(errors);

    // Proceed if no errors
    if (!errors.amount && !errors.usdtAddress && !errors.password) {
      if (password === withdrawalPassword) {
        dispatch(RequestWithdraw({ amount, usdtAddress, password }));
      } else {
        toast.error("Withdrawal password is not correct");
      }
      console.log("Withdraw:", { amount, usdtAddress, password });
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <form onSubmit={handleWithdraw}>
        <DialogTitle>Withdraw funds</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="overline">Current balance</Typography>
                  <Typography variant="subtitle1">${(balance * 1).toFixed(2)}</Typography>

                  <Divider />

                  <Typography variant="overline">
                    Withdrawal application in progress
                  </Typography>
                  <Typography variant="subtitle1">
                    ${withdrawalInProgress}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              placeholder="Enter withdrawal amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              error={formErrors.amount}
              helperText={formErrors.amount && "Amount is required"}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={() => setAmount(balance)}
            >
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
              onChange={(e) => setUsdtAddress(e.target.value)}
              error={formErrors.usdtAddress}
              helperText={formErrors.usdtAddress && "USDT address is required"}
            />
            <TextField
              fullWidth
              type="password"
              label="Transaction password"
              placeholder="Enter transaction password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={formErrors.password}
              helperText={formErrors.password && "Password is required"}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Withdraw now
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

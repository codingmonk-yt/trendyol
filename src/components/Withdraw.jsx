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
        handleClose();
      } else {
        toast.error("Çekim şifresi yanlış");
      }
      console.log("Çekim:", { amount, usdtAddress, password });
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md" scroll="body">
      <form onSubmit={handleWithdraw}>
        <DialogTitle>para çekme</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="overline">cari denge</Typography>
                  <Typography variant="subtitle1">TL {(balance * 1).toFixed(2)}</Typography>

                  <Divider />

                  <Typography variant="overline">
                    Çekim başvurusu devam ediyor
                  </Typography>
                  <Typography variant="subtitle1">
                    TL {withdrawalInProgress}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <TextField
              fullWidth
              type="number"
              label="Tutar"
              placeholder="Çekim tutarını girin"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              error={formErrors.amount}
              helperText={formErrors.amount && "Tutar zorunludur"}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={() => setAmount(balance)}
            >
              Hepsini Çek
            </Button>

            <Divider />

            <TextField
              fullWidth
              type="text"
              label="IBAN"
              placeholder="IBAN"
              required
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              error={formErrors.usdtAddress}
              helperText={formErrors.usdtAddress && "IBAN zorunludur"}
            />
            <TextField
              fullWidth
              type="password"
              label="İşlem şifresi"
              placeholder="İşlem şifresini girin"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={formErrors.password}
              helperText={formErrors.password && "Şifre zorunludur"}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" fullWidth variant="contained" color="primary">
          geri çekilmek
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            kapalı
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

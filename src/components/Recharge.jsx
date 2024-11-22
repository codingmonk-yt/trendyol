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
import { useDispatch, useSelector } from "react-redux";
import { RequestRecharge, UpdateRechargeDialog } from "../redux/slices/user";

const RECHARGE_OPTIONS = [
  { value: 50 },
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 400 },
  { value: 500 },
  { value: 600 },
  { value: 800 },
  { value: 1000 },
  { value: 2000 },
  { value: 5000 },
  { value: 10000 },
  { value: 20000 },
  { value: 50000 },
  { value: 100000 },
];

export default function Recharge({ open }) {
  const [val, setVal] = useState("");
  const [error, setError] = useState(false);

  const { balance } = useSelector((state) => state.app.user);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(UpdateRechargeDialog(false));
  };

  // Validate the input
  const validateAmount = (value) => {
    if (value < 10 || value > 100000 || value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setVal(value);
    validateAmount(value);
  };

  const handleChipClick = (value) => {
    setVal(value);
    validateAmount(value);
  };

  const handleClickRecharge = () => {
    dispatch(RequestRecharge(val));
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>Para yükleme Kanalı</DialogTitle> 
      <DialogContent>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="overline">Güncel Bakiye</Typography>
              <Typography sx={{ mt: 2 }} variant="subtitle1">
                TL {(balance * 1).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
          <TextField
            fullWidth
            required
            type="number"
            label="Yükleme Tutarı"
            placeholder="Yükleme Tutarını Girin"
            value={val}
            onChange={handleInputChange}
            error={error}
            helperText={error ? "Tutar 10 ile 100000 arasında olmalı" : ""}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Divider sx={{ flexGrow: 1 }} />
            <Typography>Veya</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
            {RECHARGE_OPTIONS.map(({ value }, index) => (
              <Chip
                key={index}
                label={value}
                onClick={() => handleChipClick(value)}
                variant="outlined"
                color="secondary"
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={error || val === ""}
          onClick={handleClickRecharge}
        >
          Para Yükle
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          İptal Et
        </Button>
      </DialogActions>
    </Dialog>
  );
}

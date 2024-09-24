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
      <DialogTitle>Hesap Bilgileri</DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        {!show ? (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography textAlign="center" color="error">
                  Bu sayfa şifrelenmiştir
                </Typography>

                <TextField
                  type="password"
                  variant="standard"
                  label="Para çekme şifresi"
                  placeholder="Lütfen para çekme şifresini girin"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  error={error}
                  helperText={error ? "Şifre yanlış" : ""}
                  required // Makes the input required
                />

                <Divider />

                <Button
                  onClick={handleViewDetails}
                  variant="contained"
                  fullWidth
                  disabled={!enteredPassword} // Disable button if password is not entered
                >
                  Bilgileri Görüntüle
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
                  <Typography>Telefon</Typography>
                  <Typography>{phone}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Şifre</Typography>
                  <Typography>{password}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Bağlantı Kodu</Typography>
                  <Typography>{invitationCode}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Para Çekme Şifresi</Typography>
                  <Typography>{withdrawalPassword}</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Bakiye</Typography>
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
                  Kapat
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

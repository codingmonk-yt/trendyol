import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../redux/slices/app";
import { alpha } from "@mui/material/styles";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phoneNumber: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let tempErrors = { phoneNumber: "", password: "" };

    if (!phoneNumber) {
      tempErrors.phoneNumber = "Telefon numarası gerekli";
      valid = false;
    }

    if (!password) {
      tempErrors.password = "Şifre gerekli";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(
        LoginUser({
          phone: phoneNumber,
          password: password,
        }, navigate)
      );
    }
  };

  return (
    <Box sx={{ bgcolor: (theme) => alpha(theme.palette.warning.lighter, 0.5) }}>
      <Container maxWidth="md" sx={{ py: 4, height: "100vh" }}>
        <Stack spacing={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Giriş Yap</Typography>
          </Stack>

          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <TextField
                    type="tel"
                    label="Telefon Numarası"
                    placeholder="Telefon numaranızı girin"
                    variant="standard"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    required
                  />
                  <TextField
                    type="password"
                    label="Şifre"
                    placeholder="Şifrenizi girin"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                  >
                    <Button
                      size="small"
                      onClick={() => {
                        window.location.href = "https://t.me/Shelbyy_shelbyy";
                      }}
                    >
                      Şifremi unuttum?
                    </Button>
                  </Stack>
                </Stack>

                <Button onClick={handleLogin} variant="contained" size="medium">
                  Giriş Yap
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Stack
            direction="column"
            alignItems="center"
            spacing={1}
            justifyContent="center"
          >
            <Typography variant="button">Hâlâ bir hesabınız yok mu?</Typography>
            <Link to="/register">Kayıt ol</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

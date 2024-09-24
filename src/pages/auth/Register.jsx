import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../redux/slices/app";
import { alpha } from "@mui/material/styles";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const newErrors = {};
  
    // Telefon numarası doğrulama: Tam olarak 11 haneli olmalı
    const phoneNumberPattern = /^\d{11}$/;
  
    if (!phoneNumber) {
      newErrors.phoneNumber = "Telefon numarası gerekli";
    } else if (!phoneNumberPattern.test(phoneNumber)) {
      newErrors.phoneNumber = "Telefon numarası tam olarak 11 haneli olmalıdır";
    }
  
    if (!loginPassword) newErrors.loginPassword = "Giriş şifresi gerekli";
    if (!withdrawalPassword)
      newErrors.withdrawalPassword = "Çekim şifresi gerekli";
    
    // Davet kodu doğrulama
    if (!invitationCode) newErrors.invitationCode = "Davet kodu gerekli";
  
    if (!isAcknowledged)
      newErrors.isAcknowledged = "Sözleşmeyi kabul etmelisiniz";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // navigate("/dashboard");
  
      dispatch(
        RegisterUser(
          {
            code: invitationCode,
            phone: phoneNumber,
            password: loginPassword,
            withdrawalPassword: withdrawalPassword,
          },
          navigate
        )
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
            <Typography variant="h5">Kayıt Ol</Typography>
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
                  />
                  <TextField
                    type="password"
                    label="Giriş Şifresi"
                    placeholder="Şifrenizi seçin"
                    variant="standard"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    error={!!errors.loginPassword}
                    helperText={errors.loginPassword}
                  />
                  <TextField
                    type="password"
                    label="Çekim Şifresi"
                    placeholder="Çekim şifrenizi seçin"
                    variant="standard"
                    value={withdrawalPassword}
                    onChange={(e) => setWithdrawalPassword(e.target.value)}
                    error={!!errors.withdrawalPassword}
                    helperText={errors.withdrawalPassword}
                  />
                  <TextField
                    type="text"
                    label="Davet Kodu"
                    placeholder="Davet kodunuzu girin"
                    variant="standard"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    error={!!errors.invitationCode}
                    helperText={errors.invitationCode}
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    spacing={1}
                  >
                    <Checkbox
                      checked={isAcknowledged}
                      onChange={(e) => setIsAcknowledged(e.target.checked)}
                      error={!!errors.isAcknowledged}
                    />
                    <Typography variant="caption">
                      Sözleşmeyi kabul ediyorum ve{" "}
                      <Link to="#">Hesap açma sözleşmesi</Link> Çeşitli
                      sözleşmeler{" "}
                    </Typography>
                  </Stack>
                  {errors.isAcknowledged && (
                    <Typography variant="caption" color="error">
                      {errors.isAcknowledged}
                    </Typography>
                  )}
                </Stack>

                <Button
                  onClick={handleRegister}
                  variant="contained"
                  size="medium"
                >
                  Şimdi Kayıt Ol
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
            <Typography variant="button">Zaten bir hesabınız var mı?</Typography>
            <Link to="/">Giriş Yap</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

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
import {alpha} from "@mui/material/styles"

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
      tempErrors.phoneNumber = "Phone number is required";
      valid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
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
    <Box sx={{bgcolor: (theme) => alpha(theme.palette.warning.lighter, 0.5)}}>
      <Container maxWidth="md" sx={{ py: 4, height: "100vh" }}>
        <Stack spacing={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Log In</Typography>
          </Stack>

          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <TextField
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    variant="standard"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    required
                  />
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
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
                      Forgot password?
                    </Button>
                  </Stack>
                </Stack>

                <Button onClick={handleLogin} variant="contained" size="medium">
                  Login
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
            <Typography variant="button">Don't have an account yet?</Typography>
            <Link to="/register">Go to register</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

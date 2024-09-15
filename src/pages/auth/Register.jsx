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
import {alpha} from "@mui/material/styles"

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

    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!loginPassword) newErrors.loginPassword = "Login password is required";
    if (!withdrawalPassword)
      newErrors.withdrawalPassword = "Withdrawal password is required";
    if (!isAcknowledged)
      newErrors.isAcknowledged = "You must acknowledge the agreement";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // navigate("/dashboard");

      dispatch(
        RegisterUser({
          phone: phoneNumber,
          password: loginPassword,
          withdrawalPassword: withdrawalPassword,
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
            <Typography variant="h5">Register</Typography>
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
                  />
                  <TextField
                    type="password"
                    label="Login Password"
                    placeholder="Choose your password"
                    variant="standard"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    error={!!errors.loginPassword}
                    helperText={errors.loginPassword}
                  />
                  <TextField
                    type="password"
                    label="Withdrawal Password"
                    placeholder="Choose your withdrawal password"
                    variant="standard"
                    value={withdrawalPassword}
                    onChange={(e) => setWithdrawalPassword(e.target.value)}
                    error={!!errors.withdrawalPassword}
                    helperText={errors.withdrawalPassword}
                  />
                  <TextField
                    type="text"
                    label="Invitation Code"
                    placeholder="Enter your invitation code"
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
                      I acknowledge and{" "}
                      <Link to="#">Account opening agreement</Link> Various
                      agreements{" "}
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
                  Register Now
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
            <Typography variant="button">Already have an account?</Typography>
            <Link to="/">Login</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

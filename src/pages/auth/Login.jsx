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
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
    }

  return (
    <Box>
      <Container maxWidth="xs" sx={{ py: 4, height: "100vh" }}>
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
                  />
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    variant="standard"
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                  >
                    <Button size="small">Forgot password?</Button>
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

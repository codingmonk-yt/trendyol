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
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Box>
      <Container maxWidth="xs" sx={{ py: 4, height: "100vh" }}>
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
                  />
                  <TextField
                    type="password"
                    label="Login Password"
                    placeholder="Choose your password"
                    variant="standard"
                  />
                  <TextField
                    type="password"
                    label="Withdrawal Password"
                    placeholder="Choose your withdrawal password"
                    variant="standard"
                  />
                  <TextField
                    type="password"
                    label="Invitation Code"
                    placeholder="Enter your invitation code"
                    variant="standard"
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    spacing={1}
                  >
                    <Checkbox />
                    <Typography variant="caption">
                      I acknowledge and{" "}
                      <Link to="#">Account opening agreement</Link> Various
                      agreements{" "}
                    </Typography>
                  </Stack>
                </Stack>

                <Button variant="contained" size="medium">
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

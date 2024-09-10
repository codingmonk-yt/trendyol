import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { PaperPlaneRight } from "@phosphor-icons/react";
import React from "react";

export default function Connect() {
  return (
    <Box px={2} py={4} sx={{ height: "100vh" }}>
      <Container maxWidth="md" sx={{ height: 1 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={5}
          sx={{ height: 1 }}
        >
          <Typography variant="h3" color="info" textAlign="center">
            Get Support over Telegram
          </Typography>

          <Button
            variant="contained"
            size="large"
            color="info"
            startIcon={<PaperPlaneRight />}
            onClick={() => {
              window.location.href = "https://t.me/Shelbyy_shelbyy"
            }}
            fullWidth
          >
            Chat Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

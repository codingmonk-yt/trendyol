import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Building,
  CaretRight,
  Crown,
  HandWithdraw,
  Money,
  Phone,
  Receipt,
  UserCircle,
  UserPlus,
} from "@phosphor-icons/react";
import React from "react";

export default function Profile() {
  return (
    <Box p={2} py={4}>
      <Stack spacing={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar />
            <Stack spacing={0.5}>
              <Typography variant="h6">K52MAJ</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="overline"
                  sx={{ textTransform: "capitalize" }}
                >
                  Trendyol reputation:
                </Typography>
                <Crown size={24} weight="fill" />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Phone size={16} />
            <Typography variant="overline">7515161320</Typography>
          </Stack>
        </Stack>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="button">Account balance</Typography>

                <Typography variant="h6" color="textSecondary">
                  $0.46
                </Typography>

                <Divider />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="button">Frozen balance</Typography>

                <Typography variant="h6" color="textSecondary">
                  $0.00
                </Typography>

                <Divider />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={3}
              >
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Money />}
                  fullWidth
                >
                  Recharge
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<HandWithdraw />}
                  fullWidth
                >
                  Withdraw
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={1}>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <UserPlus size={20} />
              <Typography variant="button">I want to connect</Typography>
            </Stack>
            <IconButton>
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Receipt size={20} />
              <Typography variant="button">Second purchase record</Typography>
            </Stack>
            <IconButton>
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <UserCircle size={20} />
              <Typography variant="button">Account Details</Typography>
            </Stack>
            <IconButton>
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Building size={20} />
              <Typography variant="button">Company Qualifications</Typography>
            </Stack>
            <IconButton>
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />
        </Stack>

        <Button fullWidth variant="contained">Logout</Button>
      </Stack>
    </Box>
  );
}

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
  Coins,
  HandWithdraw,
  Link,
  ShoppingCartSimple,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import Recharge from "../../components/Recharge";
import Withdraw from "../../components/Withdraw";

export default function Home() {
  const USERNAME = "Shreyansh";
  const [rechargeOpen, setRechargeOpen] = useState(false);

  const handleCloseRecharge = () => {
    setRechargeOpen(false);
  };
  const [withdarwOpen, setWithdrawOpen] = useState(false);

  const handleCloseWithdraw = () => {
    setWithdrawOpen(false);
  };

  return (
    <>
      <Stack flexGrow={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 4,
            px: 0,
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6">Hello {USERNAME}</Typography>
            <Typography variant="caption" maxWidth={240}>
              Trendyrol - Let Trendyrol open the path to your wealth
            </Typography>
          </Stack>

          <Avatar />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.grey[100],
            py: 4,
            px: 2,
          }}
        >
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing={0.5}>
                    <Typography variant="h6">My Assets</Typography>
                    <Typography>$ 308.56</Typography>
                  </Stack>

                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setRechargeOpen(true);
                      }}
                    >
                      Recharge
                    </Button>
                    <Button
                      onClick={() => {
                        setWithdrawOpen(true);
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Withdraw
                    </Button>
                  </Stack>
                </Stack>

                <Card sx={{ p: 2 }}>
                  <Stack
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    divider={<Divider style={{ width: "100%" }} />}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="subtitle1">60</Typography>
                      <Typography variant="caption">
                        Total Number of orders
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="subtitle1">0.0 $</Typography>
                      <Typography variant="caption">
                        Today's Earnings
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="subtitle1">0</Typography>
                      <Typography variant="caption">Orders Today</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Stack>
            </CardContent>
          </Card>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ mt: 4, mb: 4, flexWrap: "wrap" }}
          >
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "orange",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "min-content",
                }}
              >
                <IconButton>
                  <ShoppingCartSimple color="white" weight="bold" size={24} />
                </IconButton>
              </Box>
              <Typography variant="caption">Start taking orders</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "purple",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "min-content",
                }}
              >
                <IconButton>
                  <Coins color="white" weight="bold" size={24} />
                </IconButton>
              </Box>
              <Typography variant="caption">Quick Recharge</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "yellow",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "min-content",
                }}
              >
                <IconButton>
                  <HandWithdraw color="black" weight="bold" size={24} />
                </IconButton>
              </Box>
              <Typography variant="caption">Quick Withdraw</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "palevioletred",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "min-content",
                }}
              >
                <IconButton>
                  <Link color="white" weight="bold" size={24} />
                </IconButton>
              </Box>
              <Typography variant="caption">Linked Accounts</Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={2} sx={{ my: 4 }}>
            <Typography variant="subtitle1">Task Hall</Typography>

            <Card sx={{ bgcolor: (theme) => theme.palette.warning.lighter }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing={2}>
                    <Typography variant="subtitle2">Trendyrol</Typography>
                    <Button variant="outlined">Unlock</Button>
                  </Stack>

                  <img
                    src="https://cdn.freelogovectors.net/wp-content/uploads/2024/01/trendyol_logo-freelogovectors.net_.png"
                    style={{ width: "80px" }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Stack>

      {rechargeOpen && (
        <Recharge open={rechargeOpen} handleClose={handleCloseRecharge} />
      )}
      {withdarwOpen && (
        <Withdraw open={withdarwOpen} handleClose={handleCloseWithdraw} />
      )}
    </>
  );
}

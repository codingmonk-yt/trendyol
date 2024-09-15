import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowClockwise, Trophy } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import MatchingRules from "../../components/MatchingRules";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStats,
  UpdateRechargeDialog,
  UpdateSelectedTab,
  UpdateWithdrawDialog,
} from "../../redux/slices/user";
import generateFakeData from "../../utils/fakeData";

export default function Commission() {
  const dispatch = useDispatch();
  const [openRules, setOpenRules] = useState(false);

  const handleToggleRules = () => {
    setOpenRules((p) => !p);
  };

  const { balance } = useSelector((state) => state.app.user);

  const { totalOrders, earningsToday, ordersToday } = useSelector(
    (state) => state.user.stats
  );

  useEffect(() => {
    dispatch(GetStats());
  }, []);

  return (
    <>
      <Box p={2} pb={16}>
        <Stack spacing={3}>
          <Typography variant="h3" textAlign="center" color="warning">
            Trendyol <br /> Keeping up with <br /> the times
          </Typography>

          <Box
            sx={{
              bgcolor: (theme) => theme.palette.warning.main,
              p: 2,
              borderRadius: 1,
              color: (theme) => theme.palette.warning.contrastText,
            }}
          >
            <Marquee>
              <Typography variant="subtitle2">
                Trendyol is a private e-commerce platform based in Turkey,
                focusing on the fashion and retail sectors. Author: Demet Mutlu
                is a Turkish entrepreneur. She is the founder and CEO of
                Trendyol, an e-commerce company operating in Turkey and Europe.
                Since the funds are entrusted to the asset management company,
                user refund requests and e-commerce fund leakage can be
                prevented, and the smart cloud client and user IP are used
                according to the specified rules. Automatic order competition
                will prevent sellers from being blocked, downgraded or blocked
                due to errors during order taking. As an intermediary, we will
                continue to work hard to increase trust and efficiency between
                sellers and users when competing for orders!
              </Typography>
            </Marquee>
          </Box>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Box
                  sx={{
                    bgcolor: (theme) => theme.palette.warning.main,
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn.freelogovectors.net/wp-content/uploads/2024/01/trendyol_logo-freelogovectors.net_.png"
                    style={{ width: "80px" }}
                  />
                </Box>

                <Stack spacing={0.5}>
                  <Typography variant="h6">Trendyol</Typography>
                  <Typography variant="caption">Commission(0.5%)</Typography>
                  <Button
                    onClick={() => {
                      dispatch(UpdateSelectedTab(1));
                    }}
                    size="small"
                    color="warning"
                    variant="outlined"
                  >
                    Match orders
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="overline"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Balance
                    </Typography>
                    <IconButton color="info">
                      <ArrowClockwise size={16} />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        dispatch(UpdateRechargeDialog(true));
                      }}
                    >
                      Recharge
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        dispatch(UpdateWithdrawDialog(true));
                      }}
                    >
                      Withdraw
                    </Button>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h4" color="textPrimary">
                    ${balance}
                  </Typography>
                  <Button
                    onClick={() => {
                      handleToggleRules();
                    }}
                    color="inherit"
                    variant="outlined"
                  >
                    Matching rules
                  </Button>
                </Stack>
                <Divider />

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  // divider={<Divider style={{ width: "100%" }} />}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{earningsToday}</Typography>
                    <Typography variant="caption">
                      Commission earned today
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{ordersToday}</Typography>
                    <Typography variant="caption">
                      Orders grabbed today
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{totalOrders}</Typography>
                    <Typography variant="caption">Total orders</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                color={(theme) => theme.palette.warning.main}
                spacing={4}
              >
                <Trophy size={40} />
                <Stack spacing={1} sx={{ width: "80%" }}>
                  <Typography>Commission yesterday</Typography>
                  <Box
                    sx={{
                      bgcolor: (theme) => theme.palette.warning.main,
                      p: 1,
                      borderRadius: 1,
                      color: (theme) => theme.palette.warning.contrastText,
                    }}
                  >
                    <Marquee>
                      <Typography variant="subtitle2">
                        {generateFakeData()}
                      </Typography>
                    </Marquee>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {openRules && (
        <MatchingRules open={openRules} handleClose={handleToggleRules} />
      )}
    </>
  );
}

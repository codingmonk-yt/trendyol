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
  SignOut,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/app";
import {
  ResetWaitTime,
  UpdateLinkAccountDialog,
  UpdateRechargeDialog,
  UpdateSelectedTab,
  UpdateWithdrawDialog,
} from "../../redux/slices/user";
import { GetStats, GetWithdrawalInProgress } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import {alpha} from "@mui/material/styles";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { balance, invitationCode } = useSelector((state) => state.app.user);
  const { totalOrders, earningsToday, ordersToday } = useSelector(
    (state) => state.user.stats
  );

  useEffect(() => {
    dispatch(GetStats());
    dispatch(GetWithdrawalInProgress());
  }, []);

  return (
    <>
      <Stack flexGrow={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 4,
            px: 2,
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6">Merhaba {invitationCode}</Typography>
            <Typography variant="caption" maxWidth={240}>
              Trendyrol - Trendyrol, zenginliğinize giden yolu açar
            </Typography>
          </Stack>

          <IconButton
            onClick={() => {
              dispatch(LogoutUser(navigate));
              dispatch(ResetWaitTime());
            }}
          >
            <SignOut />
          </IconButton>
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: (theme) => alpha(theme.palette.grey[100], 0.7),
            py: 4,
            pb: 12,
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
                    <Typography variant="h6">Varlıklarım</Typography>
                    <Typography>TL {(balance * 1).toFixed(2)}</Typography>
                  </Stack>

                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        dispatch(UpdateRechargeDialog(true));
                      }}
                    >
                      Yükle
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(UpdateWithdrawDialog(true));
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Çek
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
                      <Typography variant="subtitle1">{totalOrders}</Typography>
                      <Typography variant="caption">
                        Toplam Sipariş Sayısı
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="subtitle1">
                        {(earningsToday * 1).toFixed(2)} TL
                      </Typography>
                      <Typography variant="caption">Bugünkü Kazanç</Typography>
                    </Stack>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="subtitle1">{ordersToday}</Typography>
                      <Typography variant="caption">
                        bugün siparişler
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Stack>
            </CardContent>
          </Card>

          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            gap={1}
            sx={{ mt: 4, mb: 4, flexWrap: "wrap" }}
          >
            <Stack
              alignItems="center"
              sx={{ cursor: "pointer" }}
              spacing={1}
              onClick={() => {
                dispatch(UpdateSelectedTab(1));
              }}
            >
              <Box
                sx={{
                  p: 1,
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
              <Typography
                variant="caption"
                sx={{ textAlign: "center", textWrap: "wrap" }}
              >
                emir almak
              </Typography>
            </Stack>
            <Stack
              sx={{ cursor: "pointer" }}
              alignItems="center"
              spacing={1}
              onClick={() => {
                dispatch(UpdateRechargeDialog(true));
              }}
            >
              <Box
                sx={{
                  p: 1,
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
                  <Coins color="white" weight="bold" size={20} />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                textAlign="center"
                sx={{ textWrap: "wrap" }}
              >
                Hızlı Yükleme
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(UpdateWithdrawDialog(true));
              }}
            >
              <Box
                sx={{
                  p: 1,
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
                  <HandWithdraw color="black" weight="bold" size={20} />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                textAlign="center"
                sx={{ textWrap: "wrap" }}
              >
                Hızlı Çekim
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(UpdateLinkAccountDialog(true));
              }}
            >
              <Box
                sx={{
                  p: 1,
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
                  <Link color="white" weight="bold" size={20} />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                textAlign="center"
                sx={{ textWrap: "wrap" }}
              >
                Bağlı Hesaplar
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={2} sx={{ my: 4 }}>
            <Typography variant="subtitle1">Görev Salonu</Typography>

            <Card sx={{ bgcolor: (theme) => theme.palette.warning.lighter }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing={2}>
                    <Typography variant="subtitle2">Trendyrol</Typography>
                    <Button
                      onClick={() => {
                        dispatch(UpdateSelectedTab(1));
                      }}
                      variant="outlined"
                    >
                      BUTONU AÇ
                    </Button>
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
    </>
  );
}

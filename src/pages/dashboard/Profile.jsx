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
import React, { useState } from "react";
import LinkedAccount from "../../components/LinkedAccount";
import CompanyQualifications from "../../components/CompanyQualifications";
import AccountDetails from "../../components/AccountDetails";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/app";
import {
  ResetWaitTime,
  UpdateLinkAccountDialog,
  UpdateRechargeDialog,
  UpdateSelectedTab,
  UpdateWithdrawDialog,
} from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLink, setOpenLink] = useState(false);
  const [openQualifications, setOpenQualifications] = useState(false);
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);

  const { balance, invitationCode, phone } = useSelector(
    (state) => state.app.user
  );

  const handleToggleOpenLink = () => {
    setOpenLink((p) => !p);
  };

  const handleToggleQualifications = () => {
    setOpenQualifications((p) => !p);
  };

  const handleToggleAccountDetails = () => {
    setAccountDetailsOpen((p) => !p);
  };

  return (
    <>
      <Box p={2} py={4} pb={16}>
        <Stack spacing={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar />
              <Stack spacing={0.5}>
                <Typography variant="h6">{invitationCode}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="overline"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Trendyol itibar:
                  </Typography>
                  <Crown size={24} weight="fill" />
                </Stack>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Phone size={16} />
              <Typography variant="overline">{phone}</Typography>
            </Stack>
          </Stack>

          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="button">Hesap Bakiyesi</Typography>

                  <Typography variant="h6" color="textSecondary">
                    ${(balance * 1).toFixed(2)}
                  </Typography>

                  <Divider />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="button">Donmuş Bakiye</Typography>

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
                    onClick={() => {
                      dispatch(UpdateRechargeDialog(true));
                    }}
                  >
                    Yenile
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<HandWithdraw />}
                    fullWidth
                    onClick={() => {
                      dispatch(UpdateWithdrawDialog(true));
                    }}
                  >
                    Para Çek
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
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(UpdateLinkAccountDialog(true));
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <UserPlus size={20} />
                <Typography variant="button">Bağlantı Kurmak İstiyorum</Typography>
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
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(UpdateSelectedTab(1));
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Receipt size={20} />
                <Typography variant="button">İkinci Satın Alma Kaydı</Typography>
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
              onClick={handleToggleAccountDetails}
              sx={{ cursor: "pointer" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <UserCircle size={20} />
                <Typography variant="button">Hesap Detayları</Typography>
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
              onClick={handleToggleQualifications}
              sx={{ cursor: "pointer" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Building size={20} />
                <Typography variant="button">Şirket Nitelikleri</Typography>
              </Stack>
              <IconButton>
                <CaretRight />
              </IconButton>
            </Stack>

            <Divider />
          </Stack>

          <Button
            onClick={() => {
              dispatch(LogoutUser(navigate));
              dispatch(ResetWaitTime());
            }}
            fullWidth
            variant="contained"
          >
            Çıkış Yap
          </Button>
        </Stack>
      </Box>

      <LinkedAccount open={openLink} handleClose={handleToggleOpenLink} />
      <CompanyQualifications
        open={openQualifications}
        handleClose={handleToggleQualifications}
      />
      <AccountDetails
        open={accountDetailsOpen}
        handleClose={handleToggleAccountDetails}
      />
    </>
  );
}

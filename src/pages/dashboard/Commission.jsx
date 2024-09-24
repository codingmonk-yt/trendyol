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
            Trendyol <br /> Zamanla <br /> uyum sağlama
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
                Trendyol, Türkiye merkezli özel bir e-ticaret platformudur ve moda ile perakende sektörlerine odaklanmaktadır. Yazar: Demet Mutlu, Türk girişimcidir. Trendyol'un kurucusu ve CEO'sudur ve Türkiye ve Avrupa'da faaliyet gösteren bir e-ticaret şirketidir. Fonlar, varlık yönetim şirketine emanet edildiğinden, kullanıcı iade talepleri ve e-ticaret fon sızıntıları önlenebilir ve akıllı bulut istemcisi ve kullanıcı IP'si belirtilen kurallara göre kullanılmaktadır. Otomatik sipariş yarışması, satıcıların sipariş alma sırasında yapılan hatalardan dolayı engellenmesini, düşürülmesini veya bloke edilmesini önleyecektir. Bir aracı olarak, sipariş rekabetinde satıcılar ile kullanıcılar arasında güveni ve verimliliği artırmak için çalışmaya devam edeceğiz!
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
                  <Typography variant="caption">Komisyon (0.5%)</Typography>
                  <Button
                    onClick={() => {
                      dispatch(UpdateSelectedTab(1));
                    }}
                    size="small"
                    color="warning"
                    variant="outlined"
                  >
                    maç emirleri
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
                      Bakiye
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
                      para yüklemek
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        dispatch(UpdateWithdrawDialog(true));
                      }}
                    >
                      Çekim
                    </Button>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h4" color="textPrimary">
                    ${(balance * 1).toFixed(2)}
                  </Typography>
                  <Button
                    onClick={() => {
                      handleToggleRules();
                    }}
                    color="inherit"
                    variant="outlined"
                  >
                    Eşleşme kuralları
                  </Button>
                </Stack>
                <Divider />

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{(earningsToday * 1).toFixed(2)}</Typography>
                    <Typography variant="caption">
                      Bugün kazanılan komisyon
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{ordersToday}</Typography>
                    <Typography variant="caption">
                      Bugün alınan siparişler
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1">{totalOrders}</Typography>
                    <Typography variant="caption">Toplam siparişler</Typography>
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
                  <Typography>Dünkü komisyon</Typography>
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

import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTaskStatus } from "../../redux/slices/user";

import { toast } from "react-toastify";
import { ResetCooldown, StartCooldown } from "../../redux/slices/app";

export default function OrderConfirmation({
  open,
  handleClose,
  nextId,
  isLast,
  ...el
}) {
  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.app.user);

  const handleCooldown = () => {
    const timestamp = Date.now() + el?.cooldown * 60 * 1000;
    dispatch(StartCooldown(timestamp));

    // Dispatch ResetCooldown after cooldown time passes
    setTimeout(() => {
      dispatch(ResetCooldown());
    }, el?.cooldown * 60 * 1000); // el.cooldown is assumed to be in minutes
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      scroll="body"
    >
      <Box sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography textAlign="center">Sipariş</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <img src={el?.imgUrl} style={{ maxWidth: "100px" }} />
            <Stack spacing={3}>
              <Typography variant="button">{el?.name}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">TL {el?.pricePerUnit}</Typography>
                <Typography>X {el?.quantity}</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Toplam sipariş tutarı
            </Typography>
            <Typography variant="button" color="text.secondary">
              TL {el?.totalAmount}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Komisyon
            </Typography>
            <Typography variant="button" color="text.secondary">
              TL {el?.commission}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Tahmini Komisyon Getirisi
            </Typography>
            <Typography variant="caption" fontSize={20} color="warning">
              TL {el?.commissionReturn}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Kalan süre
            </Typography>
            <Typography variant="caption" color="warning">
              0 saat: 2 dakika: 59 saniye
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
              fullWidth
            >
              İptal Et
            </Button>
            <Button
              onClick={() => {
                if (balance * 1 >= el?.totalAmount * 1) {
                  dispatch(
                    UpdateTaskStatus({
                      id: el._id,
                      nextId,
                      isLast,
                      handleCooldown,
                      handleClose,
                    })
                  );
                } else {
                  // show warning using toast
                  toast.warning(
                    `Yetersiz Mevcut Bakiye, Lütfen ${Math.ceil(
                      (el?.totalAmount * 1).toFixed(2) -
                        (balance * 1).toFixed(2)
                    ).toFixed(2)} TL Yükleyin`
                  );
                }
              }}
              variant="contained"
              fullWidth
            >
              Şimdi gönder
            </Button>
          </Stack>

          <Divider />

          <Stack direction="column" spacing={2}>
            <Typography variant="caption">
              İkinci satın alma zamanı:{" "}
              {new Date(el?.purchaseTime).toLocaleString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </Typography>
            <Typography variant="caption">
              İkinci satın alma numarası: {el?.purchaseNumber}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

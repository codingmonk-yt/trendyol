import {
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { UpdateTaskStatus } from "../../redux/slices/user";

export default function OrderConfirmation({
  open,
  handleClose,
  nextId,
  isLast,
  ...el
}) {
  const dispatch = useDispatch();

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
              Tahmini komisyon iadesi
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
              0 saat: 0 dakika: 0 saniye
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
              Gönderilmedi
            </Button>
            <Button
              onClick={() => {
                dispatch(UpdateTaskStatus({ id: el._id, nextId, isLast }));
                handleClose();
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

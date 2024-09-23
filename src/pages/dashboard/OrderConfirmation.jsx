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
    >
      <Box sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography textAlign="center">Order</Typography>

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
                <Typography variant="body2">${el?.pricePerUnit}</Typography>
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
              Total order amount
            </Typography>
            <Typography variant="button" color="text.secondary">
              ${el?.totalAmount}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Commission
            </Typography>
            <Typography variant="button" color="text.secondary">
              ${el?.commission}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Estimated commission return
            </Typography>
            <Typography variant="caption" fontSize={20} color="warning">
              ${el?.commissionReturn}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Time Remaining
            </Typography>
            <Typography variant="caption" color="warning">
              0 hour: 0 minute: 0 seconds
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
              Not sent
            </Button>
            <Button
              onClick={() => {
                dispatch(UpdateTaskStatus({ id: el._id, nextId, isLast }));
                handleClose();
              }}
              variant="contained"
              fullWidth
            >
              Send now
            </Button>
          </Stack>

          <Divider />

          <Stack direction="column" spacing={2}>
            <Typography variant="caption">
              Second Purchase time:{" "}
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
              Second Purchase number: {el?.purchaseNumber}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

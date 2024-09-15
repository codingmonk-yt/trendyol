import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const RULES = [
  {
    key: 0,
    content:
      "1. Trendyol's order grabbing system is open 24 hours a day. The platform system automatically performs functions such as receiving orders, withdrawing cash, and loading.",
  },
  {
    key: 1,
    content:
      " 2. Users need to contact customer service to recharge and obtain a wallet address before placing an order. New users need to add a shipping address before placing an order for the first time.",
  },
  {
    key: 2,
    content:
      "3. The order amount is automatically matched by the Trendyol system. The matched order amounts are among the account balances. The next replenishment round will be carried out after the order is received.",
  },
  {
    key: 3,
    content:
      "4. Users at all membership levels can complete 30 orders per day and must receive 60 orders in order to withdraw cash. There is no time limit for withdrawals, and the specific arrival time is subject to system approval.",
  },
  {
    key: 4,
    content:
      "5. If the order is not completed for a long time, the order is frozen.",
  },
  {
    key: 5,
    content:
      "6. Since the future development direction of the Trendyol platform is based in Europe, platform member businesses distribute a large number of orders. In order to become a popular member business, employees must comply with the platform disciplines and their businesses must not be damaged.",
  },
];

export default function MatchingRules({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>Matching Rules</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {RULES.map(({ key, content }) => (
            <Typography key={key} variant="body2">
              {content}
            </Typography>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

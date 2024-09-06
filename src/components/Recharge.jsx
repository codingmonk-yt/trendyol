import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const RECHARGE_OPTIONS = [
  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 200,
  },
  {
    value: 300,
  },
  {
    value: 400,
  },
  {
    value: 500,
  },
  {
    value: 600,
  },
  {
    value: 800,
  },
  {
    value: 1000,
  },
  {
    value: 2000,
  },
  {
    value: 5000,
  },
  {
    value: 10000,
  },
  {
    value: 20000,
  },
];

export default function Recharge({ open, handleClose }) {
  const [val, setVal] = useState("");

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>Recharge Wallet</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="overline">Current balance</Typography>
              <Typography sx={{mt: 2}} variant="subtitle1">$0.46</Typography>
            </CardContent>
          </Card>
          <TextField
            fullWidth
            type="number"
            min={10}
            max={20000}
            label="Recharge Amount"
            placeholder="Enter Recharge Amount"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Divider sx={{ flexGrow: 1 }} />
            <Typography>Or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
            {RECHARGE_OPTIONS.map(({ value }, index) => (
              <Chip
                label={value}
                onClick={() => {
                  setVal(value);
                }}
                variant="outlined"
                color="secondary"
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant="contained" color="primary">
          Recharge Now
        </Button>
        <Button fullWidth variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

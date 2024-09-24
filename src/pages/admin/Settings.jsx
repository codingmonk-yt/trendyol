import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAdminCode } from "../../redux/slices/app";
import { toast } from "react-toastify";

export default function Settings() {
  const dispatch = useDispatch();
  const { adminCode } = useSelector((state) => state.app.user);
  const [value, setValue] = useState(adminCode);

  return (
    <Box>
      <Stack spacing={4}>
        <form>
          <TextField
            fullWidth
            label="Davet Kodu"
            placeholder="Lütfen davet kodunu girin"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            // required
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (value) {
                dispatch(UpdateAdminCode(value));
              } else {
                toast.warning("Lütfen geçerli bir davet kodu girin");
              }
            }}
            variant="contained"
            fullWidth
          >
            Gönder
          </Button>
        </form>
      </Stack>
    </Box>
  );
}

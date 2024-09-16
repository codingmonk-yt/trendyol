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
            label="Invitation code"
            placeholder="Please enter invitation code"
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
                toast.warning("Please enter a valid Invitation code");
              }
            }}
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Stack>
    </Box>
  );
}

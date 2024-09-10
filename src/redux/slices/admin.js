import { createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------------------------------

import axios from "../../utils/axios";

const initialState = {
  users: [],
  tasks: [],
  rechargeReuests: [],
  withdrawalRequests: [],
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
    },
    fetchTaskSuccess(state, action) {
      state.tasks = action.payload;
    },
  },
});

export default slice.reducer;

const { setError, setLoading, fetchUsersSuccess, fetchTaskSuccess } =
  slice.actions;

// Get users

// get recharges requests

// get withdraw requests

// Review Recharge

// Review Withdraw




// create task

// get tasks

// approve task




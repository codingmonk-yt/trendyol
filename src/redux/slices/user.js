import { createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------------------------------

import axios from "../../utils/axios";

const initialState = {
  stats: {},
  tasks: [],
  withdrawalInProgress: 0,
  error: null,
  isLoading: false,
  tab: 2,
  rechargeOpen: false,
  withdrawOpen: false,
  linkAccountOpen: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchStatsSuccess(state, action) {
      state.stats = action.payload;
    },
    fetchTaskSuccess(state, action) {
      state.tasks = action.payload;
    },
    fetchWithdrawalInProgress(state, action) {
      state.withdrawalInProgress = action.payload;
    },
    updateTabValue(state, action) {
      console.log(action.payload);
      state.tab = action.payload;
    },
    updateRechargeOpen(state, action) {
      state.rechargeOpen = action.payload;
    },
    updateWithdrawOpen(state, action) {
      state.withdrawOpen = action.payload;
    },
    updateLinkAccountOpen(state, action) {
      state.linkAccountOpen = action.payload;
    },
    updateTask(state, action) {
      const taskId = action.payload.taskId;
      state.tasks = state.tasks.map((el) => {
        if (el._id === taskId) {
          return { ...el, status: action.payload.status };
        } else {
          return el;
        }
      });
    },
  },
});

// Reducer
export default slice.reducer;

const {
  setError,
  setLoading,
  fetchStatsSuccess,
  fetchTaskSuccess,
  updateTabValue,
  fetchWithdrawalInProgress,
  updateLinkAccountOpen,
  updateRechargeOpen,
  updateWithdrawOpen,
  updateTask,
} = slice.actions;

export function UpdateSelectedTab(value) {
  return async (dispatch, getState) => {
    // reset error
    dispatch(updateTabValue(value * 1));
  };
}

export function UpdateLinkAccountDialog(value) {
  return async (dispatch, getState) => {
    // reset error
    dispatch(updateLinkAccountOpen(value));
  };
}
export function UpdateRechargeDialog(value) {
  return async (dispatch, getState) => {
    // reset error
    dispatch(updateRechargeOpen(value));
  };
}
export function UpdateWithdrawDialog(value) {
  return async (dispatch, getState) => {
    // reset error
    dispatch(updateWithdrawOpen(value));
  };
}

// get withdrawal in progress

export function GetWithdrawalInProgress() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .get("/user/withdrawal-in-progress", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchWithdrawalInProgress(data.total));

        // window.alert("Recharge requested successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Recharge request

export function RequestRecharge(amount) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/user/recharge",
        {
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        window.alert("Recharge requested successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// withdraw request
export function RequestWithdraw(formValues) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    console.log(formValues);

    await axios
      .post(
        "/user/withdraw",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        window.alert("Withdrawal requested successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// get tasks
export function GetMyTasks() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/tasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchTaskSuccess(data.tasks));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// update task

export function UpdateTaskStatus(taskId) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .patch(
        "/user/update-task",
        {
          taskId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(updateTask({ status: data.task.status, taskId }));

        window.alert("Task Completed Successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// link account
export function LinkAccount(formValues) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/user/link",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        window.alert("Account linked successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        window.alert("Invalid connection code");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// get stats
export function GetStats() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/stats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchStatsSuccess(data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
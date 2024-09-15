import { createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------------------------------

import axios from "../../utils/axios";
import { toast } from "react-toastify";

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
    fetchRechargeRequestsSuccess(state, action) {
      state.rechargeReuests = action.payload;
    },
    fetchWithdrawalRequestsSuccess(state, action) {
      state.withdrawalRequests = action.payload;
    },
    updateRechargeRequest(state, action) {
      const requestId = action.payload.requestId;
      state.rechargeReuests = state.rechargeReuests.map((el) => {
        if (el._id === requestId) {
          return { ...el, status: action.payload.updatedRequest.status };
        } else {
          return el;
        }
      });
    },
    updateWithdrawRequest(state, action) {
      const requestId = action.payload.requestId;
      state.withdrawalRequests = state.withdrawalRequests.map((el) => {
        if (el._id === requestId) {
          return { ...el, status: action.payload.updatedRequest.status };
        } else {
          return el;
        }
      });
    },
    addTaskSuccess(state, action) {
      state.tasks.push(action.payload);
    },
    approveTask(state, action) {
      const taskId = action.payload.taskId;
      state.tasks = state.tasks.map((el) => {
        if (el._id === taskId) {
          return { ...el, approvedByAdmin: true };
        } else {
          return el;
        }
      });
    },
  },
});

export default slice.reducer;

const {
  setError,
  setLoading,
  fetchUsersSuccess,
  addTaskSuccess,
  fetchTaskSuccess,
  fetchRechargeRequestsSuccess,
  fetchWithdrawalRequestsSuccess,
  updateRechargeRequest,
  updateWithdrawRequest,
  approveTask,
} = slice.actions;

// Get users

export function FetchAllUsers() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .get("/admin/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchUsersSuccess(data.users));
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

// get recharges requests

export function FetchAllRechargeRequests() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .get("/admin/recharge", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchRechargeRequestsSuccess(data.requests));
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

// get withdraw requests

export function FetchAllWithdrawalRequests() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .get("/admin/withdraw", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        dispatch(fetchWithdrawalRequestsSuccess(data.requests));
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

// Review Recharge
export function ReviewRechargeRequest(formValues) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/admin/review-recharge",
        { ...formValues },
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

        dispatch(
          updateRechargeRequest({
            requestId: formValues.requestId,
            updatedRequest: data.request,
          })
        );
        toast.success("Recharge request reviewed successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Review Withdraw
export function ReviewWithdrawRequest(formValues) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/admin/review-withdraw",
        { ...formValues },
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

        dispatch(
          updateWithdrawRequest({
            requestId: formValues.requestId,
            updatedRequest: data.request,
          })
        );

        // dispatch(fetchWithdrawalInProgress(data.total));
        toast.success("Withdraw request reviewed successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// create task
export function CreateTask(formValues) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/admin/task",
        { ...formValues },
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

        dispatch(addTaskSuccess(data.task));

        toast.success("Task created successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error.message || "Something went wrong");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// get tasks

export function FetchAllTasks() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .get("/admin/tasks", {
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
        toast.error(error.message || "Something went wrong")
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// approve task

export function ApproveTaskCompleted(taskId) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .patch(
        "/admin/task",
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

        dispatch(approveTask(taskId));

        toast.success("Task completion approved successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error.message || "Something went wrong");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

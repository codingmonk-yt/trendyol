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
    removeUser(state, action) {
      state.users = state.users.filter((el) => el._id != action.payload);
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
  removeUser,
} = slice.actions;

// Kullanıcıları al

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

// Yeniden yükleme taleplerini al

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

// Para çekme taleplerini al

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

// Yeniden yükleme inceleme
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
        toast.success("Yeniden yükleme talebi başarıyla incelendi!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}


// Para çekme inceleme
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
        toast.success("Para çekme talebi başarıyla incelendi!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Görev oluştur
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

        toast.success("Görev başarıyla oluşturuldu!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Görevleri al

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
        toast.error(error.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Görev onayla

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

        toast.success("Görev tamamlanması başarıyla onaylandı!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Kullanıcıyı sil

export function DeleteUser(userId) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/admin/delete-user",
        {
          userId,
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

        dispatch(removeUser(userId));

        toast.success("Kullanıcı başarıyla silindi!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

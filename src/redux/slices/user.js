import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
  waitTill: null,
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
        }
        if (!action.payload.isLast && el._id === action.payload.nextId) {
          return action.payload.nextTask;
        } else {
          return el;
        }
      });

      if (action.payload.isFifthTask) {
        state.waitTill = new Date(Date.now() + 15 * 6 * 1000);
      } else {
        state.waitTill = null;
      }
    },
    updateWaitTime(state, action) {
      state.waitTill = action.payload;
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
  updateWaitTime,
} = slice.actions;

export function ResetWaitTime() {
  return async (dispatch, getState) => {
    dispatch(updateWaitTime(null));
  };
}

export function GetWaitTill() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/wait-time", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const result = response.data;
        console.log(result.timestamp);

        dispatch(updateWaitTime(result.timestamp));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error("Veri alınamadı!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function UpdateSelectedTab(value) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(updateTabValue(value * 1));
  };
}

export function UpdateLinkAccountDialog(value) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(updateLinkAccountOpen(value));
  };
}

export function UpdateRechargeDialog(value) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(updateRechargeOpen(value));
  };
}

export function UpdateWithdrawDialog(value) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(updateWithdrawOpen(value));
  };
}


// devam eden çekim işlemini al

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
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));

        toast.error("Devam eden çekim miktarını almak başarısız oldu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// Yeniden yükleme talebi

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

        toast.success("Yeniden yükleme talebi başarıyla yapıldı!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error("Yeniden yükleme talebi sırasında bir hata oluştu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// çekim talebi
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

        toast.success("Çekim talebi başarıyla yapıldı!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));

        toast.error("Çekim talebi yapma başarısız oldu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// görevleri al
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
        const { data } = response.data;
        console.log(data);

        dispatch(fetchTaskSuccess(data.tasks));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));

        toast.error("Görevleri yükleme başarısız oldu");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}


// görev güncelle

export function UpdateTaskStatus({ id, nextId, isLast, handleCooldown, handleClose }) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .patch(
        "/user/update-task",
        {
          taskId: id,
          nextId,
          isLast,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        const { data } = response.data;
        console.log(data);

        dispatch(
          updateTask({
            status: data.task.status,
            taskId: id,
            nextTask: data.nextTask,
            isLast,
            nextId,
            isFifthTask: data.isFifthTask,
          })
        );

        toast.success("Görev başarıyla tamamlandı!");

        handleCooldown();
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));

        toast.error("Görev durumunu güncelleme başarısız oldu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
        handleClose();
      });
  };
}

// hesap bağlantısı
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

        toast.success("Hesap başarıyla bağlandı!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));

        toast.error("Hesap bağlama başarısız oldu, Geçersiz davet kodu");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// istatistikleri al
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
        toast.error("İstatistik verilerini alma başarısız oldu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

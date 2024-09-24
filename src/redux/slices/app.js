import { createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------------------------------

import axios from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  role: "",
  token: "",
  isLoggedIn: false,
  user: {},
  error: null,
  isLoading: false,
  tab: 2,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchUserSuccess(state, action) {
      state.user = action.payload;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logoutSuccess(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

// Reducer
export default slice.reducer;

const { fetchUserSuccess, loginSuccess, logoutSuccess, setError, setLoading } =
  slice.actions;

//

export function RegisterUser(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .post(
        "/auth/signup",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const { data, token } = response.data;
        console.log(data, token);

        dispatch(fetchUserSuccess(data.user));
        dispatch(loginSuccess(token));

        toast.success("Hesap başarıyla oluşturuldu!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
        if (!getState().app.error) {
          if (getState().app.user?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      });
  };
}

export function LoginUser(formValues, navigate) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        console.log(response);

        const { data, token } = response.data;
        console.log(data, token);

        dispatch(fetchUserSuccess(data.user));
        dispatch(loginSuccess(token));

        toast.success("Başarıyla giriş yapıldı!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Bir şeyler ters gitti");
      })
      .finally(() => {
        dispatch(setLoading(false));
        if (!getState().app.error) {
          if (getState().app.user?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      });
  };
}

export function LogoutUser(navigate) {
  return async (dispatch, getState) => {
    try {
      navigate("/");
      toast.error("Başarıyla çıkış yapıldı!");
    } catch (error) {
      console.log(error);
    }
  };
}

// Yönetici Kodu Güncelle
export function UpdateAdminCode(code) {
  return async (dispatch, getState) => {
    // hata sıfırlama
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .patch(
        "/admin/invitation",
        {
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().app.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        const { data } = response.data;
        console.log(data);

        dispatch(fetchUserSuccess(data.user));
        toast.success("Kod başarıyla güncellendi!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Bir şeyler ters gitti");
      });
  };
}

// beni al
export function GetMe() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().app.token}`,
        },
      })
      .then(function (response) {
        // console.log(response);
        const { data } = response.data;
        console.log(data);

        console.log(data.user);

        dispatch(fetchUserSuccess(data.user));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error("Kullanıcı detaylarını almak başarısız oldu!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

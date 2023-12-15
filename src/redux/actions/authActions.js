import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import toast from "react-hot-toast";
import { setToken, setUser } from "../reducers/authReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, {
      email,
      password,
    });
    const { data } = response.data;
    const { token } = data;

    dispatch(setToken(token));
    navigate("/");
  } catch (error) {
    alert("Password Kamu Salah");
  }
};

export const getMe =
  (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.get(`${api_url}/profiles/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      dispatch(setUser(data));
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //if token is not valid
        if (error.response.status === 401) {
          dispatch(logout());
        }
        // arahin ke halaman yang diizinkan
        if (navigatePathError) navigate(navigatePathError);
        return;
      }

      alert(error?.message);
    }
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const updateProfile =
  (name, no_telp, avatar, city, country) => async (dispatch, getState) => {
    try {
      // ambil token user di redux state
      let { token } = getState().auth;

      const profileData = {
        name,
        no_telp,
        avatar,
        city,
        country,
      };

      const response = await axios.put(`${api_url}/profiles/update-profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updateProfile = response.data;

      // perbarui user profile di redux state
      dispatch(setUser(updateProfile));
      alert("Profil berhasil diperbarui 🥳");

      window.location.reload();
    } catch (error) {
      alert(error?.message);
    }
  };

export const updatePassword = (currentPassword, newPassword) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const passwordData = {
      currentPassword,
      newPassword,
    };

    await axios.put(`${api_url}/profiles/update-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Password Berhasil Diperbarui 🥳");
    // Reload halaman setelah pembaruan berhasil
    window.location.reload();
  } catch (error) {
    if (error.response.status === 400) {
      alert("password lama kamu salah");
    } else {
      alert(error?.message);
    }
  }
};

export const register =
  (name, email, phoneNumber, password, confirmPassword, navigate) => async () => {
    try {
      const response = await axios.post(`${api_url}/auth/register`, {
        username: name,
        email,
        password,
        role: "user",
        profile: {
          name: "",
          no_telp: "",
          avatar: "",
          city: "",
          country: "",
        },
      });

      if (response.status == 201) {
        const { email } = response.data.user;
        // const { message } = response.data;
        // console.log(response.data);
        // toast.success(message);
        localStorage.setItem("email", email);

        setTimeout(() => {
          navigate("/otp");
        }, 1000);
      }
    } catch (error) {
      alert(error.message);
    }
  };

export const verify = (otp, navigate) => async () => {
  try {
    const email = localStorage.getItem("email");

    await axios.post(`${api_url}/auth/verify-email`, {
      email,
      otp,
    });

    // if (response.status === 200) {
    // alert(response.data.message);
    // localStorage.setItem("token", token)

    localStorage.removeItem("email");
    navigate("/login");

    // }
  } catch (error) {
    alert(error.message);
  }
};

export const resendOtp = () => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/resend-otp`, {
      email,
    });

    // console.log(email);

    if (response.status === 200) {
      alert("done ga bang done");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const sendPassword = (email) => async () => {
  try {
    const response = await axios.post(`${api_url}/auth/reset-password`, {
      email,
    });

    console.log(email);
    if (response.status === 200) {
      alert("Berhasil Mengirimkan Verify Email 🥳");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const resetPassword = (key, password) => async () => {
  try {
    const response = await axios.post(`${api_url}/auth/set-password`, {
      id:key,
      password,
    });

    if (response.status === 200) {
      alert("Berhasil update password 🥳");
    }
  } catch (error) {
    alert(error.message);
  }
};

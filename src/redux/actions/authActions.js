import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
    toast.success("Login successful");
    setTimeout(() => {
      navigate("/");
    }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
  } catch (error) {
    toast.error();
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

      // Buat objek FormData untuk mengirim data sebagai multipart/form-data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("no_telp", no_telp);
      formData.append("avatar", avatar); // Ini diharapkan berupa file atau string base64
      formData.append("city", city);
      formData.append("country", country);

      const response = await axios.put(`${api_url}/profiles/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedProfile = response.data;

      // perbarui user profile di redux state
      dispatch(setUser(updatedProfile));
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
      toast.error("password lama kamu salah");
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
        localStorage.setItem("email", email);
      }
      setTimeout(() => {
        navigate("/otp");
      }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
    } catch (error) {
      alert(error.message);
    }
  };

export const verify = (otp, navigate) => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/verify-email`, {
      email,
      otp,
    });

    localStorage.removeItem("email");

    if (response.status === 200) {
      toast.success("Email verification successful");
    }
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
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

    if (response.status === 200) {
      toast.success("New OTP sent successfully");
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

    if (response.status === 200) {
      toast.success("Password reset link was sent to your email!");
    }
  } catch (error) {
    toast.warning("Masukkan Email");
  }
};

export const resetPassword =
  (resetToken, newPassword, confirmNewPassword, navigate) => async () => {
    try {
      const passwordNew = {
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      };

      const response = await axios.put(
        `${api_url}/auth/set-password?resetPasswordToken=${resetToken}`,
        passwordNew
      );

      if (response.status === 200) {
        toast.success("Password reset was successful!");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
    } catch (error) {
      alert(error.message);
    }
  };

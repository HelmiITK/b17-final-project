import 'sweetalert2/dist/sweetalert2.css';
import Swal from 'sweetalert2';
import axios from "axios";
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
  (navigate, navigatePathSuccess, navigatePathError) =>
    async (dispatch, getState) => {
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

      const result = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
        customClass: {
          // Tambahkan kelas CSS khusus
          confirmButton: 'custom-save-button', 
          denyButton: 'custom-deny-button',
        }
      });

      if (result.isConfirmed) {
        // Menampilkan loading saat sedang menunggu respon dari API
        const loadingAlert = Swal.fire({
          title: 'Please wait...',
          html: 'Updating profile',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await axios.put(
          `${api_url}/profiles/update-profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedProfile = response.data;

        // perbarui user profile di redux state
        dispatch(setUser(updatedProfile));

        // Tutup loading alert setelah mendapatkan respon dari API
        loadingAlert.close();

        Swal.fire({
          title: 'Saved!',
          icon: 'success',
          showConfirmButton: true,
          customClass: {
            confirmButton: 'custom-ok-button' // Tambahkan kelas CSS khusus untuk tombol "Ok"
          }
        }).then(() => {
          window.location.reload();
        });

      } else if (result.isDenied) {
        Swal.fire({
          title: 'Changes are not saved',
          icon: 'info',
          showConfirmButton: true,
          customClass: {
            confirmButton: 'custom-ok-button' // Tambahkan kelas CSS khusus untuk tombol "Ok"
          }
        }).then(() => {
          window.location.reload(); // Ini opsional
        });
      }
    } catch (error) {
      // Tutup loading alert jika terjadi kesalahan
      Swal.close();

      alert(error?.message);
    }
  };

export const updatePassword =
  (currentPassword, newPassword) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const passwordData = {
        currentPassword,
        newPassword,
      };

      // Tampilkan konfirmasi SweetAlert2 setelah berhasil mengubah password
      const result = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
        customClass: {
          // Tambahkan kelas CSS khusus
          confirmButton: 'custom-save-button',
          denyButton: 'custom-deny-button',
        }
      });

      // melakukan pengecekan dengan bantuan sweetalert2, apakah user change to save password atau tidak
      if (result.isConfirmed) {
        // Panggilan API hanya jika pengguna memilih untuk menyimpan perubahan
        await axios.put(`${api_url}/profiles/update-password`, passwordData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          title: 'Saved!',
          icon: 'success',
          timer: 2000, // jeda dulu bro 2 detik
          showConfirmButton: false,
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        }).then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Changes are not saved',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            confirmButton: 'custom-ok-button' // Tambahkan kelas CSS khusus untuk tombol "Ok"
          }
        }).then(() => {
          // window.location.reload(); // Ini opsional
        });
      }

    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password Lama Kamu Salah!!!',
          customClass: {
            confirmButton: 'custom-ok-button' // Tambahkan kelas CSS khusus untuk tombol "Ok"
          }
        });
        return;
      } else {
        alert(error?.message);
      }
    }
  };

export const register =
  (name, email, phoneNumber, password, confirmPassword, navigate) =>
    async () => {
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

export const resetPassword =
  (resetToken, newPassword, confirmNewPassword, navigate) => async () => {
    try {
      // const { token } = getState().auth;

      const passwordNew = {
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      };

      const response = await axios.put(
        `${api_url}/auth/set-password?resetPasswordToken=${resetToken}`,
        passwordNew
      );

      // alert("Password Berhasil Diganti 🥳");
      if (response.status === 200) {
        alert("Berhasil Mengirimkan Verify Email 🥳");
      }
      navigate("/");

      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

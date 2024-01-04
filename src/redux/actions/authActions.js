import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";
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
    toast.success("Login Berhasil");
    setTimeout(() => {
      navigate("/");
    }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Email atau Password Anda salah. Silahkan coba lagi.");
      } else if (error.response.status === 404) {
        toast.error("Email tidak terdaftar. Silakan cek kembali email Anda.");
      } else {
        toast.error("Login gagal. Silakan coba lagi nanti.");
      }
    } else {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
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
        title: "Konfirmasi Perubahan",
        text: "Apakah anda yakin ingin menyimpan perubahan?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Ya, Simpan",
        denyButtonText: `Batal`,
        customClass: {
          // Tambahkan kelas CSS khusus
          confirmButton: "custom-save-button",
          denyButton: "custom-deny-button",
        },
      });

      if (result.isConfirmed) {
        // Menampilkan loading saat sedang menunggu respon dari API
        const loadingAlert = Swal.fire({
          title: "Harap Tunggu...",
          html: "Data barumu sedang diproses",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
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
          title: "Saved!",
          icon: "success",
          showConfirmButton: true,
          customClass: {
            confirmButton: "custom-ok-button", // Tambahkan kelas CSS khusus untuk tombol "Ok"
          },
        }).then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Batal Menyimpan Perubahan",
          icon: "info",
          showConfirmButton: true,
          customClass: {
            confirmButton: "custom-ok-button", // Tambahkan kelas CSS khusus untuk tombol "Ok"
          },
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
        title: "Konfirmasi Perubahan Password?",
        icon: "question",
        text: "Apakah anda yakin ingin melakukan perubahan?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Ya, Simpan",
        denyButtonText: `Jangan Simpan`,
        customClass: {
          // Tambahkan kelas CSS khusus
          confirmButton: "custom-save-button",
          denyButton: "custom-deny-button",
        },
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
          title: "Saved!",
          icon: "success",
          text: "Password Mu berhasil diperbarui",
          timer: 2000, // jeda dulu bro 2 detik
          showConfirmButton: false,
          customClass: {
            confirmButton: "custom-ok-button",
          },
        }).then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Perubahan dibatalkan",
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            confirmButton: "custom-ok-button", // Tambahkan kelas CSS khusus untuk tombol "Ok"
          },
        }).then(() => {
          // window.location.reload(); // Ini opsional
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password Lama Kamu Salah!!!",
          customClass: {
            confirmButton: "custom-ok-button", // Tambahkan kelas CSS khusus untuk tombol "Ok"
          },
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
          name,
          no_telp: phoneNumber,
          avatar: "",
          city: "",
          country: "",
        },
      });

      if (response.status == 201) {
        const { email } = response.data.user;
        localStorage.setItem("email", email);
        toast.success("akun berhasil terdaftar");
      }
      setTimeout(() => {
        navigate("/otp");
      }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          // Status kode 500 menunjukkan kesalahan server
          toast.error(
            "Terjadi kesalahan pada server. Email mungkin sudah terdaftar."
          );
        } else {
          toast.error("Gagal mendaftarkan pengguna. Silakan coba lagi nanti.");
        }
      } else {
        toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      }
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
      toast.success("Verifikasi email berhasil");
    }
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        // Status kode 500 menunjukkan kesalahan server
        toast.error(
          "Terjadi kesalahan pada server. Email mungkin sudah terdaftar."
        );
      } else {
        toast.error("Gagal mendaftarkan pengguna. Silakan coba lagi nanti.");
      }
    } else {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
  }
};

export const resendOtp = () => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/resend-otp`, {
      email,
    });

    if (response.status === 200) {
      toast.success("OTP baru berhasil terkirim");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        // Status kode 500 menunjukkan kesalahan server
        toast.error(
          "Terjadi kesalahan pada server. Email mungkin sudah terdaftar."
        );
      } else {
        toast.error("Gagal mendaftarkan pengguna. Silakan coba lagi nanti.");
      }
    } else {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
  }
};

export const sendPassword = (email) => async () => {
  try {
    const response = await axios.post(`${api_url}/auth/reset-password`, {
      email,
    });

    if (response.status === 200) {
      toast.success(
        "Tautan pengaturan ulang kata sandi telah dikirim ke email Anda!"
      );
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Email tidak terdaftar. Silakan cek kembali email Anda.");
      }
    } else {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
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
        toast.success("Password berhasil diganti");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Kunci reset tidak valid atau kedaluwarsa");
        } else {
          toast.error("Gagal mereset password. Silakan coba lagi nanti.");
        }
      } else {
        toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      }
    }
  };

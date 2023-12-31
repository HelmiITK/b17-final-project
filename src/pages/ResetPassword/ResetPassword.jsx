import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { resetPassword } from "../../redux/actions/authActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let resetPasswordToken; = use

  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordMatch = (event) => {
    setNewPassword(event.target.value);
    passwordValidation(event.target.value, confirmNewPassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfirmNewPassword(event.target.value);
    passwordValidation(newPassword, event.target.value);
  };

  const passwordValidation = (password, confirm) => {
    if (password !== confirm) {
      setPasswordError("Password Not Match!");
    } else {
      setPasswordError("");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!newPassword) {
      setErrorMessage("Silahkan isi password terbaru");
      return;
    }

    if (!confirmNewPassword) {
      setErrorMessage("Silahkan isi konfirmasi password");
      return;
    }

    if (passwordError) {
      setErrorMessage("Password and Confirm Password not match");
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        resetPassword(
          resetPasswordToken,
          newPassword,
          confirmNewPassword,
          navigate
        )
      );
      // alert("Password Berhasil Diganti 🥳");
      // navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Mendapatkan URL saat ini
    const currentUrl = window.location.href;

    // Membuat objek URL
    const url = new URL(currentUrl);

    // Mendapatkan nilai dari parameter 'resetPasswordToken'
    setResetPasswordToken(url.searchParams.get("resetPasswordToken"));
    // Menampilkan nilai pada konsol
    // console.log(resetPasswordToken);

    // Do something with resetPasswordToken, like calling your resetPassword action
    // Lakukan sesuatu dengan resetPasswordToken, seperti memanggil aksi resetPassword
  }, [resetPasswordToken]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-">
              Reset Password
            </span>
            <span className="font-light text-gray-400 mb-8">
              Silakan Masukkan kata sandi baru di bawah.
            </span>
            <form onSubmit={handleResetPassword}>
              <div className="py-1 relative">
                <span className="mb-2 text-sm font-poppins">New Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={newPassword}
                  onChange={handlePasswordMatch}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1 px-1 py-2"
                >
                  {showPassword ? (
                    <FiEye className="border-none" />
                  ) : (
                    <FiEyeOff className="border-none" />
                  )}
                </button>
              </div>
              <div className="py-1 relative">
                <span className="mb-2 text-sm font-poppins">
                  Confirm a new password
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  className="text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Konfirmasi Password"
                  value={confirmNewPassword}
                  onChange={handleConfirmPasswordMatch}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={toggleConfirmPassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1 px-1 py-2"
                >
                  {showConfirmPassword ? (
                    <FiEye className="border-none" />
                  ) : (
                    <FiEyeOff className="border-none" />
                  )}
                </button>
              </div>
              {errorMessage && (
                <p className="text-color-warn text-xs mb-2">{errorMessage}</p>
              )}
              <div className="flex justify-between w-full py-4">
                <button
                  className="w-full bg-primary text-white p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-gray-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1440951658/id/foto/sistem-keamanan-sidik-jari-minimal-3d-verifikasi-identitas-akses-aman-identitas-digital-gembok.jpg?s=612x612&w=0&k=20&c=7YgkhQ3dvladKUtm5gEn27qO1Iv-x5vvVTtcRBHXSfc="
              alt=""
              className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: "13px" }} // Atur ukuran teks di sini
      />
    </>
  );
};

export default ResetPassword;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
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

    if (passwordError) {
      alert("Password and Confirm Password not match");
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(resetPassword(resetPasswordToken, newPassword, confirmNewPassword, navigate));
      alert("Password Berhasil Diganti 🥳");
      navigate("/");
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
    console.log(resetPasswordToken);

    // Do something with resetPasswordToken, like calling your resetPassword action
    // Lakukan sesuatu dengan resetPasswordToken, seperti memanggil aksi resetPassword
  }, [resetPasswordToken]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-">Change Password</span>
            <span className="font-light text-gray-400 mb-8">
              Please Enter a new password below.
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
                <span className="mb-2 text-sm font-poppins">Confirm a new password</span>
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

              <div className="flex justify-between w-full py-4">
                <button
                  className="w-full bg-black text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-black hover:border hover:border-gray-300 hover:scale-105"
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
              src="https://plus.unsplash.com/premium_photo-1683135219860-44ad80fc9bb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291cnNlfGVufDB8fDB8fHww"
              alt=""
              className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

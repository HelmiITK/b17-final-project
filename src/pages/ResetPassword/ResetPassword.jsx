import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { resetPassword } from "../../redux/actions/authActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passworderror, setPasswordError] = useState("");
  //   const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const passwordValidation = (password, confirm) => {
    if (password !== confirm) {
      setPasswordError("Password Not Match!");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordMatch = (event) => {
    setPassword(event.target.value);
    passwordValidation(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfirmPassword(event.target.value);
    passwordValidation(password, event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (passworderror) {
      alert("Password and Confirm Password not match");
    }

    dispatch(resetPassword(password, id, navigate, setIsLoading));
  };
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
            <form action="" onSubmit={handleResetPassword}>
              <div className="py-1 relative">
                <span className="mb-2 text-sm font-poppins">New Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordMatch}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1 px-1 py-2"
                >
                  {showPassword ? (
                    <FiEyeOff className="border-none" />
                  ) : (
                    <FiEye className="border-none" />
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
                  value={confirmPassword}
                  onChange={handleConfirmPasswordMatch}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={toggleConfirmPassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1 px-1 py-2"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="border-none" />
                  ) : (
                    <FiEye className="border-none" />
                  )}
                </button>
              </div>

              {/* <div className="flex justify-between w-full py-4">
                <label className="flex items-center text-xs font-poppins">
                  <input type="checkbox" name="remember" id="ch" className="mr-2" />i agree all
                  &nbsp;
                  <p className="text-blue-900 font-semibold">terms and conditions</p>
                  <p className="ml-1">and &nbsp;</p>
                <p className="text-blue-900 font-semibold">Privacy Policies of evolko</p>
                </label>
              </div> */}
              <div className="flex justify-between w-full py-4">
                <button
                  className="w-full bg-black text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-black hover:border hover:border-gray-300 hover:scale-105"
                  type="sumbit"
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
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* <div className="absolute hidden bottom-10 right-6 p-6 bg-blue-950 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black text-xl">ayo beli course ini</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

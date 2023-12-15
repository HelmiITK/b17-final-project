import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendPassword } from "../../redux/actions/authActions";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleverify = async (event) => {
    event.preventDefault();

    dispatch(sendPassword(email, setIsLoading));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <Link to={"/login"}>
              <p className="flex font-semibold text-sm text-green-500 items-center hover:underline transition-all duration-300 hover:scale-100">
                Back to Login
              </p>
            </Link>
            <span className="mb-3 text-4xl font-bold text-">Forgot Password ?</span>
            <span className="font-light text-gray-400 mb-8">
              please enter your email address to request a password reset
              {/* <hr /> */}
            </span>
            <form action="" onSubmit={handleverify}>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Email Address</span>
                <input
                  type="email"
                  id="email"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="ex: asep123@gmail.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
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

          {/* Right Side */}
          {/* <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1683135219860-44ad80fc9bb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291cnNlfGVufDB8fDB8fHww"
              alt=""
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            /> */}
          {/* <div className="absolute hidden bottom-10 right-6 p-6 bg-blue-950 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black text-xl">ayo beli course ini</span>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;

// // import { FcGoogle } from "react-icons/fc";
// // import { FiEye, FiEyeOff } from "react-icons/fi";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { useState } from "react";
// // import { register } from "../../redux/actions/authActions";

// // const RegisterPage = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [passworderror, setPasswordError] = useState("");

// //   const [errors, setErrors] = useState("");

// //   const passwordValidation = (password, confirm) => {
// //     if (password !== confirm) {
// //       setPasswordError("Password Not Match!");
// //     } else {
// //       setPasswordError("");
// //     }
// //   };

// //   const handlePasswordMatch = (event) => {
// //     setPassword(event.target.value);
// //     passwordValidation(event.target.value, confirmPassword);
// //   };

// //   const handleConfirmPasswordMatch = (event) => {
// //     setConfirmPassword(event.target.value);
// //     passwordValidation(password, event.target.value);
// //   };

// //   const togglePassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const toggleConfirmPassword = () => {
// //     setShowConfirmPassword(!showConfirmPassword);
// //   };

// //   const registAcc = async (event) => {
// //     event.preventDefault();

// //     if (passworderror) {
// //       alert("Password and Confirm Password not match");
// //     }

// //     dispatch(
// //       register(name, email, password, confirmPassword, phoneNumber, navigate, setErrors, errors)
// //     );
// //   };

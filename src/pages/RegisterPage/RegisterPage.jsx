import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../../redux/actions/authActions";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passworderror, setPasswordError] = useState("");

  const [errors, setErrors] = useState("");

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

  const registAcc = async (event) => {
    event.preventDefault();

    if (passworderror) {
      alert("Password and Confirm Password not match");
    }

    dispatch(
      register(name, email, password, confirmPassword, phoneNumber, navigate, setErrors, errors)
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-">Sign Up Account</span>
            <span className="font-light text-gray-400 mb-8">
              Welcome back! please enter your details
            </span>
            <form action="" onSubmit={registAcc}>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Full Name</span> */}
                <input
                  type="text"
                  id="name"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Username"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Email</span> */}
                <input
                  type="email"
                  id="email"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Phone Number</span> */}
                <input
                  type="tel"
                  id="phoneNumber"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="py-1 relative">
                {/* <span className="mb-2 text-sm font-poppins">Password</span> */}
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
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-1 py-2"
                >
                  {showPassword ? (
                    <FiEye className="border-none" />
                  ) : (
                    <FiEyeOff className="border-none" />
                  )}
                </button>
              </div>
              <div className="py-1 relative">
                {/* <span className="mb-2 text-sm font-poppins">Password</span> */}
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
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-1 py-2"
                >
                  {showConfirmPassword ? (
                    <FiEye className="border-none" />
                  ) : (
                    <FiEyeOff className="border-none" />
                  )}
                </button>
              </div>

              <div className="flex justify-between w-full py-4">
                <label className="flex items-center text-xs font-poppins">
                  <input type="checkbox" name="remember" id="ch" className="mr-2" />i agree all
                  &nbsp;
                  <p className="text-blue-900 font-semibold">terms and conditions</p>
                  {/* <p className="ml-1">and &nbsp;</p>
                <p className="text-blue-900 font-semibold">Privacy Policies of evolko</p> */}
                </label>
              </div>
              <button
                className="w-full bg-black text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                type="sumbit"
              >
                Create an account
              </button>
            </form>

            <p className="text-gray-400 mb-2 text-center text-sm underline">or use another login</p>
            <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
              <FcGoogle className="w-6 h-6 inline mr-2" />
              Sign in with Google
            </button>
            <p className="mt-2 text-gray-400 text-sm text-center">
              Already have account ? &nbsp;
              <Link to={"/login"} className="font-semibold underline text-red-500">
                Sign in
              </Link>
            </p>
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

export default RegisterPage;

import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";

import { register } from "../../redux/actions/authActions";
import Pedjuang from "../../assets/PedjuangIlmuuu.svg";

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
  const [errorMessage, setErrorMessage] = useState("");

  const registAcc = async (event) => {
    event.preventDefault();

    // Validasi untuk memastikan semua kolom telah diisi
    if (!name) {
      setErrorMessage("Silahkan isi username anda");
      return;
    }

    if (!email) {
      setErrorMessage("Silahkan isi email anda");
      return;
    }

    if (!phoneNumber) {
      setErrorMessage("Silahkan isi nomor telepon anda");
      return;
    }

    if (!password) {
      setErrorMessage("silahkan masukkan pasword anda");
      return;
    }

    if (passworderror) {
      setErrorMessage("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok");
      return;
    }

    // Validasi untuk centang checkbox
    const checkbox = document.getElementById("ch");
    if (!checkbox.checked) {
      setErrorMessage("Please agree to the terms and conditions");
      return;
    }

    // Jika semua validasi terlewati, maka lakukan pendaftaran
    dispatch(
      register(
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
        navigate,
        setErrors,
        errors
      )
    );
  };

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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-layer">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <Link to={"/login"}>
              <p className="flex font-semibold text-md text-color-primary items-center hover:underline transition-all duration-300 hover:scale-100">
                <IoMdArrowRoundBack />
                Back to Login
              </p>
            </Link>
            <span className="mb-3 text-4xl font-bold text-black">Sign Up Account</span>
            <span className="font-light text-gray-400 mb-4">
              {/* Welcome back! please enter your details */}
              Selamat Datang kembali!
              <br /> silakan masukkan detail Anda
            </span>
            <form onSubmit={registAcc}>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Username</span> */}
                <input
                  type="text"
                  id="name"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setErrorMessage("");
                  }}
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
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrorMessage("");
                  }}
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
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setErrorMessage("");
                  }}
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
              {errorMessage && (
                <p className="text-color-warn text-xs mb-2">{errorMessage}</p>
              )}
              <div className="flex justify-between w-full py-4">
                <label className="flex items-center text-xs font-poppins">
                  <input
                    type="checkbox"
                    name="remember"
                    id="ch"
                    className="mr-2"
                  />
                  i agree all &nbsp;
                  <p className="text-blue-900 font-semibold">
                    terms and conditions
                  </p>
                  {/* <p className="ml-1">and &nbsp;</p>
                <p className="text-blue-900 font-semibold">Privacy Policies of evolko</p> */}
                </label>
              </div>
              <button
                className="w-full bg-primary text-white p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-gray-300"
                type="sumbit"
              >
                Daftar
              </button>
            </form>

            <p className="mt-2 text-gray-400 text-sm text-center">
              Sudah punya akun? &nbsp;
              <Link to={"/login"} className="font-semibold underline text-color-warn">
                Masuk di sini
              </Link>
            </p>
          </div>
          <div className="relative">
            <img
              src={Pedjuang}
              alt="svg"
              // className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              className="mr-12 pt-40 drop-shadow-lg hidden md:block"
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

export default RegisterPage;

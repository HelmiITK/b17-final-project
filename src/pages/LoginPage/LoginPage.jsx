import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../redux/actions/authActions";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Silahkan isi email anda");
      return;
    }

    if (!password) {
      setErrorMessage("Silahkan isi password anda");
      return;
    }

    // Jika Remember Me dicentang, simpan email dan password di localStorage
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      // Jika Remember Me tidak dicentang, hapus data dari localStorage
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    dispatch(login(email, password, navigate));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-[#F3F7FB]">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold font-poppins text-center">Login</span>
            <span className="font-poppins text-gray-400 mb-8 text-center">
              Welcome back! please enter your details
            </span>
            <form onSubmit={handleLogin}>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Email</span> */}
                <input
                  type="email"
                  id="email"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  // onChange={(event) => setEmail(event.target.value)}
                  // required
                  onChange={(event) => {
                    setEmail(event.target.value);
                    // Hapus pesan kesalahan saat pengguna mulai mengetik ulang
                    setErrorMessage("");
                  }}
                  required
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                    // Hapus pesan kesalahan saat pengguna mulai mengetik ulang
                    setErrorMessage("");
                  }}
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
              {errorMessage && <p className="text-red-500 text-xs mb-2">{errorMessage}</p>}
              <div className="flex justify-between w-full py-4">
                <label className="flex items-center text-xs font-poppins">
                  <input
                    type="checkbox"
                    name="remember"
                    id="ch"
                    className="mr-1 font-poppins"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  Remember me
                </label>
                <Link to={"/verify-email"} className="font-poppins text-xs">
                  Forgot Password?
                </Link>
              </div>
              <button className="w-full bg-[#003E9C] text-white p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-gray-300">
                Sign in
              </button>
            </form>

            <p className="text-gray-400 mb-2 text-center text-sm underline">or use another login</p>
            <button className="w-full border border-gray-300 text-md p-1 mb-2 rounded-lg hover:bg-black hover:text-white">
              <FcGoogle className="w-6 h-6 inline mr-2" />
              Sign in with Google
            </button>
            <p className="mt-2 text-gray-400 text-sm text-center">
              Dont have an account ? &nbsp;
              <Link to={"/register"} className="underline text-red-500">
                Sign up
              </Link>
            </p>
          </div>
          <div className="relative">
            <img
              src="../../src/assets/tampilan.jpg"
              alt=""
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* <div className="absolute hidden bottom-10 right-6 p-6 bg-blue-950 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black text-xl">ayo beli course ini</span>
            </div> */}
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
      />
    </>
  );
};

export default LoginPage;

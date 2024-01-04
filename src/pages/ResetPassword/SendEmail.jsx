import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { sendPassword } from "../../redux/actions/authActions";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleverify = async (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Silahkan isi email anda");
      return;
    }

    dispatch(sendPassword(email, setIsLoading));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <Link to={"/login"}>
              <p className="flex font-semibold text-md text-color-primary items-center hover:underline transition-all duration-300 hover:scale-100">
                Back to Login
              </p>
            </Link>
            <span className="mb-3 text-4xl font-bold text-">Forgot Password ?</span>
            <span className="font-light text-gray-400 mb-8">
              silakan masukkan alamat email Anda
              <br />
              untuk meminta pengaturan ulang kata sandi
            </span>
            <form onSubmit={handleverify}>
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
              {errorMessage && <p className="text-color-warn text-xs mb-2">{errorMessage}</p>}
              <div className="flex justify-between w-full py-4">
                <button
                  className="w-full bg-primary text-white p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-gray-300"
                  type="sumbit"
                >
                  {isLoading ? "Loading..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1445614465/id/foto/konsep-komunikasi-online-minimal-3d-jejaring-sosial-koneksi-online-ikon-email-dengan-ikon.jpg?s=612x612&w=0&k=20&c=j144XU7UzmqKnmSpJgaIM74se5pqv4OvqfB9Hfya_y4="
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

export default VerifyEmail;

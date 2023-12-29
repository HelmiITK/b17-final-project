import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { resendOtp, verify } from "../../redux/actions/authActions";
import { ToastContainer } from "react-toastify";

const OTPPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // Timer awal dalam detik
  const [isTimerActive, setIsTimerActive] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 60; // Set ulang timer ke 60 detik setelah mencapai 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Membersihkan interval saat komponen dilepas
  }, [isTimerActive]);

  const handleverify = (event) => {
    event.preventDefault();
    dispatch(verify(otp, navigate));
  };

  const handleResendCode = () => {
    dispatch(resendOtp());
    setIsTimerActive(true);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-layer py-32 rounded-3xl">
        <form onSubmit={handleverify} className="otp-form">
          <div className="pt-24 lg:pt-32 absolute top-0 translate-x-[-50%] left-[50%]  w-full lg:w-9/12  pb-10">
            <Link to={"/register"}>
              <h3 className="flex items-center font-semibold duration-300 hover:scale-105 hover:underline ml-4 lg:ml-0">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali ke Register
              </h3>
            </Link>
          </div>

          <div className="relativ bg-white px-6 pt-10 pb-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-7">
              <div className="flex flex-col items-center justify-center text-center">
                <MdVerifiedUser className="justify-center items-center w-24 h-24 text-color-primary" />
                <div className="font-semibold text-xl ">Masukkan OTP</div>
                {/* <p className="font-poppins font-">Enter the OTP sent to you verify your identity</p> */}
              </div>
              <div className="flex flex-col space-y-6">
                <label className="text-[12px] text-sm lg:text-sm mb-[4px] text-center font-Poppins">
                  Ketik 6 digit kode yang dikirimkan ke <span className="font-bold">{email}</span>
                </label>
                <div className="flex flex-row items-center justify-center mx-auto w-full max-w-sm">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    isInputNum={true} // Menandakan bahwa input hanya menerima angka
                    renderInput={(props, i) => (
                      <input
                        {...props}
                        key={i}
                        type="" // Mengatur tipe input menjadi "tel" untuk hanya menerima angka
                        className=" mx-2 text-center"
                      />
                    )}
                    containerStyle="justify-center"
                    inputStyle={{
                      border: "1px solid black",
                      width: "55px",
                      height: "60px",
                      fontSize: "30px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className="flex items-center flex-col space-y-5">
                  <button
                    type="submit"
                    className="flex px-6 py-3 text-center border rounded-xl outline-none bg-color-primary hover:bg-black border-none text-white text-sm"
                  >
                    Verify OTP
                  </button>

                  <div className="mt-2 text-gray-600 text-sm text-center font-poppins">
                    {isTimerActive ? (
                      <p>Resend OTP in {timer} seconds</p>
                    ) : (
                      <p>
                        Didnt get code ? &nbsp;
                        <button
                          className="text-blue-950 font-poppins font-bold"
                          onClick={handleResendCode}
                        >
                          Resend OTP
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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

export default OTPPage;

// import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

const OTpPage = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // Timer awal dalam detik
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 60; // Setel ulang timer ke 60 detik setelah mencapai 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Membersihkan interval saat komponen dilepas
  }, [isTimerActive]);

  const handleResendCode = () => {
    // Kode untuk mengirim ulang OTP akan ditambahkan di sini
    // Misalnya, panggil fungsi untuk mengirim ulang kode melalui API

    // Setelah mengirim ulang, aktifkan timer
    setIsTimerActive(true);
  };

  // const handleVerify = () => {
  //   // Kode untuk memverifikasi OTP akan ditambahkan di sini
  //   // Misalnya, panggil fungsi untuk memverifikasi OTP melalui API
  // };

  const handleClearOTP = () => {
    setOtp("/"); // Mengatur ulang nilai OTP menjadi string kosong
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     // Saat tombol "Enter" ditekan, panggil fungsi verifikasi
  //     handleVerify();
  //   }
  // };
  // const handleResendCode = () => {
  //   if (!isTimerActive) {
  //     setIsTimerActive(true);
  //     setTimer(60);
  //     // Add logic to resend OTP here
  //   }
  // };
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-32 rounded-3xl">
        <div className="pt-24 lg:pt-32 absolute top-0 translate-x-[-50%] left-[50%]  w-full lg:w-9/12  pb-10">
          <div>
            <Link to={"/register"}>
              <h3 className="flex items-center font-semibold duration-300 hover:scale-105 hover:underline ml-4 lg:ml-0">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali ke Register
              </h3>
            </Link>
          </div>
        </div>
        <div className="relativ bg-white px-6 pt-10 pb-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-7">
            <div className="flex flex-col items-center justify-center text-center">
              <MdVerifiedUser className="justify-center items-center w-24 h-24 text-blue-700" />
              <div className="font-semibold text-2xl ">OTP VERIV</div>
              <p className="font-poppins text-md">Enter the OTP sent to you verify your identity</p>
            </div>

            <form action="" method="post" className="otp-form">
              <div className="flex flex-col space-y-6">
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
                        className="w-24 h-12 text-5xl mx-2 text-center border rounded-md"
                      />
                    )}
                    containerStyle="justify-center"
                    inputStyle="flex"
                  />
                </div>

                <div className="flex items-center flex-col space-y-5">
                  <button className="flex px-6 py-3 text-center border rounded-xl outline-none  bg-blue-700 hover:bg-black border-none text-white text-sm">
                    <Link to="/">Verify OTP</Link>
                  </button>
                  <button
                    className="px-3 py-2 text-center border rounded-xl outline-none bg-gray-300 hover:bg-blue-700 border-none text-sm"
                    onClick={handleClearOTP}
                  >
                    Clear OTP
                  </button>

                  <p className="mt-2 text-gray-600 text-sm text-center font-poppins">
                    {isTimerActive ? (
                      <p>Kirim Ulang OTP Masuk {timer} Detik</p>
                    ) : (
                      <p>
                        Tidak Mendapatkan Kode ? &nbsp;
                        <button
                          className="text-blue-950 font-poppins font-bold"
                          onClick={handleResendCode}
                        >
                          Kirim Ulang OTP
                        </button>
                      </p>
                    )}
                    {/* Didn't get code ? &nbsp;
                    <button
                      className="font-poppins font-semibold underline text-blue-950"
                      onClick={handleResendCode}
                      disabled={isTimerActive}
                    >
                      Resend Code {isTimerActive && `(${timer}s)`}
                    </button> */}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTpPage;

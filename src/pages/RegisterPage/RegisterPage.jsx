import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    combineTheNames(event.target.value, lastName);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
    combineTheNames(firstName, event.target.value);
  };

  const combineTheNames = (firstName, lastName) => {
    const combineName = `${firstName} ${lastName}`;
    setName(combineName);
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

//   const regis = async (event) => {
//     // event.preventDefault();
//     // if (passworderror) {
//     //   alert("Password and Confirm Password not match! , Try Again!");
//     //   return;
//     // }
//     // dispatch(register(email, name, password, navigate));
//   };
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
            <form action="">
              <div className="flex gap-6">
                <div className="py-1">
                  <span className="mb-2 text-sm font-poppins">First Name</span>
                  <input
                    type="text"
                    className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                    placeholder="Nama Depan"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                </div>
                <div className="py-1">
                  <span className="mb-2 text-sm font-poppins">Last Name</span>
                  <input
                    type="text"
                    className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                    placeholder="Nama Belakang"
                    value={lastName}
                    onChange={handleLastName}
                  />
                </div>
              </div>

              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Email</span>
                <input
                  type="text"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Password</span>
                <input
                  type="text"
                  className=" text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordMatch}
                />
              </div>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Konfirmasi Password</span>
                <input
                  type="text"
                  className=" text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Konfirmasi Password"
                  value={password}
                  onChange={handleConfirmPasswordMatch}
                />
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
              <button className="w-full bg-black text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-black hover:border hover:border-gray-300">
                Sign in
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
                Sign in for free
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

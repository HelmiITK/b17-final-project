import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-blue-950">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold font-poppins text-center">Welcome Back</span>
            <span className="font-poppins text-gray-400 mb-8 text-center">
              Welcome back! please enter your details
            </span>
            <form action="">
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Email</span>
                <input
                  type="email"
                  id="email"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Password</span>
                <input
                  type="password"
                  id="password"
                  className=" text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="flex justify-between w-full py-4">
                <label className=" flex items-center text-xs font-poppins">
                  <input type="checkbox" name="remember" id="ch" className="mr-1 font-poppins" />
                  Remember me
                </label>
                <a href="#" className="font-poppins text-xs">
                  Forgot Password?
                </a>
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
              Dont have an account ? &nbsp;
              <Link to={"/register"} className="underline text-red-500">
                Sign up for free
              </Link>
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default LoginPage;

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import { setToken } from "../reducers/authReducers";
import toast from "react-hot-toast";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, {
      email,
      password,
    });
    const { data } = response.data;
    const { token } = data;

    dispatch(setToken(token));
    navigate("/");
  } catch (error) {
    alert(error.message);
  }
};

// export const login = (email, password, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${api_url}/auth/login`, {
//       email,
//       password,
//     });
//     const { data } = response.data;
//     const { token } = data;

//     dispatch(setToken(token));
//     navigate("/");

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       toast.error(`${error?.response?.data?.error}`, {
//         duration: 2000,
//       });
//       return;
//     }
//     toast.error(`${error?.data?.error}`, {
//       duration: 2000,
//     });
//   }
// };

export const register =
  (name, email, phoneNumber, password, confirmPassword, navigate) => async () => {
    try {
      if (password != confirmPassword) {
        alert("password anda tidak sama!");
        return;
      }
      const response = await axios.post(`${api_url}/auth/register`, {
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
      });

      if (response.status == 201) {
        const { email } = response.data;
        const { message } = response.data;

        toast.success(message);
        localStorage.setItem("regisEmail", email);

        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error?.response?.data?.message}`, {
          duration: 2000,
        });
        return;
      }
      toast.error(`${error?.error}`, {
        duration: 2000,
      });
    }
  };

export const verify = (otp, navigate) => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/verify-email`, {
      email,
      otp,
    });

    // if (response.status === 200) {
    alert(response.data.message);

    localStorage.removeItem("email");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
    navigate("/login");

    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error?.response?.data?.message}`, {
        duration: 2000,
      });
    } else {
      toast.error(`${error?.message}`, {
        duration: 2000,
      });
    }
  }
};

export const resendOtp = () => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/resend-otp`, {
      email,
    });

    if (response.status === 200) {
      alert(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error?.response?.data?.message}`, {
        duration: 2000,
      });
      return;
    }
    toast.error(`${error?.data?.error}`, {
      duration: 2000,
    });
  }
};

// export const register =
//   (name, email, password, confirmPassword, phoneNumber, navigate) => async (dispatch) => {
//     try {
//       if (password != confirmPassword) {
//         alert("password anda tidak sama!");
//         return;
//       }
//       let data = JSON.stringify({
//         name,
//         email,
//         password,
//         phoneNumber,
//       });
//       let config = {
//         method: "post",
//         url: `${api_url}/auth/register`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: data,
//       };

//       const response = await axios.request(config);
//       const { token } = response.data.data;

//       localStorage.setItem("token", token);

//       dispatch(setToken(token));
//       navigate("/");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

// export const register =
//   (name, email, phoneNumber, password, confirmPassword, navigate, setErors, errors) => async (dispatch) => {
//     try {
//       if (password != confirmPassword) {
//         alert("password anda tidak sama!");
//         return;
//       }
//       let data = JSON.stringify({
//         name,
//         email,
//         phoneNumber,
//         password,
//       });
//       let config = {
//         method: "post",
//         url: `${api_url}/auth/register`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: data,
//       };

//       const response = await axios.request(config);

//       const { email } = response.data;

//       localStorage.setItem("token", token);

//       dispatch(setToken(token));
//       navigate("/otp");
//       setErors({ ...errors, isError: false });
//     }
//     catch (error) {
//       if (axios.isAxiosError(error)) {
//         alert(error?.response?.data?.message);
//         return;
//       }
//       alert(error?.message);
//     }
//   };

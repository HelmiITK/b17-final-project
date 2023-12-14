import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import toast from "react-hot-toast";
import { setToken, setUser } from "../reducers/authReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

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
//     alert(error.message);
//   }
// };

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

export const getMe = (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${api_url}/profiles/my-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    // console.log(data)
    dispatch(setUser(data));

    if (navigatePathSuccess) navigate(navigatePathSuccess);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //if token is not valid
      if (error.response.status === 401) {
        dispatch(logout());

        if (navigatePathError) navigate(navigatePathError);
        return;
      }

      alert(error?.response?.data?.message);
      return;
    }

    alert(error?.message);
  }
}

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const updateProfile = (name, no_telp, avatar, city, country, ) => async (dispatch, getState) => {
  try {
    // ambil token user di redux state
    let { token } = getState().auth;

    const profileData = {
      name,
      no_telp,
      avatar,
      city,
      country
    }

    const response = await axios.put(
      `${api_url}/profiles/update-profile`, profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const updateProfile = response.data;
    
    // perbarui user profile di redux state
    dispatch(setUser(updateProfile));
    alert("Profil berhasil diperbarui 🥳")

  } catch (error) {
    alert(error?.message)
  }
}


export const register =
  (name, email, phoneNumber, password, confirmPassword, navigate) => async () => {
    try {
      const response = await axios.post(`${api_url}/auth/register`, {
        username: name,
        email,
        password,
        role: "user",
        profile: {
          name: "",
          no_telp: "",
          avatar: "",
          city: "",
          country: "",
        },
      });

      if (response.status == 201) {
        const { email } = response.data.user;
        // const { message } = response.data;
        // console.log(response.data);
        // toast.success(message);
        localStorage.setItem("email", email);

        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      alert(error.message);
    }
  };

export const verify = (otp, navigate) => async () => {
  try {
    const email = localStorage.getItem("email");

    await axios.post(`${api_url}/auth/verify-email`, {
      email,
      otp,
    });

    // if (response.status === 200) {
    // alert(response.data.message);
    // localStorage.setItem("token", token)

    localStorage.removeItem("email");

    // setTimeout(() => {
    navigate("/login");
    console.log("");
    // }, 2000);
    // navigate("/login");

    // }
  } catch (error) {
    alert(error.message);
  }
};

export const resendOtp = () => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(`${api_url}/auth/resend-otp`, {
      email,
    });

    console.log(email);

    if (response.status === 200) {
      alert("done ga bang done");
    }
  } catch (error) {
    alert(error.message);
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

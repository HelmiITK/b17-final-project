import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    updateAvatar: (state, action) => {
      state.user = {
        ...state.user,
        avatar: action.payload,
      };
    },
  },
});

export const { setToken, setUser, updateProfile, updateAvatar } = authSlice.actions;

export default authSlice.reducer;

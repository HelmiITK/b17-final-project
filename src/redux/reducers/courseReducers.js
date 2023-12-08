import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  detail: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    removeDetail: (state) => {
      state.detail = [];
    },
  },
});

export const { 
  setCourse,
  setDetail,
  removeDetail 
} = 
  courseSlice.actions;

export default courseSlice.reducer;

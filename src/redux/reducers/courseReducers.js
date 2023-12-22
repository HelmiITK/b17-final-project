import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  detail: [],
  mycourse: [],
  rating: [],
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
    setMyCourse: (state, action) => {
      state.mycourse = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    removeDetail: (state) => {
      state.detail = [];
    },
  },
});

export const { setCourse, setDetail, removeDetail, setMyCourse, setRating } =
  courseSlice.actions;

export default courseSlice.reducer;

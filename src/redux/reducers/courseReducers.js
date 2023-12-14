import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  detail: [],
  mycourse: [],
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
    removeDetail: (state) => {
      state.detail = [];
    },
  },
});

export const { setCourse, setDetail, removeDetail, setMyCourse } =
  courseSlice.actions;

export default courseSlice.reducer;

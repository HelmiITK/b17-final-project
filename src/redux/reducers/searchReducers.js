import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searching: [],
};

const courseSlice = createSlice({
    name: "searching",
    initialState,
    reducers: {
        setSearching: (state, action) => {
            state.searching = action.payload;
        },
    },
});

export const { setSearching } = courseSlice.actions;

export default courseSlice.reducer;

import axios from "axios";
import { setCourse } from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCourse = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/courses?page=1`);

    const { courses } = response.data;

    dispatch(setCourse(courses));
  } catch (error) {
    alert(error.message);
  }
};

export const getCourseWithCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${api_url}/courses?page=1&category=${category}`
    );

    const { courses } = response.data;

    dispatch(setCourse(courses));
  } catch (error) {
    alert(error.message);
  }
};

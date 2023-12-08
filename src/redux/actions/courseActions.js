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

export const getCourseWithFilter =
  (category, level, typeCourse) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${api_url}/courses?page=1&category=${category}&level=${level}&typeCourse=${typeCourse}`
      );

      const { courses } = response.data;

      dispatch(setCourse(courses));
    } catch (error) {
      alert(error.message);
    }
  };

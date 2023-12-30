import axios from "axios";
import { setSearching } from "../reducers/searchReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getSearchCourses =
  (errors, setErrors, search, page = 1) =>
    async (dispatch) => {
      try {
        const response = await axios.get(`${api_url}/courses?page=${page}&search=${search}`);
        const { courses, success, message } = response.data;
        console.log(courses)

        if (!success && message === "No courses found with the specified criteria") {
          dispatch(setSearching([])); // Set array kosong untuk state searching
          setErrors({
            ...errors,
            isError: true,
            message: message,
          });
        } else {
          dispatch(setSearching(courses));
          setErrors({ ...errors, isError: false });
        }

      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
          });
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

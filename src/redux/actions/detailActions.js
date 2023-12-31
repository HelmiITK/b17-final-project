import axios from "axios";
import { setDetail } from "../reducers/courseReducers";

export const getDetailCourse =
   (courseId, setErrors, errors) => async (dispatch) => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_REACT_API_ADDRESS}/courses/detail/${courseId}`,
         );

         const data = response.data.courses
         dispatch(setDetail(data));

         setErrors({ ...errors, isError: false });
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrors({
               ...errors,
               isError: true,
               message: error?.response?.data?.message || error?.message,
            });
            return;
         }

         alert(error?.message);
         setErrors({
            ...errors,
            isError: true,
            message: error?.error,
         });
      }
   };







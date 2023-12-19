import axios from "axios";
import { setCourse, setMyCourse } from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCourse = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/courses?page=1`);

    const courses = response.data.courses;

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

export const getMyCourse = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${api_url}/profiles/my-course?page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { enrolledCourses } = response.data;

    dispatch(setMyCourse(enrolledCourses));
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyCourseWithFilter =
  (category, level) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.get(
        `${api_url}/profiles/my-course?page=1&category=${category}&level=${level}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { courses } = response.data;

      dispatch(setMyCourse(courses));
    } catch (error) {
      alert(error.message);
    }
  };

export const enrollFreeCourse = (courseId) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_ADDRESS}/enrollments/create`,
      {
        course_id: +courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: `application/json`,
          "Content-Type": `application/json`,
        },
      }
    );

    alert("Pembelian berhasil");

    // reload halaman agar terupdate
    if (response.status == 201) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error) {
    alert(error.message);
  }
};

export const enrollPremiumCourse =
  (courseId, userId) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/orders`,
        {
          course_id: +courseId,
          user_id: userId,
          payment_method_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: `application/json`,
            "Content-Type": `application/json`,
          },
        }
      );
      console.log(response.data);
      // alert("Pembelian berhasil");

      // reload halaman agar terupdate
      // if (response.status == 201) {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000);
      // }
    } catch (error) {
      alert(error.message);
    }
  };

export const updateMaterialStatus = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    await axios.post(
      `${import.meta.env.VITE_REACT_API_ADDRESS}/enrollments/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Video ini sudah selesai");
  } catch (error) {
    if (error.response.status === 400) {
      alert("Video ini sudah anda selesaikan");
    } else if (error.response.status === 404) {
      alert("Video tidak ditemukan");
    } else {
      alert(error.message);
    }
  }
};

export const removeMyCourse = () => async (dispatch) => {
  dispatch(setMyCourse(null));
};

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
        `${api_url}/profiles/my-course?category_id=${category}&level=${level}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { enrolledCourses } = response.data;

      dispatch(setMyCourse(enrolledCourses));
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

export const enrollPremiumCourse = (courseId) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_ADDRESS}/orders/create`,
      {
        course_id: +courseId,
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
    // Buka link dalam tab baru jika respons memiliki link
    if (response.data && response.data.paymentLink) {
      const newTab = window.open(response.data.paymentLink, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        alert(
          "Terblokir oleh penyekat popup, harap izinkan pop-up untuk membuka tautan."
        );
      }
    } else {
      console.log("Tidak ada tautan dalam respons");
    }

    if (response.data.order.status === "paid") {
      const response2 = await axios.post(
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
      if (response2.status == 201) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  } catch (error) {
    alert(`ERROR ${error.response.status} : ${error.response.data.error}`);
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

import axios from "axios";
import {
  setCourse,
  setMyCourse,
  setRating,
  setPageCourse,
} from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCourse = (page) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/courses?page=${page}`);

    const courses = response.data.courses;

    dispatch(setCourse(courses));
  } catch (error) {
    alert(error.message);
  }
};

export const getPagesCourse = (page) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/courses?page=${page}`);

    const { pagination } = response.data;

    dispatch(setPageCourse(pagination));
  } catch (error) {
    alert(error.message);
  }
};

export const getCourseWithFilter =
  (pages, category, level, typeCourse) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${api_url}/courses?page=${pages}&category=${category}&level=${level}&typeCourse=${typeCourse}`
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

export const enrollFreeCourse =
  (courseId, navigate) => async (dispatch, getState) => {
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
          navigate(window.location.pathname);
        }, 1000);
      }
    } catch (error) {
      alert(error.message);
    }
  };

export const enrollPremiumCourse =
  (courseId, navigate) => async (dispatch, getState) => {
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
          navigate(window.location.pathname);
        }
      }
    } catch (error) {
      alert(`ERROR ${error.response.status} : ${error.response.data.error}`);
    }
  };

export const updateMaterialStatus =
  (id, navigate, courseId, materialNextIndex) => async (dispatch, getState) => {
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
      if (id == materialNextIndex) {
        window.location.reload();
      } else {
        navigate(`/course-detail/${courseId}/video/${materialNextIndex}`, {
          replace: true,
        });
      }
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

export const allRating = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/ratings`);

    const { data } = response.data;

    dispatch(setRating(data));
  } catch (error) {
    alert(error.message);
  }
};

export const createRating =
  (course_id, user_id, rating) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      await axios.post(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/ratings/create`,
        {
          course_id,
          user_id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("kamu sudah memberikan rating pada course ini !");
      // console.log(window.location.pathname);
      window.location.reload();
      // navigate(window.location.pathname, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

export const updateRating =
  (course_id, user_id, rating, id_rating) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      await axios.put(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/ratings/update/${id_rating}`,
        {
          course_id,
          user_id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Terima kasih telah memberikan nilai pada course ini");
      // console.log(window.location.pathname);
      // navigate(window.location.pathname);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

export const removeMyCourse = () => async (dispatch) => {
  dispatch(setMyCourse(null));
};

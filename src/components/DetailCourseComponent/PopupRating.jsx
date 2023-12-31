import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createRating, updateRating } from "../../redux/actions/courseActions";
import { cn } from "../../libs/utils";

const PopupRating = ({ isPopupRating, handleRating }) => {
  const [ratings, setRatings] = useState(null);
  const [hover, setHover] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { rating } = useSelector((state) => state.course);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const ratingThisCourse = rating.find(
      (rate) => rate.course_id == courseId && rate.user_id === user.id
    );

    const validate = await Swal.fire({
      title: "Beri Rating",
      text: `Apakah anda yakin akan memberikan nilai  ${ratings} pada course ini ?`,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      customClass: {
        // Tambahkan kelas CSS khusus
        confirmButton: "custom-save-button",
      },
    });

    if (validate.isConfirmed) {
      // cek apakah sudah pernah memberi nilai atau belum
      if (
        ratingThisCourse &&
        rating.find(
          (rate) => rate.course_id == courseId && rate.user_id === user.id
        )
      ) {
        dispatch(
          updateRating(+courseId, user.id, ratings, ratingThisCourse.id)
        );
      } else {
        dispatch(createRating(+courseId, user.id, ratings));
      }
      handleRating();
    }
  };

  return (
    <div
      className={cn(
        "bg-black/60 z-50 fixed top-0 left-0 right-0 bottom-0",
        !isPopupRating && "hidden"
      )}
    >
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-fit bg-white rounded-lg flex justify-center items-center flex-col p-3 relative">
          <div
            className="absolute top-2 right-2 cursor-pointer hover:bg-primary hover:text-white rounded-full duration-300"
            onClick={() => {
              handleRating();
            }}
          >
            <IoMdClose size={24} />
          </div>
          {/* content */}
          <div className="p-3 ">
            <h1 className="text-center font-semibold mb-3">
              Berikan Nilaimu Untuk Course Ini{" "}
            </h1>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((star, i) => {
                const currentRating = i + 1;
                return (
                  <label className="flex" key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRatings(currentRating)}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer"
                      size={30}
                      color={
                        currentRating <= (hover || ratings)
                          ? "#ffc107"
                          : "e4e5e9"
                      }
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <div className="mt-4">
              Nilaimu terhadap course ini adalah {ratings}
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-200 py-1 px-3 font-medium rounded-lg duration-300 transition-all hover:bg-black hover:text-blue-200 hover:-translate-y-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PopupRating.propTypes = {
  isPopupRating: PropTypes.bool,
  handleRating: PropTypes.func,
  courseId: PropTypes.string,
};
export default PopupRating;

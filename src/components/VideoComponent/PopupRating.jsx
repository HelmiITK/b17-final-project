import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { cn } from "../../libs/utils";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const PopupRating = ({ isPopupRating, handleRating }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const validate = confirm(
      `Apakah anda yakin akan memberikan nilai  ${rating} pada course ini ?`
    );
    if (validate) {
      alert("ayam");

      window.location.reload();
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
                      onClick={() => setRating(currentRating)}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer"
                      size={30}
                      color={
                        currentRating <= (hover || rating)
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
              Nilaimu terhadap course ini adalah {rating}
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={handleSubmit}
                className="bg-violet-200 py-1 px-3 font-medium rounded-lg duration-300 transition-all hover:bg-black hover:text-violet-200 hover:-translate-y-2"
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

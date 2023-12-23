import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { cn } from "../../libs/utils";

const PopupFinishCourse = ({ isPopupFinish, handlePopupFinish }) => {
  return (
    <div
      className={cn(
        "bg-black/60 z-50 fixed top-0 left-0 right-0 bottom-0",
        !isPopupFinish && "hidden"
      )}
    >
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-fit bg-white rounded-lg flex justify-center items-center flex-col p-3 relative">
          <div
            className="absolute top-2 right-2 cursor-pointer hover:bg-primary hover:text-white rounded-full duration-300"
            onClick={handlePopupFinish}
          >
            <IoMdClose size={24} />
          </div>
          {/* content */}
          <div className="p-3 ">
            <h1 className="text-center font-semibold mb-3">Ciee dah beres</h1>
            <div className="flex items-center justify-center">
              Selamat karena anda telah menyelesaikan course ini
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="bg-violet-200 py-1 px-3 font-medium rounded-lg duration-300 transition-all hover:bg-black hover:text-violet-200 hover:-translate-y-2"
                onClick={handlePopupFinish}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PopupFinishCourse.propTypes = {
  isPopupFinish: PropTypes.bool,
  handlePopupFinish: PropTypes.func,
  courseId: PropTypes.string,
};
export default PopupFinishCourse;

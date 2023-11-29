import PropTypes from "prop-types";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";

// isi dari setiap chapter
const ChapterItem = ({ chapter, isActive }) => {
  return (
    <div>
      <div className="flex justify-between mt-3">
        <div className="flex items-center w-full">
          <div className="aspect-square w-6 md:w-8 rounded-full flex items-center justify-center bg-slate-200">
            <p className=" text-[10px] text-xs font-bold">{1}</p>
          </div>
          <div className="mx-2 w-full">
            <p className="text-xs md:text-sm font-semibold">{chapter}</p>
          </div>
        </div>
        <div className="mr-3 flex m-auto">
          <span>
            {isActive ? (
              <FaRegPauseCircle />
            ) : (
              <FaCirclePlay className="h-5 w-5" color="#73CA5C" />
            )}
          </span>
        </div>
      </div>
      <hr className="mt-2 shadow-md" />
    </div>
  );
};

ChapterItem.propTypes = {
  chapter: PropTypes.string,
  isActive: PropTypes.bool,
};

export default ChapterItem;

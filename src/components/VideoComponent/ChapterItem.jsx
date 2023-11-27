import PropTypes from "prop-types";
import { FaCirclePlay } from "react-icons/fa6";

const ChapterItem = ({ chapter }) => {
  return (
    <div>
      <div className="flex justify-between mt-3">
        <div className="flex items-center w-full">
          <div className="aspect-square w-8 rounded-full flex items-center justify-center bg-slate-200">
            <p className=" text-xs font-bold">{1}</p>
          </div>
          <div className="mx-2 w-full">
            <p className="text-sm font-semibold">{chapter}</p>
          </div>
        </div>
        <div className="mr-3 flex m-auto">
          <span>
            <FaCirclePlay className="h-5 w-5" color="#73CA5C" />
          </span>
        </div>
      </div>
      <hr className="mt-2 shadow-md" />
    </div>
  );
};

ChapterItem.propTypes = {
  chapter: PropTypes.string,
};

export default ChapterItem;

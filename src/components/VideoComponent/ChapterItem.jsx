import PropTypes from "prop-types";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";
import { cn } from "../../libs/utils";
import { useNavigate, useParams } from "react-router-dom";

// isi dari setiap chapter
const ChapterItem = ({ chapter, isActive, numb }) => {
  // untuk mengambil lokasi course saat ini
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        // navigate ke video lain ketika user mengklik salah satu chapter item
        navigate(`/course-detail/${courseId}/video/${chapter.id}`);
      }}
    >
      <div className="flex justify-between mt-3">
        <div className="flex items-center w-full">
          <div className="aspect-square w-6 md:w-8 rounded-full flex items-center justify-center bg-slate-200">
            <p className=" text-[10px] text-xs font-bold">{numb}</p>
          </div>
          <div className="mx-2 w-full  duration-300 transition-all">
            <p
              className={cn(
                "text-xs md:text-sm font-semibold",
                isActive && "underline"
              )}
            >
              {chapter.title}
            </p>
          </div>
        </div>
        <div className="mr-3 flex m-auto">
          <span className="">
            {isActive ? (
              <FaRegPauseCircle className="h-5 w-5" color="#73CA5C" />
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
  chapter: PropTypes.object,
  isActive: PropTypes.bool,
  numb: PropTypes.number,
};

export default ChapterItem;

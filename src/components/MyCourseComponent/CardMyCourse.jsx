import { Book, Clock, Gem, Shield } from "lucide-react";
import Progressbar from "./ProgressBar";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../libs/formatToIDR";
import { useEffect, useState } from "react";
import { getCategory } from "../../redux/actions/categoryActions";
// card course
const Card = ({ course, rating }) => {
  const [checkMycourse, setCheckMycourse] = useState(false);
  const { mycourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { category } = useSelector((state) => state.category);
  let categoryName = "";

  if (category.length > 0) {
    const foundCategory = category.find(
      (cat) => cat.id === course?.category_id
    );
    if (foundCategory) {
      categoryName = foundCategory.title;
    }
  }

  // pengecekan apakah course yg ada di home sudah user beli atau belum
  useEffect(() => {
    if (mycourse) {
      const y = mycourse.find((item) => item.course.id == course.id);
      setCheckMycourse(y);
    }
  }, [mycourse, course]);

  return (
    <Link to={`/course-detail/${course.id}`}>
      <div className="w-full bg-white rounded-lg overflow-hidden pb-3">
        <div className="flex flex-col">
          <div>
            <img
              src={course.thumbnail}
              alt="ayam"
              className="overflow-hidden w-full h-28 object-cover"
            />
          </div>
          <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
            <div className="flex justify-between items-center">
              <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                {categoryName}
              </h1>
              <p className="flex items-center font-semibold">
                <span className="mr-1 lg:mr-2">
                  <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" />
                </span>
                {rating ? rating.toFixed(1) : 0}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider line-clamp-1">
                {course.title}
              </h3>
              <div className="mt-3 flex justify-between flex-wrap">
                <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider">
                  <span className="text-green-500 mr-[2.5px]">
                    <Shield size={18} />
                  </span>
                  Level{" "}
                  {course &&
                    course?.level?.charAt(0).toUpperCase() +
                      course?.level?.slice(1)}{" "}
                </p>
                <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                  <span className="text-green-500 mr-[2.5px]">
                    <Book size={18} />
                  </span>{" "}
                  {course && course?.chapters?.length} Modul
                </p>
                <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                  <span className="text-green-500 mr-[2.5px]">
                    <Clock size={18} />
                  </span>{" "}
                  90 Menit
                </p>
              </div>
              {/* ini button ketika sudah beli */}
              {checkMycourse && (
                <div className="mt-4 mb-3">
                  <Progressbar
                    percentage={checkMycourse.progressPercentage.toFixed()}
                  />
                </div>
              )}
              {/* ini button ketika premium dan belum beli */}
              {!checkMycourse && (
                <div className="flex">
                  <div className="my-2 mx-2">
                    <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs  items-center flex justify-between">
                      <span className="mr-2">
                        <Gem size={16} />
                      </span>{" "}
                      {course &&
                        course?.type_course?.charAt(0).toUpperCase() +
                          course?.type_course?.slice(1)}
                    </button>
                  </div>
                  {/* button ketika mau beli (ada harganya) */}
                  <div className="my-2">
                    <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs  items-center flex justify-between">
                      {formatPrice(course.price)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  course: PropTypes.any,
  rating: PropTypes.number,
};

export default Card;

import { Book, Clock, Shield } from "lucide-react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../redux/actions/categoryActions";
import { Link } from "react-router-dom";
import { formatDate } from "../../libs/formatDate";

const CardHistory = ({ course }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { category } = useSelector((state) => state.category);
  let categoryName = "";

  if (category.length > 0) {
    const foundCategory = category.find(
      (cat) => cat.id === course?.course?.category_id
    );
    if (foundCategory) {
      categoryName = foundCategory.title;
    }
  }

  const { materials } = course && course.course;
  const totalTime = materials.reduce((total, material) => {
    return total + material.duration_in_minutes;
  }, 0);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden pb-3 border border-color-primary">
      <div className="flex flex-col">
        <div>
          <img
            src={
              "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="thumbnail"
            className="overflow-hidden w-full h-24 object-cover"
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
              {course.averageRating ? course.averageRating.toFixed(1) : 0}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider line-clamp-1">
              {course?.course?.title}
            </h3>
            <div className="mt-3 flex justify-between flex-wrap">
              <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider">
                <span className="text-green-500 mr-[2.5px]">
                  <Shield size={18} />
                </span>{" "}
                Level{" "}
                {course &&
                  course.course?.level?.charAt(0).toUpperCase() +
                    course.course?.level?.slice(1)}{" "}
              </p>
              <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                <span className="text-green-500 mr-[2.5px]">
                  <Book size={18} />
                </span>
                {course && course?.course?.chapters?.length} Modul
              </p>
              <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                <span className="text-green-500 mr-[2.5px]">
                  <Clock size={18} />
                </span>{" "}
                {totalTime.toFixed()} Menit
              </p>
            </div>
            <div className="mt-2">
              <p className="text-[12px] font-medium -tracking-wider">
                Dienroll pada :{" "}
                <span className=" italic ">
                  {" "}
                  {formatDate(course?.enrolled_at)}{" "}
                </span>
              </p>
            </div>
            <Link to={`/course-detail/${course.course.id}`}>
              <div className="bg-primary text-white rounded-lg mt-2 hover:bg-white hover:text-color-primary  transition-all border border-color-primary">
                <button className="font-medium tracking-wider text-center w-full p-1 text-sm">
                  Lihat Kelas
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CardHistory.propTypes = {
  course: PropTypes.any,
};

export default CardHistory;

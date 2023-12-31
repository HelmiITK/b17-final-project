import { Book, Clock, Gem, Shield } from "lucide-react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Progressbar from "../MyCourseComponent/ProgressBar";
import { formatPrice } from "../../libs/formatToIDR";

const CardCourse = ({ course }) => {
  const { category } = useSelector((state) => state.category);
  const { mycourse } = useSelector((state) => state.course);

  // melakukan pelacakan apakah di redux category dan course terdapat kategori berdasarkan id yang sama
  const matchedCategory = category.find((cat) => cat.id === course.category_id);
  const [checkMycourse, setCheckMycourse] = useState(false);
  // Periksa apakah kategori yang sesuai ditemukan
  const categoryName = matchedCategory
    ? matchedCategory.title
    : "Unknown Category";

  // pengecekan apakah course yg ada di home sudah user beli atau belum
  useEffect(() => {
    if (mycourse) {
      const y = mycourse.find((item) => item.course.id == course.id);
      setCheckMycourse(y);
    }
  }, [mycourse, course]);

  // cari total durasi tiap course
  const totalTime = course?.materials.reduce((total, material) => {
    return total + material.duration_in_minutes;
  }, 0);

  return (
    <div className="">
      <div className="w-full mt-6 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3 hover:scale-105 duration-300">
        <Link to={`/course-detail/${course.id}`}>
          <div className="flex flex-col">
            <div>
              <img
                src={course.thumbnail}
                alt={categoryName}
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
                  {course.averageRating ? course.averageRating.toFixed(1) : 0}
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
                    </span>{" "}
                    Level{" "}
                    {course?.level?.charAt(0).toUpperCase() +
                      course?.level?.slice(1)}{" "}
                  </p>
                  <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                    <span className="text-green-500 mr-[2.5px]">
                      <Book size={18} />
                    </span>{" "}
                    {course.chapters.length} Modul
                  </p>
                  <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                    <span className="text-green-500 mr-[2.5px]">
                      <Clock size={18} />
                    </span>{" "}
                    {totalTime.toFixed()} Menit
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
                      <button className="py-1 px-4 bg-blue-400 cursor-default text-white font-semibold rounded-xl text-xs items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        {course?.type_course?.charAt(0).toUpperCase() +
                          course?.type_course?.slice(1)}{" "}
                      </button>
                    </div>
                    {/* button ketika mau beli (ada harganya) */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400 cursor-default text-white font-semibold rounded-xl text-xs items-center flex justify-between">
                        {formatPrice(course.price)}
                      </button>
                    </div>
                  </div>
                )}
                {/* Ini untuk riwayat dan status bayarnya belum bayar */}
                {/* <div className="my-2">
                <button className="py-1 px-4 bg-red-500  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  <span className="mr-2">
                    <Gem size={16} />
                  </span>{" "}
                  Waiting for payment
                </button>
              </div> */}
                {/* Ini untuk riwayat dan status bayarnya udah bayar */}
                {/* <div className="my-2">
                <button className="py-1 px-4 bg-green-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  <span className="mr-2">
                    <Gem size={16} />
                  </span>{" "}
                  Paid
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardCourse;

CardCourse.propTypes = {
  course: PropTypes.object,
};
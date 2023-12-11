import { PiShieldStarBold } from "react-icons/pi";
import { RiBook3Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../redux/actions/categoryActions";

// isinya info tentang course, kyk judul, rating, kategori, dll
const InfoCourse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  // ambil detail dataa untuk ditampilkan disini
  const { detail } = useSelector((state) => state.course);
  // ambil title dari kategori
  const { category } = useSelector((state) => state.category);
  const categoryName = category.find((cat) => cat.id === detail.category_id);

  return (
    <div className="mx-4 md:mx-0">
      <div className="flex justify-between items-center">
        <h1 className="text-color-primary font-semibold text-base md:text-lg">
          {categoryName?.title}
        </h1>
        <p className="flex font-semibold text-sm md:text-base">
          <span className="mr-1 md:mr-2">
            <FaStar className=" w-4 h-4 md:w-5 md:h-5" color="#F9CC00" />
          </span>
          5.0
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-sm md:text-base -tracking-wide ">
          {detail.title}
        </h3>
        <div className="mt-3 w-full md:w-11/12 lg:w-10/12">
          <div className="w-full flex justify-between">
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <PiShieldStarBold size={24} />
              </span>{" "}
              Level{" "}
              {detail?.level?.charAt(0).toUpperCase() + detail?.level?.slice(1)}
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <RiBook3Line size={24} />
              </span>{" "}
              {detail.chapters?.length} Modul
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <FaClock size={24} />
              </span>{" "}
              100 Menit
            </p>
          </div>
        </div>
        <div className="mt-2 md:w-1/2 lg:w-4/12">
          <Link
            to="https://web.telegram.org/a/#-1002032079136"
            target="_blank"
            className="w-full text-xs lg:text-sm py-1 bg-[#73CA5C] text-white font-semibold rounded-full flex justify-center items-center"
          >
            Join Grup Telegram
            <span className="my-auto ml-3">
              <IoIosChatboxes color="white" size={20} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoCourse;

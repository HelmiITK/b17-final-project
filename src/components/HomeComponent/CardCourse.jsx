import { Book, Clock, Gem, Shield } from "lucide-react";
import Progressbar from "../MyCourseComponent/ProgressBar";
import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

const CardCourse = ({ course }) => {
  const { category } = useSelector((state) => state.category);

  // melakukan pelacakan apakah di redux category dan course terdapat kategori berdasarkan id yang sama
  const matchedCategory = category.find((cat) => cat.id === course.category_id);

  // Periksa apakah kategori yang sesuai ditemukan
  const categoryName = matchedCategory ? matchedCategory.title : "Unknown Category"

  return (
    <div className="">
      <div className="w-full mt-3 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3">
        <div className="flex flex-col">
          <div >
            <img
              src={'https://images.unsplash.com/photo-1639477735279-c36dda1f7ebb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
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
                4.8
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider">
                {course.title}
              </h3>
              <div className="mt-3 flex justify-between flex-wrap">
                <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider">
                  <span className="text-green-500 mr-[2.5px]">
                    <Shield size={18} />
                  </span>{" "}
                  {course.level}
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
                  90 Menit
                </p>
              </div>
              {/* ini button ketika sudah beli */}
              <div className="my-2">
                <Progressbar />
              </div>
              {/* Ini button ketika gratis */}
              <div className="my-2">
                <button className="py-1 px-4 bg-primary  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105">
                  Mulai Kelas
                </button>
              </div>
              {/* ini button ketika premium dan belum beli */}
              <div className="my-2">
                <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  <span className="mr-2">
                    <Gem size={16} />
                  </span>{" "}
                  {course.type_course}
                </button>
              </div>
              {/* button ketika mau beli (ada harganya) */}
              <div className="my-2">
                <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  Rp. {course.price}
                </button>
              </div>
              {/* Ini untuk riwayat dan status bayarnya belum bayar */}
              <div className="my-2">
                <button className="py-1 px-4 bg-red-500  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  <span className="mr-2">
                    <Gem size={16} />
                  </span>{" "}
                  Waiting for payment
                </button>
              </div>
              {/* Ini untuk riwayat dan status bayarnya udah bayar */}
              <div className="my-2">
                <button className="py-1 px-4 bg-green-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                  <span className="mr-2">
                    <Gem size={16} />
                  </span>{" "}
                  Paid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCourse;

CardCourse.propTypes = {
  course: PropTypes.object,
}
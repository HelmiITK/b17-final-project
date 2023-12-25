import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProgressCourse from "../../components/VideoComponent/ProgressCourse";
import Main from "../../components/VideoComponent/Main";
import { CiBoxList } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "../../redux/actions/detailActions";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";
import { getMyCourse } from "../../redux/actions/courseActions";
import { ConfettiEffect } from "../../components/FinishCourseComponent/ConfettiEffect";
import PopupFinishCourse from "../../components/FinishCourseComponent/PopupFinishCourse";

const VideoPage = () => {
  // keperluan untuk layar mobile
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupFinish, setIsPopupFinish] = useState(true);
  const { materialId, courseId } = useParams();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const { mycourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  // Ambil API dari komponen dari CardCourse berdasarkan id
  useEffect(() => {
    // get data dari redux
    dispatch(getDetailCourse(courseId, setErrors, errors)).catch((error) => {
      console.error("Error fetching course data:", error);
    });
  }, [courseId]); // lakukan setiap perubahan berdasarkan id

  useEffect(() => {
    // get data dari redux
    dispatch(getMyCourse()).catch((error) => {
      console.error("Error fetching course data:", error);
    });
  }, [dispatch]);

  const courseDetailVideo = mycourse.find(
    (course) => course.course.id == courseId
  );

  const handlePopupFinish = () => {
    setIsPopupFinish(false);
  };

  return (
    <>
      <Navbar />
      {mycourse && courseDetailVideo?.progressPercentage === 100 && (
        <>
          <PopupFinishCourse
            isPopupFinish={isPopupFinish}
            handlePopupFinish={handlePopupFinish}
          />
          {!isPopupFinish && <ConfettiEffect />}
        </>
      )}
      {/* tombol untuk menampilkan/menghilangkan progressCourse */}
      <div className="lg:hidden fixed bottom-2 sm:bottom-4 md:bottom-6 left-[50%] -translate-x-[50%] z-30  duration-300 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-sm font-semibold text-white rounded-md px-4 py-2 flex items-center"
        >
          <span className="mr-2">
            {isOpen ? <IoMdCloseCircleOutline /> : <CiBoxList />}
          </span>{" "}
          {isOpen ? "Close" : "List Course"}
        </button>
      </div>
      {/*  */}
      <div className="flex flex-col items-center">
        <div className="bg-layer w-full h-96 absolute" />
        <div className="z-10 w-full md:w-10/12">
          <div className=" mt-20 md:mt-24">
            {/* Tombol kembali ke halaman kelas */}
            <Link to={`/course-detail/${courseId}`}>
              <h1 className="flex font-semibold text-sm md:text-base items-center hover:underline transition-all duration-300 hover:scale-105">
                <span className="mr-1 block md:mr-2">
                  <ArrowLeft className="w-4 h-4" />
                </span>{" "}
                Kembali
              </h1>
            </Link>
            {/* content */}
            <div className="mx-auto grid grid-cols-3 gap-x-14 md:mt-5">
              {/* main section, isinya video sama deskripsi course */}
              <div className="col-span-3 lg:col-span-2">
                <Main materialId={materialId} myCourse={courseDetailVideo} />
              </div>
              {/* progress course, ada di sebelah kanan */}
              <div className="col-span-3 lg:col-span-1">
                <ProgressCourse isOpen={isOpen} />
              </div>
            </div>
          </div>
        </div>
        {/* background yang beda warna */}
        <div className="bg-layer h-[280px] hidden md:block" />
      </div>
      <Footer />
    </>
  );
};

export default VideoPage;

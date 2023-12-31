import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BiLineChart } from "react-icons/bi";
import { IoDiamondOutline } from "react-icons/io5";
import { BsChatRightQuote } from "react-icons/bs";
import { AiFillPlayCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ClockLoader from "react-spinners/ClockLoader";
import Swal from "sweetalert2";

import { scrollTop } from "../../libs/scrollTop";
import { removeDetail } from "../../redux/reducers/courseReducers";
import { getDetailCourse } from "../../redux/actions/detailActions";
import Navbar from "../../components/NavbarComponent/Navbar";
import { allRating, getMyCourse } from "../../redux/actions/courseActions";
import { cn } from "../../libs/utils";
import ProgressBar from "../../components/MyCourseComponent/ProgressBar";
import Footer from "../../components/FooterComponent/Footer";
import PopupBuy from "../../components/DetailCourseComponent/PopupBuy";
import PopupRating from "../../components/DetailCourseComponent/PopupRating";

const CourseDetail = () => {
  const getRandomLoveCount = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const [loveCount, setLoveCount] = useState(getRandomLoveCount());
  const [isLoved, setIsLoved] = useState(false);
  const [checkMycourse, setCheckMycourse] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isPopupBuy, setIsPopupBuy] = useState(false);
  const [isPopupRating, setIsPopupRating] = useState(false);
  const iconContainerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [loading, setLoading] = useState(false);
  const { detail } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const { mycourse } = useSelector((state) => state.course);
  const { rating } = useSelector((state) => state.course);
  const { chapters, materials } = detail
    ? detail
    : { chapters: [], materials: [] };

  // sorting asc berdasarkan id material
  const sortingAsc = materials && [...materials].sort((a, b) => a.id - b.id);

  // kelompokkan antara chapter dan materialnya
  const chapterWithMaterials = chapters?.map((chapter) => {
    const materialsAtChapter = sortingAsc?.filter(
      (material) => material.chapter_id === chapter.id
    );
    const x = { title: chapter.title, materials: materialsAtChapter };
    return x;
  });
  const handleLoveClick = () => {
    if (isLoved) {
      setLoveCount(loveCount - 1);
    } else {
      setLoveCount(loveCount + 1);
    }
    setIsLoved(!isLoved);
  };

  const handleIconClick = (event) => {
    event.stopPropagation(); // Hentikan penanganan event lebih lanjut
    setIsButtonVisible(true);
  };

  const handleDocumentClick = (event) => {
    const iconContainer = iconContainerRef.current;

    if (iconContainer && !iconContainer.contains(event.target)) {
      setIsButtonVisible(false);
    }
  };

  // untuk menghilangkang popup pembelian
  const handlePopup = () => {
    setIsPopupBuy(false);
  };

  // untuk menghilangkang popup pemberian rating
  const handleRating = () => {
    setIsPopupRating(false);
  };

  // linkref buat onscrol ke home dari footer logo
  const linkRef = useRef(null);

  // back to MainSection when on click logo or text PedjuangIlmu in Footer from homepage
  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Munculkan ikon nonton paling pertama
    setIsButtonVisible(false);

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Ambil API dari komponen dari CardCourse berdasarkan id
  useEffect(() => {
    // loading jalan sembari nunggu data
    setLoading(true);

    // get data dari redux
    dispatch(getDetailCourse(courseId, setErrors, errors))
      .then(() => {
        // data didapat loading berhenti
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setLoading(false);
      });
    scrollTop();
    // Cleanup function untuk menghapus detail saat keluar dari halaman
    return () => {
      dispatch(removeDetail());
    };
  }, [courseId, rating]); // lakukan setiap perubahan berdasarkan id

  useEffect(() => {
    if (user) {
      dispatch(getMyCourse());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(allRating());
  }, [dispatch]);

  // cek apakah course pada halaman ini sudah dibeli oleh user atau belum
  useEffect(() => {
    if (mycourse) {
      const y = mycourse.find((course) => course.course.id == courseId);
      setCheckMycourse(y);
    }
  }, [mycourse, courseId]);

  // sorting asc untuk progressUser agar tau dimana material yang is_completednya false
  const userProgressSort =
    checkMycourse &&
    [...checkMycourse.userProgress].sort(
      (a, b) => a.course_material_id - b.course_material_id
    );

  // ambil data pertama yang is_completednya false
  const materialNotCompleted =
    userProgressSort && userProgressSort.find((y) => y.is_completed === false);

  // conditional click ikut kelas
  const handleFollowClick = () => {
    setIsButtonVisible(false);

    // cek tombol ikuti kelas
    // jika user belum mmebeli kelas maka akan muncul sweetalert
    if (checkMycourse) {
      // jika progressnya dibawah 100, maka cari course yang belum selesai
      if (checkMycourse && checkMycourse.progressPercentage < 100) {
        navigate(
          `/course-detail/${courseId}/video/${materialNotCompleted.course_material_id}`
        );
        // cari course index pertama
      } else {
        navigate(`/course-detail/${courseId}/video/${sortingAsc[0].id}`);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Belum Membeli Kelas",
        text: "Anda belum enroll kelas ini. \n Silahkan enroll terlebih dahulu!",
        customClass: {
          confirmButton: "custom-ok-button", // Tambahkan kelas CSS khusus untuk tombol "Ok"
        },
      });
    }
  };

  return (
    <>
      <PopupBuy
        isPopupBuy={isPopupBuy}
        handlePopup={handlePopup}
        courseId={courseId}
      />

      <PopupRating isPopupRating={isPopupRating} handleRating={handleRating} />
      <Navbar />
      <div className="container mx-auto pt-24" ref={linkRef}>
        <div className="flex flex-row-reverse justify-between mx-3 lg:flex lg:flex-col lg:gap-4">
          <div className="flex flex-row items-center gap-2 lg:mt-2">
            <BiMessageSquareDetail className="text-blue-700 w-10 h-10 lg:w-12 lg:h-12" />
            <h1 className="text-2xl font-bold text-blue-800 lg:text-3xl">
              Detail Kelas
            </h1>
          </div>
          <Link
            to={"/"}
            className="flex items-center gap-2 mx-2 hover:text-color-primary lg:text-lg"
          >
            <IoMdArrowRoundBack />
            <p>Kembali Ke Beranda</p>
          </Link>
        </div>
        <div className="flex flex-col">
          {loading ? (
            <ClockLoader
              className="absolute top-10 left-1/2 mb-20 lg:left-[700px]"
              color="#003E9C"
              size={50}
              speedMultiplier={2}
            />
          ) : (
            <>
              <div className="mx-4 mt-4 lg:flex lg:flex-row lg:gap-4">
                <div className="border-none p-3 bg-blue-600 h-full rounded-lg shadow-lg shadow-slate-600 flex flex-col gap-3 lg:w-1/2">
                  <img
                    src={detail.thumbnail}
                    alt={detail.title}
                    className="rounded-lg shadow-lg shadow-slate-700"
                  />
                  {/* grup love dan rating */}
                  <div className="flex justify-between">
                    <div className="flex flex-row gap-8 mt-4 md:mt-4 md:gap-3">
                      <button
                        className="flex items-center gap-2 text-white md:w-24 lg:mb-6"
                        onClick={handleLoveClick}
                      >
                        {isLoved ? (
                          <AiFillHeart className="mr-1 ml-4 w-8 h-8 text-red-600 lg:w-10 lg:h-10" />
                        ) : (
                          <AiOutlineHeart className="mr-1 ml-4 text-white w-8 h-8 lg:w-10 lg:h-10" />
                        )}
                        {loveCount}
                      </button>
                      {/* rating button */}
                      <div className="">
                        {user &&
                          !!rating.find(
                            (rate) =>
                              rate.course_id == courseId &&
                              rate.user_id == user.id
                          ) &&
                          !!checkMycourse && (
                            <div>
                              <button
                                onClick={() => setIsPopupRating(true)}
                                className="bg-blue-100 w-fit p-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-color-primary duration-200 group"
                              >
                                <FaStar className="text-yellow-500 w-6 h-6 group-hover:text-yellow-400 duration-200" />
                                Ubah Rating
                              </button>
                            </div>
                          )}
                        {user &&
                          !rating.find(
                            (rate) =>
                              rate.course_id == courseId &&
                              rate.user_id == user.id
                          ) &&
                          !!checkMycourse && (
                            <button
                              onClick={() => setIsPopupRating(true)}
                              className="bg-blue-100 w-fit p-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-color-primary duration-200 group"
                            >
                              <FaStar className="text-yellow-500 w-6 h-6 group-hover:text-yellow-400 duration-200" />
                              Beri Rating
                            </button>
                          )}
                      </div>
                    </div>
                    <div className="  mr-3 my-auto">
                      <p className="flex text-base font-semibold items-center text-white">
                        <span className="mr-2">
                          <FaStar className="text-yellow-500 w-6 h-6 group-hover:text-yellow-400 duration-200" />
                        </span>{" "}
                        {detail.averageRating
                          ? detail?.averageRating?.toFixed(1)
                          : 0}
                      </p>
                    </div>
                  </div>

                  {/* ini ada di mode hp dan tablet */}
                  <div className="flex flex-row justify-between my-5 lg:hidden">
                    <div className="ml-4 mr-6 flex flex-col gap-2">
                      <h2 className="text-xl font-semibold text-white">
                        {detail.title}
                      </h2>
                      <div
                        className={`${
                          isButtonVisible ? "scale-x-95" : "scale-x-100"
                        } transition-all duration-500 ease-out`}
                        ref={iconContainerRef}
                      >
                        {isButtonVisible ? (
                          <button
                            className=" w-full transform border mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:text-blue-600 hover:bg-yellow-400 duration-200"
                            onClick={handleFollowClick}
                          >
                            {checkMycourse &&
                            checkMycourse.progressPercentage > 0
                              ? "Lanjutkan Belajar"
                              : "Ikuti Kelas"}
                          </button>
                        ) : (
                          <AiFillPlayCircle
                            className="text-white mt-4 w-20 h-20 hover:text-yellow-400 cursor-pointer animate-pulse shadow-md rounded-full duration-200"
                            onClick={handleIconClick}
                          />
                        )}
                      </div>
                    </div>
                    <div className="mr-4 flex flex-col gap-4 mt-2">
                      <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-cyan-500">
                        <BiSolidCategoryAlt className="w-8 h-8 text-white" />
                        {detail && detail.Category && (
                          <p className="text-sm text-white capitalize">
                            {detail.Category.title}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-red-400">
                        <BiLineChart className="w-5 h-5 text-white" />
                        <p className="text-sm text-white capitalize">
                          {detail.level}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-blue-400">
                        <IoDiamondOutline className="text-white w-5 h-5" />
                        <p className="text-sm text-white capitalize">
                          {detail.type_course}
                        </p>
                      </div>
                      {user && !checkMycourse && (
                        <div className="flex flex-row mt-4 items-center gap-2 border p-2 rounded-lg bg-color-primary w-full shadow-md ">
                          <button
                            onClick={() => setIsPopupBuy(true)}
                            className="text-base font-semibold text-white capitalize text-center w-full hover:scale-105 duration-300 transition-all"
                          >
                            Enroll Kelas
                          </button>
                        </div>
                      )}
                      {/* jika user login dan udh beli course */}
                      {user && checkMycourse && (
                        <div className="border mt-4 p-2 rounded-lg w-full shadow-md ">
                          <ProgressBar
                            percentage={
                              checkMycourse &&
                              checkMycourse.progressPercentage.toFixed()
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* target pada siapa kelas ini dituju */}
                  <div className="mx-4 flex flex-col gap-3 border-none p-4 rounded-lg mb-4 shadow-md bg-primary bg-opacity-40">
                    <div className="text-white">
                      <h2 className="font-semibold text-base">
                        Persiapan Sebelum Kelas :
                      </h2>
                      <ol className="list-decimal ml-4 text-sm flex flex-col gap-1">
                        {detail.prerequisite &&
                          detail.prerequisite.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ol>
                    </div>
                    <div className="text-white">
                      <h2 className="font-semibold text-base">
                        Kelas Ditujukan Untuk :
                      </h2>
                      <ol className="list-decimal ml-4 text-sm flex flex-col gap-1">
                        {detail.target_audience &&
                          detail.target_audience.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* ini mode laptop */}
                <div className="my-7 rounded-lg p-2 flex flex-col gap-2 lg:w-1/2 lg:my-0">
                  <div>
                    <h2 className="hidden text-3xl lg:block mb-4 font-medium underline">
                      {detail.title}
                    </h2>
                  </div>
                  <div className="flex flex-row gap-2">
                    <BsChatRightQuote className="w-8 h-8 " />
                    <h2 className="font-semibold text-lg mb-2 lg:text-2xl">
                      Tentang Kelas
                    </h2>
                  </div>
                  <p className="text-sm first-letter:text-3xl tracking-wider lg:text-base text-justify">
                    {detail.description}
                  </p>

                  {/* ada di mode laptop */}
                  <div className="hidden lg:flex lg:flex-col mt-4">
                    <div className="relative border-none border-blue-600 rounded-xl shadow-md shadow-slate-200 p-4 max-w-2xl h-auto">
                      <div className="flex flex-col gap-3 mb-4">
                        <h2>Kategori Kelas</h2>
                        <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-cyan-500 w-1/2 shadow-md">
                          <BiSolidCategoryAlt className="w-8 h-8 text-white" />
                          {detail && detail.Category && (
                            <p className="text-base font-semibold text-white capitalize">
                              {detail.Category.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mb-4">
                        <h2>Tingkat Kesulitan</h2>
                        <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-red-400 w-1/2 shadow-md">
                          <BiLineChart className="w-8 h-8 text-white" />
                          <p className="text-base font-semibold text-white capitalize">
                            {detail.level}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2>Tipe Kelas</h2>
                        <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-blue-400 w-1/2 shadow-md">
                          <IoDiamondOutline className="text-white w-8 h-8" />
                          <p className="text-base font-semibold text-white capitalize">
                            {detail.type_course}
                          </p>
                        </div>
                        {/* tombol beli kelas (sementara disini dulu) */}
                        {/* jika user login dan belum beli */}
                        {user && !checkMycourse && (
                          <div className="flex flex-row mt-4 items-center gap-2 border p-2 rounded-lg bg-color-primary w-1/2 shadow-md hover:scale-105 duration-300 transition-all">
                            <button
                              onClick={() => setIsPopupBuy(true)}
                              className="text-base font-semibold text-white capitalize text-center w-full "
                            >
                              Enroll Kelas
                            </button>
                          </div>
                        )}
                        {/* jika user login dan udh beli course */}
                        {user && checkMycourse && (
                          <div className="border mt-4 p-2 rounded-lg w-1/2 shadow-md hover:scale-105 duration-300 transition-all">
                            <ProgressBar
                              percentage={
                                checkMycourse &&
                                checkMycourse.progressPercentage.toFixed()
                              }
                            />
                          </div>
                        )}
                      </div>
                      {/* button video kelas mode laptop */}
                      <div
                        className={`${
                          isButtonVisible ? "scale-y-95" : "scale-y-105"
                        } transition-all duration-500 ease-out`}
                        ref={iconContainerRef}
                      >
                        {isButtonVisible ? (
                          <button
                            // disabled={!checkMycourse}
                            className={cn(
                              "font-medium absolute bottom-24 lg:right-[17px] xl:right-[60px] border border-blue-600 bg-white py-2 px-4 w-44 rounded-xl text-lg text-blue-600 hover:bg-primary hover:text-white duration-200"
                            )}
                            onClick={handleFollowClick}
                          >
                            {checkMycourse &&
                            checkMycourse.progressPercentage > 0
                              ? "Lanjutkan Belajar"
                              : "Ikuti Kelas"}
                          </button>
                        ) : (
                          <AiFillPlayCircle
                            className="text-blue-600 -top-48 absolute lg:right-5 xl:-top-56 xl:right-20 w-40 h-40 hover:text-yellow-400 cursor-pointer animate-pulse shadow-md rounded-full"
                            onClick={handleIconClick}
                          />
                        )}
                      </div>
                      {/* alur kelas mode laptop */}
                      <div className="mx-2 mt-4 border-none shadow-md shadow-slate-300 p-4 rounded-md mb-4">
                        <h2 className="text-color-primary">
                          Materi yang akan didapatkan di kelas ini :{" "}
                        </h2>
                        {chapterWithMaterials?.map((chapter, i) => (
                          <div key={i}>
                            <div>
                              <h1 className="font-semibold text-lg">
                                {chapter.title}
                              </h1>
                              <ul>
                                {chapter?.materials?.map((material) => (
                                  <li
                                    className="list-decimal ml-4"
                                    key={material.id}
                                  >
                                    {material.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* alur kelas mobile dan tablet */}
              <div className="mx-5 border-none shadow-md shadow-slate-300 p-4 rounded-md mb-4 lg:hidden">
                <h2>Kelas yang akan dipelajari : </h2>
                {chapterWithMaterials?.map((chapter, i) => (
                  <div key={i}>
                    <div>
                      <h1 className="font-semibold text-lg">{chapter.title}</h1>
                      <ul>
                        {chapter?.materials?.map((material) => (
                          <li className="list-decimal ml-4" key={material.id}>
                            {material.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer linkRef={linkRef} goto={goto} />
    </>
  );
};

export default CourseDetail;

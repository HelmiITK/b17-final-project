import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsEmojiFrownFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbDatabaseSearch } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import ClockLoader from "react-spinners/ClockLoader";

import { getSearchCourses } from "../../redux/actions/searchActions";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";

const SearchCourse = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);

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

  const { searching } = useSelector((state) => state.search);
  console.log(searching);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    // loading jalan sembari nunggu data
    setLoading(true);

    dispatch(getSearchCourses(errors, setErrors, search, page)).then(() => {
      // data didapat loading berhenti
      setLoading(false);
    });
  }, [dispatch, search, page]);

  return (
    <>
      <Navbar />
      <div className="pt-24 container mx-auto" ref={linkRef}>
        <div className="mx-4">
          {/* header judul dan button kembali */}
          <div className="flex justify-between lg:mt-2">
            <Link
              to={"/"}
              className="flex items-center gap-2 hover:text-color-primary"
            >
              <IoMdArrowRoundBack />
              <h2>Kembali Ke Beranda</h2>
            </Link>
            <div className="flex items-center sm:gap-1 md:gap-2 text-color-primary">
              <TbDatabaseSearch className="w-12 h-12" />
              <h2 className="font-bold text-2xl text-left">Pencarian Mu</h2>
            </div>
          </div>
          {/* header yang kamu cari */}
          <div className="mt-4 border-2 border-slate-200 rounded-lg p-4 w-auto shadow-md mb-10">
            <h2 className="text-base">
              Pencarian Anda :{" "}
              <span className="font-light italic">{`"${search}"`}</span>
            </h2>
          </div>
        </div>

        {/* Sembari nunggu data dari Database datang loading dulu yh 🙏 */}
        {loading ? (
          <ClockLoader
            className="absolute top-10 inset-1/2 mb-20 lg:left-[700px]"
            color="#003E9C"
            size={50}
            speedMultiplier={2}
          />
        ) : // Cek apakah data ada
        errors?.isError ? (
          <div className="flex flex-col gap-4 my-16 items-center">
            <BsEmojiFrownFill className="w-24 h-24 drop-shadow-lg rounded-full shadow-lg animate-pulse" />
            <h2 className="font-semibold text-lg">Data Tidak Tersedia</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {searching &&
              searching.map((course) => (
                <div key={course?.id} className="mx-4 mb-8 relative">
                  <div className="lg:border-2 rounded-2xl p-4 group bg-primary drop-shadow-xl shadow-xl hover:scale-105 duration-300 lg:border-color-secondary lg:bg-white lg:hover:bg-primary">
                    {/* konten judul dan gambar mobile */}
                    <Link
                      to={`/course-detail/${course?.id}`}
                      className="flex lg:hidden flex-col items-center gap-4 text-center"
                    >
                      <h2 className="text-white font-medium text-base lg:text-slate-800 lg:underline lg:group-hover:text-white">
                        {course?.title}
                      </h2>
                      <img
                        src={course?.thumbnail}
                        alt={course?.title}
                        className="rounded-lg duration-300 object-fill h-80 w-full"
                      />
                    </Link>
                    {/* konten judul dan gambar latop */}
                    <div
                      to={`/course-detail/${course?.id}`}
                      className="hidden lg:flex flex-col items-center gap-4 text-center"
                    >
                      <h2 className="text-white font-medium text-base lg:text-slate-800 lg:underline lg:group-hover:text-white">
                        {course?.title}
                      </h2>
                      <img
                        src={course?.thumbnail}
                        alt={course?.title}
                        className="rounded-lg duration-300 object-fill h-80 w-full"
                      />
                    </div>
                    {/* konten button detail kelas ketika di hover laptop*/}
                    <div className="hidden lg:block">
                      <Link
                        to={`/course-detail/${course?.id}`}
                        className="absolute bottom-1 left-6 transform -traslate-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button className="bg-green-600 shadow-md text-white hover:bg-green-800 duration-150 px-2 py-2 rounded-md w-44 h-10 flex flex-row items-center gap-1 justify-center">
                          <TbReportSearch className="w-8 h-8" />
                          <p className="text-lg font-medium">Detail Kelas</p>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer linkRef={linkRef} goto={goto} />
    </>
  );
};

export default SearchCourse;

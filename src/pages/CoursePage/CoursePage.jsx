// import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";
import {
  getCourseWithFilter,
  getMyCourse,
  getPagesCourse,
} from "../../redux/actions/courseActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";
import { cn } from "../../libs/utils";
import { scrollTop } from "../../libs/scrollTop";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { pageCourse } = useSelector((state) => state.course);

  // loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);
  // const [isLoadingInfinite, setIsLoadingInfinite] = useState(true);

  // keperluan infinite loop
  const [pages, setPages] = useState(1);

  // ambil kategori yang dipencet dari home
  const { state } = useLocation();
  const data = ["All", "Kelas Premium", "Kelas Gratis"];

  // variabl untuk filtering
  const [category, setCategory] = useState(state ? [state.categoryId] : []);
  const [level, setLevel] = useState([]);
  const [typeCourse, setTypeCourse] = useState("");

  // ambil data kategori dari api lewat redux
  useEffect(() => {
    setIsLoadingCat(true);
    dispatch(getCategory()).then(() => setIsLoadingCat(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPagesCourse());
  }, [dispatch]);
  // ambil data dari sideFilter untuk keperluan filtering
  const handleCategory = (x) => {
    setCategory(x);
  };

  const handleLevel = (x) => {
    setLevel(x);
  };

  // ambil data dari filtering yang ada di Main
  // memberi value berdasarkan nilai flag pada component mycourse/main
  const getFilterFromMain = (x) => {
    if (x === 0) {
      setTypeCourse("");
    } else if (x === 1) {
      setTypeCourse("premium");
    } else if (x === 2) {
      setTypeCourse("free");
    }
  };
  // data id kategori yang diceklis, diubah menjadi string sesuai dengan ketentuan api
  const stringCategory = category
    .map((item) => encodeURIComponent(item))
    .join("%2C");

  const stringLevel = level.map((item) => encodeURIComponent(item)).join("%2C");

  // ambil data course dari api lewat redux
  useEffect(() => {
    // kondisi ini digunakan untuk mengecek apakah ada filtering atau tidak
    // disini juga di cek apakah course hasil filter panjangnya lebih dari 10 atau tidak
    if ((stringCategory || stringLevel) && course?.length < 10) {
      // set jadi 1 karena harus akses page 1 terlebih dahulu
      setPages(1);
    }
    setIsLoading(true);
    dispatch(
      getCourseWithFilter(pages, stringCategory, stringLevel, typeCourse)
    ).then(() => setIsLoading(false));
    scrollTop();
  }, [dispatch, stringCategory, stringLevel, typeCourse, pages]);

  // mycourse di dispatch agar card bisa membedakan mana yang sudah dibeli user dan belum
  useEffect(() => {
    dispatch(getMyCourse());
  }, [dispatch]);
  // untuk mengarahkan ke page berikutnya
  const handleLoadMoreNext = () => {
    if (pages < pageCourse.totalPages) {
      setPages((prev) => prev + 1);
    } else {
      setPages((prev) => prev);
    }
  };

  // untuk mengarahkan ke page sebelumnya
  const handleLoadMorePrev = () => {
    if (pages > 1) {
      setPages((prev) => prev - 1);
    } else {
      setPages((prev) => prev);
    }
  };
  return (
    <>
      <Navbar />
      {/* tampilan utama */}
      <div className="w-full bg-layer pt-24 lg:pt-28 pb-20">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col items-start justify-between lg:flex lg:flex-col lg:items-start lg:gap-4">
            <Link to={"/"}>
              <h1 className="flex font-medium text-sm md:text-base items-center hover:text-color-primary">
                <span className="mr-1 block md:mr-2">
                  <IoMdArrowRoundBack className="w-4 h-4" />
                </span>{" "}
                Kembali ke Beranda
              </h1>
            </Link>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl mx-auto md:mx-0 mt-4">
              Kelas Berjalan
            </h1>
          </div>
          {/* Content */}
          <div className="mt-6 lg:mt-8">
            <div className="grid grid-cols-3 gap-x-4 lg:gap-x-20">
              <div className="col-span-3 md:col-span-1">
                <SideFilter
                  handleCategory={handleCategory}
                  isLoading={isLoadingCat}
                  handleLevel={handleLevel}
                  categoryFromHome={state?.categoryId}
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <Main
                  data={data}
                  course={course}
                  isLoading={isLoading}
                  getFilterFromMain={getFilterFromMain}
                />
                <div
                  className={cn(
                    "w-full mt-4 justify-center flex"
                    // (stringCategory || stringLevel) && "hidden"
                  )}
                >
                  <button
                    disabled={pages === 1}
                    onClick={handleLoadMorePrev}
                    className={cn(
                      " font-medium text-white bg-primary text-xs rounded-md py-1 px-2 mr-4",
                      pages === 1 && "bg-slate-300 text-slate-500"
                    )}
                  >
                    &lt; prev
                  </button>
                  <p>{pages}</p>
                  <button
                    // cek apakah course yang sudah di filter panjangnya lebih dari 10 atau tidak
                    // jika tidak, maka disable aktif
                    disabled={
                      pages === pageCourse.totalPages || course?.length < 10
                    }
                    onClick={handleLoadMoreNext}
                    className={cn(
                      " font-medium text-white bg-primary text-xs rounded-md py-1 px-2 ml-4",
                      (pages === pageCourse.totalPages ||
                        course?.length < 10) &&
                        "bg-slate-300 text-slate-500"
                    )}
                  >
                    next &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

CoursePage.propTypes = {
  category_id: PropTypes.number,
};

export default CoursePage;

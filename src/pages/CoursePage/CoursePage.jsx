// import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";
import { getCourseWithFilter } from "../../redux/actions/courseActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  // loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);

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
    setIsLoading(true);
    dispatch(getCourseWithFilter(stringCategory, stringLevel, typeCourse)).then(
      () => setIsLoading(false)
    );
  }, [dispatch, stringCategory, stringLevel, typeCourse]);

  return (
    <>
      <Navbar />
      {/* tampilan utama */}
      <div className="w-full bg-layer pt-24 lg:pt-28 pb-20">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col items-start justify-between lg:flex lg:flex-col lg:items-start lg:gap-4">
            <Link to={"/"}>
              <h1 className="flex font-semibold text-sm md:text-base items-center hover:underline transition-all duration-300 hover:scale-105">
                <span className="mr-1 block md:mr-2">
                  <IoMdArrowRoundBack className="w-4 h-4" />
                </span>{" "}
                Kembali ke Beranda
              </h1>
            </Link>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl mx-auto md:mx-0 mt-4">
              Kelas Berjalan
            </h1>

            {/* search bar dikanan */}
            {/* <div className="lg:w-3/12">
              <form className="relative w-full">
                <input
                  type="text"
                  className="rounded-3xl ring-2 ring-color-primary font-semibold pl-6 h-8 lg:h-11 w-full outline-none focus:outline-1  text-black transition-all"
                />
                <span className="text-slate-500 absolute -left-3 lg:left-0 top-2 lg:top-[10px] mx-5 font-semibold px-2 transition duration-200 input-text text-xs md:text-sm lg:text-base">
                  Cari kelas...
                </span>
                <span className="absolute right-2 md:right-5 top-[2.5px] inline-block bg-primary p-2 rounded-xl">
                  <Search className="text-white w-3 h-3 lg:w-5 lg:h-5" />
                </span>
              </form>
            </div> */}
          </div>
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

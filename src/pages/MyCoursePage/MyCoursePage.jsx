// import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";
import {
  getMyCourse,
  getMyCourseWithFilter,
} from "../../redux/actions/courseActions";
import Navbar from "../../components/NavbarComponent/Navbar";

const MyCoursePage = () => {
  const dispatch = useDispatch();
  const { mycourse } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);

  const data = ["All", "In Progress", "Done"];
  const [category, setCategory] = useState([]);
  const [level, setLevel] = useState([]);

  // ambil data kategori dari api lewat redux
  useEffect(() => {
    setIsLoadingCat(true);
    dispatch(getCategory()).then(() => setIsLoadingCat(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsLoadingCat(true);
      dispatch(getMyCourse(user?.id)).then(() => setIsLoadingCat(false));
    }
  }, [dispatch, user]);

  const handleCategory = (x) => {
    setCategory(x);
  };

  const handleLevel = (x) => {
    setLevel(x);
  };

  // data id kategori yang diceklis, diubah menjadi string sesuai dengan ketentuan api
  const stringCategory = category
    .map((item) => encodeURIComponent(item))
    .join("%2C");

  const stringLevel = level.map((item) => encodeURIComponent(item)).join("%2C");
  // ambil data course dari api lewat redux
  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyCourseWithFilter(stringCategory, stringLevel, "")).then(() =>
      setIsLoading(false)
    );
  }, [dispatch, stringCategory, stringLevel]);

  return (
    <>
      <Navbar />
      {/* tampilan utama */}
      <div className="w-full bg-layer pt-24 lg:pt-28 pb-20">
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-sm md:text-xl lg:text-2xl">
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
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <Main
                  data={data}
                  // ERROR HERE
                  course={mycourse && mycourse[0].course}
                  isLoading={isLoading}
                  getFilterFromMain={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCoursePage;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";

import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";
import MainMyCourse from "../../components/MyCourseComponent/MainMyCourse";
import { scrollTop } from "../../libs/scrollTop";
import SideFilter from "../../components/MyCourseComponent/SideFilter";
import {
  getMyCourse,
  getMyCourseWithFilter,
} from "../../redux/actions/courseActions";

const MyCoursePage = () => {
  const dispatch = useDispatch();
  const { mycourse } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);

  const data = ["All", "In Progress", "Done"];
  const [category, setCategory] = useState([]);
  const [level, setLevel] = useState([]);
  const [progress, setProgress] = useState("");
  const [filteringCourse, setFiltertingCourse] = useState(mycourse && mycourse);

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

  // ambil data kategori dari api lewat redux
  useEffect(() => {
    setIsLoadingCat(true);
    dispatch(getCategory()).then(() => setIsLoadingCat(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getMyCourse());
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
    dispatch(getMyCourseWithFilter(stringCategory, stringLevel)).then(() =>
      setIsLoading(false)
    );
    scrollTop();
  }, [dispatch, stringCategory, stringLevel]);

  // untuk filtering in progress / done / all
  const getFilterFromMain = (x) => {
    if (x === 0) {
      setProgress("");
    } else if (x === 1) {
      setProgress("in progress");
    } else if (x === 2) {
      setProgress("done");
    }
  };

  // buat filtering in progress / done / all
  useEffect(() => {
    if (progress === "in progress") {
      setFiltertingCourse(
        mycourse?.filter((course) => course.progressPercentage < 100)
      );
    } else if (progress === "done") {
      setFiltertingCourse(
        mycourse?.filter((course) => course.progressPercentage === 100)
      );
    } else {
      setFiltertingCourse(mycourse);
    }
  }, [progress, mycourse]);

  return (
    <>
      <Navbar />
      {/* tampilan utama */}
      <div className="w-full bg-layer pt-24 lg:pt-28 pb-20" ref={linkRef}>
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-sm md:text-xl lg:text-2xl">
              Kelas Berjalan
            </h1>
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
                <MainMyCourse
                  data={data}
                  course={filteringCourse}
                  isLoading={isLoading}
                  getFilterFromMain={getFilterFromMain}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer linkRef={linkRef} goto={goto} />
    </>
  );
};

export default MyCoursePage;
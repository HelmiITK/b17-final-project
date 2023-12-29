import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import CardCategory from "../../components/HomeComponent/CardCategory";
import ButtonCourse from "../../components/HomeComponent/ButtonCourse";
import CardCourse from "../../components/HomeComponent/CardCourse";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";
import { getCourse, getMyCourse } from "../../redux/actions/courseActions";
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from "react-type-animation";
import { BsChatLeftQuoteFill } from "react-icons/bs";

const HomePage = () => {
  const dispatch = useDispatch();
  // state menyimpan aksi loading animasi
  const [loading, setLoading] = useState(false);

  // ambil data kategori dan course dari redux
  const { category } = useSelector((state) => state.category);
  const { course } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  // state untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // render data
  useEffect(() => {
    // loading jalan sembari nunggu data
    setLoading(true);

    // kirim ke reducer untuk mengambil data yg ada di redux
    dispatch(getCategory());
    dispatch(getCourse(1))
      .then(() => {
        // data di dapat maka loading berhenti
        setLoading(false);
      })
      .catch((error) => {
        // jika terjadi kesalahan hit data debug di sini
        console.error("Error fetching course data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  // ambil data course milik user
  useEffect(() => {
    if (user) {
      dispatch(getMyCourse(user.id));
    }
  }, [dispatch, user]);

  const handleFilterClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredCourses = selectedCategory
    ? course.filter((item) => item.category_id === selectedCategory)
    : course;

  // react slice (carousel) costume Kategori Belajar
  var settingsCategory = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    speed: 800,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2000, // max
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  // react slice (carousel) costume Kursus Populer (button filter)
  var settingsCourse = {
    nextarrow: true,
    infinite: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 2000, // max
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      {/* main section */}
      <div className="w-full h-80 pt-[74px] relative" ref={linkRef}>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="picture"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex flex-col lg:flex lg:flex-row lg:items-start lg:pt-24 lg:justify-between pt-16 pl-10 bg-gradient-to-r from-color-primary h-80 lg:px-40 lg:bg-gradient-to-l">
          <div className="flex flex-col">
            <div>
              <h1 className="font-semibold text-white text-xl">
                Belajar dari <br /> Praktisi Terbaik!
              </h1>
              <p className="hidden lg:block lg:absolute lg:text-4xl lg:top-[155px] lg:left-[280px] animate-pulse">
                💡
              </p>
            </div>
            <NavLink as={Link} to={"/course"} className="mt-4 z-10">
              <button className=" text-color-primary bg-white text-base font-semibold px-2 py-1 rounded-lg w-40 h-9 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white lg:hover:border">
                IKUTI KELAS
              </button>
            </NavLink>
          </div>
          <div className="text-white mt-10 flex flex-row gap-2 items-baseline font-medium tracking-wider lg:text-xl lg:flex-row-reverse">
            <BsChatLeftQuoteFill className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 animate-pulse" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Tidak ada kata terlambat",
                500, // wait 1s before replacing "Mice" with "Hamsters"
                "Untuk belajar",
                500,
                "Perubahan terjadi karena kita mau",
                200,
                "BELAJAR!!!",
                500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>

      {/* Kategori Belajar */}
      <div className="w-full bg-layer lg:h-[350px]">
        <div className="max-w-screen-lg mx-auto">
          <div className="mt-[74px] h-96">
            <h1 className="text-black font-bold text-xl pt-4 pb-1 px-6 md:text-2xl lg:pb-2">
              Kategori Belajar
            </h1>
            {loading ? (
              <ClockLoader
                className="absolute top-20 left-1/2 mb-20 lg:left-[485px]"
                color="#003E9C"
                size={50}
                speedMultiplier={2}
              />
            ) : (
              <Slider
                {...settingsCategory}
                className="lg:px-4 md:overflow-visible"
              >
                {category.map((kategori) => (
                  <div key={kategori.id}>
                    <CardCategory
                      id={kategori.id}
                      img={kategori.thumbnail}
                      title={kategori.title}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>

      {/* Kursus Populer */}
      <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
        {/* title */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl my-4 md:text-2xl">Kursus Populer</h1>
          <Link to={"/course"}>
            <h2 className="text-sm hover:text-color-primary lg:font-medium">
              Lihat Semua
            </h2>
          </Link>
        </div>
        {/* button filter */}
        <Slider {...settingsCourse}>
          {category.map((val) => (
            <ButtonCourse
              key={val.id}
              val={val.title}
              filterItems={() => handleFilterClick(val.id)}
              isActive={selectedCategory === val.id}
            />
          ))}
        </Slider>
        <button
          onClick={() => handleFilterClick("")}
          className="w-full mt-2 lg:mt-4 text-xs font-medium border-none text-white bg-slate-600 cursor-pointer py-2 px-2 rounded-2xl 
                      hover:scale-105 duration-300 hover:bg-primary hover:text-white lg:font-semibold"
        >
          All
        </button>
        {/* card kursus populer */}
        <div className="relative grid gap-6 grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
          {loading ? (
            <ClockLoader
              className="absolute top-10 left-1/2 mb-20 lg:left-[485px]"
              color="#003E9C"
              size={50}
              speedMultiplier={2}
            />
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CardCourse kategori={category} key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 mt-8 mb-4">
              Data tidak tersedia
            </div>
          )}
        </div>
      </div>
      <Footer linkRef={linkRef} goto={goto}/>
    </>
  );
};

export default HomePage;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: window.innerWidth > 1024 ? "block" : "none", // Menampilkan hanya saat lebar layar lebih besar dari 1024px (mode laptop)
        background: "#050642",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: window.innerWidth > 1024 ? "block" : "none",
        background: "#050642",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import CardCategory from "../../components/HomeComponent/CardCategory";
import ButtonCourse from "../../components/HomeComponent/ButtonCourse";
import CardCourse from "../../components/HomeComponent/CardCourse";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/categoryActions";
import { getCourse } from "../../redux/actions/courseActions";

const HomePage = () => {
   const dispatch = useDispatch();

   // ambil data kategori dan course dari redux
   const { category } = useSelector((state) => state.category);
   const { course } = useSelector((state) => state.course);

   // state untuk menyimpan kategori yang dipilih
   const [selectedCategory, setSelectedCategory] = useState('');

   // render data
   useEffect(() => {
      dispatch(getCategory());
      dispatch(getCourse());
   }, [dispatch]);

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
         {/* main section */}
         <div className="w-full pt-[74px] relative h-64" >
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" className="w-full h-full object-cover absolute mix-blend-overlay" />
            <div className="flex flex-col pt-16 pl-10 bg-gradient-to-r from-indigo-600 h-64 lg:items-end lg:pr-40 lg:bg-gradient-to-l">
               <h1 className="font-semibold text-white text-xl">Belajar dari <br /> Praktisi Terbaik!</h1>
               <p className="hidden lg:block lg:absolute lg:text-3xl lg:top-[130px] animate-pulse">💡</p>
               <NavLink as={Link} to={'/'} className="mt-4 z-10">
                  <button className=" text-indigo-600 bg-white text-base font-semibold px-2 py-1 rounded-lg w-40 h-9 hover:scale-110 hover:bg-indigo-600 hover:text-white duration-300 lg:hover:border-white lg:hover:border">
                     IKUTI KELAS
                  </button>
               </NavLink>
            </div>
         </div>

         {/* Kategori Belajar */}
         <div className="w-full bg-layer lg:h-[350px]">
            <div className="max-w-screen-lg mx-auto" >
               <div className="mt-[74px] h-96">
                  <h1 className="text-black font-bold text-xl pt-4 pb-1 px-6 md:text-2xl lg:pb-2">Kategori Belajar</h1>
                  <Slider {...settingsCategory} className="lg:px-4 md:overflow-visible">
                     {category.map((kategori) => (
                        <div key={kategori.id}>
                           <CardCategory
                              // img={kategori.img}
                              title={kategori.title}
                           />
                        </div>
                     ))}
                  </Slider>
               </div>
            </div>
         </div>

         {/* Kursus Populer */}
         <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
            {/* title */}
            <div>
               <h1 className="font-bold text-xl my-4 md:text-2xl">Kursus Populer</h1>
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
               onClick={() => handleFilterClick('')}
               className="w-full mt-2 lg:mt-4 text-xs font-medium border-none text-white bg-slate-600 cursor-pointer py-2 px-2 rounded-2xl 
                           hover:scale-105 duration-300 hover:bg-indigo-600 hover:text-white lg:font-semibold">
               All
            </button>
            {/* card kursus populer */}
            <div className="grid gap-6 grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
               {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                     <CardCourse
                        key={course.id}
                        course={course}
                     />
                  ))
               ) : (
                  <div className="col-span-3 text-center text-gray-500 mt-8 mb-4">
                     Data is Not Found
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default HomePage;

function SampleNextArrow(props) {
   const { className, style, onClick } = props;
   return (
      <div
         className={className}
         style={{
            ...style,
            display: window.innerWidth > 1024 ? 'block' : 'none', // Menampilkan hanya saat lebar layar lebih besar dari 1024px (mode laptop)
            background: "#050642",
            borderRadius: "50%"
         }}
         onClick={onClick}
      />
   );
}

SampleNextArrow.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   onClick: PropTypes.func,
}

function SamplePrevArrow(props) {
   const { className, style, onClick } = props;
   return (
      <div
         className={className}
         style={{
            ...style,
            display: window.innerWidth > 1024 ? 'block' : 'none',
            background: "#050642",
            borderRadius: "50%"
         }}
         onClick={onClick}
      />
   );
}

SamplePrevArrow.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   onClick: PropTypes.func,
}
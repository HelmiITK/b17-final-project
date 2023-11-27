import { NavLink, Link } from "react-router-dom"
import CardCategory from "../../components/HomeComponent/CardCategory";
import Slider from "react-slick";
import ButtonCourse from "../../components/HomeComponent/ButtonCourse";
import Card from "../../components/MyCourseComponent/Card";

const HomePage = () => {
   var settingsCategory = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
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

   var settingsCourse = {
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

   const dataKategori = [
      {
         img: "../../../src/assets/UI_UXDesign.png",
         title: "UI/UX Design"
      },
      {
         img: "../../../src/assets/ProductManager.png",
         title: "Product Manager"
      },
      {
         img: "../../../src/assets/WebDevelopment.png",
         title: "Web Development"
      },
      {
         img: "../../../src/assets/AndroidDevelopment.png",
         title: "Andorid Development"
      },
      {
         img: "../../../src/assets/IOSDevelopment.png",
         title: "IOS Development"
      },
      {
         img: "../../../src/assets/DataScience.png",
         title: "Data Science"
      }
   ]

   return (
      <>
         {/* main section */}
         <div className="w-full pt-[74px] relative h-64" >
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" className="w-full h-full object-cover absolute mix-blend-overlay" />
            <div className="flex flex-col pt-16 pl-10 bg-gradient-to-r from-indigo-600 h-64 lg:items-end lg:pr-40 lg:bg-gradient-to-l">
               <h1 className="font-semibold text-white text-xl">Belajar dari <br /> Praktisi Terbaik!</h1>
               <p className="hidden lg:block lg:absolute lg:text-3xl lg:top-[130px]">💡</p>
               <NavLink as={Link} to={'/user'} className="mt-4 z-10">
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
                  <Slider {...settingsCategory} className="overflow-x-clip">
                     {dataKategori.map((kategori, i) => (
                        <div key={i}>
                           <CardCategory
                              img={kategori.img}
                              title={kategori.title}
                           />
                        </div>
                     ))}
                  </Slider>
               </div>
            </div>
         </div>

         {/* Kursus Populer */}
         <div className="max-w-screen-lg mx-auto px-6">
            {/* title */}
            <div>
               <h1 className="font-bold text-xl my-4 md:text-2xl">Kursus Populer</h1>
            </div>
            {/* button filter */}
            <Slider {...settingsCourse}>
               {dataKategori.map((Kursus, i) => (
                  <div key={i}>
                     <ButtonCourse titleCourse={Kursus.title} />
                  </div>
               ))}
            </Slider>
            {/* card kursus populer */}
            <div className="mt-2">
               <Card />
            </div>
         </div>
      </>
   )
}

export default HomePage
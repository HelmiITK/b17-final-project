import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import CardCategory from "../../components/HomeComponent/CardCategory";
import ButtonCourse from "../../components/HomeComponent/ButtonCourse";
import CardCourse from "../../components/HomeComponent/CardCourse";
import Data from "./DataDummy"

const HomePage = () => {
   const [item, setItems] = useState(Data);
   const menuItems = [...new Set(Data.map((val) => val.category))]

   const filterItems = (cat) => {
      const newItems = Data.filter((newval) => newval.category === cat)
      setItems(newItems);
   }

   var settingsCategory = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      speed: 800,
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

   const dataKategori = [
      {
         img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         title: "UI/UX Design"
      },
      {
         img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         title: "Product Manager"
      },
      {
         img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         title: "Web Development"
      },
      {
         img: "https://images.unsplash.com/photo-1612442443556-09b5b309e637?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         title: "Andorid Development"
      },
      {
         img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         title: "IOS Development"
      },
      {
         img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
         <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
            {/* title */}
            <div>
               <h1 className="font-bold text-xl my-4 md:text-2xl">Kursus Populer</h1>
            </div>
            {/* button filter */}
            <Slider {...settingsCourse}>
               {menuItems.map((val, i) => (
                  <ButtonCourse
                     key={i}
                     val={val}
                     filterItems={filterItems}
                     setItems={setItems}
                  />
               ))}
            </Slider>
            <button 
               onClick={() => setItems(Data)}
               className="w-full mt-2 lg:mt-4 text-xs font-medium border-none text-white bg-slate-600 cursor-pointer py-2 px-2 rounded-2xl 
                           hover:scale-105 duration-300 hover:bg-indigo-600 hover:text-white lg:font-semibold">
               All
            </button>
            {/* card kursus populer */}
            <div>
               <CardCourse item={item} />
            </div>
         </div>
      </>
   )
}

export default HomePage;
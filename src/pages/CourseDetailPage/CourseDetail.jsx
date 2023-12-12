import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCourse } from "../../redux/actions/detailActions";
import { removeDetail } from "../../redux/reducers/courseReducers";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BiLineChart } from "react-icons/bi";
import { IoDiamondOutline } from "react-icons/io5";
import { BsChatRightQuote } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ClockLoader from "react-spinners/ClockLoader";

const CourseDetail = () => {
   const getRandomLoveCount = () => {
      return Math.floor(Math.random() * 100) + 1;
   };

   const [loveCount, setLoveCount] = useState(getRandomLoveCount());
   const [isLoved, setIsLoved] = useState(false);
   const [isButtonVisible, setIsButtonVisible] = useState(false);
   const [originalPageUrl, setOriginalPageUrl] = useState("");
   const navigate = useNavigate();
   const { detail } = useSelector((state) => state.course);
   const handleLoveClick = () => {
      if (isLoved) {
         setLoveCount(loveCount - 1);
      } else {
         setLoveCount(loveCount + 1);
      }
      setIsLoved(!isLoved);
   };

   const handleIconClick = () => {
      setOriginalPageUrl(window.location.href);
      setIsButtonVisible(!isButtonVisible);
   };

   const handleFollowClick = () => {
      // const isConfirmed = window.confirm('Hemm antum belum login nih, login dulu yuk 😊');

      // if (isConfirmed) {
      //    // Mengarahkan pengguna ke halaman video jika dikonfirmasi
      //    window.location.href = '/login';
      // } else {
      //    // Mengarahkan pengguna kembali ke halaman saat ini jika dibatalkan
      //    window.location.href = originalPageUrl;
      // }
      navigate(`/course-detail/${courseId}/video/${detail.materials[0].id}`);
   };

   const { courseId } = useParams();
   const dispatch = useDispatch();

   const [errors, setErrors] = useState({
      isError: false,
      message: null,
   });

   const [loading, setLoading] = useState(false);

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

      // Cleanup function untuk menghapus detail saat keluar dari halaman
      return () => {
         dispatch(removeDetail());
      };
   }, [courseId]); // lakukan setiap perubahan berdasarkan id

   if (!detail) {
      return <div>Loading...</div>;
   }

   return (
      <>
         <div className="container mx-auto pt-24">
            <div className="flex flex-row justify-between mx-3 lg:flex lg:flex-col lg:gap-4">
               <div className="flex flex-row items-center gap-2 lg:mt-2">
                  <BiMessageSquareDetail className="text-indigo-700 w-10 h-10 lg:w-12 lg:h-12" />
                  <h1 className="text-2xl font-bold text-indigo-800 lg:text-3xl">Detail Kelas</h1>
               </div>
               <Link
                  to={"/"}
                  className="flex items-center gap-2 mx-2 hover:text-indigo-600 lg:text-lg"
               >
                  <IoMdArrowRoundBack />
                  <p>Kembali Ke Beranda</p>
               </Link>
            </div>
            <div className="flex flex-col">
               {loading ? (
                  <ClockLoader
                     className="absolute top-10 left-1/2 mb-20 lg:left-[700px]"
                     color="#6a00ff"
                     size={50}
                     speedMultiplier={2}
                  />
               ) : (
                  <div className="mx-4 mt-4 lg:flex lg:flex-row lg:gap-4">
                     <div className="border-none p-3 bg-indigo-500 h-full rounded-lg shadow-lg shadow-slate-600 flex flex-col gap-3 lg:w-1/2">
                        <img
                           src={detail.thumbnail}
                           alt={detail.title}
                           className="rounded-lg shadow-lg shadow-slate-700"
                        />
                        <button
                           className="flex items-center gap-2 mt-2 text-white lg:mt-4 lg:mb-6"
                           onClick={handleLoveClick}
                        >
                           {isLoved ? (
                              <AiFillHeart className="mr-1 ml-4 w-8 h-8 text-red-600 lg:w-10 lg:h-10" />
                           ) : (
                              <AiOutlineHeart className="mr-1 ml-4 text-white w-8 h-8 lg:w-10 lg:h-10" />
                           )}
                           {loveCount}
                        </button>

                        {/* ini ada di mode hp dan tablet */}
                        <div className="flex flex-row justify-between my-5 lg:hidden">
                           <div className="ml-4 mr-6 flex flex-col gap-2">
                              <h2 className="text-xl font-semibold text-white">
                                 {detail.title}
                              </h2>
                              <div className="relative">
                                 <AiFillPlayCircle
                                    className="text-white ml-10 mt-1 w-24 h-24 hover:text-yellow-400 cursor-pointer"
                                    onClick={handleIconClick}
                                 />
                                 {isButtonVisible && (
                                    <button
                                       className="absolute top-24 left-7 transform border bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:text-indigo-600 hover:bg-yellow-400 duration-200"
                                       onClick={handleFollowClick}
                                    >
                                       Ikuti Kelas
                                    </button>
                                 )}
                              </div>
                           </div>
                           <div className="mr-4 flex flex-col gap-4 mt-2">
                              <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-cyan-500">
                                 <BiSolidCategoryAlt className="w-8 h-8 text-white" />
                                 {detail && detail.Category && (
                                    <p className="text-sm text-white">{detail.Category.title}</p>
                                 )}
                              </div>
                              <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-red-400">
                                 <BiLineChart className="w-5 h-5 text-white" />
                                 <p className="text-sm text-white">{detail.level}</p>
                              </div>
                              <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-blue-400">
                                 <IoDiamondOutline className="text-white w-5 h-5" />
                                 <p className="text-sm text-white">{detail.type_course}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="my-7 rounded-lg p-2 flex flex-col gap-2 lg:w-1/2 lg:my-0">
                        <div>
                           <h2 className="hidden text-3xl lg:block mb-4 font-medium underline">{detail.title}</h2>
                        </div>
                        <div className="flex flex-row gap-2">
                           <BsChatRightQuote className="w-8 h-8 " />
                           <h2 className="font-semibold text-lg mb-2 lg:text-2xl">Tentang Kelas</h2>
                        </div>
                        <p className="text-sm first-letter:text-3xl tracking-wider lg:text-base text-justify">
                           {detail.description}
                        </p>
                        
                        {/* ada di mode laptop */}
                        <div className="hidden lg:flex lg:flex-col mt-4">
                           <div className="border-none border-indigo-600 rounded-xl shadow-md shadow-slate-200 p-4 max-w-2xl h-auto relative">
                              <div className="flex flex-col gap-3 mb-4">
                                 <h2>Kategori Kelas</h2>
                                 <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-cyan-500 w-1/2 shadow-md">
                                    <BiSolidCategoryAlt className="w-8 h-8 text-white" />
                                    {detail && detail.Category && (
                                       <p className="text-base font-semibold text-white">{detail.Category.title}</p>
                                    )}
                                 </div>
                              </div>
                              <div className="flex flex-col gap-3 mb-4">
                                 <h2>Tingkat Kesulitan</h2>
                                 <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-red-400 w-1/2 shadow-md">
                                    <BiLineChart className="w-8 h-8 text-white" />
                                    <p className="text-base font-semibold text-white">{detail.level}</p>
                                 </div>
                              </div>
                              <div className="flex flex-col gap-3">
                                 <h2>Tipe Kelas</h2>
                                 <div className="flex flex-row items-center gap-2 border p-2 rounded-lg bg-blue-400 w-1/2 shadow-md">
                                    <IoDiamondOutline className="text-white w-8 h-8" />
                                    <p className="text-base font-semibold text-white">{detail.type_course}</p>
                                 </div>
                              </div>
                              <div>
                                 <AiFillPlayCircle
                                    className="text-indigo-600 absolute top-16 lg:right-10 xl:right-20 w-40 h-40 hover:text-yellow-400 cursor-pointer animate-pulse shadow-md rounded-full"
                                    onClick={handleIconClick}
                                 />
                                 {isButtonVisible && (
                                    <button
                                       className="absolute top-60 lg:right-[32px] xl:right-[74px] border border-indigo-600 bg-white py-2 px-4 w-44 rounded-xl text-lg text-indigo-600 hover:bg-indigo-600 hover:text-white duration-200"
                                       onClick={handleFollowClick}
                                    >
                                       Ikuti Kelas
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default CourseDetail;

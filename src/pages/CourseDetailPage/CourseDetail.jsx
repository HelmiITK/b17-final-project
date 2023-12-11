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
            <div className="flex flex-row justify-between mx-3">
               <div className="flex flex-row items-center gap-2">
                  <BiMessageSquareDetail className="text-indigo-700 w-10 h-10" />
                  <h1 className="text-2xl font-bold text-indigo-800">Detail Kelas</h1>
               </div>
               <Link
                  to={"/"}
                  className="flex items-center gap-2 mx-2 hover:text-indigo-600"
               >
                  <IoMdArrowRoundBack />
                  <p>Kembali Ke Beranda</p>
               </Link>
            </div>
            <div className="flex flex-col">
               {loading ? (
                  <ClockLoader
                     className="absolute top-10 left-1/2 mb-20 lg:left-[485px]"
                     color="#6a00ff"
                     size={50}
                     speedMultiplier={2}
                  />
               ) : (
                  <div className="mx-4 mt-4">
                     <div className="border-none p-3 bg-indigo-500 rounded-lg shadow-lg shadow-slate-600 flex flex-col gap-3">
                        <img
                           src={detail.thumbnail}
                           alt={detail.title}
                           className="rounded-lg shadow-lg shadow-slate-700"
                        />
                        <button
                           className="flex items-center gap-2 text-white"
                           onClick={handleLoveClick}
                        >
                           {isLoved ? (
                              <AiFillHeart className="mr-1 ml-4 w-8 h-8 text-red-600" />
                           ) : (
                              <AiOutlineHeart className="mr-1 ml-4 text-white w-8 h-8" />
                           )}
                           {loveCount}
                        </button>
                        <div className="flex flex-row justify-between my-5">
                           <div className="ml-4 mr-6 flex flex-col gap-2">
                              <h2 className="text-xl font-semibold text-white">
                                 {detail.title}
                              </h2>
                              <div className="relative">
                                 <AiFillPlayCircle
                                    className="text-white w-16 h-16 hover:text-yellow-400 cursor-pointer"
                                    onClick={handleIconClick}
                                 />
                                 {isButtonVisible && (
                                    <button
                                       className="absolute right-16 top-3 transform  border bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:text-indigo-600 hover:bg-yellow-400 duration-200"
                                       onClick={handleFollowClick}
                                    >
                                       Ikuti Kelas
                                    </button>
                                 )}
                              </div>
                           </div>
                           <div className="mr-4 flex flex-col gap-4 mt-2">
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
                     <div className="my-7 rounded-lg p-2 flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                           <BsChatRightQuote className="w-8 h-8 " />
                           <h2 className="font-semibold text-lg mb-2">Tentang Kelas</h2>
                        </div>
                        <p className="text-sm first-letter:text-3xl tracking-wider">
                           {detail.description}
                        </p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default CourseDetail;

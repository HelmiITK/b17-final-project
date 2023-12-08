import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getDetailCourse } from "../../redux/actions/detailActions";
import { removeDetail } from "../../redux/reducers/courseReducers";
import ClockLoader from "react-spinners/ClockLoader"

const CourseDetail = () => {
   const { courseId } = useParams();
   const dispatch = useDispatch();

   const { detail } = useSelector((state) => state.course);
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
            setLoading(false)
         })
         .catch((error) => {
            console.error("Error fetching course data:", error)
            setLoading(false)
         })

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
         <div className="">
            <h1 className="text-2xl font-bold">Detail Kelas</h1>
            {loading ? (
               <ClockLoader
                  className="absolute top-20 left-1/2 mb-20 lg:left-[485px]"
                  color="#6a00ff"
                  size={50}
                  speedMultiplier={2}
               />
            ) : (
               <>
                  <div className="my-4">
                     <h2 className="text-xl font-semibold">{detail.title}</h2>
                     <p>{detail.description}</p>
                  </div>
                  <div>
                     <p>{detail.level}</p>
                     <p>{detail.type_course}</p>
                  </div>
               </>
            )}
         </div>
      </>
   )
}

export default CourseDetail
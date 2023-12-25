import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import Navbar from "../../components/NavbarComponent/Navbar";
import { getSearchCourses } from "../../redux/actions/searchActions";
import { Link } from "react-router-dom";

const SearchCourse = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const { searching } = useSelector((state) => state.search);
  console.log(searching);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    dispatch(getSearchCourses(errors, setErrors, search, page))
  }, [dispatch, search, page])

  return (
    <>
      <Navbar />
      <div className="pt-28">
        <div>SearchCourse</div>
        <h1 className="text-2xl font-semibold">
          Search: {`'${search}'`}
        </h1>
        {errors.isError ? (
          <h2>{errors?.message}</h2>
        ) : searching && searching.length > 0 ? (
          searching.map((course) => (
            <div key={course?.id}>
              <div>
                <h2>{course?.title}</h2>
                <p>{course?.description}</p>
              </div>
              <Link to={`/course-detail/${course?.id}`}>
                <img src={course?.thumbnail} alt="" />
              </Link>
            </div>
          ))
        ) : (
          <h2>Data Tidak Ada Bro</h2>
        )}
      </div >
    </>
  )
}

export default SearchCourse
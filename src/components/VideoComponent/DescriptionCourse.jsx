import { useSelector } from "react-redux";

const DescriptionCourse = () => {
  // ambil data
  const { detail } = useSelector((state) => state.course);

  return (
    <div className="mb-5 mx-4 md:mx-0">
      <div className="flex flex-col">
        <div className="flex flex-col mt-1">
          <h1 className="font-semibold md:text-xl">Tentang Kelas</h1>
          <p className="text-justify indent-5 text-xs md:text-sm ">
            {detail.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCourse;
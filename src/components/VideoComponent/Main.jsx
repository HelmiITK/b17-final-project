import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateMaterialStatus } from "../../redux/actions/courseActions";
import CompletedButton from "./CompletedButton";
import InfoCourse from "./InfoCourse";
import DescriptionCourse from "./DescriptionCourse";

const Main = ({ materialId, myCourse }) => {
  const materialss = myCourse?.course?.materials;
  // sorting berdasarkan id material agar material terurut
  const sortAscByIdMaterials =
    materialss && [...materialss].sort((a, b) => a.id - b.id);

  // hitung durasi video
  const totalTime = sortAscByIdMaterials.reduce((total, material) => {
    return total + material.duration_in_minutes;
  }, 0);

  // get index selanjutnya untuk perpindahan halaman
  const getNextIndex =
    sortAscByIdMaterials?.findIndex((x) => x.id == materialId) + 1;
  const lastIndex = sortAscByIdMaterials && sortAscByIdMaterials.length - 1;

  // id material dari get index
  // dikondisikan jika index selanjutnya sama dengan length, maka itu adalah index terakhir
  const materialNextIndex =
    sortAscByIdMaterials &&
    sortAscByIdMaterials[
      getNextIndex === sortAscByIdMaterials.length ? lastIndex : getNextIndex
    ].id;

  // ambil material berdasarkan id untuk
  const material = sortAscByIdMaterials?.filter(
    (material) => material.id == materialId
  );

  // keperluan untuk url next page
  const { courseId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const updateMaterial = () => {
    dispatch(
      updateMaterialStatus(materialId, navigate, courseId, materialNextIndex)
    );
  };

  return (
    <>
      <div className="flex flex-col">
        {/* isinya kyk judul, rating dll */}
        {/* InfoCourse ketika tampilan web */}
        <div className="hidden md:block">
          <InfoCourse totalTime={totalTime} />
        </div>
        {/* tampilan video */}
        <div className="flex justify-center">
          <div className="mt-1 md:mt-8 w-full ">
            <div className="player-wrapper md:rounded-xl overflow-hidden">
              <ReactPlayer
                url={material && material[0].url_video}
                controls
                width="100%"
                height="100%"
                className="react-player"
                onEnded={updateMaterial}
              />
            </div>
            <CompletedButton
              materialId={materialId}
              progress={myCourse?.userProgress}
              materialNextIndex={materialNextIndex}
            />
          </div>
        </div>
        {/* Infocourse ketika mobile */}
        <div className="block py-4 bg-layer w-full md:hidden">
          <InfoCourse totalTime={totalTime} />
        </div>
        {/* deskripsi course isinya kyk tentang kelas */}
        <DescriptionCourse />
      </div>
    </>
  );
};

Main.propTypes = {
  materialId: PropTypes.string,
  myCourse: PropTypes.object,
};

export default Main;